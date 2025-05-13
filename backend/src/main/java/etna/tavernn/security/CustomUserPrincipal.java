package etna.tavernn.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@AllArgsConstructor
public class CustomUserPrincipal {
    private String userId;
    private UserDetails userDetails;
}
