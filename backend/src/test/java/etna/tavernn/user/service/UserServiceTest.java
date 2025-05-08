package etna.tavernn.user.service;

import etna.tavernn.auth.dto.RegisterRequest;
import etna.tavernn.user.dto.UserResponse;
import etna.tavernn.user.model.User;
import etna.tavernn.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        testUser = new User();
        testUser.setId("123");
        testUser.setEmail("test@test.com");
        testUser.setPassword("password123");
        testUser.setUsername("testuser");
        testUser.setRegistrationDate(LocalDate.now());
        testUser.setOpenAtInvite(true);
    }

    @Test
    void testLoadUserByUsername() {
        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.of(testUser));

        UserDetails result = userService.loadUserByUsername("test@test.com");

        assertNotNull(result);
        assertEquals("test@test.com", result.getUsername());
        assertEquals("password123", result.getPassword());
    }

    @Test
    void testLoadUserByUsername_NotFound() {
        when(userRepository.findByEmail("idontexist@test.com")).thenReturn(Optional.empty());
        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername("idontexist@test.com"));
    }

    @Test
    void testGetAllUsersDTO() {
        List<User> users = new ArrayList<>();
        users.add(testUser);
        when(userRepository.findAll()).thenReturn(users);
        List<UserResponse> result = userService.getAllUsersDTO();
        assertEquals(1, result.size());
        assertEquals("test@test.com", result.get(0).getEmail());
    }

    @Test
    void testGetUserByIdDTO() {
        when(userRepository.findById("123")).thenReturn(Optional.of(testUser));
        Optional<UserResponse> result = userService.getUserByIdDTO("123");
        assertTrue(result.isPresent());
        assertEquals("test@test.com", result.get().getEmail());
    }

    @Test
    void testCreateUser() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("new@test.com");
        request.setPassword("newpassword");
        request.setUsername("newuser");

        when(passwordEncoder.encode("newpassword")).thenReturn("encoded");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        User result = userService.createUser(request);
        assertNotNull(result);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testUpdateUser_Success() {
        User updateDetails = new User();
        updateDetails.setUsername("newname");

        when(userRepository.findById("123")).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        Optional<User> result = userService.updateUser("123", updateDetails, "test@test.com");
        assertTrue(result.isPresent());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testUpdateUser_AccessDenied() {
        User updateDetails = new User();
        updateDetails.setUsername("newname");
        when(userRepository.findById("123")).thenReturn(Optional.of(testUser));
        assertThrows(AccessDeniedException.class, () -> userService.updateUser("123", updateDetails, "other@test.com"));
    }

    @Test
    void testDeleteUser_Success() {
        when(userRepository.findById("123")).thenReturn(Optional.of(testUser));
        boolean result = userService.deleteUser("123", "test@test.com");
        assertTrue(result);
        verify(userRepository).delete(testUser);
    }

    @Test
    void testDeleteUser_AccessDenied() {
        when(userRepository.findById("123")).thenReturn(Optional.of(testUser));
        assertThrows(AccessDeniedException.class, () -> userService.deleteUser("123", "other@test.com"));
    }

    @Test
    void testExistsByEmail() {
        when(userRepository.existsByEmail("test@test.com")).thenReturn(true);
        boolean result = userService.existsByEmail("test@test.com");
        assertTrue(result);
    }

    @Test
    void testExistsByUsername() {
        when(userRepository.existsByUsername("testuser")).thenReturn(true);
        boolean result = userService.existsByUsername("testuser");
        assertTrue(result);
    }
}