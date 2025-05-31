package etna.tavernn.user.controller;

import etna.tavernn.club.dto.ClubResponse;
import etna.tavernn.club.service.ClubService;
import etna.tavernn.team.dto.TeamResponse;
import etna.tavernn.team.service.TeamService;
import etna.tavernn.user.dto.UserGameRequest;
import etna.tavernn.user.dto.UserGameResponse;
import etna.tavernn.user.dto.UserResponse;
import etna.tavernn.user.model.User;
import etna.tavernn.user.service.UserGameService;
import etna.tavernn.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

//@TODO ADD EXCEPTION HANDLING

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ClubService clubService;
    private final TeamService teamService;
    private final UserGameService userGameService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsersDTO());
    }

    // "::" c'est comme = .map(user -> ResponseEntity.ok(user))
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable("id") String id) {
        return userService.getUserByIdDTO(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Principal principal) {
        return userService.getCurrentUserDTO(principal.getName())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/{id}/club")
    public ResponseEntity<List<ClubResponse>> getUserClubs(@PathVariable("id") String userId) {
        List<ClubResponse> clubs = clubService.getClubsByUserId(userId);
        return ResponseEntity.ok(clubs);
    }

    @GetMapping("/{id}/teams")
    public ResponseEntity<List<TeamResponse>> getUserTeams(@PathVariable("id") String userId) {
        List<TeamResponse> teams = teamService.getTeamsByUserId(userId);
        return ResponseEntity.ok(teams);
    }

    @GetMapping("/{id}/games")
    public ResponseEntity<List<UserGameResponse>> getUserGames(@PathVariable("id") String userId) {
        List<UserGameResponse> games = userGameService.getGamesByUserId(userId);
        return ResponseEntity.ok(games);
    }


    @PostMapping("/{id}/games")
    public ResponseEntity<UserGameResponse> addGameToUser(
            @PathVariable("id") String userId,
            @RequestBody UserGameRequest req) {
        UserGameResponse created = userGameService.addGameToUser(userId, req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}/games/{gameId}")
    public ResponseEntity<UserGameResponse> updateUserGameLevel(
            @PathVariable("id") String userId,
            @PathVariable String gameId,
            @RequestBody UserGameRequest req) {
        UserGameResponse updated = userGameService.updateGameLevel(userId, gameId, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}/games/{gameId}")
    public ResponseEntity<Void> removeUserGame(
            @PathVariable("id") String userId,
            @PathVariable String gameId) {
        userGameService.removeGameFromUser(userId, gameId);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User user, Principal principal) {
        try {
            return userService.updateUser(id, user, principal.getName())
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") String id, Principal principal) {
        try {
            boolean deleted = userService.deleteUser(id, principal.getName());
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}