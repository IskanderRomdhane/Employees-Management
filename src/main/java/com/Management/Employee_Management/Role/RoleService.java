package com.Management.Employee_Management.Role;

import com.Management.Employee_Management.User.User;
import com.Management.Employee_Management.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
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
}
