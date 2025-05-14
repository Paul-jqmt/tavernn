package etna.tavernn.team.dto;

import lombok.Data;

@Data
public class TeamRequest {
    private String name;
    private String description;
    private String clubId;
    private String gameId;
}