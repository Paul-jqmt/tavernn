package etna.tavernn.team.model;

import etna.tavernn.club.model.Club;
import etna.tavernn.game.model.Game;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "teams")
@Getter
@Setter
@NoArgsConstructor
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "club_id", nullable = false)
    private Club club;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(name = "nr_members", nullable = false)
    private Integer nrMembers = 0;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private List<TeamMember> members = new ArrayList<>();
}