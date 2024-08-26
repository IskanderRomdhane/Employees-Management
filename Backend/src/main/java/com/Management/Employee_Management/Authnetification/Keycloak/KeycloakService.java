package com.Management.Employee_Management.Authnetification.Keycloak;

import com.Management.Employee_Management.Authnetification.User.User;
import com.Management.Employee_Management.Authnetification.User.UserRepository;
import com.Management.Employee_Management.Authnetification.User.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@AllArgsConstructor
public class KeycloakService {
    private final UserRepository userRepository;
    private UserService userService;
    public String saveIt(Authentication connectedUser) {
        Optional<User> us = userRepository.findByUsername(connectedUser.getName());
        if(us.isPresent()){
            User foundUser = us.get();
            return foundUser.toString();
        }
        else {
            saveUser(connectedUser);
            return "saved new user";
        }

    }
    public void saveUser(Authentication authentication) {
            if (authentication instanceof JwtAuthenticationToken) {
                JwtAuthenticationToken jwtAuthToken = (JwtAuthenticationToken) authentication;
                Jwt jwt = jwtAuthToken.getToken();
                String firstname = jwt.getClaim("given_name");
                String lastname = jwt.getClaim("family_name");
                String username = jwt.getClaim("sub");
                String email = jwt.getClaim("email");
                userService.registerUser(firstname,lastname,username,email);

            }
            System.out.println("No JWT token found");
        }



}

