package etna.tavernn.team.model;

import etna.tavernn.club.model.ClubEntity;
import etna.tavernn.games.model.GamesEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
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

    @ManyToOne
    @JoinColumn(name = "club_id", nullable = false)
    private ClubEntity club_id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @ManyToOne
    @JoinColumn(name = "team_game", nullable = false)
    private GamesEntity team_game;

    @Column(name = "nr_members", nullable = false)
    private Integer nr_members;

    @Column(name = "max_members", nullable = false)
    private Integer max_members;
}