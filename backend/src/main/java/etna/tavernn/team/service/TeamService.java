package etna.tavernn.team.service;

import etna.tavernn.club.model.Club;
import etna.tavernn.club.model.ClubMember;
import etna.tavernn.club.repository.ClubMemberRepository;
import etna.tavernn.club.repository.ClubRepository;
import etna.tavernn.game.model.Game;
import etna.tavernn.game.repository.GameRepository;
import etna.tavernn.team.dto.TeamMapper;
import etna.tavernn.team.dto.TeamMemberResponse;
import etna.tavernn.team.dto.TeamRequest;
import etna.tavernn.team.dto.TeamResponse;
import etna.tavernn.team.model.Team;
import etna.tavernn.team.model.TeamMember;
import etna.tavernn.team.repository.TeamMemberRepository;
import etna.tavernn.team.repository.TeamRepository;
import etna.tavernn.user.model.User;
import etna.tavernn.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final UserRepository userRepository;
    private final ClubRepository clubRepository;
    private final ClubMemberRepository clubMemberRepository;
    private final GameRepository gameRepository;
    private final TeamMapper teamMapper;

    public List<TeamResponse> getAllTeamsDTO() {
        List<Team> teams = teamRepository.findAll();

        List<TeamResponse> responses = new ArrayList<>();
        for (Team team : teams) {
            TeamResponse response = teamMapper.toTeamResponse(team);
            responses.add(response);
        }

        return responses;
    }

    public Optional<TeamResponse> getTeamByIdDTO(String id) {
        Optional<Team> teamOptional = teamRepository.findById(id);

        if (teamOptional.isPresent()) {
            Team team = teamOptional.get();
            TeamResponse response = teamMapper.toTeamResponse(team);
            return Optional.of(response);
        }

        return Optional.empty();
    }

    @Transactional
    public TeamResponse createTeam(TeamRequest teamRequest, String userEmail) {

        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        User creator = userOptional.get();
        Optional<Club> clubOptional = clubRepository.findById(teamRequest.getClubId());
        if (clubOptional.isEmpty()) {
            throw new RuntimeException("Club not found");
        }
        Club club = clubOptional.get();

        ClubMember.ClubMemberId memberId = new ClubMember.ClubMemberId();
        memberId.setClubId(club.getId());
        memberId.setUserId(creator.getId());

        Optional<ClubMember> clubMemberOptional = clubMemberRepository.findById(memberId);
        if (clubMemberOptional.isEmpty()) {
            throw new RuntimeException("You must be a member of the club to create a team");
        }

        Optional<Game> gameOptional = gameRepository.findById(teamRequest.getGameId());
        if (gameOptional.isEmpty()) {
            throw new RuntimeException("Game not found");
        }
        Game game = gameOptional.get();

        Team team = new Team();
        team.setId(UUID.randomUUID().toString());
        team.setName(teamRequest.getName());
        team.setDescription(teamRequest.getDescription());
        team.setClub(club);
        team.setGame(game);
        team.setNrMembers(1);

        team = teamRepository.save(team);

        TeamMember.TeamMemberId teamMemberId = new TeamMember.TeamMemberId();
        teamMemberId.setTeamId(team.getId());
        teamMemberId.setUserId(creator.getId());

        TeamMember captain = new TeamMember();
        captain.setId(teamMemberId);
        captain.setTeam(team);
        captain.setUser(creator);
        captain.setIsCaptain(true);

        teamMemberRepository.save(captain);

        return teamMapper.toTeamResponse(team);
    }

    @Transactional
    public TeamMemberResponse joinTeam(String teamId, String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        User user = userOptional.get();

        Optional<Team> teamOptional = teamRepository.findById(teamId);
        if (teamOptional.isEmpty()) {
            throw new RuntimeException("Team not found");
        }
        Team team = teamOptional.get();

        TeamMember.TeamMemberId memberId = new TeamMember.TeamMemberId();
        memberId.setTeamId(teamId);
        memberId.setUserId(user.getId());

        Optional<TeamMember> existingMember = teamMemberRepository.findById(memberId);
        if (existingMember.isPresent()) {
            throw new RuntimeException("User is already a member of this team");
        }

        if (team.getNrMembers() >= team.getGame().getTeamMaxNr()) {
            throw new RuntimeException("Team is full");
        }

        ClubMember.ClubMemberId clubMemberId = new ClubMember.ClubMemberId();
        clubMemberId.setClubId(team.getClub().getId());
        clubMemberId.setUserId(user.getId());

        Optional<ClubMember> clubMemberOptional = clubMemberRepository.findById(clubMemberId);
        if (clubMemberOptional.isEmpty()) {
            throw new RuntimeException("You must be a member of the club to join this team");
        }

        TeamMember newMember = new TeamMember();
        newMember.setId(memberId);
        newMember.setTeam(team);
        newMember.setUser(user);
        newMember.setIsCaptain(false);

        teamMemberRepository.save(newMember);

        team.setNrMembers(team.getNrMembers() + 1);
        teamRepository.save(team);

        return teamMapper.toTeamMemberResponse(newMember);
    }

    @Transactional
    public void leaveTeam(String teamId, String userEmail) {

        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        User user = userOptional.get();

        TeamMember.TeamMemberId memberId = new TeamMember.TeamMemberId();
        memberId.setTeamId(teamId);
        memberId.setUserId(user.getId());

        Optional<TeamMember> memberOptional = teamMemberRepository.findById(memberId);
        if (memberOptional.isEmpty()) {
            throw new RuntimeException("User is not a member of this team");
        }

        TeamMember member = memberOptional.get();

        if (member.getIsCaptain()) {
            List<TeamMember> teamMembers = teamMemberRepository.findAllByTeamId(teamId);
            if (teamMembers.size() > 1) {
                throw new RuntimeException("Captain cannot leave the team while other members exist");
            }
        }

        teamMemberRepository.delete(member);

        Optional<Team> teamOptional = teamRepository.findById(teamId);
        if (teamOptional.isPresent()) {
            Team team = teamOptional.get();
            team.setNrMembers(team.getNrMembers() - 1);
            teamRepository.save(team);
        }
    }

    public List<TeamMemberResponse> getTeamMembers(String teamId) {
        if (!teamRepository.existsById(teamId)) {
            throw new RuntimeException("Team not found");
        }

        List<TeamMember> members = teamMemberRepository.findAllByTeamId(teamId);

        List<TeamMemberResponse> responses = new ArrayList<>();
        for (TeamMember member : members) {
            responses.add(teamMapper.toTeamMemberResponse(member));
        }
        return responses;
    }

    public Optional<Team> getTeamById(String id) {
        return teamRepository.findById(id);
    }

    public void deleteTeamById(String id) {
        teamRepository.deleteById(id);
    }

    public List<TeamResponse> getTeamsByUserId(String userId) {
        return teamMemberRepository
                .findByIdUserId(userId)
                .stream()
                .map(tm -> teamMapper.toTeamResponse(tm.getTeam()))
                .collect(Collectors.toList());
    }
}