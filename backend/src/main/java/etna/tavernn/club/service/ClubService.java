package etna.tavernn.club.service;

import etna.tavernn.club.dto.ClubMapper;
import etna.tavernn.club.dto.ClubMemberResponse;
import etna.tavernn.club.dto.ClubRequest;
import etna.tavernn.club.dto.ClubResponse;
import etna.tavernn.club.model.Club;
import etna.tavernn.club.model.ClubMember;
import etna.tavernn.club.model.ClubType;
import etna.tavernn.club.repository.ClubMemberRepository;
import etna.tavernn.club.repository.ClubRepository;
import etna.tavernn.user.model.User;
import etna.tavernn.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final ClubMemberRepository clubMemberRepository;
    private final UserRepository userRepository;
    private final ClubMapper clubMapper;

    public List<ClubResponse> getAllClubs() {
        List<Club> clubs = clubRepository.findAll();

        List<ClubResponse> responses = new ArrayList<>();
        for (Club club : clubs) {
            ClubResponse response = clubMapper.toClubResponse(club);
            responses.add(response);
        }

        return responses;
    }

    public Optional<ClubResponse> getClubById(String id) {
        Optional<Club> clubOptional = clubRepository.findById(id);

        if (clubOptional.isPresent()) {
            Club club = clubOptional.get();
            ClubResponse response = clubMapper.toClubResponse(club);
            return Optional.of(response);
        }

        return Optional.empty();
    }

    @Transactional
    public ClubResponse createClub(ClubRequest clubRequest, String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        User creator = userOptional.get();

        Club club = new Club();
        club.setId(UUID.randomUUID().toString());
        club.setName(clubRequest.getName());
        club.setDescription(clubRequest.getDescription());
        club.setCreationDate(LocalDate.now());
        club.setLogo(clubRequest.getLogo());
        club.setClubType(clubRequest.getClubType());
        club.setNrMembers(1);
        club.setMaxMembers(clubRequest.getMaxMembers());

        club = clubRepository.save(club);

        ClubMember.ClubMemberId memberId = new ClubMember.ClubMemberId();
        memberId.setClubId(club.getId());
        memberId.setUserId(creator.getId());

        ClubMember ownerMember = new ClubMember();
        ownerMember.setId(memberId);
        ownerMember.setClub(club);
        ownerMember.setUser(creator);
        ownerMember.setIsOwner(true);
        ownerMember.setIsAdmin(true);

        clubMemberRepository.save(ownerMember);

        return clubMapper.toClubResponse(club);
    }

    public void deleteClubById(String id) {
        clubRepository.deleteById(id);
    }

    @Transactional
    public ClubMemberResponse joinClub(String clubId, String userEmail) {
        // Find existing user
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        User user = userOptional.get();

        // Find existing club
        Optional<Club> clubOptional = clubRepository.findById(clubId);
        if (clubOptional.isEmpty()) {
            throw new RuntimeException("Club not found");
        }
        Club club = clubOptional.get();

        // is user already a member ?
        ClubMember.ClubMemberId memberId = new ClubMember.ClubMemberId();
        memberId.setClubId(clubId);
        memberId.setUserId(user.getId());

        Optional<ClubMember> existingMember = clubMemberRepository.findById(memberId);
        if (existingMember.isPresent()) {
            throw new RuntimeException("User is already a member of this club");
        }

        // is club full ?
        if (club.getNrMembers() >= club.getMaxMembers()) {
            throw new RuntimeException("Club is full");
        }

        //is club open ?
        if (club.getClubType() != ClubType.open) {
            throw new RuntimeException("This club requires approval to join");
        }

        ClubMember newMember = new ClubMember();
        newMember.setId(memberId);
        newMember.setClub(club);
        newMember.setUser(user);
        newMember.setIsOwner(false);
        newMember.setIsAdmin(false);

        clubMemberRepository.save(newMember);
        club.setNrMembers(club.getNrMembers() + 1);
        clubRepository.save(club);

        return clubMapper.toClubMemberResponse(newMember);
    }

    @Transactional
    public void leaveClub(String clubId, String userEmail) {
        // Find user
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        User user = userOptional.get();

        ClubMember.ClubMemberId memberId = new ClubMember.ClubMemberId();
        memberId.setClubId(clubId);
        memberId.setUserId(user.getId());

        Optional<ClubMember> memberOptional = clubMemberRepository.findById(memberId);
        if (memberOptional.isEmpty()) {
            throw new RuntimeException("User is not a member of this club");
        }

        ClubMember member = memberOptional.get();

        if (member.getIsOwner()) {
            throw new RuntimeException("Club owner cannot leave the club");
        }

        clubMemberRepository.delete(member);

        Optional<Club> clubOptional = clubRepository.findById(clubId);
        if (clubOptional.isPresent()) {
            Club club = clubOptional.get();
            club.setNrMembers(club.getNrMembers() - 1);
            clubRepository.save(club);
        }
    }
}
