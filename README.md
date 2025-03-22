# 📡 Sistema de Comunicação para Condomínios sem Portaria

## 🏠 Sobre o Projeto

Este sistema tem como objetivo resolver o problema de comunicação em condomínios sem portaria, facilitando a interação entre visitantes e moradores de forma segura e eficiente. Através de um QR Code na entrada do condomínio, visitantes podem solicitar comunicação diretamente com os moradores, que recebem notificações e podem responder através de um chat integrado.

## 🚀 Tecnologias Utilizadas

- **NestJS** - Framework para construção da API
- **MongoDB** - Banco de dados NoSQL
- **Arquitetura Modular Evolutiva** - Organização escalável do sistema

## 🎯 Fluxo de Uso

### 1️⃣ Visitante

1. Chega ao portão do condomínio e lê um QR Code.
2. É redirecionado para um site onde preenche um formulário com:
   - Nome
   - Objetivo da comunicação (ex.: entrega dos Correios)
   - Bloco e número do apartamento (selecionado a partir das opções cadastradas)
   - WhatsApp (opcional)
3. A requisição de comunicação é enviada ao morador do apartamento.

### 2️⃣ Morador

1. Faz login no sistema utilizando **e-mail e senha**.
2. Visualiza uma lista de requisições de comunicação pendentes e respondidas.
3. Pode **aceitar** ou **negar** a requisição.
4. Ao aceitar, um **chat** é aberto para comunicação com o visitante.
5. Quando a comunicação é concluída, o morador pode **encerrar** a conversa.

### 3️⃣ Administrador do Condomínio (Admin)

1. Pode **gerenciar as residências (houses)** cadastradas no sistema.
2. Pode **cadastrar, editar e excluir houses**.
3. Envia comunicados diretos para todos os usuários do condomínio.
4. Monitora o histórico das comunicações.

## 🏗️ Estrutura de Dados

### 📌 **Company (Empresa/Provedora)**

- Responsável por englobar todas as associações do sistema.
- Cada **Company** pode ter múltiplos **Admins** e **Houses**.

### 👤 **Admin (Administrador do Condomínio)**

- Pode criar, editar e excluir **Houses**.
- Envia mensagens para todos os usuários.
- Possui **e-mail, senha e nome**.
- Só pode ver as Houses pertencentes à sua própria **Company**.

### 🏡 **House (Residência)**

- Bloco e número do apartamento.
- Informações adicionais sobre o endereço (opcional).
- E-mail e senha (usados pelo morador para login).

### 📲 **Requisição de Comunicação**

- Criada quando um visitante preenche o formulário.
- O morador pode aceitar ou negar.
- Se aceita, abre um **chat** entre visitante e morador.
- Pode ser encerrada pelo morador quando concluída.

Feito com ❤️ para melhorar a comunicação em condomínios!
