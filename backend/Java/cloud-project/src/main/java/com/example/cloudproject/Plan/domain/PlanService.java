<<<<<<< HEAD
package com.example.cloudproject.Plan.domain;

import com.example.cloudproject.Plan.infrastructure.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanService {
    @Autowired
    private PlanRepository planRepository;
}
=======
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
        dto.setId(plan.getId());
        dto.setName(plan.getName());
        dto.setDescription(plan.getDescription());
        dto.setPrice(plan.getPrice());
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
                    plan.setName(updatedDto.getName());
                    plan.setDescription(updatedDto.getDescription());
                    plan.setPrice(updatedDto.getPrice());
                    return mapToDto(planRepository.save(plan));
                })
                .orElseThrow(() -> new RuntimeException("Plan not found with id " + id));
    }

    public void deletePlan(UUID id) {
        planRepository.deleteById(id);
    }

}
>>>>>>> e89bb9713ec89be9d22a9e827a80c2545fceff7d
