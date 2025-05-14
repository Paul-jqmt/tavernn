package etna.tavernn.club.dto;

import etna.tavernn.club.model.Club;
import etna.tavernn.club.model.ClubMember;
import org.springframework.stereotype.Component;

@Component
public class ClubMapper {

    public ClubResponse toClubResponse(Club club) {
        ClubResponse response = new ClubResponse();
        response.setId(club.getId());
        response.setName(club.getName());
        response.setDescription(club.getDescription());
        response.setCreationDate(club.getCreationDate());
        response.setLogo(club.getLogo());
        response.setClubType(club.getClubType());
        response.setNrMembers(club.getNrMembers());
        response.setMaxMembers(club.getMaxMembers());

        return response;
    }

    public ClubMemberResponse toClubMemberResponse(ClubMember member) {
        ClubMemberResponse response = new ClubMemberResponse();
        response.setUserId(member.getUser().getId());
        response.setUsername(member.getUser().getUsername());
        response.setEmail(member.getUser().getEmail());
        response.setIsOwner(member.getIsOwner());
        response.setIsAdmin(member.getIsAdmin());

        return response;
    }
}