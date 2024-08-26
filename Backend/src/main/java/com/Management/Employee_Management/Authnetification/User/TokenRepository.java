package com.Management.Employee_Management.Authnetification.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository {

    Optional<Token> findByToken(String token);
}
