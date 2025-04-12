package etna.tavernn.club.service;

import etna.tavernn.club.model.ClubEntity;
import etna.tavernn.club.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClubService {

    private final ClubRepository clubRepository;

    @Autowired
    public ClubService(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    public List<ClubEntity> getAllClubs() {
        return clubRepository.findAll();
    }

    public Optional<ClubEntity> getClubById(String id) {
        return clubRepository.findById(id);
    }

    public ClubEntity saveClub(ClubEntity club) {
        return clubRepository.save(club);
    }

    public void deleteClubById(String id) {
        clubRepository.deleteById(id);
    }
}