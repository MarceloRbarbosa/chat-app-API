Backend do sistema de bate papo inspirado no chat-uol.
 
## Deploy 

**API em produção (Render)**
```
https://bate-papo-uol-backend.onrender.com

Rota de saúde

https://bate-papo-uol-backend.onrender.com/health
``` 

## STACK
<ul>
  <li>Node.js</li>
  <li>Express</li>
  <li>TypeScript</li>
  <li>Prisma ORM</li>
  <li>PostegreSQL</li>
  <li>bcrypt</li>
  <li>JWT</li>
  <li>Vitest + SuperTest</li>
  <li>Docker</li>
  <li>CI/CD</li>
  <li>Github Actions</li>
</ul>

## Variáveis de ambiente

Crie um arquivo .env com:
```
PORT=5000 
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET="senhasupersecreta"
```

## Executando sem Docker

```
npm install
npm run dev
``` 

## Executando com Docker
```
docker build -t chat_uol .
docker run -p 5000:5000 --env-file .env chat_backend
```

## Executando com Docker Compose
```
docker compose up -d
```

Compose sobre o banco de dados Postegres com volume persistente e o backend com healthCheck dependente do banco


## Testes 

```
npm run test:ci
```

## CI / CD 

**CI** 
<li>Executa testes de integração</li>
<li>Utiliza banco PostgreSQL</li>
<li>Bloqueia deploy em caso de falha</li>

**CD**
<li>Deploy automático no RENDER</li>
<li>Build e Push da imagem no DOCKERHUB</li>
<li>Utilização de GitHub Secrets</li>
