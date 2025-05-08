package com.dev.security.Invitation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterEmployeeRequest {

    private String name;
    private String lastName;
    private Integer age;
    private String phone;
    private String email;
    private String password;
    private String invitationToken;
    private UUID sedeId; //puede ser null
}