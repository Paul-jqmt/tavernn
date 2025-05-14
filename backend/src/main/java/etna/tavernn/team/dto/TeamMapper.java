package etna.tavernn.team.dto;

import etna.tavernn.team.model.Team;
import etna.tavernn.team.model.TeamMember;
import org.springframework.stereotype.Component;

@Component
public class TeamMapper {

    public TeamResponse toTeamResponse(Team team) {
        TeamResponse response = new TeamResponse();
        response.setId(team.getId());
        response.setName(team.getName());
        response.setDescription(team.getDescription());
        response.setClubId(team.getClub().getId());
        response.setClubName(team.getClub().getName());
        response.setGameId(team.getGame().getId());
        response.setGameName(team.getGame().getName());
        response.setNrMembers(team.getNrMembers());

        return response;
    }

    public TeamMemberResponse toTeamMemberResponse(TeamMember member) {
        TeamMemberResponse response = new TeamMemberResponse();
        response.setUserId(member.getUser().getId());
        response.setUsername(member.getUser().getUsername());
        response.setEmail(member.getUser().getEmail());
        response.setIsCaptain(member.getIsCaptain());

        return response;
    }
}