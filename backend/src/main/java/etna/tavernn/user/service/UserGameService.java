package etna.tavernn.user.service;

import etna.tavernn.game.model.Game;
import etna.tavernn.game.repository.GameRepository;
import etna.tavernn.user.dto.UserGameRequest;
import etna.tavernn.user.dto.UserGameResponse;
import etna.tavernn.user.model.User;
import etna.tavernn.user.model.UserGame;
import etna.tavernn.user.repository.UserGameRepository;
import etna.tavernn.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserGameService {

    private final UserGameRepository userGameRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    public List<UserGameResponse> getGamesByUserId(String userId) {
        return userGameRepository.findByIdUserId(userId).stream()
                .map(user_game -> UserGameResponse.builder()
                        .gameId(user_game.getGame().getId())
                        .gameName(user_game.getGame().getName())
                        .gameLevel(user_game.getGameLevel())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public UserGameResponse addGameToUser(String userId, UserGameRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Game game = gameRepository.findById(req.getGameId())
                .orElseThrow(() -> new RuntimeException("Game not found"));

        UserGame.UserGameId id = new UserGame.UserGameId(userId, req.getGameId());
        UserGame entity = UserGame.builder()
                .id(id)
                .user(user)
                .game(game)
                .gameLevel(req.getGameLevel())
                .build();

        userGameRepository.save(entity);
        return UserGameResponse.builder()
                .gameId(game.getId())
                .gameName(game.getName())
                .gameLevel(req.getGameLevel())
                .build();
    }

    @Transactional
    public UserGameResponse updateGameLevel(String userId, String gameId, UserGameRequest req) {
        UserGame.UserGameId id = new UserGame.UserGameId(userId, gameId);
        UserGame user_game = userGameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("UserGame not found"));

        user_game.setGameLevel(req.getGameLevel());
        userGameRepository.save(user_game);

        return UserGameResponse.builder()
                .gameId(gameId)
                .gameName(user_game.getGame().getName())
                .gameLevel(req.getGameLevel())
                .build();
    }

    @Transactional
    public void removeGameFromUser(String userId, String gameId) {
        UserGame.UserGameId id = new UserGame.UserGameId(userId, gameId);
        userGameRepository.deleteById(id);
    }
}