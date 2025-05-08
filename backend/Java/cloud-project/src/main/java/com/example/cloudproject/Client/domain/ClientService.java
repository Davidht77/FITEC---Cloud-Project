package com.example.cloudproject.Client.domain;

import com.example.cloudproject.Client.dto.ClientRequestDto;
import com.example.cloudproject.Client.dto.ClientResponseDto;
import com.example.cloudproject.Client.dto.LoginCredentialsRequest;
import com.example.cloudproject.Client.dto.UserValidationResponse;
import com.example.cloudproject.Client.infrastructure.ClientRepository;
import com.example.cloudproject.Plan.domain.Plan;
import com.example.cloudproject.Plan.domain.PlanDto;
import com.example.cloudproject.Plan.infrastructure.PlanRepository;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final PlanRepository planRepository;


    public ClientService(ClientRepository clientRepository, PlanRepository planRepository) {
        this.clientRepository = clientRepository;
        this.planRepository  = planRepository;
    }

    private ClientResponseDto mapToDto(Client client) {
        Plan plan = client.getPlan();

        PlanDto planDto = new PlanDto();
        planDto.setName(plan.getName());
        planDto.setDescription(plan.getDescription());
        planDto.setPrice(plan.getPrice());

        ClientResponseDto clientDto = new ClientResponseDto();
        clientDto.setName(client.getName());
        clientDto.setLastName(client.getLastName());
        clientDto.setEmail(client.getEmail());
        clientDto.setPhone(client.getPhone());
        clientDto.setPlan(planDto);
        clientDto.setId(client.getId());


        return clientDto;
    }

    public List<ClientResponseDto> getAllClients() {
        return clientRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public Optional<ClientResponseDto> getClientById(UUID id) {
        return clientRepository.findById(id)
                .map(this::mapToDto);
    }

    public ClientResponseDto createClient(ClientRequestDto clientDto) {
        UUID planId = clientDto.getPlanId();

        if (planId == null) {
            throw new IllegalArgumentException("El Plan ID no puede ser nulo.");
        }

        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new IllegalArgumentException("El Plan con ID " + planId + " no existe."));

        Client client = new Client();
        client.setName(clientDto.getName());
        client.setLastName(clientDto.getLastName());
        client.setAge(clientDto.getAge());
        client.setEmail(clientDto.getEmail());
        client.setPhone(clientDto.getPhone());
        client.setPassword(clientDto.getPassword());
        client.setPlan(plan);


        clientRepository.save(client);

        return mapToDto(client);
    }
    public ClientResponseDto updateClient(UUID id, ClientRequestDto clientRequestDto) {
        return clientRepository.findById(id)
                .map(client -> {
                    if (clientRequestDto.getName() != null) {
                        client.setName(clientRequestDto.getName());
                    }
                    if (clientRequestDto.getLastName() != null) {
                        client.setLastName(clientRequestDto.getLastName());
                    }
                    if (clientRequestDto.getAge() != null) {
                        client.setAge(clientRequestDto.getAge());
                    }
                    if (clientRequestDto.getEmail() != null) {
                        client.setEmail(clientRequestDto.getEmail());
                    }
                    if (clientRequestDto.getPhone() != null) {
                        client.setPhone(clientRequestDto.getPhone());
                    }
                    if (clientRequestDto.getImagenUrlKey() != null) {
                        client.setImagenUrlKey(clientRequestDto.getImagenUrlKey());
                    }


                    // Obtener el plan por ID
                    Plan plan = planRepository.findById(clientRequestDto.getPlanId())
                            .orElseThrow(() -> new RuntimeException("Plan not found with id " + clientRequestDto.getPlanId()));
                    client.setPlan(plan);

                    Client savedClient = clientRepository.save(client);
                    return mapToDto(savedClient);
                })
                .orElseThrow(() -> new RuntimeException("Client not found with id " + id));
    }


    public void deleteClient(UUID id) {
        clientRepository.deleteById(id);
    }

    public UserValidationResponse credentials(LoginCredentialsRequest request){
        List<Client> list= clientRepository.findClientByEmail(request.getEmail());
        if(list.isEmpty()) {
            throw new IllegalArgumentException("El email no es ser valido.");
        }
        Client client = list.getFirst();
        ArrayList<String> roles = new ArrayList<>();
        roles.add("ROLE_USER");

        return new UserValidationResponse(client.getId(),client.getEmail(), client.getPassword(), roles);
    }







}
