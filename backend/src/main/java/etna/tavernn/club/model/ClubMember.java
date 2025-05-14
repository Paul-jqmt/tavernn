package etna.tavernn.club.model;

import etna.tavernn.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "club_members")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClubMember {

    @EmbeddedId
    private ClubMemberId id;

    @ManyToOne
    @MapsId("clubId")
    @JoinColumn(name = "club_id")
    private Club club;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "is_owner", nullable = false)
    private Boolean isOwner = false;

    @Column(name = "is_admin", nullable = false)
    private Boolean isAdmin = false;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ClubMemberId implements Serializable {
        @Column(name = "club_id")
        private String clubId;

        @Column(name = "user_id")
        private String userId;
    }
}