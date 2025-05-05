package com.example.cloudproject.Client.dto;


import com.example.cloudproject.Plan.domain.PlanDto;
import lombok.Data;

import java.util.UUID;

@Data

public class ClientRequestDto {
    private UUID id;
    private String name;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private UUID planId;
}