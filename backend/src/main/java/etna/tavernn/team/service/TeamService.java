package etna.tavernn.team.service;

import etna.tavernn.team.dto.TeamResponse;
import etna.tavernn.team.model.Team;
import etna.tavernn.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;

    public List<TeamResponse> getAllTeamsDTO() {
        return teamRepository.findAll().stream()
                .map(this::toTeamResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<TeamResponse> getTeamByIdDTO(String id) {
        return teamRepository.findById(id)
                .map(this::toTeamResponseDTO);
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Optional<Team> getTeamById(String id) {
        return teamRepository.findById(id);
    }

    public Team saveTeam(Team team) {
        return teamRepository.save(team);
    }

    public Optional<Team> updateTeam(String id, Team teamDetails) {
        return teamRepository.findById(id)
                .map(existingTeam -> {
                    if (teamDetails.getName() != null) {
                        existingTeam.setName(teamDetails.getName());
                    }
                    if (teamDetails.getDescription() != null) {
                        existingTeam.setDescription(teamDetails.getDescription());
                    }
                    if (teamDetails.getNrMembers() != null) {
                        existingTeam.setNrMembers(teamDetails.getNrMembers());
                    }
                    return teamRepository.save(existingTeam);
                });
    }

    public void deleteTeamById(String id) {
        teamRepository.deleteById(id);
    }

    private TeamResponse toTeamResponseDTO(Team team) {
        return TeamResponse.builder()
                .id(team.getId())
                .name(team.getName())
                .description(team.getDescription())
                .clubId(team.getClub().getId())
                .clubName(team.getClub().getName())
                .gameId(team.getGame().getId())
                .gameName(team.getGame().getName())
                .nrMembers(team.getNrMembers())
                .build();
    }
}