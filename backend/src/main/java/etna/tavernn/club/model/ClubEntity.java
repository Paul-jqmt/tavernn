package etna.tavernn.club.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import java.time.LocalDate;
import org.hibernate.annotations.GenericGenerator;


@Entity
@Table(name = "clubs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClubEntity {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "creation_date", nullable = false)
    private LocalDate creation_date;

    @Column(name = "logo", length = 255)
    private String logo;

    @Column(name = "open_recruitment", columnDefinition = "TINYINT(1) default 1")
    private Boolean open_recruitment;

    @Column(name = "level", length = 50)
    private String level;

    @Column(name = "max_members", nullable = false)
    private Integer max_members;

    @Column(name = "nr_members", nullable = false)
    private Integer nr_members;

    @Column(name = "type", nullable = false, length = 255)
    @Enumerated(EnumType.STRING)
    private ClubType type;

    // permet l'ajout automatique de la date
    @PrePersist
    public void prePersist() {
        this.creation_date = LocalDate.now();
    }
}

