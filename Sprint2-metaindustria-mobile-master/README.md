# Metaindústria Mobile - Gestão de Acessos e EPIs (Sprint 2)

Este é o aplicativo mobile (frontend) desenvolvido para o projeto Metaindústria. O objetivo desta aplicação é gerir o acesso às salas e setores industriais, controlando o nível de segurança exigido e contabilizando os trabalhadores com e sem Equipamento de Proteção Individual (EPI).

## 🛠️ O que a aplicação faz (Funcionalidades)

A aplicação simula o fluxo completo de gestão de espaços industriais com as seguintes funcionalidades (MVP):
* **Listagem de Salas:** Exibição dinâmica de todos os setores registados, mostrando os níveis de acesso e a contagem de EPIs em tempo real.
* **Cadastro de Novos Registos:** Formulário para inserção de novas salas no sistema de monitorização. Os dados introduzidos são guardados no estado local da aplicação.
* **Detalhes do Setor:** Visualização aprofundada dos dados de uma sala específica após o clique no card correspondente.
* **Navegação em Ecrã Único:** Alternância fluida entre os ecrãs de lista, formulário e detalhes, gerida através do estado do React (sem dependência de bibliotecas externas de roteamento nesta fase).

## 💻 Tecnologias Utilizadas

* **React Native:** Framework principal para desenvolvimento mobile multiplataforma.
* **Expo:** Ferramenta para facilitar a criação, teste e execução do projeto.
* **TypeScript:** Superset do JavaScript utilizado para tipagem estática e garantir a integridade dos dados.

## 🗂️ Estrutura do Projeto

A arquitetura foi construída de forma modular para facilitar a futura integração com o backend real:

| Diretório | Exemplo de Ficheiro | Descrição |
| :--- | :--- | :--- |
| `src/components/` | `SalaCard.tsx` | Componentes visuais isolados e reutilizáveis. |
| `src/screens/` | `SalaCadastro.tsx` | Componentes de ecrã que representam as páginas da aplicação. |
| `src/types/` | `Sala.ts` | Tipagem e modelagem de dados baseada na entidade do backend. |
| `src/data/` | `mockSalas.ts` | Ficheiros de simulação (mocks) para os testes de interface. |

## 🗃️ Como os dados estão mockados

Para cumprir os requisitos desta Sprint sem integração com um backend real, os dados foram simulados (mockados) utilizando a estratégia de **Array Fixo associado ao Estado Local**:

1. **Array Fixo Base:** Criámos o ficheiro `src/data/mockSalas.ts` que exporta uma constante (`salasIniciais`). Esta constante é um array contendo objetos estáticos que respeitam rigorosamente a tipagem definida em `Sala.ts`.
2. **Gestão em Memória (`useState`):** No ficheiro principal (`App.tsx`), esse array é carregado como estado inicial de um Hook do React (`const [salas, setSalas] = useState(salasIniciais);`).
3. **Persistência Temporária:** Ao criar uma nova sala no ecrã de Cadastro, o novo objeto é adicionado a este estado local. A aplicação funciona exatamente como se estivesse conectada a uma base de dados real durante a sessão ativa, embora os dados originais do mock sejam restaurados se a aplicação for reiniciada.

## 🚀 Como executar o projeto

1. **Clone o repositório** e aceda à pasta do projeto mobile no seu terminal.
2. **Instale as dependências** do Node.js:
    npm install
    npx expo start
    -Caso nescessario:npx expo install react-dom react-native-web
    -Aperte W