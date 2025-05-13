package etna.tavernn.club.controller;

import etna.tavernn.club.dto.ClubMemberResponse;
import etna.tavernn.club.dto.ClubRequest;
import etna.tavernn.club.dto.ClubResponse;
import etna.tavernn.club.service.ClubService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/club")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;

    @GetMapping
    public ResponseEntity<List<ClubResponse>> getAllClubs() {
        List<ClubResponse> clubs = clubService.getAllClubs();
        return ResponseEntity.ok(clubs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClubResponse> getClubById(@PathVariable String id) {
        return clubService.getClubById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ClubResponse> createClub(
            @Valid @RequestBody ClubRequest clubRequest,
            Authentication authentication) {

        String userEmail = authentication.getName();

        ClubResponse createdClub = clubService.createClub(clubRequest, userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClub);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClub(@PathVariable String id) {
        clubService.deleteClubById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<ClubMemberResponse> joinClub(@PathVariable String id, Authentication authentication) {

        String userEmail = authentication.getName();

        ClubMemberResponse memberResponse = clubService.joinClub(id, userEmail);
        return ResponseEntity.ok(memberResponse);
    }

    @PostMapping("/{id}/leave")
    public ResponseEntity<Void> leaveClub(@PathVariable String id, Authentication authentication) {

        String userEmail = authentication.getName();

        clubService.leaveClub(id, userEmail);
        return ResponseEntity.noContent().build();
    }
}