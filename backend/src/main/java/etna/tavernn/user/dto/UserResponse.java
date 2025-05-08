package etna.tavernn.user.dto;


import lombok.Data;
import lombok.Builder;
import java.time.LocalDate;

@Data
@Builder
public class UserResponse {
    private String id;
    private String email;
    private String username;
    private LocalDate registrationDate;
    private String discord;
    private String profilePicture;
    private Boolean openAtInvite;
}