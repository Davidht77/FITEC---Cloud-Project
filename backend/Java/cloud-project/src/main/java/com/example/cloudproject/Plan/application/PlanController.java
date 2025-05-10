package com.example.cloudproject.Plan.application;

import com.example.cloudproject.Plan.domain.Plan;
import com.example.cloudproject.Plan.domain.PlanDto;
import com.example.cloudproject.Plan.domain.PlanService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/plan")
public class PlanController {

    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping
    public List<PlanDto> getAllPlans() {
        return planService.getAllPlans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanDto> getPlanById(@PathVariable UUID id) {
        return planService.getPlanById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PlanDto createPlan(@RequestBody PlanDto plan) {
        return planService.createPlan(plan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanDto> updatePlan(@PathVariable UUID id, @RequestBody PlanDto plan) {
        try {
            PlanDto updated = planService.updatePlan(id, plan);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable UUID id) {
        planService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> deletePlanbyName(@RequestParam String name) {
        planService.deletebyName(name);
        return ResponseEntity.noContent().build();
    }

}

