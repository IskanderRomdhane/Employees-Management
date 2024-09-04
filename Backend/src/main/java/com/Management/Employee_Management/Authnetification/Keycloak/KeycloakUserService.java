package com.Management.Employee_Management.Authnetification.Keycloak;

import com.Management.Employee_Management.Authnetification.User.User;
import com.Management.Employee_Management.Authnetification.User.UserRepository;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class KeycloakUserService {
    private final UserRepository userRepository ;
    private final Keycloak keycloak;
    private final String realm;

    public KeycloakUserService(
            UserRepository userRepository,
            @Value("${keycloak.server.url}") String serverUrl,
            @Value("${keycloak.realm}") String realm,
            @Value("${keycloak.resource}") String clientId,
            @Value("${keycloak.admin.username}") String adminUserName,
            @Value("${keycloak.admin.password}") String adminPassword ) {
        this.userRepository = userRepository;
        this.keycloak = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .clientId(clientId)
                .grantType("password")
                .username(adminUserName)
                .password(adminPassword)
                .build();
        this.realm = realm;
    }

    // Create User
    public Response createUser(UserRepresentation user) {
        UsersResource usersResource = keycloak.realm(realm).users();

        Response response = usersResource.create(user);

        if (response.getStatus() == 201) {
            // Extract user ID from the Location header
            String locationHeader = response.getHeaderString("Location");
            String userId = locationHeader.substring(locationHeader.lastIndexOf('/') + 1);

            UserRepresentation createdUser = usersResource.get(userId).toRepresentation();

            User savedUser = User.builder()
                    .soldeConge(30)
                    .firstname(createdUser.getFirstName())
                    .email(createdUser.getEmail())
                    .username(createdUser.getId())
                    .lastname(createdUser.getLastName())
                    .build();
            userRepository.save(savedUser);
        }

        return response;
    }

    // Get User by ID
    public UserRepresentation getUserById(String userId) {
        return keycloak.realm(realm).users().get(userId).toRepresentation();
    }

    // Update User
    public void updateUser(String userId, UserRepresentation user) {
        try {
            keycloak.realm(realm).users().get(userId).update(user);
            Optional<User> bdUser = userRepository.findByUsername(user.getId());
            if (bdUser.isPresent()){
                User foundUser = bdUser.get();
                foundUser.setLastname(user.getLastName());
                foundUser.setFirstname(user.getFirstName());
                foundUser.setEmail(user.getEmail());
                userRepository.save(foundUser);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to update user", e);
        }
    }


    // Delete User
    public void deleteUser(String userId) {
        keycloak.realm(realm).users().get(userId).remove();
        Optional<User> bdUser = userRepository.findByUsername(userId);
        if (bdUser.isPresent()){
            User dUser = bdUser.get();
            userRepository.delete(dUser);
        }
    }

    // List all Users
    public List<UserRepresentation> listAllUsers() {
        return keycloak.realm(realm).users().list();
    }

}