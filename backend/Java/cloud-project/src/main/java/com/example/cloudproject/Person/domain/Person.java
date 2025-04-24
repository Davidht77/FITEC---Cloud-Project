package com.example.cloudproject.Person.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
public class Person {
    @Id
    private UUID id;

    private String name;

    private String lastName;

    private String phone;

    private String email;
}
