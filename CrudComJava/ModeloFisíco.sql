-- Geração de Modelo físico
-- Sql ANSI 2003 - brModelo.



CREATE TABLE cliente (
email Texto(1),
endereço Texto(1),
telefone Texto(1),
cliente_id Texto(1) PRIMARY KEY
)

CREATE TABLE pessoa_juridica (
cnpj Texto(1),
cliente_id Texto(1),
FOREIGN KEY(cliente_id) REFERENCES cliente (cliente_id)
)

CREATE TABLE pessoa_fisica (
cpf Texto(1),
cliente_id Texto(1),
FOREIGN KEY(cliente_id) REFERENCES cliente (cliente_id)
)

CREATE TABLE passeio (
aquático Texto(1),
selvagem Texto(1),
cultural Texto(1),
urbano Texto(1),
data_retorno Texto(1),
hora_saída Texto(1),
data_sáida Texto(1),
hora_retorno Texto(1),
hora_compra Texto(1),
passeio_id Texto(1) PRIMARY KEY,
local_partida Texto(1),
nome Texto(1)
)

CREATE TABLE cruzeiro (
data_retorno Texto(1),
Quantidade_dias Texto(1),
data_saída Texto(1),
hora_compra Texto(1),
hora_saida Texto(1),
hora_retorno Texto(1),
cruzeiro_id Texto(1) PRIMARY KEY,
local_partida Texto(1),
nome Texto(1)
)

CREATE TABLE carro (
carro_id Texto(1) PRIMARY KEY,
modelo Texto(1),
quantidade_dias Texto(1),
data_entrega Texto(1),
data_retirada Texto(1),
nome Texto(1)
)

CREATE TABLE viagem (
local_partida Texto(1),
local_destino Texto(1),
data_retorno Texto(1),
quantidade_dias Texto(1),
nome Texto(1),
viagem_id Texto(1) PRIMARY KEY,
hora_retorno Texto(1),
hora_saída Texto(1)
)

CREATE TABLE shop (
acessórios Texto(1),
bolsas Texto(1),
quantidade Texto(1),
hora_compra Texto(1),
shop_id Texto(1) PRIMARY KEY,
nome Texto(1)
)

CREATE TABLE compra (
compra_id Texto(1),
data Texto(1),
viagem Texto(1),
passeio Texto(1),
hora Texto(1),
shop Texto(1),
cruzeiro Texto(1),
formas_pagamento Texto(1),
passeio_id Texto(1),
cliente_id Texto(1),
cruzeiro_id Texto(1),
viagem_id Texto(1),
shop_id Texto(1),
PRIMARY KEY(compra_id,passeio_id,cliente_id,cruzeiro_id,viagem_id,shop_id)
)

CREATE TABLE aluguel (
carro_id Texto(1),
cliente_id Texto(1),
FOREIGN KEY(carro_id) REFERENCES carro (carro_id),
FOREIGN KEY(cliente_id) REFERENCES cliente (cliente_id)
)

