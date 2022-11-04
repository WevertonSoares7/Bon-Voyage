package com.springleme.mongo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.springleme.mongo.domain.Reserva;

@Repository
public interface ReservaRepository extends MongoRepository<Reserva, String> {

}
