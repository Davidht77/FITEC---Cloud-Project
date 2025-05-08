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
    private String password;// Contraseña hasheada

    private Double salary;
    private UUID sede_id;
    // otros campos...

    public EmployeeDTO(String name, String lastName, String phone, String email, String password, UUID sede_id) {
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.sede_id = sede_id;
    }
}
