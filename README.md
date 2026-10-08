<div align="center">
  <h1>📌 Sistema de Gerenciamento de Tarefas</h1>
  <h3>Bootcamp de Desenvolvimento Backend com .NET | WoMakersCode</h3>
  <img src="https://capsule-render.vercel.app/api?type=rect&color=C77DFF&height=6&width=800" alt="" />
  <h2><strong>Desafio Final API com Dot Net — Squad Carmem Portinho</strong></h2>
</div>

## 📖 Sobre o Projeto

Este projeto é a construção de uma aplicação completa (API Web + Front-end) para gerenciamento de tarefas, desenvolvida como requisito final do Bootcamp de Desenvolvimento Backend com .NET da **WoMakersCode**.

O sistema permite que uma usuária se cadastre, acesse a plataforma e gerencie suas próprias tarefas cotidianas (criar, visualizar, editar, marcar como concluída e excluir). A arquitetura foi construída com separação de responsabilidades em camadas (Controller, Service e Repository) no back-end, banco de dados relacional e consumo via front-end em Angular.

## 🚀 Tecnologias e Dependências

**Back-end (Web API):**

* **Linguagem:** C# (.NET 6+)
* **ORM:** Entity Framework Core
* **Banco de Dados:** SQLite (Arquivo local, sem necessidade de servidor)
* **Documentação:** Swagger / OpenAPI

**Front-end (Aplicação Web):**

* **Framework:** Angular 15+
* **Comunicação:** HttpClient (Consumo da API)

---

## ⚙️ Como executar o projeto localmente

Para rodar este projeto na sua máquina, você precisará do [SDK do .NET](https://dotnet.microsoft.com/download) e do [Node.js](https://nodejs.org/) instalados. Utilize o terminal (PowerShell ou Bash) do seu VS Code.

### 1. Clonar o repositório

```powershell
git clone <https://github.com/Marcia-Moreira/desafio-api-com-dot-net>
cd desafio-api-com-dot-net
```

### 2. Executar o Back-end (API)

Abra o terminal, navegue até a pasta do backend, restaure as dependências e inicie o servidor. O comando `dotnet run` irá compilar e executar a aplicação automaticamente:

```powershell
cd backend
dotnet restore
dotnet run
```

A API estará rodando localmente. Acesse a documentação do Swagger pelo navegador (verifique a porta gerada no terminal, ex: `http://localhost:5000/swagger`).

### 3. Executar o Front-end (Angular)

Abra um novo terminal (mantenha o backend rodando), navegue até a pasta do frontend, instale os pacotes e inicie a aplicação:

```powershell
cd frontend
npm install
ng serve -o
```

A página abrirá automaticamente no seu navegador em `http://localhost:4200`.

## 👩‍💻 Equipe e Plano de Ação (Próximas Etapas)

O desenvolvimento é colaborativo, onde cada integrante é responsável por uma parte do fluxo funcional.

### Marcia Moreira (Integrante A) — Fundações e Banco de Dados [✅ CONCLUÍDO]

* Criação do repositório, documentação (README) e estrutura base da API .NET.
* Configuração do Entity Framework Core.
* Criação das entidades `Usuaria` e `Tarefa` e geração do banco de dados físico (SQLite) através das Migrations.

### Aline Shimoi (Integrante B) — Endpoints e Regras de Negócio [🔄 A FAZER]

* **O que fazer:** Criar os Controllers, Services e Repositories para as operações CRUD.
* **Detalhes:** Implementar rotas para cadastrar usuária, criar nova tarefa, listar as tarefas da usuária, atualizar status e excluir. Garantir que a lógica passe pelas camadas corretas antes de salvar no banco.

### Luana Ferreira (Integrante C) — Tratamento de Erros e Validações [🔄 A FAZER]

* **O que fazer:** Proteger a API contra dados inválidos e documentar as rotas.
* **Detalhes:** Aplicar Data Annotations nas entidades (ex: `[Required]`, `[EmailAddress]`). Criar retornos padronizados com os Status HTTP corretos (ex: `404 NotFound`, `400 BadRequest`) e finalizar a configuração visual do Swagger para testes da equipe.

### Mariana Lemos (Integrante D) — Front-end em Angular [🔄 A FAZER]

* **O que fazer:** Criar a interface visual da aplicação.
* **Detalhes:** Desenvolver a tela de cadastro e a listagem de tarefas. Utilizar o `HttpClient` para conectar o visual aos endpoints construídos pelo Back-end, garantindo alertas visuais de sucesso ou erro na tela.

## 🔀 Regras de Colaboração e Versionamento (Git Flow)

Para garantir que o código de todas se integre sem quebrar o projeto, siga o padrão de repositório da equipe:

* Nunca faça commits diretos na branch `main`.
* Para cada tarefa, crie uma branch nova a partir da `main` utilizando os prefixos padronizados:
  * `feat/nome-da-tarefa` — Para funcionalidades novas
  * `fix/nome-do-ajuste` — Para correções de bugs
  * `docs/nome-do-texto` — Para atualizações de README
* Quando finalizar sua parte, envie para o GitHub (`git push`) e abra um Pull Request (PR) apontando para a `main`.
* Uma colega de equipe deverá fazer o Code Review do seu PR, verificando se o código resolve o objetivo da tarefa. O código só entra na `main` após revisão e aprovação.

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&color=C77DFF&height=6&width=800" alt="" />
</div>