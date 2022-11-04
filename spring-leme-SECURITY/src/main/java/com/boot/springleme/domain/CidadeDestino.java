package com.boot.springleme.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class CidadeDestino implements Serializable {
	private static final long serialVersionUID = 1L; 
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) 
	private Integer id;
	private String nome;
	private String duracao;
	private Double preco;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="regioes_id")
	private RegiaoDestino regioes;

	@JsonIgnore
	@OneToMany(mappedBy="destinos")
	private List<Reserva> reserva = new ArrayList<>();
	
	public CidadeDestino() {
	}

	public CidadeDestino(Integer id, String nome, String duracao, Double preco, RegiaoDestino regioes) {
		super();
		this.id = id;
		this.nome = nome;
		this.duracao =  duracao;
		this.preco = preco;
		this.regioes = regioes;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	public String getDuracao() {
		return duracao;
	}

	public void setDuracao(String duracao) {
		this.duracao = duracao;
	}
	
	public RegiaoDestino getRegioes() {
		return regioes;
	}

	public void setRegioes(RegiaoDestino regioes) {
		this.regioes = regioes;
	}

	public List<Reserva> getReserva() {
		return reserva;
	}

	public void setReserva(List<Reserva> reserva) {
		this.reserva = reserva;
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
		CidadeDestino other = (CidadeDestino) obj;
		return Objects.equals(id, other.id);
	}	
}
