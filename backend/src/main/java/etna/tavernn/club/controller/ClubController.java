    package etna.tavernn.club.controller;

    import etna.tavernn.club.dto.ClubResponse;
    import etna.tavernn.club.dto.CreateAndJoinRequest;
    import etna.tavernn.club.model.Club;
    import etna.tavernn.club.service.ClubService;
    import etna.tavernn.security.CustomUserPrincipal;
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
            return ResponseEntity.ok(clubService.getAllClubs());
        }

        @GetMapping("/{id}")
        public ResponseEntity<ClubResponse> getClubById(@PathVariable("id") String id) {
            return clubService.getClubById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }

        @PostMapping
        public ResponseEntity<ClubResponse> createAndJoinClub(@RequestBody CreateAndJoinRequest request, Authentication authentication) {
            CustomUserPrincipal principal = (CustomUserPrincipal) authentication.getPrincipal();
            ClubResponse dto = clubService.CreateAndJoinRequest(request, principal.getUserId());
            return ResponseEntity.status(HttpStatus.CREATED).body(dto);
        }

        @PutMapping("/{id}")
        public ResponseEntity<Club> updateClub(@PathVariable("id") String id, @RequestBody Club club) {
            return clubService.getClubById(id).map(existingClub -> {
                club.setId(id);
                club.setCreationDate(existingClub.getCreationDate());
                return ResponseEntity.ok(clubService.saveClub(club));
            }).orElse(ResponseEntity.notFound().build());
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteClub(@PathVariable("id") String id) {
            if (clubService.getClubById(id).isPresent()) {
                clubService.deleteClubById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        }
    }