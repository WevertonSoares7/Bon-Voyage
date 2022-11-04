package com.springleme.mongo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.springleme.mongo.domain.RegiaoDestino;

@Repository
public interface RegiaoDestinoRepository extends MongoRepository<RegiaoDestino, String> {

}
