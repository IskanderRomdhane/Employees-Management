package com.Management.Employee_Management.Authnetification.User;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void registerUser(String firstname, String lastname, String username, String email) {
        User user = User.builder()
                .username(username)
                .email(email)
                .firstname(firstname)
                .lastname(lastname)
                .soldeConge(30)
                .build();
        userRepository.save(user);
    }
}

