package etna.tavernn.club.dto;

import etna.tavernn.club.model.ClubType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClubResponse {
    private String id;
    private String name;
    private String description;
    private LocalDate creationDate;
    private String logo;
    private ClubType clubType;
    private Integer nrMembers;
    private Integer maxMembers;
}