package etna.tavernn.game.repository;

import etna.tavernn.game.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GameRepository extends JpaRepository<Game, String> {
}
