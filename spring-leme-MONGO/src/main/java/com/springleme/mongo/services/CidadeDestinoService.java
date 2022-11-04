package com.springleme.mongo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springleme.mongo.domain.CidadeDestino;
import com.springleme.mongo.dto.CidadeDestinoDTO;
import com.springleme.mongo.repositories.CidadeDestinoRepository;
import com.springleme.mongo.services.exception.ObjectNotFoundException;

@Service
public class CidadeDestinoService {

	@Autowired
	private CidadeDestinoRepository repo;
	
	public List<CidadeDestino> findAll(){
		return repo.findAll();
	}
	
	public CidadeDestino findById(String id) {
		Optional<CidadeDestino> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
	}
	
	public CidadeDestino insert(CidadeDestino obj) {
		return repo.insert(obj);
	}
	
	public void delete(String id) {
		findById(id);
		repo.deleteById(id);
	}

	public CidadeDestino update(CidadeDestino obj) {
		CidadeDestino newObj = findById(obj.getId());
		updateData(newObj, obj);
		return repo.save(newObj);
	}

	private void updateData(CidadeDestino newObj, CidadeDestino obj) {
		newObj.setNome(obj.getNome());
	}
	
	public CidadeDestino fromDTO(CidadeDestinoDTO objDto) {
		return new CidadeDestino(objDto.getId(), objDto.getNome(), null, null);
	}
}