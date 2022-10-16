package br.com.crud.model;

public class Passageiro {
	
	private int id_passageiro;
	private String nome;
	private int cpf;
	private int telefone;

	
	
	public int getId_passageiro() {
		return id_passageiro;
	}
	public void setId_passageiro(int id_passageiro) {
		this.id_passageiro = id_passageiro;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public int getCpf() {
		return cpf;
	}
	public void setCpf(int cpf) {
		this.cpf = cpf;
	}
	public int getTelefone() {
		return telefone;
	}
	public void setTelefone(int telefone) {
		this.telefone = telefone;
	}
	
	
}