package etna.tavernn.club.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "clubs")
@Data
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "creation_date")
    private LocalDate creationDate = LocalDate.now();

    @Column(name = "logo")
    private String logo;

    @Column(name = "club_type")
    @Enumerated(EnumType.STRING)
    private ClubType clubType = ClubType.open;

    @Column(name = "nr_members")
    private Integer nrMembers = 0;

    @Column(name = "max_members")
    private Integer maxMembers;

}


