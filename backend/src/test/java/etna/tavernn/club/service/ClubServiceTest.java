package etna.tavernn.club.service;

import etna.tavernn.club.dto.ClubMapper;
import etna.tavernn.club.dto.ClubMemberResponse;
import etna.tavernn.club.dto.ClubRequest;
import etna.tavernn.club.dto.ClubResponse;
import etna.tavernn.club.model.Club;
import etna.tavernn.club.model.ClubMember;
import etna.tavernn.club.model.ClubType;
import etna.tavernn.club.repository.ClubMemberRepository;
import etna.tavernn.club.repository.ClubRepository;
import etna.tavernn.user.model.User;
import etna.tavernn.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClubServiceTest {

    @Mock
    private ClubRepository clubRepository;

    @Mock
    private ClubMemberRepository clubMemberRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ClubMapper clubMapper;

    @InjectMocks
    private ClubService clubService;

    private Club testClub;
    private User testUser;
    private ClubRequest clubRequest;
    private ClubMember testMember;
    private ClubMemberResponse memberResponse;

    @BeforeEach
    void setUp() {
        // Set up test data
        testClub = new Club();
        testClub.setId("test-club-id");
        testClub.setName("Test Club");
        testClub.setDescription("Test Description");
        testClub.setCreationDate(LocalDate.now());
        testClub.setLogo("test-logo.png");
        testClub.setClubType(ClubType.open);
        testClub.setNrMembers(1);
        testClub.setMaxMembers(50);

        testUser = new User();
        testUser.setId("test-user-id");
        testUser.setEmail("test@example.com");
        testUser.setUsername("testuser");
        testUser.setPassword("password");

        clubRequest = new ClubRequest();
        clubRequest.setName("New Club");
        clubRequest.setDescription("New Club Description");
        clubRequest.setLogo("new-logo.png");
        clubRequest.setClubType(ClubType.open);
        clubRequest.setMaxMembers(100);

        testMember = new ClubMember();
        ClubMember.ClubMemberId memberId = new ClubMember.ClubMemberId();
        memberId.setClubId(testClub.getId());
        memberId.setUserId(testUser.getId());
        testMember.setId(memberId);
        testMember.setClub(testClub);
        testMember.setUser(testUser);
        testMember.setIsOwner(false);
        testMember.setIsAdmin(false);

        memberResponse = new ClubMemberResponse();
        memberResponse.setUserId(testUser.getId());
        memberResponse.setUsername(testUser.getUsername());
        memberResponse.setEmail(testUser.getEmail());
        memberResponse.setIsOwner(false);
        memberResponse.setIsAdmin(false);
    }

    @Test
    void testGetAllClubs() {
        List<Club> clubs = new ArrayList<>();
        clubs.add(testClub);

        when(clubRepository.findAll()).thenReturn(clubs);

        List<ClubResponse> result = clubService.getAllClubs();
        assertEquals(1, result.size());
        assertEquals("Test Club", result.get(0).getName());

        verify(clubRepository, times(1)).findAll();
    }

    @Test
    void testGetClubById_Success() {
        when(clubRepository.findById("test-club-id")).thenReturn(Optional.of(testClub));
        Optional<ClubResponse> result = clubService.getClubById("test-club-id");
        assertTrue(result.isPresent());
        assertEquals("Test Club", result.get().getName());
        verify(clubRepository, times(1)).findById("test-club-id");
    }

    @Test
    void testGetClubById_NotFound() {
        when(clubRepository.findById("non-existent-id")).thenReturn(Optional.empty());
        Optional<ClubResponse> result = clubService.getClubById("non-existent-id");
        assertFalse(result.isPresent());
        verify(clubRepository, times(1)).findById("non-existent-id");
    }

    @Test
    void testCreateClub_Success() {

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(clubRepository.save(any(Club.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(clubMemberRepository.save(any(ClubMember.class))).thenReturn(new ClubMember());

        ClubResponse result = clubService.createClub(clubRequest, "test@example.com");

        assertNotNull(result);
        assertEquals("New Club", result.getName());
        assertEquals(1, result.getNrMembers());
        assertEquals(100, result.getMaxMembers());

        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(clubRepository, times(1)).save(any(Club.class));
        verify(clubMemberRepository, times(1)).save(any(ClubMember.class));
    }

    @Test
    void testCreateClub_UserNotFound() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            clubService.createClub(clubRequest, "nonexistent@example.com");
        });

        verify(clubRepository, never()).save(any());
        verify(clubMemberRepository, never()).save(any());
    }

    @Test
    void testDeleteClubById() {
        clubService.deleteClubById("club-to-delete");

        verify(clubRepository, times(1)).deleteById("club-to-delete");
    }

    @Test
    void testCreateClub_CheckMemberDetails() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(clubRepository.save(any(Club.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ClubMember savedMember = new ClubMember();
        when(clubMemberRepository.save(any(ClubMember.class))).thenAnswer(invocation -> {
            ClubMember member = invocation.getArgument(0);

            assertTrue(member.getIsOwner());
            assertTrue(member.getIsAdmin());
            return member;
        });

        clubService.createClub(clubRequest, "test@example.com");

        verify(clubMemberRepository, times(1)).save(any(ClubMember.class));
    }

    @Test
    void testJoinClub_Success() {
        // Mock repository calls
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(clubRepository.findById("test-club-id")).thenReturn(Optional.of(testClub));
        when(clubMemberRepository.findById(any())).thenReturn(Optional.empty());
        when(clubMemberRepository.save(any(ClubMember.class))).thenReturn(testMember);
        when(clubMapper.toClubMemberResponse(any(ClubMember.class))).thenReturn(memberResponse);

        ClubMemberResponse result = clubService.joinClub("test-club-id", "test@example.com");

        assertNotNull(result);
        assertEquals("test-user-id", result.getUserId());
        assertEquals("testuser", result.getUsername());
        assertFalse(result.getIsOwner());
        assertFalse(result.getIsAdmin());

        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(clubRepository, times(1)).findById("test-club-id");
        verify(clubMemberRepository, times(1)).save(any(ClubMember.class));
        verify(clubRepository, times(1)).save(any(Club.class));
    }

    @Test
    void testJoinClub_UserNotFound() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());
        assertThrows(UsernameNotFoundException.class, () -> {
            clubService.joinClub("test-club-id", "nonexistent@example.com");
        });
        verify(clubRepository, never()).findById(any());
        verify(clubMemberRepository, never()).save(any());
    }

    @Test
    void testJoinClub_ClubNotFound() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(clubRepository.findById("nonexistent-club")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            clubService.joinClub("nonexistent-club", "test@example.com");
        });

        assertEquals("Club not found", exception.getMessage());
        verify(clubMemberRepository, never()).save(any());
    }

    @Test
    void testJoinClub_UserAlreadyMember() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(clubRepository.findById("test-club-id")).thenReturn(Optional.of(testClub));
        when(clubMemberRepository.findById(any())).thenReturn(Optional.of(testMember));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            clubService.joinClub("test-club-id", "test@example.com");
        });

        assertEquals("User is already a member of this club", exception.getMessage());
        verify(clubMemberRepository, never()).save(any());
    }

    @Test
    void testJoinClub_ClubFull() {
        testClub.setMaxMembers(1);
        testClub.setNrMembers(1);

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(clubRepository.findById("test-club-id")).thenReturn(Optional.of(testClub));
        when(clubMemberRepository.findById(any())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            clubService.joinClub("test-club-id", "test@example.com");
        });

        assertEquals("Club is full", exception.getMessage());
        verify(clubMemberRepository, never()).save(any());
    }

    @Test
    void testJoinClub_RequiresApproval() {
        testClub.setClubType(ClubType.closed);

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(clubRepository.findById("test-club-id")).thenReturn(Optional.of(testClub));
        when(clubMemberRepository.findById(any())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            clubService.joinClub("test-club-id", "test@example.com");
        });
        assertEquals("This club requires approval to join", exception.getMessage());
        verify(clubMemberRepository, never()).save(any());
    }

    @Test
    void testLeaveClub_Success() {
        // Mock repository
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(clubMemberRepository.findById(any())).thenReturn(Optional.of(testMember));
        when(clubRepository.findById("test-club-id")).thenReturn(Optional.of(testClub));
        assertDoesNotThrow(() -> {
            clubService.leaveClub("test-club-id", "test@example.com");
        });
        verify(clubMemberRepository, times(1)).delete(testMember);
        verify(clubRepository, times(1)).save(any(Club.class));

        verify(clubRepository).save(argThat(club ->
                club.getNrMembers() == 0
        ));
    }

    @Test
    void testLeaveClub_UserNotFound() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            clubService.leaveClub("test-club-id", "nonexistent@example.com");
        });

        verify(clubMemberRepository, never()).delete(any());
    }

    @Test
    void testLeaveClub_UserNotMember() {
        // Mock repository
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(clubMemberRepository.findById(any())).thenReturn(Optional.empty());
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            clubService.leaveClub("test-club-id", "test@example.com");
        });

        assertEquals("User is not a member of this club", exception.getMessage());
        verify(clubMemberRepository, never()).delete(any());
    }

    @Test
    void testLeaveClub_OwnerCannotLeave() {
        testMember.setIsOwner(true);

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(clubMemberRepository.findById(any())).thenReturn(Optional.of(testMember));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            clubService.leaveClub("test-club-id", "test@example.com");
        });

        assertEquals("Club owner cannot leave the club", exception.getMessage());
        verify(clubMemberRepository, never()).delete(any());
    }

    @Test
    void testJoinClub_UpdatesMemberCount() {
        // Mock repository calls
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(clubRepository.findById("test-club-id")).thenReturn(Optional.of(testClub));
        when(clubMemberRepository.findById(any())).thenReturn(Optional.empty());
        when(clubMemberRepository.save(any(ClubMember.class))).thenReturn(testMember);
        when(clubMapper.toClubMemberResponse(any(ClubMember.class))).thenReturn(memberResponse);

        clubService.joinClub("test-club-id", "test@example.com");

        verify(clubRepository).save(argThat(club ->
                club.getNrMembers() == 2  // Was 1, now 2
        ));
    }
}
