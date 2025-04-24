package etna.tavernn.club.controller;
import etna.tavernn.club.model.ClubEntity;
import etna.tavernn.club.service.ClubService;
import jakarta.validation.Valid;
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

    @GetMapping
    public ResponseEntity<List<ClubEntity>> getAllClubs() {
        return ResponseEntity.ok(clubService.getAllClubs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClubEntity> getClubById(@PathVariable String id) {
        return clubService.getClubById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ClubEntity> createClub(@Valid @RequestBody ClubEntity club) {
        return ResponseEntity.ok(clubService.saveClub(club));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClubEntity> updateClub(@PathVariable String id, @Valid @RequestBody ClubEntity club) {
        return clubService.getClubById(id).map(existingClub -> {
            club.setId(id);
            club.setCreation_date(existingClub.getCreation_date());
            return ResponseEntity.ok(clubService.saveClub(club));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ClubEntity> deleteClub(@PathVariable String id) {
        if(clubService.getClubById(id).isPresent()) {
            clubService.deleteClubById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }
}
