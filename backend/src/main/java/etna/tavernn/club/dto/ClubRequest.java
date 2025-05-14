package etna.tavernn.club.dto;

import etna.tavernn.club.model.ClubType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClubRequest {

    @NotBlank(message = "Club name is required")
    private String name;

    private String description;

    private String logo;

    @NotNull(message = "Club type is required")
    private ClubType clubType;

    @NotNull(message = "Max members is required")
    @Positive(message = "Max members must be positive")
    private Integer maxMembers;
}