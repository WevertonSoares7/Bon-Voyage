package com.boot.springleme.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.boot.springleme.domain.CruzeiroDestino;
import com.boot.springleme.dto.CruzeiroDestino;
import com.boot.springleme.repositories.CruzeiroDestinoRepository;
import com.boot.springleme.services.exceptions.DataIntegrityException;
import com.boot.springleme.services.exceptions.ObjectNotFoundException;

@Service
public class CruzeiroDestinoService {
	
	@Autowired
	private CruzeiroDestinoRepository repo;
	
	public CruzeiroDestino find(Integer id) {
		Optional<CruzeiroDestino> obj = repo.findById(id);
		if(obj == null) {
			throw new ObjectNotFoundException("Objeto não econtrado! Id: " + id
					+ ", Tipo: " + CruzeiroDestino.class.getName());
		}
		return obj.orElse(null);
	}
	
	public CruzeiroDestino insert(CidadeDestino obj) {
		return repo.save(obj);
	}
	
	public CruzeiroDestino update(CruzeiroDestino obj) {
		CruzeiroDestino newObj = find(obj.getId());
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
	
	public List<CruzeiroDestino> findAll() {
		return repo.findAll();
	}
	
	public Page<Cruzeiro> findPage(Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return repo.findAll(pageRequest);
	}
	
	public CruzeiroDestino fromDTO(CruzeiroDestino objDto) {
		return new CruzeiroDestino(objDto.getId(), objDto.getNome(), null, null, null);
	}
	
	private void updateData(CruzeiroDestino newObj, CruzeiroDestino Obj) {
		newObj.setNome(Obj.getNome());
	}
} 
