package etna.tavernn.team.repository;

import etna.tavernn.team.model.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, TeamMember.TeamMemberId> {
    List<TeamMember> findAllByTeamId(String teamId);

    Optional<TeamMember> findById(TeamMember.TeamMemberId id);
    List<TeamMember> findByIdUserId(String userId);
}