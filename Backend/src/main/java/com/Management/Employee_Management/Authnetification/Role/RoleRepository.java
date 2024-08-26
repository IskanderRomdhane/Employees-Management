package com.Management.Employee_Management.Authnetification.Role;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository {
    Optional<Role> findByName(String role);
}
