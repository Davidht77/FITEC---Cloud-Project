package com.example.cloudproject.Payment.application;

import com.example.cloudproject.Payment.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public List<PaymentSummaryDto> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDetailDto> getPaymentById(@PathVariable UUID id) {
        return paymentService.getPaymentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PaymentDetailDto createPayment(@RequestBody CreatePaymentDto createDto) {
        return paymentService.createPayment(createDto);
    }

    @GetMapping("/client/{clientId}")
    public List<PaymentSummaryDto> getPaymentsByClientId(@PathVariable UUID clientId) {
        return paymentService.getPaymentsByClientId(clientId);
    }





}
