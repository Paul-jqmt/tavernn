package etna.tavernn.games.repository;

import etna.tavernn.games.model.GamesEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GamesRepository extends JpaRepository<GamesEntity, String> {

}
