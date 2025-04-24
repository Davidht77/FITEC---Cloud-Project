package com.example.cloudproject.Payment.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class Payment{
    @Id
    private UUID id;

    private UUID clientID;

    private UUID planID;

    private Date date;

    private String paymentType;
}
