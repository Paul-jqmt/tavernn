package etna.tavernn.game.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "games")
@Getter
@Setter
@NoArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true, length = 36)
    private String name;

    @Column
    private String image;

    @Column(name = "team_max_nr", nullable = false)
    private Integer teamMaxNr;
}