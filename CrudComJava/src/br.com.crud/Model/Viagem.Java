package br.com.crud.model;

import java.util.Date;

public class Viagem {
	
	private int id_viagem;
	private Date data;
	private String origem;
	private String destino;
	private double preco;
	
	
	public double getPreco() {
		return preco;
	}
	public void setPreco(double preco) {
		this.preco = preco;
	}
	public int getId_viagem() {
		return id_viagem;
	}
	public void setId_viagem(int id_viagem) {
		this.id_viagem = id_viagem;
	}
	public Date getData() {
		return data;
	}
	public void setData(Date data) {
		this.data = data;
	}
	public String getOrigem() {
		return origem;
	}
	public void setOrigem(String origin) {
		this.origem = origin;
	}
	public String getDestino() {
		return destino;
	}
	public void setDestino(String destino) {
		this.destino = destino;
	}

	
}