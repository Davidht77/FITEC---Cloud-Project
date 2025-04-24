package com.example.cloudproject.Client.domain;

import com.example.cloudproject.Person.domain.Person;
import com.example.cloudproject.Plan.domain.Plan;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@Table(name = "client")
@PrimaryKeyJoinColumn(name = "id")
public class Client extends Person {

    @ManyToOne(fetch = FetchType.LAZY) // Relación Many-to-One con Plan
    @JoinColumn(name = "id_plan", nullable = false)
    private Plan plan;
}
