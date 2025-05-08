package etna.tavernn.team.model;

import etna.tavernn.club.model.Club;
import etna.tavernn.games.model.GamesEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "teams")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamEntity {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    @NotNull(message = "Le club est requis")
    @ManyToOne
    @JoinColumn(name = "club_id", nullable = false)
    private Club club_id;

    @NotNull(message = "Le nom est requis")
    @Size(min = 1, max = 100, message = "Le nom doit faire entre 1 et 100 caractères")
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @NotNull(message = "Le jeu est requis")
    @ManyToOne
    @JoinColumn(name = "team_game", nullable = false)
    private GamesEntity team_game;

    @NotNull(message = "Le nombre de membres est requis")
    @Column(name = "nr_members", nullable = false)
    private Integer nr_members;

    @NotNull(message = "Le nombre max de membres est requis")
    @Column(name = "max_members", nullable = false)
    private Integer max_members;
}