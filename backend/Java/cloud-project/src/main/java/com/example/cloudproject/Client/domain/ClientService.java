package com.example.cloudproject.Client.domain;

import com.example.cloudproject.Client.infrastructure.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;
}
