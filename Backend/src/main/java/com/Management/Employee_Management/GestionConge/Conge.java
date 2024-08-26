package com.Management.Employee_Management.GestionConge;

import com.Management.Employee_Management.Authnetification.User.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Duration;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import com.Management.Employee_Management.Authnetification.User.User;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "_conge")
public class Conge {
    @Id
    @GeneratedValue
    private Integer id;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private Boolean state;
    @OneToOne
    private User user;

    public static long calculateDaysDifference(LocalDate startDate, LocalDate endDate) {
        return ChronoUnit.DAYS.between(startDate, endDate);
    }
}
