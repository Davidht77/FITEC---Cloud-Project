package com.example.cloudproject.Client.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientRequestDto {

    private String name;
    private String lastName;
    private Integer age;
    private String phone;
    private String email;
    private String password;
    private String imagenUrlKey;
    private String planName;

}