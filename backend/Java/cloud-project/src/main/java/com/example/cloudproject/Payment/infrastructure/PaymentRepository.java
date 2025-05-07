package com.example.cloudproject.Payment.infrastructure;

import com.example.cloudproject.Payment.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID>{
    List<Payment> findAllByClientId(UUID clientId);
}
