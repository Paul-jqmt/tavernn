package etna.tavernn.user.service;

import etna.tavernn.auth.dto.RegisterRequest;
import etna.tavernn.user.model.User;
import etna.tavernn.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // affreuse méthode nécéssaire pour que spring ne boucle pas à l'infini
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities("ROLE_USER")
                .build();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User createUser(RegisterRequest registerRequest) {
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setUsername(registerRequest.getUsername());
        user.setRegistrationDate(LocalDate.now());
        user.setDiscord(registerRequest.getDiscord());
        user.setProfilePicture(registerRequest.getProfilePicture());

        if (registerRequest.getOpenAtInvite() != null) {
            user.setOpenAtInvite(registerRequest.getOpenAtInvite());
        } else {
            user.setOpenAtInvite(true);
        }

        return userRepository.save(user);
    }

    // @Todo improve to less ifs
    public Optional<User> updateUser(String id, User userDetails, String authenticatedEmail) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    if (!existingUser.getEmail().equals(authenticatedEmail)) {
                        throw new AccessDeniedException("You can only update your own profile");
                    }

                    if (userDetails.getUsername() != null) {
                        existingUser.setUsername(userDetails.getUsername());
                    }
                    if (userDetails.getDiscord() != null) {
                        existingUser.setDiscord(userDetails.getDiscord());
                    }
                    if (userDetails.getProfilePicture() != null) {
                        existingUser.setProfilePicture(userDetails.getProfilePicture());
                    }
                    if (userDetails.getOpenAtInvite() != null) {
                        existingUser.setOpenAtInvite(userDetails.getOpenAtInvite());
                    }
                    return userRepository.save(existingUser);
                });
    }


    public boolean deleteUser(String id, String authenticatedEmail) {
        return userRepository.findById(id)
                .map(userToDelete -> {
                    if (!userToDelete.getEmail().equals(authenticatedEmail)) {
                        throw new AccessDeniedException("You can only delete your own account");
                    }

                    userRepository.delete(userToDelete);
                    return true;
                })
                .orElse(false);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}