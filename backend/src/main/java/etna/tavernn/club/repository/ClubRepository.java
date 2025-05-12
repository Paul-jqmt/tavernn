package etna.tavernn.club.repository;

import etna.tavernn.club.model.Club;
import etna.tavernn.club.model.ClubMember;
import etna.tavernn.club.model.ClubMemberId;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClubRepository extends JpaRepository<Club, ClubMember, ClubMemberId, String> {

}
