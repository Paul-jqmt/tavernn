package etna.tavernn.games.service;

import etna.tavernn.games.model.GamesEntity;
import etna.tavernn.games.repository.GamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GamesService {

    private final GamesRepository gamesRepository;

    @Autowired
    public GamesService(GamesRepository gamesRepository) {
        this.gamesRepository = gamesRepository;
    }

    public List<GamesEntity> getAllGames() {
        return gamesRepository.findAll();
    }

    public Optional<GamesEntity> getGamesById(String id) {
        return gamesRepository.findById(id);
    }

    public GamesEntity saveGames(GamesEntity games) {
        return gamesRepository.save(games);
    }

    public void deleteGamesById(String id) {
        gamesRepository.deleteById(id);
    }
}