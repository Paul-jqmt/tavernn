package etna.tavernn.club.service;

import etna.tavernn.club.dto.ClubResponse;
import etna.tavernn.club.dto.CreateAndJoinRequest;
import etna.tavernn.club.model.Club;
import etna.tavernn.club.model.ClubType;
import etna.tavernn.club.repository.ClubRepository;
import etna.tavernn.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {

    private static final int maximum_members = 50;

    private final ClubRepository clubRepository;
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

    public Club saveClub(Club club) {
        return clubRepository.save(club);
    }

    public Club CreateAndJoinRequest(CreateAndJoinRequest request, String creatorUserId) {
        Club club = new Club();
        club.setName(request.getName());
        club.setDescription(request.getDescription());
        club.setClubType(request.getClubType());
        club.setMaxMembers((request.getMaxMembers() != null) ? request.getMaxMembers() : maximum_members);
        club.setCreationDate(LocalDate.now());
        club = clubRepository.save(club);

        int user = userRepository.findById(creatorUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

    }

    public ClubResponse createAndJoinClub(CreateAndJoinRequest req, String creatorUserId) {
        // 1) créer le club
        Club club = new Club();
        club.setName(req.getName());
        club.setDescription(req.getDescription());
        club.setClubType(ClubType.valueOf(req.getClubType().toUpperCase()));
        club.setMaxMembers(req.getMaxMembers());
        club.setCreationDate(LocalDate.now());
        club = clubRepo.save(club);
g
        // 2) créer la ligne dans club_members
        var user = userRepo.findById(creatorUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        ClubMember membership = new ClubMember(club, user, true, true);
        memberRepo.save(membership);

        // 3) retourner le DTO
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