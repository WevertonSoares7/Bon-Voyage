package com.springleme.mongo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.springleme.mongo.domain.CidadeDestino;

@Repository
public interface CidadeDestinoRepository extends MongoRepository<CidadeDestino, String> {

}
