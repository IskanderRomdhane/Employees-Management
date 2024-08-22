package com.Management.Employee_Management.GestionConge;

import com.Management.Employee_Management.Authnetification.User.User;

import java.time.LocalDate;

public record rConge(
        Integer id,
         LocalDate startDate,
         LocalDate endDate,
         String reason,
         User user,
         Boolean state
) {
}
