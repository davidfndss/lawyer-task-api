# LawerTask-API - Gerencie suas tarefas jurídicas

<br>


### 🌐 [Link do LawyerTask hospedado na Vercel](https://lawyertaskon.vercel.app)
### 📄 [Leia a Documentação & Teste a API pelo Swagger](https://lawyertaskapi.vercel.app/doc)
### 💻 [Front-End: Repositório Github](https://github.com/davidfndss/lawyer-task-front)




Este documento guia o setup local do projeto **LawerTask API** com NestJS & Prisma ORM.

<br>

## Pré-requisitos

Antes de rodar o projeto, você precisará de:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)
- PostgreSQL

> Caso precise de uma solução ao PostgreSQL em nuvem, recomendo o Supabase

<br>

# 🔧 Como Configurar o Projeto Manualmente 
Siga os passos abaixo:

#### 1. Clone o Repositório:

Abra um Terminal e Clone o repositório para sua máquina:

```bash
git clone https://github.com/davidfndss/lawyer-task-api.git
```

Navegue até o diretório

```sh
cd lawyer-task-api
```

<br>

#### 2. Configure as Variáveis de ambiente

Crie um arquivo `.env` e configure de acordo com o exemplo: 

```env
DATABASE_URL=<your-postgresql-database>
JWT_SECRET=<your-jwt-secret->

# Optional
PORT=<port-of-your-preference>
```

> No campo DATABASE_URL, utilize a URI de conexão ao seu banco de dados
> No campo JWT_SECRET, você pode gerar sua senha com o algoritmo SHA-256

<br>

#### 3. Instale as Dependências:

```sh
npm install
```

<br>

#### 4. Configure a estrutura do projeto no banco de dados:

```sh
npx prisma migrate dev --name init
```

<br>

#### 5. Rode o projeto:

```sh
npm run dev
```

Agora o projeto estará rodando

Se você não definiu a varável PORT manualmente, o Back-End estará rodando em `http://localhost:3000`
Caso contrário, estará rodando em `http://localhost:<PORT>`


<br>

#### 6. Acesse a documentação:

Abra o navegador e acesse a documentação da API em `http://localhost:<PORT>/doc`

<img width="1526" height="742" alt="image" src="https://github.com/user-attachments/assets/cbc464ce-57a8-43af-8dcc-5a7ff6d68dba" />

<br>

#### 7. Parar o Projeto:

Para parar o projeto, basta interromper o processo no terminal com o atalho `Ctrl + C`.

<br>

#### 8. Testes

Para rodar os testes unitários do projeto, digite:

```bash
$ npm run test
```

<br>

#### 9. Suporte

[Meu E-mail](mailto:davidfndssdev@gmail.com) para caso necessite entrar em contato

Para dúvidas técnicas consulte a documentação oficial dos frameworks e bibliotecas utilizadas:

<p>https://docs.nestjs.com</p>
<p>https://www.prisma.io/docs</p>
<p>https://supabase.com/docs</p>
<p>https://www.postgresql.org/docs</p>

<br>
<br>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Teconologias utilizadas no projeto:

![Nestjs](https://img.shields.io/badge/nestjs-purple?style=for-the-badge&logo=nestjs&logoColor=white)&nbsp;
![TypeScript](https://img.shields.io/badge/TypeScript-1572B6?style=for-the-badge&logo=typescript&logoColor=white)&nbsp;
![Prisma](https://img.shields.io/badge/Prisma-gray?style=for-the-badge&logo=prisma&logoColor=white)&nbsp;
![Node js](https://img.shields.io/badge/node.js-%234ea94b.svg?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)&nbsp;
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)&nbsp;
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)&nbsp;
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)&nbsp;

