package com.springleme.mongo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.springleme.mongo.domain.ItemPedido;

@Repository
public interface ItemPedidoRepository extends MongoRepository<ItemPedido, String> {

}
