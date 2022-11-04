package com.springleme.mongo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.springleme.mongo.domain.Cliente;

@Repository
public interface ClienteRepository extends MongoRepository<Cliente, String> {

}
