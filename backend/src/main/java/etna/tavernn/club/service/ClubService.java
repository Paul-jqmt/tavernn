package etna.tavernn.club.service;

import etna.tavernn.club.dto.ClubResponse;
import etna.tavernn.club.model.Club;
import etna.tavernn.club.repository.ClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;

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