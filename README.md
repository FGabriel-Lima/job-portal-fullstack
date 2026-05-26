# 🚀 Ottolog - Portal de Vagas Fullstack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

Plataforma completa para atração de talentos e gerenciamento de vagas de emprego, desenvolvida como resolução de Desafio Técnico para a posição de Desenvolvedor Full Stack.

O sistema atende a dois públicos:

- **Candidatos** → visão pública com listagem, busca e detalhes de vagas.
- **Administradores** → painel protegido para gestão completa do ciclo de vida das vagas.

---

# 🌟 Diferenciais Implementados

Além dos requisitos obrigatórios, este projeto conta com:

- ✅ **Swagger** para documentação interativa e completa da API REST.
- ✅ **Context API** para gerenciamento global de autenticação.
- ✅ **Paginação e Ordenação** implementadas diretamente na API e consumidas pelo Front-end.
- ✅ **Controller Pattern** separando regras de negócio da camada de UI.
- ✅ **Arquitetura Documentada** com diagramas e fluxos.
- ✅ **UX Moderna** utilizando `Sonner` para feedback visual e modais organizados.

---

# 🛠 Tecnologias Utilizadas

## Front-end

- React + TypeScript (Vite)
- Tailwind CSS
- Lucide React
- React Router DOM
- Axios
- Sonner

---

## Back-end

- Node.js
- Express
- Prisma (ORM)
- Swagger (OpenAPI)
- JWT (JSON Web Tokens)
- Bcrypt
- PostgreSQL

---

# 🏗 Arquitetura e Fluxos

## 📌 Diagrama de Arquitetura

```mermaid
graph LR
    A[Client: React SPA] <-->|JSON / REST| B(API: Node/Express)
    B <-->|ORM / Driver| C[(Database)]

    style A fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
    style B fill:#43853D,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#336791,stroke:#333,stroke-width:2px,color:#fff
```

---

## 🔐 Fluxo de Autenticação

```mermaid
sequenceDiagram
    participant User
    participant FrontEnd
    participant API
    participant DB

    User->>FrontEnd: Preenche E-mail e Senha
    FrontEnd->>API: POST /auth/login
    API->>DB: Busca Administrador
    DB-->>API: Retorna Hash
    API->>API: Compara Bcrypt (Hash == Senha)
    API-->>FrontEnd: Retorna Token JWT
    FrontEnd->>FrontEnd: Salva Token (Storage) e Atualiza Context API
    FrontEnd-->>User: Redireciona para /dashboard
```

---

# 🧠 Decisões Técnicas Adotadas

## 📦 Separação de Responsabilidades (Controller Pattern)

No Front-end, as páginas não possuem lógica complexa diretamente nos componentes.

Toda a regra de negócio, paginação e controle de formulários foi abstraída para Custom Hooks, como:

```ts
useDashboardController()
```

Isso facilita:

- manutenção;
- reutilização;
- testes;
- escalabilidade.

---

## 🔑 Autenticação Stateless com JWT

A API não mantém sessões em memória.

Cada requisição privada envia:

```http
Authorization: Bearer <token>
```

Garantindo:

- segurança;
- desacoplamento;
- escalabilidade.

---

## ⚡ Otimização de Renderização em Modais

Os modais são montados condicionalmente:

```tsx
{isOpen && <Modal />}
```

Em vez de apenas escondidos via CSS.

Isso evita:

- renderizações desnecessárias;
- vazamento de estado;
- processamento extra.

---

## 🛡️ Produtividade e Segurança com Prisma ORM

A escolha do Prisma como ORM garantiu total type-safety na comunicação com o PostgreSQL, além de automatizar o gerenciamento do histórico do banco de dados através de migrações declarativas, acelerando o fluxo de desenvolvimento.

---

## ⚙️ Variáveis de Ambiente Necessárias

O projeto foi configurado para exigir o mínimo de configuração manual possível. Na raiz da pasta do Back-end (`api/`), você encontrará um arquivo chamado `.env-example`. 

Renomeie-o ou copie-o para `.env` e ajuste apenas as credenciais do seu banco de dados:

```env
# URL de conexão do Prisma com o PostgreSQL
# Substitua USER, PASSWORD e DATABASE_NAME pelos dados do seu ambiente local
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/ottolog_db?schema=public"

# Chave secreta para assinatura dos tokens JWT (pode ser mantida para testes locais)
JWT_SECRET="diretriz_secreta_para_teste_local"

---

# 🚀 Instalação e Execução

## 📋 Pré-requisitos

- Node.js v18+
- Banco de dados configurado e rodando

---

# ▶️ Rodando o Back-end

```bash
# Entre na pasta da API
cd api

# Instale as dependências
npm install

# Execute as migrações do Prisma para criar as tabelas no PostgreSQL
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

---

# ▶️ Rodando o Front-end

```bash
# Em outro terminal
cd web

# Instale as dependências
npm install

# Inicie a aplicação
npm run dev
```

---

# 📖 Documentação da API (Swagger)

A API conta com uma documentação interativa construída com Swagger, permitindo visualizar detalhes estruturais e testar os endpoints diretamente pelo navegador.

Com o servidor do Back-end em execução, acesse:

```txt
http://localhost:3333/docs
```

> Verifique a porta configurada no seu servidor Node.js.

---

## 📌 O que pode ser visualizado no Swagger

- Endpoints de autenticação;
- Contratos de requisição e resposta;
- Estrutura de payloads;
- Rotas públicas e privadas;
- Endpoints de gerenciamento de vagas;
- Testes interativos diretamente pelo navegador.

---

# 📂 Estrutura Recomendada do Projeto

```bash
ottolog/
├── api/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── services/
│   ├── config/
│   └── repositories/
│
├── web/
│   ├── src/
│   ├── pages/
│   ├── hooks/
│   ├── contexts/
│   ├── components/
│   └── services/
```

---

# 💼 Funcionalidades Principais

## 👨‍💻 Área Pública

- Visualização de vagas;
- Busca por título;
- Filtros;
- Paginação;
- Ordenação;
- Página de detalhes da vaga.

---

## 🛡 Área Administrativa

- Login protegido;
- Dashboard de métricas;
- Cadastro de vagas;
- Edição de vagas;
- Exclusão de vagas;
- Gerenciamento completo do portal.

---

# 📌 Melhorias Futuras

- Upload de currículo;
- Aplicação direta para vagas;
- Painel de candidatos;
- Upload de imagens;
- Dockerização;
- CI/CD;
- Dark Mode;
- Testes automatizados.

---

# 👨‍💻 Desenvolvido por Gabriel Lima

Desenvolvido com dedicação como resolução de Desafio Técnico Full Stack.