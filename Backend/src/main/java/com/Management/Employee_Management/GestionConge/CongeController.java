package com.Management.Employee_Management.GestionConge;

import com.Management.Employee_Management.Authnetification.Security.CustomAuthenticationSuccessHandler;
import com.Management.Employee_Management.Authnetification.User.UserRepository;
import com.Management.Employee_Management.Authnetification.User.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/conge")
public class CongeController {
    private final CongeService congeService;
    private final CongeRepository congeRepository;
    private final UserService userService;
    private rConge rConge;
    @PostMapping("/request-conge")
    public ResponseEntity<String> requestConge(
            Authentication connectedUser,
            @RequestBody rConge request){
        return congeService.requestConge(connectedUser, request);
    }
    @PutMapping("/setStatus")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> setCongeState (
            @RequestBody rConge request,
            Authentication connectedUser
    ) {
        System.out.println("working");
        return congeService.setCongeState(request, connectedUser);
    }
    @GetMapping("/soldeconge")
    public ResponseEntity<Integer> soldeConge (
            Authentication connectedUser
    ){
        return congeService.soldeConge(connectedUser);
    }
    @GetMapping("/display-all-conges")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Conge>> displayConge(){
        return ResponseEntity.ok(congeRepository.findAll());
    }

    @GetMapping("/display-conge-status")
    public ResponseEntity<String> getCongeStatus(
            Authentication connectedUser
    ){
        return congeService.getCongeStatus(connectedUser);
    }

}
