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
        List<ClubEntity> clubs = clubService.getAllClubs();
        return ResponseEntity.ok(clubs);
    }

    // Route GET simple pour récupérer un club spécifique par ID
    @GetMapping("/{id}")
    public ResponseEntity<ClubEntity> getClubById(@PathVariable String id) {
        return clubService.getClubById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ClubEntity> createClub(@RequestBody ClubEntity club) {
        ClubEntity savedClub = clubService.saveClub(club);
        return ResponseEntity.status(201).body(savedClub);

    }
}
