package com.Management.Employee_Management.Authnetification.User;

import com.Management.Employee_Management.GestionConge.Conge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
}
