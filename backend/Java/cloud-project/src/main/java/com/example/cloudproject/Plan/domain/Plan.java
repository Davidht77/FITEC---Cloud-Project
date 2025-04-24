package com.example.cloudproject.Plan.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
public class Plan {
    @Id
    private UUID id;

    private String name;

    private String description;

    private double price;
}
