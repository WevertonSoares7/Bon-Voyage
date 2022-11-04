package com.boot.springleme.services;

import org.springframework.mail.SimpleMailMessage;

import com.boot.springleme.domain.Cliente;
import com.boot.springleme.domain.Pedido;

public interface EmailService {

	void sendOrderConfirmationEmail(Pedido obj);
	
	void sendEmail(SimpleMailMessage msg);
	
	void sendNewPasswordEmail(Cliente cliente, String newPass);
}