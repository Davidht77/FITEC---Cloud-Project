package com.example.cloudproject.Plan.infrastructure;

import com.example.cloudproject.Plan.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlanRepository extends JpaRepository<Plan, UUID> {
    Optional<Plan> findByName(String name);
}
