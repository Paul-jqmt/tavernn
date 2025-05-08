package etna.tavernn.user.service;

import etna.tavernn.auth.dto.RegisterRequest;
import etna.tavernn.user.model.User;
import etna.tavernn.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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
        user.setRole("USER");
        user.setRegistrationDate(LocalDateTime.now());

        //optionel ?
        user.setDiscord(registerRequest.getDiscord());
        user.setLevel(registerRequest.getLevel());
        user.setAvailableTime(registerRequest.getAvailableTime());
        user.setExperience(registerRequest.getExperience());
        user.setLookingForTeam(registerRequest.getLookingForTeam());

        return userRepository.save(user);
    }

    // @Todo improve to less ifs
    public Optional<User> updateUser(String id, User userDetails) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    if (userDetails.getEmail() != null) {
                        existingUser.setEmail(userDetails.getEmail());
                    }
                    if (userDetails.getUsername() != null) {
                        existingUser.setUsername(userDetails.getUsername());
                    }
                    if (userDetails.getPassword() != null) {
                        existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
                    }
                    if (userDetails.getRole() != null) {
                        existingUser.setRole(userDetails.getRole());
                    }
                    if (userDetails.getDiscord() != null) {
                        existingUser.setDiscord(userDetails.getDiscord());
                    }
                    if (userDetails.getLevel() != null) {
                        existingUser.setLevel(userDetails.getLevel());
                    }
                    if (userDetails.getAvailableTime() != null) {
                        existingUser.setAvailableTime(userDetails.getAvailableTime());
                    }
                    if (userDetails.getExperience() != null) {
                        existingUser.setExperience(userDetails.getExperience());
                    }
                    if (userDetails.getLookingForTeam() != null) {
                        existingUser.setLookingForTeam(userDetails.getLookingForTeam());
                    }

                    return userRepository.save(existingUser);
                });
    }

    public boolean deleteUser(String id) {
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
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