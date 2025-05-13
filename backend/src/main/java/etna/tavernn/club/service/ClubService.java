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
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final ClubMemberRepository clubMemberRepository;
    private final UserRepository userRepository;

    public List<ClubResponse> getAllClubs() {
        return clubRepository.findAll().stream()
                .map(this::toClubResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<ClubResponse> getClubById(String id) {
        return clubRepository.findById(id)
                .map(this::toClubResponseDTO);
    }

    @Transactional
    public ClubResponse createClub(ClubRequest clubRequest, String userEmail) {
        User creator = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Club club = Club.builder()
                .id(UUID.randomUUID().toString())
                .name(clubRequest.getName())
                .description(clubRequest.getDescription())
                .creationDate(LocalDate.now())
                .logo(clubRequest.getLogo())
                .clubType(clubRequest.getClubType())
                .nrMembers(1)
                .maxMembers(clubRequest.getMaxMembers())
                .build();

        club = clubRepository.save(club);

        ClubMember.ClubMemberId memberId = new ClubMember.ClubMemberId(club.getId(), creator.getId());
        ClubMember ownerMember = ClubMember.builder()
                .id(memberId)
                .club(club)
                .user(creator)
                .isOwner(true)
                .isAdmin(true)
                .build();

        clubMemberRepository.save(ownerMember);

        return toClubResponseDTO(club);
    }

    public void deleteClubById(String id) {
        clubRepository.deleteById(id);
    }

    private ClubResponse toClubResponseDTO(Club club) {
        return ClubResponse.builder()
                .id(club.getId())
                .name(club.getName())
                .description(club.getDescription())
                .creationDate(club.getCreationDate())
                .logo(club.getLogo())
                .clubType(club.getClubType())
                .nrMembers(club.getNrMembers())
                .maxMembers(club.getMaxMembers())
                .build();
    }
}