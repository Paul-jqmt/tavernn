package etna.tavernn.team.dto;

import lombok.Data;

@Data
public class TeamMemberResponse {
    private String userId;
    private String username;
    private String email;
    private Boolean isCaptain;
}