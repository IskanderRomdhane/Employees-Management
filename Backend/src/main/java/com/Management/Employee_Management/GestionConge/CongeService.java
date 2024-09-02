package com.Management.Employee_Management.GestionConge;

import com.Management.Employee_Management.Authnetification.User.User;
import com.Management.Employee_Management.Authnetification.User.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CongeService {
    private final UserRepository userRepository;
    private final CongeRepository congeRepository;
    public ResponseEntity<String> requestConge(Authentication connectedUser, rConge request) {
        Optional<User> userOptional = userRepository.findByUsername(connectedUser.getName());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Conge> conge = congeRepository.findByUsername(user.getUsername());
            if(conge.isEmpty()) {
                Conge userConge = Conge.builder()
                        .startDate(request.startDate())
                        .endDate(request.endDate())
                        .reason(request.reason())
                        .username(user.getUsername())
                        .build();

                congeRepository.save(userConge);

                user.setCongeId(userConge.getId());
                userRepository.save(user);

                return ResponseEntity.ok("Request SAVED");
            }
            else {return ResponseEntity.ok("Request is already in progress");}
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    public ResponseEntity<String> setCongeState (rConge rconge){

        Optional<User> user = userRepository.findByUsername(rconge.userId());
        if(user.isPresent()){
            User foundUser = user.get();
            Optional<Conge> conge = congeRepository.findByUsername(foundUser.getUsername());
            Conge foundconge = conge.get();
            foundconge.setState(rconge.state());
            if (foundUser.getSoldeConge() > foundconge.calculateDaysDifference(foundconge.getStartDate(),foundconge.getEndDate())) {
                foundconge.setState(foundconge.getState());
                congeRepository.save(foundconge);
                foundUser.setSoldeConge((int) (foundUser.getSoldeConge()-foundconge.calculateDaysDifference(foundconge.getStartDate(),foundconge.getEndDate())));
                userRepository.save(foundUser);
                return ResponseEntity.ok("conge Accepted");
            }
            else {return ResponseEntity.ok("Solde conge est insuffisant");}
        }
        else{return ResponseEntity.notFound().build();}
    }

    public ResponseEntity<Integer> soldeConge(Authentication connectedUser) {
        Optional<User> user = userRepository.findByUsername(connectedUser.getName());
        if(user.isPresent()){
            User founduser= user.get();
            return ResponseEntity.ok(founduser.getSoldeConge());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<String> getCongeStatus(Authentication connectedUser) {
        Optional<Conge> conge = congeRepository.findByUsername(connectedUser.getName());
        if (conge.isPresent()) {
            Conge foundConge = conge.get();
            Boolean state = foundConge.getState();
            if (state == null) {
                return ResponseEntity.ok("Request is still being reviewed");
            } else if (Boolean.TRUE.equals(state)) {
                return ResponseEntity.ok("Request is accepted");
            } else {
                return ResponseEntity.ok("Request is refused");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
