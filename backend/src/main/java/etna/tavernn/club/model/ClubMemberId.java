package etna.tavernn.club.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ClubMemberId implements Serializable {

    private String clubId;
    private String userId;

    public ClubMemberId() {}

    public ClubMemberId(String clubId, String userId) {
        this.clubId = clubId;
        this.userId = userId;
    }

    // getters & setters

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ClubMemberId)) return false;
        ClubMemberId that = (ClubMemberId) o;
        return Objects.equals(clubId, that.clubId) &&
                Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clubId, userId);
    }
}
