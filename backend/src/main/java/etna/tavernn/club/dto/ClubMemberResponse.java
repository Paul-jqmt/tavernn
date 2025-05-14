package etna.tavernn.club.dto;

import lombok.Data;

@Data
public class ClubMemberResponse {
    private String userId;
    private String username;
    private String email;
    private Boolean isOwner;
    private Boolean isAdmin;
}