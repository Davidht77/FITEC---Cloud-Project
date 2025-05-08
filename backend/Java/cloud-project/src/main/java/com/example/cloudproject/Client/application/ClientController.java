package com.example.cloudproject.Client.application;

import com.example.cloudproject.Client.domain.Client;
import com.example.cloudproject.Client.domain.ClientService;
import com.example.cloudproject.Client.dto.ClientRequestDto;
import com.example.cloudproject.Client.dto.ClientResponseDto;
import com.example.cloudproject.Client.dto.LoginCredentialsRequest;
import com.example.cloudproject.Client.dto.UserValidationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/client")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/credentials")
    public ResponseEntity<UserValidationResponse> getClientCredentials(@RequestBody LoginCredentialsRequest loginCredentialsRequest) {
        UserValidationResponse userValidationResponse = clientService.credentials(loginCredentialsRequest);
        return ResponseEntity.ok(userValidationResponse);

    }

    @GetMapping
    public ResponseEntity<List<ClientResponseDto>> getAllClients() {
        List<ClientResponseDto> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientResponseDto> getClientById(@PathVariable UUID id) {
        return clientService.getClientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping
    public ClientResponseDto createClient(@RequestBody ClientRequestDto client) {
        return clientService.createClient(client);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientResponseDto> updateClient(
            @PathVariable UUID id,
            @RequestBody ClientRequestDto clientRequestDto) {

        try {
            ClientResponseDto updated = clientService.updateClient(id, clientRequestDto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable UUID id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}
