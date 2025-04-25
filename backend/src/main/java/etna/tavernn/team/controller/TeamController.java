package etna.tavernn.team.controller;

import etna.tavernn.team.model.TeamEntity;
import etna.tavernn.team.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public ResponseEntity<List<TeamEntity>> getAllTeams() {
        return ResponseEntity.ok(teamService.getAllTeams());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamEntity> getTeamById(@PathVariable String id) {
        return teamService.getTeamById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TeamEntity> createTeam(@Valid @RequestBody TeamEntity team) {
        return ResponseEntity.ok(teamService.saveTeam(team));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeamEntity> updateTeam(@PathVariable String id, @Valid @RequestBody TeamEntity team) {
        return teamService.getTeamById(id).map(existingTeam -> {
            team.setId(id);
            team.setClub_id(existingTeam.getClub_id());
            team.setTeam_game(existingTeam.getTeam_game());
            return ResponseEntity.ok(teamService.saveTeam(team));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TeamEntity> deleteTeam(@PathVariable String id) {
        if (teamService.getTeamById(id).isPresent()) {
            teamService.deleteTeamById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}



