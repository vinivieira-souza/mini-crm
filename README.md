# Novare Vision - Captação e Mini CRM

Sistema interno desenvolvido para a agência Novare Vision. O projeto consiste em um formulário conversacional (estilo chat) de alta conversão para captação de leads e um painel administrativo (Dashboard) para gestão, visualização e qualificação dos contatos recebidos.

## 🚀 Funcionalidades

- **Formulário Conversacional:** Interface fluida e amigável que guia o usuário através de perguntas sobre o projeto, gerando engajamento.
- **Cálculo de Estimativa Dinâmico:** Algoritmo interno que calcula uma faixa de preço do projeto com base nas respostas do cliente em tempo real.
- **Filtro de Qualificação:** Leads marcados como "Não interessado" não poluem o banco de dados, poupando processamento e armazenamento.
- **Dashboard Administrativo:** Tabela interativa com expansão de linhas (Accordion customizado) para visualizar o detalhamento do escopo, dados de contato e temperatura do lead (Quente, Morno, Frio).
- **Design System Premium:** Interface construída com Tailwind CSS e shadcn/ui, com animações suaves de entrada e digitação.

## 🛠️ Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/) (App Router):** Framework principal da aplicação (Frontend e Backend).
- **[React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/):** Base da construção das interfaces com tipagem estática e segura.
- **[Prisma ORM](https://www.prisma.io/) + SQLite:** Modelagem e persistência de dados rodando de forma leve e local.
- **[Zustand](https://zustand-demo.pmnd.rs/):** Gerenciamento de estado global (mantém a "memória" do formulário durante os passos).
- **[React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/):** Validação robusta de formulários (e-mails, números de telefone, etc).
- **[Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/):** Estilização e componentes de interface acessíveis.

## ⚙️ Como rodar o projeto localmente

Siga os passos abaixo para rodar o MVP na sua máquina:

### 1. Instale as dependências
```bash
npm install
```

### 2. Configure o Banco de Dados
O projeto utiliza o SQLite, então você não precisa instalar nenhum servidor externo. Basta gerar o arquivo local rodando o comando do Prisma:
```bash
npx prisma migrate dev
```

### 3. Rode o servidor de desenvolvimento
```bash
npm run dev
```

### 4. Acesse no navegador

Formulário (Visão do Cliente): http://localhost:3000

Dashboard (Visão da Agência): http://localhost:3000/dashboard

---

## 🐳 Como rodar com Docker

### Pré-requisitos
- Docker
- Docker Compose (plugin `docker compose`)

### Subindo em produção local com containers
```bash
docker compose up --build -d
```

Esse processo faz o seguinte automaticamente:
- constrói a imagem da aplicação Next.js;
- executa `prisma migrate deploy` no startup do container;
- sobe a aplicação em `http://localhost:3000`;
- persiste o banco SQLite em um volume Docker (`mini_crm_data`).

### Comandos úteis
```bash
# Ver logs da aplicação
docker compose logs -f app

# Parar os containers
docker compose down

# Parar e remover também o volume do banco
docker compose down -v
```

---

## 🗄️ Acessando os dados brutos (Prisma Studio)
Caso queira ver o banco de dados cru (sem ser pela interface do Dashboard), você pode abrir o painel nativo do Prisma:

```bash
npx prisma studio
```
Isso abrirá uma aba no navegador (geralmente na porta 5555) com a tabela de leads completa.
