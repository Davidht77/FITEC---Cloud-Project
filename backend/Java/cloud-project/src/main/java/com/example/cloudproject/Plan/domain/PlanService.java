package com.example.cloudproject.Plan.domain;

import com.example.cloudproject.Plan.infrastructure.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PlanService {

    private final PlanRepository planRepository;

    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    private PlanDto mapToDto(Plan plan) {
        PlanDto dto = new PlanDto();
        dto.setPlanId(plan.getId());
        dto.setName(plan.getName());
        dto.setDescription(plan.getDescription());
        dto.setPrice(plan.getPrice());
        dto.setImagenUrlKey(plan.getImagenUrlKey());
        return dto;
    }

    public List<PlanDto> getAllPlans() {
        return planRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public Optional<PlanDto> getPlanById(UUID id) {
        return planRepository.findById(id)
                .map(this::mapToDto);
    }

    public PlanDto createPlan(PlanDto dto) {
        Plan plan = new Plan();
        plan.setName(dto.getName());
        plan.setDescription(dto.getDescription());
        plan.setPrice(dto.getPrice());
        return mapToDto(planRepository.save(plan));
    }

    public PlanDto updatePlan(UUID id, PlanDto updatedDto) {
        return planRepository.findById(id)
                .map(plan -> {
                    if (updatedDto.getName() != null)
                        plan.setName(updatedDto.getName());
                    if (updatedDto.getDescription() != null)
                        plan.setDescription(updatedDto.getDescription());
                    if (updatedDto.getPrice() != null)
                        plan.setPrice(updatedDto.getPrice());
                    if (updatedDto.getImagenUrlKey() != null)
                        plan.setImagenUrlKey(updatedDto.getImagenUrlKey());

                    return mapToDto(planRepository.save(plan));
                })
                .orElseThrow(() -> new RuntimeException("Plan not found with id " + id));
    }

    public void deletePlan(UUID id) {
        planRepository.deleteById(id);
    }

    public void deletebyName(String name) {
        Optional<Plan> plan = planRepository.findByName(name);
        if (plan.isPresent()) {
            deletePlan(plan.get().getId());
        }
    }

}
