package com.boot.springleme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boot.springleme.domain.Reserva;

	@Repository
	public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

}
