package etna.tavernn.user.repository;

import etna.tavernn.user.model.UserGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserGameRepository extends JpaRepository<UserGame, UserGame.UserGameId> {

    List<UserGame> findByIdUserId(String userId);
}
