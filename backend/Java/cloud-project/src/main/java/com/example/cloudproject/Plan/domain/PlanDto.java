package com.example.cloudproject.Plan.domain;

import lombok.Data;

import java.util.UUID;

@Data
public class PlanDto {

    private UUID planId;
    private String name;
    private String description;
    private Double price;
    private String imagenUrlKey;


}
