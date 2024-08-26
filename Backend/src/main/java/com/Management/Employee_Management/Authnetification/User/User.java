package com.Management.Employee_Management.Authnetification.User;

import com.Management.Employee_Management.GestionConge.Conge;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "app_user")
@EntityListeners(AuditingEntityListener.class)
public class User  {

    private String firstname;
    private String lastname;

    @Column(unique = true)
    private String email;
    @Id
    private String username;

    @OneToOne(fetch = FetchType.LAZY)
    private Conge conge;
    private Integer soldeConge;

    @Override
    public String toString() {
        return
                "username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\''
                ;
    }

    public String getFullName() {
        return firstname + " " + lastname;
    }

}