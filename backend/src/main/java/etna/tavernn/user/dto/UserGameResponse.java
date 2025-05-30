package etna.tavernn.user.dto;

import etna.tavernn.user.model.GameLevel;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserGameResponse {
    private String gameId;
    private String gameName;
    private GameLevel gameLevel;
}
