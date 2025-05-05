package com.example.cloudproject.Payment.domain;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class PaymentSummaryDto {
    private UUID id;
    private String clientName;
    private String planName;
    private double amount;
    private LocalDateTime date;
    private PaymentType payment;
}
