package com.dev.security.Auth.application;

import com.dev.security.Auth.domain.AuthenticationService;
import com.dev.security.Auth.dto.AuthResponse;
import com.dev.security.Auth.dto.LoginRequest;
import com.dev.security.Auth.dto.RegistrationRequest;
import com.dev.security.Invitation.dto.RegisterEmployeeRequest;
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


    @PostMapping("/register/client")
    Mono<Void> registrarse1(@RequestBody RegistrationRequest registerRequest){
        return authService.registerUser(registerRequest);
    }

    @PostMapping("/register/employee")
    Mono<Void> registrarse2(@RequestBody RegisterEmployeeRequest registerRequest){
        return authService.registerEmployee(registerRequest);
    }

    @PostMapping("/login")
    Mono<ResponseEntity<AuthResponse>> logearse(@RequestBody LoginRequest loginRequest){
        return authService.login(loginRequest) // Obtiene Mono<AuthResponse>
                .map(ResponseEntity::ok);
    }
}
