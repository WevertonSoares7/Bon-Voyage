package com.boot.springleme.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.springleme.domain.Pedido;
import com.boot.springleme.repositories.PedidoRepository;
import com.boot.springleme.services.exceptions.ObjectNotFoundException;

@Service
public class PedidoService {
	
	@Autowired
	private PedidoRepository repo;
	
	public Pedido find(Integer id) {
		Optional<Pedido> obj = repo.findById(id);
		if(obj == null) {
			throw new ObjectNotFoundException("Objeto não econtrado! Id: " + id
					+ ", Tipo: " + Pedido.class.getName());
		}
		return obj.orElse(null);
	}
}