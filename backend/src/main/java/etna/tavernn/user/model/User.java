package etna.tavernn.user.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    private String id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String username;

    @Column(name = "registration_date")
    private LocalDateTime registrationDate;

    private String role;

    private String discord;

    private String level;

    @Column(name = "available_time")
    private String availableTime;

    private String experience;

    @Column(name = "looking_for_team")
    private Boolean lookingForTeam;


    public static User createNew() {
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setRegistrationDate(LocalDateTime.now());
        user.setLookingForTeam(false);
        return user;
    }
}