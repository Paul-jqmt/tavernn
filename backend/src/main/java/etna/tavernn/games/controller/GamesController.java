package etna.tavernn.games.controller;

import etna.tavernn.games.model.GamesEntity;
import etna.tavernn.games.service.GamesService;
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
       return ResponseEntity.status(200).body(gamesService.getAllGames());
   }

    @GetMapping("/{id}")
    public ResponseEntity<GamesEntity> getGamesById(@PathVariable String id) {
       return gamesService.getGamesById(id)
               .map(game -> ResponseEntity.status(200).body(game))
               .orElse(ResponseEntity.status(404).build());
    }

    @PostMapping
    public ResponseEntity<GamesEntity> createGame(@RequestBody GamesEntity game) {
       return ResponseEntity.status(201).body(gamesService.saveGames(game));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GamesEntity> updateGame(@PathVariable String id, @RequestBody GamesEntity game) {
       return gamesService.getGamesById(id).map(existingGame -> {
           game.setId(id);
           return ResponseEntity.status(200).body(gamesService.saveGames(game));
       }).orElseGet(() -> ResponseEntity.status(404).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GamesEntity> deleteGame(@PathVariable String id) {
       if(gamesService.getGamesById(id).isPresent()) {
           gamesService.deleteGamesById(id);
           return ResponseEntity.status(204).build();
       } else {
           return ResponseEntity.status(404).build();
       }
    }
}