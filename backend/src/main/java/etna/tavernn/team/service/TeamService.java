package etna.tavernn.team.service;

import etna.tavernn.team.model.TeamEntity;
import etna.tavernn.team.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<TeamEntity> getAllTeams() {
        return teamRepository.findAll();
    }

    public Optional<TeamEntity> getTeamById(String id) {
        return teamRepository.findById(id);
    }

    public TeamEntity saveTeam(TeamEntity team) {
        return teamRepository.save(team);
    }

    public void deleteTeamById(String id) {
        teamRepository.deleteById(id);
    }
}