package etna.tavernn.club.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClubMemberResponse {
    private String userId;
    private String username;
    private String email;
    private Boolean isOwner;
    private Boolean isAdmin;
}