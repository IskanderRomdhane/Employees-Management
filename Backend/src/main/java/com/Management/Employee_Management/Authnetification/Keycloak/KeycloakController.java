package com.Management.Employee_Management.Authnetification.Keycloak;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/authentication")
@RequiredArgsConstructor
public class KeycloakController {
    private final KeycloakService keycloakService;

    @PostMapping()
    public String saveUser(Authentication connectedUser) {
        return keycloakService.saveIt(connectedUser);
    }



}

