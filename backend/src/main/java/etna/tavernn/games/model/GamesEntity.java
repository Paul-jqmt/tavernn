package etna.tavernn.games.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import java.time.LocalDate;
import org.hibernate.annotations.GenericGenerator;


@Entity
@Table(name = "games")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GamesEntity {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;
}