package com.Management.Employee_Management.Services;

import com.Management.Employee_Management.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/service")
@RequiredArgsConstructor
public class ServicesController {
    private final EmployeeService employeeService;
    @GetMapping("/get-first-name")
    public ResponseEntity<String> gFullname(@RequestParam Integer id){
        return employeeService.fName(id);
    }

}
