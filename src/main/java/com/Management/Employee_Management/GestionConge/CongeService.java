package com.Management.Employee_Management.GestionConge;

import com.Management.Employee_Management.Authnetification.User.User;
import com.Management.Employee_Management.Authnetification.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CongeService {
    private final UserRepository userRepository;
    private final CongeRepository congeRepository;
    public ResponseEntity<Boolean> requestConge (Integer id, rConge request){
        Optional<User> User = userRepository.findById(id);
        if(User.isPresent()){
            User foundUser = User.get();
            Conge userConge = Conge.builder()
                    .startDate(request.startDate())
                    .endDate(request.endDate())
                    .reason(request.reason())
                    .user(foundUser)
                    .build();
            congeRepository.save(userConge);
            foundUser.setConge(userConge);
            userRepository.save(foundUser);
            return ResponseEntity.ok(true);
        }
        else {return ResponseEntity.notFound().build();}
    }
    public ResponseEntity<String> setCongeState (rConge request){
        Optional<Conge> conge = congeRepository.findById(request.id());
        if(conge.isPresent()){
            Conge foundconge = conge.get();
            foundconge.setState(request.state());
            congeRepository.save(foundconge);
            if (request.state().equals(true)){return ResponseEntity.ok("conge Accepted");}
            else {return ResponseEntity.ok("conge Refused");}
        }
        else{return ResponseEntity.notFound().build();}
    }

    public ResponseEntity<Integer> soldeConge(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            User foundUser = user.get();
            return ResponseEntity.ok(foundUser.getSoldeCongeByDays());
        }
        else {return ResponseEntity.notFound().build();}
    }
}
