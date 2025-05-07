package com.example.cloudproject.Client.dto;


import com.example.cloudproject.Plan.domain.PlanDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientResponseDto {
    private UUID id;
    private String name;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private PlanDto plan;
}