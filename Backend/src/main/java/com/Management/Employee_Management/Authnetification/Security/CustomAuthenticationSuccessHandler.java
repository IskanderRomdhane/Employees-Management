package com.Management.Employee_Management.Authnetification.Security;


import com.Management.Employee_Management.Authnetification.User.User;
import com.Management.Employee_Management.Authnetification.User.UserRepository;
import com.Management.Employee_Management.Authnetification.User.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;
    private final UserRepository userRepository;

    public CustomAuthenticationSuccessHandler(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String username = authentication.getName();

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            if (authentication.getPrincipal() instanceof UserDetails userDetails) {
                // Extract information from the UserDetails
                String email = userDetails.getUsername(); // or fetch from claims if available
                String firstName = userDetails.getUsername(); // Replace with actual extraction logic
                String lastName = ""; // Replace with actual extraction logic

                userService.registerUser(firstName, lastName, username, email);
            }
        }

        // Proceed with the default behavior
        response.sendRedirect("/"); // Redirect to a default page after success
    }
}
