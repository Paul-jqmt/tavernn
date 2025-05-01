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
import org.springframework.web.bind.annotation.*;

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

        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            ErrorResponse error = new ErrorResponse("Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        try {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );

            Authentication authentication = authenticationManager.authenticate(authToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userOptional.get();
            AuthResponse response = jwtService.createTokenResponse(userDetails, user);

            return ResponseEntity.ok(response);
        } catch (Exception e) {

            ErrorResponse error = new ErrorResponse("Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest registerRequest) {

        if (userService.existsByEmail(registerRequest.getEmail())) {
            ErrorResponse error = new ErrorResponse("Email already in use");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
        }

        if (userService.existsByUsername(registerRequest.getUsername())) {
            ErrorResponse error = new ErrorResponse("Username already in use");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
        }

        String role = registerRequest.getRole();
        if (role == null) {
            role = "USER";
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
        UserDetails userDetails = jwtService.createUserDetails(createdUser);
        AuthResponse response = jwtService.createTokenResponse(userDetails, createdUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @PostMapping("/refresh")
    public ResponseEntity<Object> refreshToken(@RequestHeader("Authorization") String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            ErrorResponse error = new ErrorResponse("Invalid token format");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        try {
            String token = authHeader.substring(7);

            String userEmail = jwtService.extractUsername(token);
            if (userEmail == null) {
                ErrorResponse error = new ErrorResponse("Invalid token");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            Optional<User> userOptional = userRepository.findByEmail(userEmail);
            if (userOptional.isEmpty()) {
                ErrorResponse error = new ErrorResponse("User not found");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            User user = userOptional.get();
            UserDetails userDetails = jwtService.createUserDetails(user);

            if (!jwtService.isTokenValid(token, userDetails)) {
                ErrorResponse error = new ErrorResponse("Token expired or invalid");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            AuthResponse response = jwtService.createTokenResponse(userDetails, user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ErrorResponse error = new ErrorResponse("Token refresh failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }
}