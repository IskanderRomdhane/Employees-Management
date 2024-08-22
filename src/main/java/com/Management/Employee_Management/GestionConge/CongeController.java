package com.Management.Employee_Management.GestionConge;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/conge")
public class CongeController {
    private final CongeService congeService;
    private final CongeRepository congeRepository;
    private rConge rConge;
    @PostMapping("/request-conge/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Boolean> requestConge(
            @PathVariable Integer id,
            @RequestBody rConge request){
        return congeService.requestConge(id, request);
    }
    @PutMapping("/acceptation")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> setCongeState (
            @RequestBody rConge request
    ) {
        return congeService.setCongeState(request);
    }
    @GetMapping("/soldeconge")
    public ResponseEntity<Integer> soldeConge (
            @RequestParam Integer id
    ){
        return congeService.soldeConge(id);
    }
    @GetMapping("/display-all-conges")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Conge>> displayConge(){
        return ResponseEntity.ok(congeRepository.findAll());
    }

    @GetMapping("/display-conge-status")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> getCongeStatus(
            @RequestParam Integer id
    ){
        return congeService.getCongeStatus(id);
    }
}
