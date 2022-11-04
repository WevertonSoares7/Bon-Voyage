package com.springleme.mongo.dto;

import java.io.Serializable;

import com.springleme.mongo.domain.CidadeDestino;

public class CidadeDestinoDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String nome;
	
	public CidadeDestinoDTO() {
	}
	
	public CidadeDestinoDTO(CidadeDestino obj) {
		id = obj.getId();
		nome = obj.getNome();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
}
