package etna.tavernn.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamMemberResponse {
    private String userId;
    private String username;
    private String email;
    private Boolean isCaptain;
}