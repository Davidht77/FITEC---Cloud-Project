package com.example.cloudproject.Payment.domain;


public enum PaymentType {
    CARD, // Can represent both Credit and Debit Card
    BANK_TRANSFER,
    PAYPAL,
    CASH // If applicable in your context
}