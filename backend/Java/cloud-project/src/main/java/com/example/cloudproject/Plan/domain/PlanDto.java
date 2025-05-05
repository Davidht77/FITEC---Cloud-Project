package com.example.cloudproject.Plan.domain;

import lombok.Data;

import java.util.UUID;

@Data
public class PlanDto {

    private UUID id;
    private String name;

    private String description;
    private double price;


}
