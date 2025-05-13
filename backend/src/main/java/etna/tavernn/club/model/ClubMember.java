package etna.tavernn.club.model;

import etna.tavernn.user.model.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "club_members")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ClubMember {

    @EmbeddedId
    @EqualsAndHashCode.Include
    private ClubMemberId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("clubId")
    @JoinColumn(name = "club_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Club club;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "is_owner", nullable = false)
    private boolean owner;

    @Column(name = "is_admin", nullable = false)
    private boolean admin;

    public ClubMember(Club club, User user, boolean owner, boolean admin) {
        this.club = club;
        this.user = user;
        this.id   = new ClubMemberId(club.getId(), user.getId());
        this.owner = owner;
        this.admin = admin;
    }
}
