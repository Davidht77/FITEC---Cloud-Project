package com.example.cloudproject.Payment.domain;

import com.example.cloudproject.Client.domain.Client;
import com.example.cloudproject.Client.infrastructure.ClientRepository;
import com.example.cloudproject.Payment.infrastructure.PaymentRepository;
import com.example.cloudproject.Plan.domain.Plan;
import com.example.cloudproject.Plan.infrastructure.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final ClientRepository clientRepository;
    private final PlanRepository planRepository;

    public PaymentService(PaymentRepository paymentRepository,
                          ClientRepository clientRepository,
                          PlanRepository planRepository) {
        this.paymentRepository = paymentRepository;
        this.clientRepository = clientRepository;
        this.planRepository = planRepository;
    }
    private PaymentSummaryDto toSummaryDto(Payment payment) {
        PaymentSummaryDto dto = new PaymentSummaryDto();
        dto.setId(payment.getId());
        dto.setClientName(payment.getClient().getName());
        dto.setPlanName(payment.getPlan().getName());
        dto.setAmount(payment.getAmount());
        dto.setDate(payment.getDate());
        dto.setPayment(payment.getPaymentType());
        return dto;
    }

    private PaymentDetailDto toDetailDto(Payment payment) {
        PaymentDetailDto dto = new PaymentDetailDto();
        dto.setId(payment.getId());
        dto.setClientName(payment.getClient().getName());
        dto.setPlanName(payment.getPlan().getName());
        dto.setAmount(payment.getAmount());
        dto.setDate(payment.getDate());
        dto.setPayment(payment.getPaymentType());
        dto.setPlanDescription(payment.getPlan().getDescription());
        return dto;
    }
    public List<PaymentSummaryDto> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::toSummaryDto)
                .collect(Collectors.toList());
    }

    public Optional<PaymentDetailDto> getPaymentById(UUID id) {
        return paymentRepository.findById(id)
                .map(this::toDetailDto);
    }

    public PaymentDetailDto createPayment(CreatePaymentDto createDto) {
        // Validaciones
        Client client = clientRepository.findById(createDto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));
        Plan plan = planRepository.findById(createDto.getPlanId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        // Mapear DTO a entidad
        Payment payment = new Payment();
        payment.setClient(client);
        payment.setPlan(plan);
        payment.setAmount(createDto.getAmount());
        payment.setPaymentType(createDto.getPaymentType());
        payment.setDate(LocalDateTime.now());

        // Guardar
        Payment saved = paymentRepository.save(payment);

        // Mapear entidad a DTO de salida
        PaymentDetailDto detailDto = new PaymentDetailDto();
        detailDto.setId(saved.getId());
        detailDto.setClientName(client.getName());
        detailDto.setPlanName(plan.getName());
        detailDto.setAmount(saved.getAmount());
        detailDto.setDate(saved.getDate());
        detailDto.setPayment(saved.getPaymentType());
        detailDto.setPlanDescription(plan.getDescription());

        return detailDto;
    }

    public List<PaymentSummaryDto> getPaymentsByClientId(UUID clientId) {
        return paymentRepository.findAllByClientId(clientId).stream()
                .map(this::toSummaryDto)
                .collect(Collectors.toList());
    }


}
