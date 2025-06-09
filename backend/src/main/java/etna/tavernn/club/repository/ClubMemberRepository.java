package etna.tavernn.club.repository;

import etna.tavernn.club.model.ClubMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClubMemberRepository extends JpaRepository<ClubMember, ClubMember.ClubMemberId> {
    List<ClubMember> findByIdUserId(String userId);
    List<ClubMember> findByIdClubId(String clubId);
}