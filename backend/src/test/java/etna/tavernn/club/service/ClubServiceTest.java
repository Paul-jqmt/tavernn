package etna.tavernn.club.service;

import etna.tavernn.club.dto.ClubResponse;
import etna.tavernn.club.model.Club;
import etna.tavernn.club.model.ClubType;
import etna.tavernn.club.repository.ClubRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ClubServiceTest {

    @Mock
    private ClubRepository clubRepository;

    @InjectMocks
    private ClubService clubService;

    private Club testClub;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        testClub = new Club();
        testClub.setId("club123");
        testClub.setName("Test Club");
        testClub.setDescription("A test club");
        testClub.setCreationDate(LocalDate.now());
        testClub.setLogo("logo.png");
        testClub.setClubType(ClubType.open);
        testClub.setNrMembers(10);
        testClub.setMaxMembers(20);
    }

    @Test
    void testGetAllClubs() {
        List<Club> clubs = new ArrayList<>();
        clubs.add(testClub);
        when(clubRepository.findAll()).thenReturn(clubs);
        List<ClubResponse> result = clubService.getAllClubs();
        assertEquals(1, result.size());
        assertEquals("Test Club", result.get(0).getName());
        assertEquals("club123", result.get(0).getId());
    }

    @Test
    void testGetAllClubs_Empty() {
        when(clubRepository.findAll()).thenReturn(new ArrayList<>());
        List<ClubResponse> result = clubService.getAllClubs();
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetClubById() {
        when(clubRepository.findById("club123")).thenReturn(Optional.of(testClub));
        Optional<ClubResponse> result = clubService.getClubById("club123");
        assertTrue(result.isPresent());
        assertEquals("Test Club", result.get().getName());
        assertEquals(10, result.get().getNrMembers());
    }

    @Test
    void testGetClubById_NotFound() {
        when(clubRepository.findById("notfound")).thenReturn(Optional.empty());
        Optional<ClubResponse> result = clubService.getClubById("notfound");
        assertFalse(result.isPresent());
    }

    @Test
    void testSaveClub() {
        Club newClub = new Club();
        newClub.setName("New Club");
        newClub.setClubType(ClubType.closed);
        when(clubRepository.save(any(Club.class))).thenReturn(newClub);
        Club result = clubService.saveClub(newClub);
        assertNotNull(result);
        assertEquals("New Club", result.getName());
        verify(clubRepository).save(newClub);
    }

    @Test
    void testDeleteClubById() {
        clubService.deleteClubById("club123");
        verify(clubRepository).deleteById("club123");
    }

    @Test
    void testToClubResponseDTO() {
        Club club2 = new Club();
        club2.setId("456");
        club2.setName("Second Club");
        club2.setDescription("Another club");
        club2.setClubType(ClubType.invite_only);
        club2.setNrMembers(5);
        club2.setMaxMembers(15);
        List<Club> clubs = new ArrayList<>();
        clubs.add(testClub);
        clubs.add(club2);
        when(clubRepository.findAll()).thenReturn(clubs);
        List<ClubResponse> result = clubService.getAllClubs();
        assertEquals(2, result.size());
        assertEquals(ClubType.open, result.get(0).getClubType());
        assertEquals(ClubType.invite_only, result.get(1).getClubType());
        assertEquals(20, result.get(0).getMaxMembers());
        assertEquals(15, result.get(1).getMaxMembers());
    }
}