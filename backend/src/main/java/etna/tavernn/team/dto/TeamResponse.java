package etna.tavernn.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamResponse {
    private String id;
    private String name;
    private String description;
    private String clubId;
    private String clubName;
    private String gameId;
    private String gameName;
    private Integer nrMembers;
    private TeamMemberResponse captain;
}