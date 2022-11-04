package com.boot.springleme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boot.springleme.domain.RegiaoDestino;

@Repository
public interface RegiaoDestinoRepository extends JpaRepository<RegiaoDestino, Integer> {

}
