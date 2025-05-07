package com.dev.security.Auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDTO {
    private String name;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String password; // Contraseña hasheada
    private UUID planId;
    // otros campos...
}