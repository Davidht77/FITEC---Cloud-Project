package com.example.cloudproject.Payment.domain;

import com.example.cloudproject.Client.domain.Client;
import com.example.cloudproject.Plan.domain.Plan;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class Payment{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY) // Relación Many-to-One con Plan
    @JoinColumn(name = "id_plan", nullable = false) // Columna FK
    private Plan plan;

    @OneToOne(fetch = FetchType.LAZY) // Relación Many-to-One con Client
    @JoinColumn(name = "id_client", nullable = false) // Columna FK
    private Client client;

    private LocalDate date;

    private String paymentType;
}
