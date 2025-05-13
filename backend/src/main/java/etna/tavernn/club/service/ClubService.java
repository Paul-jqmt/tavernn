package etna.tavernn.club.service;

import etna.tavernn.club.dto.ClubRequest;
import etna.tavernn.club.dto.ClubResponse;
import etna.tavernn.club.model.Club;
import etna.tavernn.club.model.ClubMember;
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

    public List<ClubResponse> getAllClubs() {
        List<Club> clubs = clubRepository.findAll();

        List<ClubResponse> responses = new ArrayList<>();
        for (Club club : clubs) {
            ClubResponse response = convertToResponse(club);
            responses.add(response);
        }

        return responses;
    }

    public Optional<ClubResponse> getClubById(String id) {
        Optional<Club> clubOptional = clubRepository.findById(id);

        if (clubOptional.isPresent()) {
            Club club = clubOptional.get();
            ClubResponse response = convertToResponse(club);
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

        return convertToResponse(club);
    }

    public void deleteClubById(String id) {
        clubRepository.deleteById(id);
    }

    private ClubResponse convertToResponse(Club club) {
        ClubResponse response = new ClubResponse();
        response.setId(club.getId());
        response.setName(club.getName());
        response.setDescription(club.getDescription());
        response.setCreationDate(club.getCreationDate());
        response.setLogo(club.getLogo());
        response.setClubType(club.getClubType());
        response.setNrMembers(club.getNrMembers());
        response.setMaxMembers(club.getMaxMembers());

        return response;
    }
}