package etna.tavernn.club.service;

import etna.tavernn.club.dto.ClubResponse;
import etna.tavernn.club.dto.CreateAndJoinRequest;
import etna.tavernn.club.model.Club;
import etna.tavernn.club.model.ClubType;
import etna.tavernn.club.repository.ClubMemberRepository;
import etna.tavernn.club.repository.ClubRepository;
import etna.tavernn.user.repository.UserRepository;
import etna.tavernn.user.model.User;
import etna.tavernn.club.model.ClubMember;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final UserRepository userRepository;
    private final ClubMemberRepository clubMemberRepository;

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

    public ClubResponse CreateAndJoinRequest(CreateAndJoinRequest request, String creatorUserId) {
        Club club = new Club();
        club.setName(request.getName());
        club.setDescription(request.getDescription());
        club.setClubType(request.getClubType());
        club.setMaxMembers(request.getMaxMembers());
        club.setCreationDate(LocalDate.now());
        club = clubRepository.save(club);

        User user = userRepository.findById(creatorUserId)
                .orElseThrow(() -> new UsernameNotFoundException("Aucun user trouvé"));
        ClubMember membership = new ClubMember(club, user, true, true);
        clubMemberRepository.save(membership);
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