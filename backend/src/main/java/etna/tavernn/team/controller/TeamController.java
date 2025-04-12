package etna.tavernn.team.controller;

import etna.tavernn.team.model.TeamEntity;
import etna.tavernn.team.service.TeamService;
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
        return ResponseEntity.status(200).body(teamService.getAllTeams());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamEntity> getTeamById(@PathVariable String id) {
        return teamService.getTeamById(id)
                .map(team -> ResponseEntity.status(200).body(team))
                .orElse(ResponseEntity.status(404).build());
    }

    @PostMapping
    public ResponseEntity<TeamEntity> createTeam(@RequestBody TeamEntity team) {
        return ResponseEntity.status(201).body(teamService.saveTeam(team));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeamEntity> updateTeam(@PathVariable String id, @RequestBody TeamEntity team) {
        return teamService.getTeamById(id).map(existingTeam -> {
            team.setId(id);
            team.setClub_id(existingTeam.getClub_id());
            team.setTeam_game(existingTeam.getTeam_game());
            return ResponseEntity.status(200).body(teamService.saveTeam(team));
        }).orElseGet(() -> ResponseEntity.status(404).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TeamEntity> deleteTeam(@PathVariable String id) {
        if (teamService.getTeamById(id).isPresent()) {
            teamService.deleteTeamById(id);
            return ResponseEntity.status(204).build();
        } else {
            return ResponseEntity.status(404).build();
        }
    }
}



