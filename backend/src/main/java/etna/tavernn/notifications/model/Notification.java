package etna.tavernn.notifications.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    private String id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private boolean seen;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;
}