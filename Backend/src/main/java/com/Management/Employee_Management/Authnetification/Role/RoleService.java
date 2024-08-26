package com.Management.Employee_Management.Authnetification.Role;

import com.Management.Employee_Management.Authnetification.User.User;
import com.Management.Employee_Management.Authnetification.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

//@Service
@RequiredArgsConstructor
public class RoleService {
    /*private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    public ResponseEntity<Integer> addRole(nRole request){
        Role role = Role.builder()
                .name(request.name())
                .lastModifiedDate(LocalDateTime.now())
                .createdDate(LocalDateTime.now())
                .user(null)
                .build();
        roleRepository.save(role);
        return ResponseEntity.ok(role.getId());
    }
    public ResponseEntity<String> assignRole(Integer id , nRole request){
        Optional<User> user = userRepository.findById(id);
        Optional<Role> role = roleRepository.findByName(request.name());
        if(user.isPresent() && role.isPresent()){
            User foundUser = user.get();
            Role foundRole = role.get();
            foundUser.setRoles(foundRole);
            foundRole.setUser(foundUser);
            userRepository.save(foundUser);
            roleRepository.save(foundRole);
            return ResponseEntity.ok(foundUser.getRoles().getName());
        }
        else {return ResponseEntity.notFound().build();}
    }

    public ResponseEntity<String> revokeRole(Integer id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            User foundUser = user.get();
            Optional<Role> Role = roleRepository.findByName("USER");
            if(foundUser.getRoles().getName().equals("ADMIN") && Role.isPresent()){
                Role foundRole = Role.get();
                foundUser.setRoles(foundRole);
                foundRole.setUser(foundUser);
                userRepository.save(foundUser);
                roleRepository.save(foundRole);
                return ResponseEntity.ok(foundUser.getRoles().getName());
            }
            else {return ResponseEntity.ok("Already a USER");}
        }
        else {return ResponseEntity.notFound().build();}
    }*/
}
