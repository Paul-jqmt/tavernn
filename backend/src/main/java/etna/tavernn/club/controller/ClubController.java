package etna.tavernn.club.controller;

import etna.tavernn.club.model.ClubEntity;
import etna.tavernn.club.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")
public class ClubController {

    private final ClubService clubService;

    @Autowired
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    // Route GET simple pour récupérer tous les clubs
    @GetMapping
    public ResponseEntity<List<ClubEntity>> getAllClubs() {
        return ResponseEntity.status(200).body(clubService.getAllClubs());
    }

    // Route GET simple pour récupérer un club spécifique par ID
    @GetMapping("/{id}")
    public ResponseEntity<ClubEntity> getClubById(@PathVariable String id) {
        return clubService.getClubById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).build());
    }

    @PostMapping
    public ResponseEntity<ClubEntity> createClub(@RequestBody ClubEntity club) {
        return ResponseEntity.status(201).body(clubService.saveClub(club));

    }

    @PutMapping("/{id}")
    public ResponseEntity<ClubEntity> updateClub(@PathVariable String id, @RequestBody ClubEntity club) {
        return clubService.getClubById(id).map(existingClub -> {
            club.setId(id);
            club.setCreation_date(existingClub.getCreation_date());
            return ResponseEntity.status(200).body(clubService.saveClub(club));
        }).orElseGet(() -> ResponseEntity.status(404).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ClubEntity> deleteClub(@PathVariable String id) {
        if(clubService.getClubById(id).isPresent()) {
            clubService.deleteClubById(id);
            return ResponseEntity.status(204).build();
        } else {
            return ResponseEntity.status(404).build();
        }

    }
}
