package com.example.cloudproject.Client.infrastructure;

import com.example.cloudproject.Client.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
    List<Client> findClientByEmail(String email);
}
