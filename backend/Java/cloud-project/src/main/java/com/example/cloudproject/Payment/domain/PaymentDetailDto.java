package com.example.cloudproject.Payment.domain;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;
@Data
public class PaymentDetailDto {
    private UUID id;
    private String clientName;
    private String planName;
    private double amount;
    private LocalDateTime date;
    private PaymentType payment;
    private String planDescription;  // extra field for detail
}