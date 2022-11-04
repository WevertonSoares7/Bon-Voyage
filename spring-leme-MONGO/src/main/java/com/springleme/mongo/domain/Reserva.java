package com.springleme.mongo.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Document
public class Reserva implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	private String origem;

	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private Date dataEntrada;

	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private Date dataSaida;

	private Integer qtQuartos;
	private Integer qtPessoas;

	@DBRef(lazy = true)
	private Set<ItemPedido> itens = new HashSet<>();

	public Reserva() {
	}

	public Reserva(String id, String origem, Date dataEntrada, Date dataSaida, Integer qtQuartos, Integer qtPessoas) {
		super();
		this.id = id;
		this.origem = origem;
		this.dataEntrada = dataEntrada;
		this.dataSaida = dataSaida;
		this.qtQuartos = qtQuartos;
		this.qtPessoas = qtPessoas;
	}

	@JsonIgnore
	public List<Pedido> getPedidos() {
		List<Pedido> lista = new ArrayList<>();
		for (ItemPedido x : itens) {
			lista.add(x.getPedido());
		}
		return lista;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOrigem() {
		return origem;
	}

	public void setOrigem(String origem) {
		this.origem = origem;
	}
	
	public Date getDataEntrada() {
		return dataEntrada;
	}

	public void setDataEntrada(Date dataEntrada) {
		this.dataEntrada = dataEntrada;
	}

	public Date getDataSaida() {
		return dataSaida;
	}

	public void setDataSaida(Date dataSaida) {
		this.dataSaida = dataSaida;
	}

	public Integer getQtQuartos() {
		return qtQuartos;
	}

	public void setQtQuartos(Integer qtQuartos) {
		this.qtQuartos = qtQuartos;
	}

	public Integer getQtPessoas() {
		return qtPessoas;
	}

	public void setQtPessoas(Integer qtPessoas) {
		this.qtPessoas = qtPessoas;
	}

	public Set<ItemPedido> getItens() {
		return itens;
	}

	public void setItens(Set<ItemPedido> itens) {
		this.itens = itens;
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
		Reserva other = (Reserva) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}