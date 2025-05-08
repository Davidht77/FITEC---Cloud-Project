package com.dev.security.Auth.domain;

import com.dev.security.Auth.dto.*;
import com.dev.security.Config.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class AuthenticationService {

    private final WebClient.Builder webClientBuilder;
    private final PasswordEncoder passwordEncoder;
    private final String clientServiceUrl;
    private final String employeeServiceUrl;

    public AuthenticationService(
            WebClient.Builder webClientBuilder,
            PasswordEncoder passwordEncoder,
            @Value("${app.services.client.base-url}") String clientServiceUrl,
            @Value("${app.services.employee.base-url}") String employeeServiceUrl, JwtService jwtTokenProvider) {
        this.webClientBuilder = webClientBuilder;
        this.passwordEncoder = passwordEncoder;
        this.clientServiceUrl = clientServiceUrl;
        this.employeeServiceUrl = employeeServiceUrl;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public Mono<Void> registerUser(RegistrationRequest request) {
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // Determina a qué servicio llamar
        if ("client".equalsIgnoreCase(request.getUserType())) {
            ClientDTO clientData = new ClientDTO(
                    request.getName(),
                    request.getLastName(),
                    request.getPhone(),
                    request.getEmail(),
                    hashedPassword, // Envía la contraseña ya hasheada
                    request.getPlanId()
            );
            // Llama al ClientService
            return webClientBuilder.baseUrl(clientServiceUrl).build()
                    .post()
                    .uri("/client") // Endpoint en ClientService para crear clientes
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(clientData) // El objeto a enviar como JSON
                    .retrieve() // Envía la solicitud y obtén la respuesta
                    .onStatus(
                            HttpStatusCode::isError,

                            // Función de manejo: La misma que teníamos antes
                            response ->
                                    response.bodyToMono(String.class)
                                            .defaultIfEmpty("[No error body provided from service]")
                                            .flatMap(errorBody -> {
                                                String errorMessage = "Service error: " + response.statusCode() + " - " + errorBody;
                                                RuntimeException exceptionToThrow = new RuntimeException(errorMessage);
                                                return Mono.error(exceptionToThrow);
                                            })
                    )
                    .toBodilessEntity() // No necesitamos el cuerpo de la respuesta, solo el éxito
                    .then(); // Convierte a Mono<Void> para indicar finalización

        } else if ("employee".equalsIgnoreCase(request.getUserType())) {
            EmployeeDTO employeeData = new EmployeeDTO(
                    request.getName(),
                    request.getLastName(),
                    request.getPhone(),
                    request.getEmail(),
                    hashedPassword, // Envía la contraseña ya hasheada
                    request.getSede_id()// otros campos específicos del empleado...
            );
            // Llama al EmployeeService (FastAPI)
            return webClientBuilder.baseUrl(employeeServiceUrl).build()
                    .post()
                    .uri("/employees") // Endpoint en EmployeeService para crear empleados
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(employeeData)
                    .retrieve()
                    .onStatus(
                            HttpStatusCode::isError,

                            // Función de manejo: La misma que teníamos antes
                            response ->
                                    response.bodyToMono(String.class)
                                            .defaultIfEmpty("[No error body provided from service]")
                                            .flatMap(errorBody -> {
                                                String errorMessage = "Service error: " + response.statusCode() + " - " + errorBody;
                                                RuntimeException exceptionToThrow = new RuntimeException(errorMessage);
                                                return Mono.error(exceptionToThrow);
                                            })
                    )
                    .toBodilessEntity()
                    .then();
        } else {
            return Mono.error(new IllegalArgumentException("Invalid user type"));
        }
    }


    private final JwtService jwtTokenProvider;

    public Mono<AuthResponse> login(LoginRequest request) {
        // Determina a qué servicio preguntar (usando el userType del request)
        String targetServiceUrl;
        String targetUri;
        if ("client".equalsIgnoreCase(request.getUserType())) {
            targetServiceUrl = clientServiceUrl;
            targetUri = "/client/credentials"; // Endpoint para obtener credenciales por email
        } else if ("employee".equalsIgnoreCase(request.getUserType())) {
            targetServiceUrl = employeeServiceUrl;
            targetUri = "/employees/credentials"; // Endpoint similar en EmployeeService
        } else {
            return Mono.error(new IllegalArgumentException("Invalid user type"));
        }

        // Llama al servicio correspondiente para obtener las credenciales
        return webClientBuilder.baseUrl(targetServiceUrl).build()
                .post()
                .uri(targetUri)
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                // Manejo específico para 404 Not Found
                .onStatus(httpStatus -> httpStatus == HttpStatus.NOT_FOUND,
                        clientResponse -> Mono.error(new BadCredentialsException("User not found or invalid credentials")))
                // Manejo genérico para otros errores
                .onStatus(HttpStatusCode::isError,

                        // Función de manejo: La misma que teníamos antes
                        response ->
                                response.bodyToMono(String.class)
                                        .defaultIfEmpty("[No error body provided from service]")
                                        .flatMap(errorBody -> {
                                            String errorMessage = "Service error: " + response.statusCode() + " - " + errorBody;
                                            RuntimeException exceptionToThrow = new RuntimeException(errorMessage);
                                            return Mono.error(exceptionToThrow);
                                        })
                )
                // Convierte el cuerpo de la respuesta a un DTO esperado
                .bodyToMono(UserCredentialsDTO.class)
                // Una vez obtenidas las credenciales
                .flatMap(credentials -> {
                    // Compara la contraseña proporcionada con el hash almacenado
                    if (passwordEncoder.matches(request.getPassword(), credentials.getHashedPassword())) {
                        // Si coinciden, genera el JWT
                        String token = jwtTokenProvider.generateToken(credentials.getUserId(), credentials.getEmail(), credentials.getRoles());

                        AuthResponse authResponse = new AuthResponse(token);

                        return Mono.just(authResponse);
                    } else {
                        // Si no coinciden, error
                        return Mono.error(new BadCredentialsException("User not found or invalid credentials"));
                    }
                });
    }
}
