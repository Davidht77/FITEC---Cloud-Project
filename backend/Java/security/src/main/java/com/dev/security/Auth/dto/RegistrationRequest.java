package com.dev.security.Auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {
    private String name;
    private String lastName;
    private Integer age;
    private String phone;
    private String email;
    private String password; // Contraseña en texto plano
    private String userType; // "client" o "employee"
    // otros campos...
    protected UUID planId; // puede ser null
    private UUID sedeId; //puede ser null
}
