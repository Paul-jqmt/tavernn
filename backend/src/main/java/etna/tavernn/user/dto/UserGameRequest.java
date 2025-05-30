package etna.tavernn.user.dto;

import etna.tavernn.user.model.GameLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserGameRequest {
    @NotBlank
    private String gameId;

    @NotNull
    private GameLevel gameLevel;
}