package etna.tavernn.team.model;

import etna.tavernn.user.model.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "team_members")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamMember {

    @EmbeddedId
    private TeamMemberId id;

    @ManyToOne
    @MapsId("teamId")
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "is_captain", nullable = false)
    private Boolean isCaptain = false;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TeamMemberId implements Serializable {
        @Column(name = "team_id")
        private String teamId;

        @Column(name = "user_id")
        private String userId;
    }
}