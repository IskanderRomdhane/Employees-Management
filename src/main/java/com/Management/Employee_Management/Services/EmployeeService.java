package com.Management.Employee_Management.Services;

import com.Management.Employee_Management.User.User;
import com.Management.Employee_Management.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final UserRepository userRepository;
    public ResponseEntity<String> fName(Integer id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            User nUser = user.get();
            String Fname = nUser.getFullName();
            return ResponseEntity.ok(Fname);
        }
        else {return ResponseEntity.notFound().build();}
    }
}
