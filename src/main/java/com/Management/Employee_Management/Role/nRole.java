package com.Management.Employee_Management.Role;

import com.Management.Employee_Management.User.User;

import java.time.LocalDateTime;
import java.util.List;

public record nRole(
        String name,
        List<User> user ,
        LocalDateTime createdDate,
        LocalDateTime lastModifiedDate
) {
}
