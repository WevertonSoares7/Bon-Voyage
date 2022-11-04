package com.boot.springleme.domain.enums;

public enum TipoRegiao {
	
	NACIONAL(1, "Nacional"), 
	INTERNACIONAL(2, "Internacional");
	
	private int cod;
	private String descricao;
	
	TipoRegiao(int cod, String descricao) {
		this.cod = cod;
		this.descricao = descricao;
	}

	public int getCod() {
		return cod;
	}

	public String getDescricao() {
		return descricao;
	}

	public static TipoRegiao toEnum(Integer cod) {
		if(cod == null) {
			return null;
		}
		
		for(TipoRegiao x : TipoRegiao.values()) {
			if(cod.equals(x.getCod())) {
				return x;
			}
		}
		
		throw new IllegalArgumentException("Id inválido: " + cod);
	}
}
