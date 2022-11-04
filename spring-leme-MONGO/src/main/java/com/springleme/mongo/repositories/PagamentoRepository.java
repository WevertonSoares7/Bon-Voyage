package com.springleme.mongo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.springleme.mongo.domain.Pagamento;

@Repository
public interface PagamentoRepository extends MongoRepository<Pagamento, String> {

}
