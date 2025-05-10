package etna.tavernn.game.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameResponse {
    private String id;
    private String name;
    private String image;
    private Integer teamMaxNr;
}