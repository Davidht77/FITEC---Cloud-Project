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

    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    public Optional<Plan> getPlanById(UUID id) {
        return planRepository.findById(id);
    }

    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

    public Plan updatePlan(UUID id, Plan updatedPlan) {
        return planRepository.findById(id)
                .map(plan -> {
                    plan.setName(updatedPlan.getName());
                    plan.setDescription(updatedPlan.getDescription());
                    plan.setPrice(updatedPlan.getPrice());
                    return planRepository.save(plan);
                })
                .orElseThrow(() -> new RuntimeException("Plan not found with id " + id));
    }

    public void deletePlan(UUID id) {
        planRepository.deleteById(id);
    }

}
>>>>>>> e89bb9713ec89be9d22a9e827a80c2545fceff7d
