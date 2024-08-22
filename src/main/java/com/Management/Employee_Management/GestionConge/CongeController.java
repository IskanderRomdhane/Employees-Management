package com.Management.Employee_Management.GestionConge;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/conge")
public class CongeController {
    private final CongeService congeService;
    private final CongeRepository congeRepository;
    private rConge rConge;
    @PostMapping("/request-conge/{id}")
    public ResponseEntity<Boolean> requestConge(
            @PathVariable Integer id,
            @RequestBody rConge request){
        return congeService.requestConge(id, request);
    }
    @PutMapping("/acceptation")
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
}
