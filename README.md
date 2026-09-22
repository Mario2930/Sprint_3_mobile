# Metaindústria - Gestão de Acessos e EPIs (Integração Sprint 3)

Este repositório contém a versão final integrada do projeto **Metaindústria** (Sprint 3), reunindo a API REST em Spring Boot (Backend) e a aplicação mobile em React Native (Frontend). 

O sistema gere os espaços físicos da indústria, o nível de acesso necessário e mantém os contadores em tempo real de pessoas com e sem Equipamento de Proteção Individual (EPI). Nesta sprint, os dados simulados (mocks) foram totalmente removidos e a aplicação consome dados reais da base de dados.

## 🛠️ Arquitetura e Tecnologias

### Backend (Spring Boot / Java)
A API segue o padrão MVC em camadas, utilizando uma base de dados H2 em memória:
* **Model:** Entidades (`Sala`, `Usuario`, `Camera`).
* **Repository:** Acesso aos dados (CRUD automatizado).
* **Service:** Isolamento das regras de negócio.
* **Controller:** Exposição dos endpoints da API REST com a anotação `@CrossOrigin` ativada para permitir a comunicação com o frontend.

### Frontend (React Native / Expo)
A aplicação mobile foi refatorada para utilizar serviços assíncronos:
* **TypeScript:** Utilizado para tipagem estática rigorosa (ex: `Sala.ts`).
* **Axios:** Cliente HTTP utilizado para a comunicação com a API REST.
* **Camada de Serviços (`src/services`):** As chamadas de rede foram isoladas nos ficheiros `api.ts` e `salaService.ts`, garantindo que os ecrãs não constroem URLs manualmente.

## 🚀 Como executar o projeto integrado

Para o sistema funcionar corretamente, é obrigatório iniciar o Backend antes do Frontend.

### Passo 1: Subir a API (Backend)
1. Aceda à pasta do backend no seu terminal ou VS Code.
2. Certifique-se de que a porta `8080` está livre.
3. Inicie o Spring Boot executando a classe principal (`SprintJavaApplication.java`) ou rodando o comando:
   ```bash
   ./mvnw spring-boot:run

### Passo 2: Subir a Aplicação Mobile (Frontend)
Aceda à pasta do frontend no terminal.

Instale as dependências:
    ```bash
    npm install
    
    
### Inicie o Expo forçando a versão Web:
    npx expo start -w

(A aplicação abrirá automaticamente no navegador em http://localhost:8081).

## 🔌 Configuração da BASE_URL

A ligação entre o Frontend e o Backend é feita através do ficheiro src/services/api.ts.
Como a aplicação está a ser executada em ambiente Web (navegador), a variável BASE_URL está configurada para:
http://localhost:8080

Nota: Caso o projeto venha a ser testado num emulador Android, a URL deve ser alterada para http://10.0.2.2:8080.

## 📌 Funcionalidades Integradas (Endpoints da Sala)
O fluxo atual do ecrã consome os seguintes endpoints:

* Listagem (GET /salas): Carrega todas as salas ao abrir a aplicação utilizando useEffect.

* Cadastro (POST /salas): Envia um objeto Omit<Sala, 'id'> para criar um novo registo. A aplicação aguarda o sucesso para voltar à lista.

* Detalhes (GET /salas/{id}): Ao clicar num card, a aplicação busca as informações específicas daquela sala no servidor.

## ⚠️ Resiliência e Tratamento de Erros
A aplicação foi desenvolvida para não bloquear caso o servidor Spring Boot esteja desligado:

* Controlo de Estado: Utilização de blocos try/catch/finally em conjunto com os estados isLoading e error.

* Feedback Visual: Se a API não responder, é apresentado um Activity Indicator seguido de uma mensagem clara de erro: "Erro ao carregar as salas. O Backend está rodando?".

* Recuperação: O ecrã dispõe de um botão "Tentar Novamente" para forçar uma nova requisição GET sem necessidade de atualizar a página do navegador.