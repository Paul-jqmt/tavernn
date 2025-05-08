package etna.tavernn.auth.controller;

import etna.tavernn.auth.dto.AuthResponse;
import etna.tavernn.auth.dto.ErrorResponse;
import etna.tavernn.auth.dto.LoginRequest;
import etna.tavernn.auth.dto.RegisterRequest;
import etna.tavernn.auth.service.AuthService;
import etna.tavernn.auth.service.JwtService;
import etna.tavernn.user.model.User;
import etna.tavernn.user.repository.UserRepository;
import etna.tavernn.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.authenticateUser(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (response == null) {
            ErrorResponse error = new ErrorResponse("Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        return ResponseEntity.ok(response);
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

        User createdUser = userService.createUser(registerRequest);
        UserDetails userDetails = jwtService.createUserDetails(createdUser);
        AuthResponse response = jwtService.createTokenResponse(userDetails, createdUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Object> refreshToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        AuthResponse response = authService.refreshToken(authentication);

        if (response == null) {
            ErrorResponse error = new ErrorResponse("Invalid or expired token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        return ResponseEntity.ok(response);
    }
}