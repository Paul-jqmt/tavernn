package etna.tavernn.team.controller;

import etna.tavernn.team.dto.TeamMemberResponse;
import etna.tavernn.team.dto.TeamRequest;
import etna.tavernn.team.dto.TeamResponse;
import etna.tavernn.team.service.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/team")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @GetMapping
    public ResponseEntity<List<TeamResponse>> getAllTeams() {
        List<TeamResponse> teams = teamService.getAllTeamsDTO();
        return ResponseEntity.ok(teams);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamResponse> getTeamById(@PathVariable String id) {
        return teamService.getTeamByIdDTO(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TeamResponse> createTeam(@Valid @RequestBody TeamRequest teamRequest, Authentication authentication) {

        String userEmail = authentication.getName();

        TeamResponse createdTeam = teamService.createTeam(teamRequest, userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTeam);
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<TeamMemberResponse> joinTeam(@PathVariable String id, Authentication authentication) {

        String userEmail = authentication.getName();

        TeamMemberResponse memberResponse = teamService.joinTeam(id, userEmail);
        return ResponseEntity.ok(memberResponse);
    }

    @PostMapping("/{id}/leave")
    public ResponseEntity<Void> leaveTeam(@PathVariable String id, Authentication authentication) {

        String userEmail = authentication.getName();

        teamService.leaveTeam(id, userEmail);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<TeamMemberResponse>> getTeamMembers(@PathVariable String id) {
        List<TeamMemberResponse> members = teamService.getTeamMembers(id);
        return ResponseEntity.ok(members);
    }

    @GetMapping("/{id}/captain")
    public ResponseEntity<TeamMemberResponse> getTeamCaptain(@PathVariable String id) {
        TeamMemberResponse captain = teamService.getTeamCaptain(id);
        return captain != null ? ResponseEntity.ok(captain) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable String id) {
        teamService.deleteTeamById(id);
        return ResponseEntity.noContent().build();
    }
}