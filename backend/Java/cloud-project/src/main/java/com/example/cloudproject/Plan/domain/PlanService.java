package com.example.cloudproject.Plan.domain;

import com.example.cloudproject.Plan.infrastructure.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanService {
    @Autowired
    private PlanRepository planRepository;
}
