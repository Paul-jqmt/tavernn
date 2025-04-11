package etna.tavernn.club.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "clubs")
public class ClubEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column
    private String logo;

    @Column(name = "creation_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date creationDate;

    @Column(nullable = false)
    private String type;

    @Column(name = "nr_members", nullable = false)
    private int nrMembers;

    @Column(name = "max_members", nullable = false)
    private int maxMembers;

    // Constructeur vide requis par JPA
    public ClubEntity() {
    }

    // Getters et setters basiques
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}