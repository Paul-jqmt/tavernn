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

    private final UserGameRepository userGameRepo;
    private final UserRepository userRepo;
    private final GameRepository gameRepo;

    public List<UserGameResponse> getGamesByUserId(String userId) {
        return userGameRepo.findByIdUserId(userId).stream()
                .map(ug -> UserGameResponse.builder()
                        .gameId(ug.getGame().getId())
                        .gameName(ug.getGame().getName())
                        .gameLevel(ug.getGameLevel())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public UserGameResponse addGameToUser(String userId, UserGameRequest req) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Game game = gameRepo.findById(req.getGameId())
                .orElseThrow(() -> new RuntimeException("Game not found"));

        UserGame.UserGameId id = new UserGame.UserGameId(userId, req.getGameId());
        UserGame entity = UserGame.builder()
                .id(id)
                .user(user)
                .game(game)
                .gameLevel(req.getGameLevel())
                .build();

        userGameRepo.save(entity);
        return UserGameResponse.builder()
                .gameId(game.getId())
                .gameName(game.getName())
                .gameLevel(req.getGameLevel())
                .build();
    }

    @Transactional
    public UserGameResponse updateGameLevel(String userId, String gameId, UserGameRequest req) {
        UserGame.UserGameId id = new UserGame.UserGameId(userId, gameId);
        UserGame ug = userGameRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("UserGame not found"));

        ug.setGameLevel(req.getGameLevel());
        userGameRepo.save(ug);

        return UserGameResponse.builder()
                .gameId(gameId)
                .gameName(ug.getGame().getName())
                .gameLevel(req.getGameLevel())
                .build();
    }

    @Transactional
    public void removeGameFromUser(String userId, String gameId) {
        UserGame.UserGameId id = new UserGame.UserGameId(userId, gameId);
        userGameRepo.deleteById(id);
    }
}