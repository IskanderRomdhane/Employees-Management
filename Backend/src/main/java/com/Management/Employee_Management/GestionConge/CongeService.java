package com.Management.Employee_Management.GestionConge;

import com.Management.Employee_Management.Authnetification.User.User;
import com.Management.Employee_Management.Authnetification.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

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
            Optional<Conge> conge = congeRepository.findByUserUsername(user.getUsername());
            if(conge.isEmpty()) {
                Conge userConge = Conge.builder()
                        .startDate(request.startDate())
                        .endDate(request.endDate())
                        .reason(request.reason())
                        .user(user)
                        .build();

                congeRepository.save(userConge);

                user.setConge(userConge);
                userRepository.save(user);

                return ResponseEntity.ok("Request SAVED");
            }
            else {return ResponseEntity.ok("Request is already in progress");}
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    public ResponseEntity<String> setCongeState (rConge request , Authentication connectedUser){
        Optional<Conge> conge = congeRepository.findById(request.id());
        Optional<User> user = userRepository.findByUsername(connectedUser.getName());
        if(conge.isPresent() && user.isPresent()){
            User foundUser = user.get();
            Conge foundconge = conge.get();
            foundconge.setState(request.state());
            if (foundUser.getSoldeConge() > foundconge.calculateDaysDifference(foundconge.getStartDate(),foundconge.getEndDate())) {
                foundconge.setState(request.state());
                congeRepository.save(foundconge);
                foundUser.setSoldeConge((int) (foundUser.getSoldeConge()-foundconge.calculateDaysDifference(foundconge.getStartDate(),foundconge.getEndDate())));
                userRepository.save(foundUser);
                return ResponseEntity.ok("conge Accepted");
            }
            else {return ResponseEntity.ok("conge Refused");}
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
        Optional<Conge> conge = congeRepository.findByUserUsername(connectedUser.getName());
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