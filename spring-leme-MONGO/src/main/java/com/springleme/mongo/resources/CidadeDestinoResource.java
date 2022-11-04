package com.springleme.mongo.resources;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.springleme.mongo.domain.CidadeDestino;
import com.springleme.mongo.dto.CidadeDestinoDTO;
import com.springleme.mongo.services.CidadeDestinoService;

@RestController
@RequestMapping(value = "/destinos")
public class CidadeDestinoResource {

	@Autowired
	private CidadeDestinoService service;
	
	@RequestMapping(method=RequestMethod.GET)
 	public ResponseEntity<List<CidadeDestinoDTO>> findAll() {
		List<CidadeDestino> list = service.findAll();
		List<CidadeDestinoDTO> listDto = list.stream().map(x -> new CidadeDestinoDTO(x)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
 	public ResponseEntity<CidadeDestinoDTO> findById(@PathVariable String id) {
		CidadeDestino obj = service.findById(id);
		return ResponseEntity.ok().body(new CidadeDestinoDTO(obj));
	}
	
	@RequestMapping(method=RequestMethod.POST)
 	public ResponseEntity<Void> insert(@RequestBody CidadeDestinoDTO objDto) {
		CidadeDestino obj = service.fromDTO(objDto);
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
 	public ResponseEntity<Void> delete(@PathVariable String id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
 	public ResponseEntity<Void> update(@RequestBody CidadeDestinoDTO objDto, @PathVariable String id) {
		CidadeDestino obj = service.fromDTO(objDto);
		obj.setId(id);
		obj = service.update(obj);
		return ResponseEntity.noContent().build();
	}
}
