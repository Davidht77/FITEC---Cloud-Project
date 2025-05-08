package com.example.cloudproject.Client.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginCredentialsRequest {
    private String email;
    private String password;
    private String userType;
}
