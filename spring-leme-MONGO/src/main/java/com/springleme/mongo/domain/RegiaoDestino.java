package com.springleme.mongo.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.springleme.mongo.domain.enums.TipoRegiao;

@Document
public class RegiaoDestino implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	private String id; 
	private String name;
	private Integer tipo;
	
	@DBRef(lazy = true)
	private List<CidadeDestino> destinos = new ArrayList<>();
	
	public RegiaoDestino() {
	}

	public RegiaoDestino(String id, String name, TipoRegiao tipo) {
		super();
		this.id = id;
		this.name = name;
		this.tipo = (tipo==null) ? null : tipo.getCod();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public TipoRegiao getTipo() {
		return TipoRegiao.toEnum(tipo);
	}

	public void setTipo(TipoRegiao tipo) {
		this.tipo = tipo.getCod();
	}

	public List<CidadeDestino> getDestinos() {
		return destinos;
	}

	public void setDestinos(List<CidadeDestino> destinos) {
		this.destinos = destinos;
	}

	public void setTipo(Integer tipo) {
		this.tipo = tipo;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RegiaoDestino other = (RegiaoDestino) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}