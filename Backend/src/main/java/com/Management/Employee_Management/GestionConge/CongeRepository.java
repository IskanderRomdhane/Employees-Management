package com.Management.Employee_Management.GestionConge;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CongeRepository extends JpaRepository<Conge, Integer> {
    Optional<Conge> findByUsername(String username);
}
