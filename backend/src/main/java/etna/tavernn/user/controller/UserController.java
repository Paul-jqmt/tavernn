package etna.tavernn.user.controller;

import etna.tavernn.user.model.User;
import etna.tavernn.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@TODO ADD EXCEPTION HANDLING

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // "::" c'est comme = .map(user -> ResponseEntity.ok(user))
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
//     @todo replaced with /register
//    @PostMapping
//    public ResponseEntity<User> createUser(@RequestBody User user) {
//        if (userService.existsByEmail(user.getEmail())) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).build();
//        }
//
//        if (userService.existsByUsername(user.getUsername())) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).build();
//        }
//
//        User createdUser = userService.createUser(user);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User user) {
        return userService.updateUser(id, user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") String id) {
        boolean deleted = userService.deleteUser(id);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}