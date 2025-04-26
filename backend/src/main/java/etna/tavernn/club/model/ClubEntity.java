package etna.tavernn.club.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;


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

    @NotNull(message = "Le nom est requis")
    @Size(min = 1, max = 100, message = "Le nom doit contenir entre 1 et 100 caractères")
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Size(max = 1000, message = "La description ne doit pas dépasser 1000 caractères")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "creation_date", nullable = false)
    private LocalDate creation_date;

    @Size(max = 255, message = "Le logo ne doit pas dépasser 255 caractères")
    @Column(name = "logo", length = 255)
    private String logo;

    @NotNull(message = "Le statut de recrutement est requis")
    @Column(name = "open_recruitment", columnDefinition = "TINYINT(1) default 1")
    private Boolean open_recruitment;

    @Size(max = 50, message = "Le niveau ne doit pas dépasser 50 caractères")
    @Column(name = "level", length = 50)
    private String level;

    @NotNull(message = "Le nombre max de membres est requis")
    @Column(name = "max_members", nullable = false)
    private Integer max_members;

    @NotNull(message = "Le nombre actuel de membres est requis")
    @Column(name = "nr_members", nullable = false)
    private Integer nr_members;

    @NotNull(message = "Le type est requis")
    @Column(name = "type", nullable = false, length = 255)
    @Enumerated(EnumType.STRING)
    private ClubType type;

    @PrePersist
    public void prePersist() {
        this.creation_date = LocalDate.now();
    }
}


