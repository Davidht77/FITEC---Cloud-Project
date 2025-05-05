package com.example.cloudproject.Payment.domain;


import lombok.Data;

import java.util.UUID;

@Data
public class CreatePaymentDto {
    private UUID clientId;
    private UUID planId;
    private double amount;
    private PaymentType paymentType;
}