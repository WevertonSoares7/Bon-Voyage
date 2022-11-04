package com.springleme.mongo.domain;

import java.io.Serializable;
import java.util.Objects;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ItemPedidoPk implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@DBRef(lazy = true)
	private Pedido pedido;
	
	@DBRef(lazy = true)
	private Reserva reserva;
	
	public Pedido getPedido() {
		return pedido;
	}
	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}
	public Reserva getReserva() {
		return reserva;
	}
	public void setReserva(Reserva reserva) {
		this.reserva = reserva;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(pedido, reserva);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ItemPedidoPk other = (ItemPedidoPk) obj;
		return Objects.equals(pedido, other.pedido) && Objects.equals(reserva, other.reserva);
	}
}