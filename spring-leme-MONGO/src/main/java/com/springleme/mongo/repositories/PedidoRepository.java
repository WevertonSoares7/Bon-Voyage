package com.springleme.mongo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.springleme.mongo.domain.Pedido;

@Repository
public interface PedidoRepository extends MongoRepository<Pedido, String> {

}
