package etna.tavernn.games.controller;

import etna.tavernn.games.model.GamesEntity;
import etna.tavernn.games.service.GamesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GamesController {

   private final GamesService gamesService;

   @Autowired
   public GamesController(GamesService gamesService) {
       this.gamesService = gamesService;
   }

   @GetMapping
   public ResponseEntity<List<GamesEntity>> getAllGames() {
       return ResponseEntity.ok(gamesService.getAllGames());
   }

    @GetMapping("/{id}")
    public ResponseEntity<GamesEntity> getGamesById(@PathVariable String id) {
       return gamesService.getGamesById(id)
               .map(ResponseEntity::ok)
               .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<GamesEntity> createGame(@Valid @RequestBody GamesEntity game) {
       return ResponseEntity.ok(gamesService.saveGames(game));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GamesEntity> updateGame(@PathVariable String id, @Valid @RequestBody GamesEntity game) {
       return gamesService.getGamesById(id).map(existingGame -> {
           game.setId(id);
           return ResponseEntity.ok(gamesService.saveGames(game));
       }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GamesEntity> deleteGame(@PathVariable String id) {
       if(gamesService.getGamesById(id).isPresent()) {
           gamesService.deleteGamesById(id);
           return ResponseEntity.noContent().build();
       } else {
           return ResponseEntity.notFound().build();
       }
    }
}