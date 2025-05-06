package com.dev.security.Auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
    private String name;
    private String lastName;
    private String phone;
    private String email;
    private String password; // Contraseña hasheada
    private Double salary;
    private UUID sede_id;
    // otros campos...
}
