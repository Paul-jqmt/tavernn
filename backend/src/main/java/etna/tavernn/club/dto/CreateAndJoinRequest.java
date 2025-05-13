package etna.tavernn.club.dto;


import etna.tavernn.club.model.ClubType;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateAndJoinRequest {
    private String name;

    private String description;

    private ClubType clubType;     // camelCase

    private Integer maxMembers;  // camelCase
}
