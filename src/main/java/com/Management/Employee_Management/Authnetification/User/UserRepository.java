package com.Management.Employee_Management.Authnetification.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String Username);

    boolean existsByEmail(String email);
}