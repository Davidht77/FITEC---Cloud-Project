package com.example.cloudproject.Plan.domain;

import com.example.cloudproject.Client.domain.Client;
import com.example.cloudproject.Payment.domain.Payment;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "plan")
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true)
    private String name;

    private String description;

    private double price;
    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true) // 'client' es el nombre del campo en la clase Payment
    private List<Client> clients = new ArrayList<>();


    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> payments = new ArrayList<>();
}
