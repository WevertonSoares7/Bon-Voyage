package com.boot.springleme.resources;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.boot.springleme.domain.CidadeDestino;
import com.boot.springleme.dto.CidadeDestinoDTO;
import com.boot.springleme.services.CidadeDestinoService;

@RestController
@RequestMapping(value="/destinos")
public class CidadeDestinoResource {
	
	@Autowired
	private CidadeDestinoService service;
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<CidadeDestino> find(@PathVariable Integer id) {
		CidadeDestino obj = service.find(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Void> insert(@Valid @RequestBody CidadeDestinoDTO objDto) {
		CidadeDestino obj = service.fromDTO(objDto);
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Void> update(@Valid @RequestBody CidadeDestinoDTO objDto, @PathVariable Integer id) {
		CidadeDestino obj = service.fromDTO(objDto);
		obj = service.update(obj);
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<CidadeDestinoDTO>> findAll() {
		List<CidadeDestino> list = service.findAll();
		List<CidadeDestinoDTO> listDto = list.stream().map(obj -> new CidadeDestinoDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto);
	}
	
	@RequestMapping(value="/page", method=RequestMethod.GET)
	public ResponseEntity<Page<CidadeDestinoDTO>> findPage(
			@RequestParam(value="page", defaultValue="0") Integer page, 
			@RequestParam(value="linePerPage", defaultValue="24") Integer linesPerPage, 
			@RequestParam(value="orderBy", defaultValue="nome") String orderBy, 
			@RequestParam(value="direction", defaultValue="ASC") String direction) {
		Page<CidadeDestino> list = service.findPage(page, linesPerPage, orderBy, direction);
		Page<CidadeDestinoDTO> listDto = list.map(obj -> new CidadeDestinoDTO(obj));
		return ResponseEntity.ok().body(listDto);
	}
}
