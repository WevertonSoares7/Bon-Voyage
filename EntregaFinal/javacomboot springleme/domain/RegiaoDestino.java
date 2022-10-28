package com.boot.springleme.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.boot.springleme.domain.enums.TipoRegiao;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class RegiaoDestino implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) 
	private Integer id; 
	private String name;
	private Integer tipo;
	
	@JsonIgnore
	@OneToMany(mappedBy="regioes")
	private List<CidadeDestino> destinos = new ArrayList<>();
	
	public RegiaoDestino() {
	}

	public RegiaoDestino(Integer id, String name, TipoRegiao tipo) {
		super();
		this.id = id;
		this.name = name;
		this.tipo = (tipo==null) ? null : tipo.getCod();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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
		return Objects.hash(id);
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
		return Objects.equals(id, other.id);
	}
}