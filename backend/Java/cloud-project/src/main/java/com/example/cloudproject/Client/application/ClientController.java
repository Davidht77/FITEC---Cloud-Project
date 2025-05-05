package com.example.cloudproject.Client.application;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client")
public class ClientController {
    @GetMapping
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello This is the Springboot Microservice!");
    }
}
