package etna.tavernn.club.dto;


import etna.tavernn.club.model.ClubType;
import lombok.Data;

@Data
public class CreateAndJoinRequest {
    private String name;

    private String description;

    private ClubType clubType;     // camelCase

    private Integer maxMembers;  // camelCase
}
