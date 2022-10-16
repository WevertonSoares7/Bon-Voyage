package br.com.crud.model;

public class GuiaTuristico {
	
	private int id_guiaturistico;
	private String nome;
	private String email;
	private Double preco;
	
	
	public int getId_guiaturistico() {
		return id_guiaturistico;
	}
	public void setId_guiaturistico(int id_guiaturistico) {
		this.id_guiaturistico = id_guiaturistico;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Double getPreco() {
		return preco;
	}
	public void setPreco(Double preco) {
		this.preco = preco;
	}

	
	
	
}