package etna.tavernn.user.model;

import etna.tavernn.game.model.Game;
import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@Entity
@Table(name = "user_games")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserGame {

    @EmbeddedId
    private UserGameId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("gameId")
    @JoinColumn(name = "game_id")
    private Game game;

    @Enumerated(EnumType.STRING)
    @Column(name = "game_level")
    private GameLevel gameLevel;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserGameId implements Serializable {
        @Column(name = "user_id")
        private String userId;

        @Column(name = "game_id")
        private String gameId;
    }
}
