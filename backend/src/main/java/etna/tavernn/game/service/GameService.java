package etna.tavernn.game.service;

import etna.tavernn.game.dto.GameResponse;
import etna.tavernn.game.model.Game;
import etna.tavernn.game.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;

    public List<GameResponse> getAllGamesDTO() {
        return gameRepository.findAll().stream()
                .map(this::toGameResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<GameResponse> getGameByIdDTO(String id) {
        return gameRepository.findById(id)
                .map(this::toGameResponseDTO);
    }

    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }

    public Optional<Game> updateGame(String id, Game gameDetails) {
        return gameRepository.findById(id)
                .map(existingGame -> {
                    if (gameDetails.getName() != null) {
                        existingGame.setName(gameDetails.getName());
                    }
                    if (gameDetails.getImage() != null) {
                        existingGame.setImage(gameDetails.getImage());
                    }
                    if (gameDetails.getTeamMaxNr() != null) {
                        existingGame.setTeamMaxNr(gameDetails.getTeamMaxNr());
                    }
                    return gameRepository.save(existingGame);
                });
    }

    public boolean deleteGame(String id) {
        return gameRepository.findById(id)
                .map(gameToDelete -> {
                    gameRepository.delete(gameToDelete);
                    return true;
                })
                .orElse(false);
    }

    private GameResponse toGameResponseDTO(Game game) {
        GameResponse response = new GameResponse();
        response.setId(game.getId());
        response.setName(game.getName());
        response.setImage(game.getImage());
        response.setTeamMaxNr(game.getTeamMaxNr());
        return response;
    }
}