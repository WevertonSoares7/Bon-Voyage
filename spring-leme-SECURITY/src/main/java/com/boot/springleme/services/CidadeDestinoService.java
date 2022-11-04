package com.boot.springleme.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.boot.springleme.domain.CidadeDestino;
import com.boot.springleme.dto.CidadeDestinoDTO;
import com.boot.springleme.repositories.CidadeDestinoRepository;
import com.boot.springleme.services.exceptions.DataIntegrityException;
import com.boot.springleme.services.exceptions.ObjectNotFoundException;

@Service
public class CidadeDestinoService {
	
	@Autowired
	private CidadeDestinoRepository repo;
	
	public CidadeDestino find(Integer id) {
		Optional<CidadeDestino> obj = repo.findById(id);
		if(obj == null) {
			throw new ObjectNotFoundException("Objeto não econtrado! Id: " + id
					+ ", Tipo: " + CidadeDestino.class.getName());
		}
		return obj.orElse(null);
	}
	
	public CidadeDestino insert(CidadeDestino obj) {
		return repo.save(obj);
	}
	
	public CidadeDestino update(CidadeDestino obj) {
		CidadeDestino newObj = find(obj.getId());
		updateData(newObj, obj);
		return repo.save(newObj); 
	}
	
	public void delete(Integer id) {
		find(id);
		try {
			repo.deleteById(id);
		}
		catch (DataIntegrityException e) {
			throw new DataIntegrityException("Não é possível excluir uma categoria que possui produtos");
		}
	}
	
	public List<CidadeDestino> findAll() {
		return repo.findAll();
	}
	
	public Page<CidadeDestino> findPage(Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return repo.findAll(pageRequest);
	}
	
	public CidadeDestino fromDTO(CidadeDestinoDTO objDto) {
		return new CidadeDestino(objDto.getId(), objDto.getNome(), null, null, null);
	}
	
	private void updateData(CidadeDestino newObj, CidadeDestino Obj) {
		newObj.setNome(Obj.getNome());
	}
} 

