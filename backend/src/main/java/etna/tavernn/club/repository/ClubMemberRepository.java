package etna.tavernn.club.repository;

import etna.tavernn.club.model.ClubMember;
import etna.tavernn.club.model.ClubMemberId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubMemberRepository extends JpaRepository<ClubMember, ClubMemberId> {

}
