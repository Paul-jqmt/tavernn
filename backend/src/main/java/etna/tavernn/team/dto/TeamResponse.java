package etna.tavernn.team.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeamResponse {
    private String id;
    private String name;
    private String description;
    private String clubId;
    private String clubName;
    private String gameId;
    private String gameName;
    private Integer nrMembers;
}