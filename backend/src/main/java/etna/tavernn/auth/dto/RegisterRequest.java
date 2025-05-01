package etna.tavernn.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String username;
    private String role;

    // Optional ?
    private String discord;
    private String level;
    private String availableTime;
    private String experience;
    private Boolean lookingForTeam;
}