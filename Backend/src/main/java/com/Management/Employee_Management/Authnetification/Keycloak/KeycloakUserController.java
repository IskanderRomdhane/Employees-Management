package com.Management.Employee_Management.Authnetification.Keycloak;

import com.Management.Employee_Management.Authnetification.User.User;
import com.Management.Employee_Management.Authnetification.User.UserRepository;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.Response;
import java.util.List;
@RestController
@RequestMapping("/keycloak")
public class KeycloakUserController {
    private final UserRepository userRepository ;
    private final KeycloakUserService keycloakUserService;

    public KeycloakUserController(UserRepository userRepository, KeycloakUserService keycloakUserService) {
        this.userRepository = userRepository;
        this.keycloakUserService = keycloakUserService;
    }

    @PostMapping("/create-user")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> createUser(@RequestBody UserRepresentation user) {
        Response response = keycloakUserService.createUser(user);
        if (response.getStatus() == 201) {

            return ResponseEntity.ok("User created successfully");
        } else {
            return ResponseEntity.status(response.getStatus()).body("User creation failed");
        }
    }


    @GetMapping("/get-user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserRepresentation> getUserById(@PathVariable String id) {
        UserRepresentation user = keycloakUserService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("update-user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody UserRepresentation user) {
        try {
            keycloakUserService.updateUser(id, user);
            return ResponseEntity.ok("User updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update user: " + e.getMessage());
        }
    }


    @DeleteMapping("/delete-user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        keycloakUserService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserRepresentation>> listAllUsers() {
        List<UserRepresentation> users = keycloakUserService.listAllUsers();
        return ResponseEntity.ok(users);
    }

}
