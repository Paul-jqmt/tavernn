package etna.tavernn.auth.controller;

import etna.tavernn.auth.dto.AuthResponse;
import etna.tavernn.auth.dto.ErrorResponse;
import etna.tavernn.auth.dto.LoginRequest;
import etna.tavernn.auth.dto.RegisterRequest;
import etna.tavernn.auth.service.JwtService;
import etna.tavernn.user.model.User;
import etna.tavernn.user.repository.UserRepository;
import etna.tavernn.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

            if (userOptional.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse("Invalid credentials"));
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userOptional.get();

            AuthResponse response = createTokenResponse(userDetails, user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest registerRequest) {
        if (userService.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Email already in use"));
        }
        if (userService.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Username already in use"));
        }

        String role = registerRequest.getRole();
        if (role == null) {
            role = "USER"; //@todo update later on project with the right roles if needed
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(registerRequest.getPassword());
        user.setUsername(registerRequest.getUsername());
        user.setRole(role);
        user.setRegistrationDate(LocalDateTime.now());
        user.setDiscord(registerRequest.getDiscord());
        user.setLevel(registerRequest.getLevel());
        user.setAvailableTime(registerRequest.getAvailableTime());
        user.setExperience(registerRequest.getExperience());
        user.setLookingForTeam(registerRequest.getLookingForTeam());
        User createdUser = userService.createUser(user);

        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(createdUser.getEmail())
                .password(createdUser.getPassword())
                .authorities("ROLE_" + (createdUser.getRole() != null ? createdUser.getRole() : "USER"))
                .build();

        AuthResponse response = createTokenResponse(userDetails, createdUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    private AuthResponse createTokenResponse(UserDetails userDetails, User user) {
        String jwt = jwtService.generateToken(userDetails);

        AuthResponse response = new AuthResponse();
        response.setToken(jwt);
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());

        return response;
    }
}