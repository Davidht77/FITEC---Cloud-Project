package com.example.cloudproject.Client.dto;


import com.example.cloudproject.Plan.domain.PlanDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

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
    private UUID planId;

}