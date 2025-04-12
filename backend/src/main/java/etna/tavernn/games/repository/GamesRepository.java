package etna.tavernn.games.repository;

import etna.tavernn.games.model.GamesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GamesRepository extends JpaRepository<GamesEntity, String> {

}
