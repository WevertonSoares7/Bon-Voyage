package com.boot.springleme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boot.springleme.domain.CidadeDestino;

@Repository
public interface CidadeDestinoRepository extends JpaRepository<CidadeDestino, Integer> {

}
