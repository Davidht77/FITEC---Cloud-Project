package com.example.cloudproject.Payment.infrastructure;

import com.example.cloudproject.Payment.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID>{
}
