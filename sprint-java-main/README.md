# API Metaindústria - Controle de EPIs e Acesso (Sprint 1)

Esta é uma API REST desenvolvida em Spring Boot para o controle de acesso de operários e monitoramento da utilização de Equipamentos de Proteção Individual (EPIs) em ambientes industriais, atendendo aos requisitos da Sprint 1.

## Arquitetura
O projeto segue o padrão de desenvolvimento em camadas:
- `Model`: Entidades do banco de dados relacional.
- `Repository`: Interfaces de acesso aos dados (CRUD automatizado).
- `Service`: Isolamento das regras de negócio e validações.
- `Controller`: Exposição dos endpoints da API REST.

## Entidades e Funcionalidades (CRUD Completo)
A API gere três entidades principais:

* **`/usuarios`**: Gestão dos utilizadores do sistema e definição dos seus níveis de acesso (1 a 4).
* **`/salas`**: Núcleo da API. Gere os espaços físicos da indústria, o nível de acesso necessário para visualizar cameras e mantém os contadores em tempo real de pessoas com EPI (`qtdPessoasComEpi`) e sem EPI (`qtdPessoasSemEpi`).
* **`/cameras`**: Dispositivos de monitoramento IoT, obrigatoriamente vinculados a uma `Sala` (Relação N:1).

## Endpoints Disponíveis

Abaixo estão as rotas disponíveis na aplicação para realizar o CRUD completo:

| Endpoint | Método HTTP | Descrição |
| :--- | :--- | :--- |
| `/salas` | `GET` | Lista todas as salas cadastradas. |
| `/salas/{id}` | `GET` | Busca uma sala específica pelo ID. |
| `/salas` | `POST` | Cria uma nova sala. |
| `/salas/{id}` | `PUT` | Atualiza os dados de uma sala específica (ex: atualiza os contadores de EPI). |
| `/salas/{id}` | `DELETE` | Remove uma sala do sistema. |
| `/usuarios` | `GET` | Lista todos os usuários. |
| `/usuarios/{id}` | `GET` | Busca um usuário específico pelo ID. |
| `/usuarios` | `POST` | Cadastra um novo usuário com nível de acesso. |
| `/usuarios/{id}` | `PUT` | Atualiza os dados de um usuário existente. |
| `/usuarios/{id}` | `DELETE` | Remove um usuário do sistema. |
| `/cameras` | `GET` | Lista todas as câmeras e suas respectivas salas. |
| `/cameras/{id}` | `GET` | Busca os dados de uma câmera específica pelo ID. |
| `/cameras` | `POST` | Cadastra uma nova câmera vinculada obrigatoriamente a uma sala. |
| `/cameras/{id}` | `PUT` | Atualiza os dados de uma câmera existente. |
| `/cameras/{id}` | `DELETE` | Remove uma câmera do sistema. |

## Como Rodar o Projeto

1. Clone este repositório para a sua máquina:
   ```bash
    git clone https://github.com/Mario2930/sprint-java
    ```
    Rode o arquivo SprintJavaApplication.java