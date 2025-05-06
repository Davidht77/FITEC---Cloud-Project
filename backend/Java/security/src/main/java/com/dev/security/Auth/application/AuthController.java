package com.dev.security.Auth.application;

import com.dev.security.Auth.domain.AuthenticationService;
import com.dev.security.Auth.dto.AuthResponse;
import com.dev.security.Auth.dto.LoginRequest;
import com.dev.security.Auth.dto.RegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationService authService;


    @PostMapping("/register")
    ResponseEntity<String> registrarse(@RequestBody RegistrationRequest registerRequest){
        authService.registerUser(registerRequest);
        return ResponseEntity.ok("Te Has Registrado Correctamente");
    }

    @PostMapping("/login")
    ResponseEntity<Mono<AuthResponse>> logearse(@RequestBody LoginRequest loginRequest){
        Mono<AuthResponse> token = authService.login(loginRequest);
        return ResponseEntity.ok(token);
    }
}
