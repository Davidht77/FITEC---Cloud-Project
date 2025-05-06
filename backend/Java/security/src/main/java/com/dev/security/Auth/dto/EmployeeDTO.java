package com.dev.security.Auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
    private String name;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String hashedPassword; // Contraseña hasheada
    private Double salary;
    private String dateContract;
    // otros campos...
}
