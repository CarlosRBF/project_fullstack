# Instruções para funcionamento

##  Instalação e uso

### Requisitos:
- NodeJs a partir da versão 16.14.1
- Gerenciador de pacotes yarn ou npm
- Banco de dados PostgreSQL

###  Instalação
1 - Crie um banco de dados chamado vibe_database no PostgreSQL
2 - Após o clone no repositório para adicionar todas as dependências do package json execute o comando: 
`yarn install` 

3 - Crie um arquivo na raiz do projeto chamado .env e faça as configurações das variáveis de ambiente com base no .env.example do projeto
```
SECRET_KEY=chave secreta definida pelo seu time de desenvolvimento
DATABASE_URL="postgres:nome da database que criar para gerar o banco de dados"
DATABASE_USER="postgres://seu nome de usuário"  
```
4 - Para rodar projeto utilize o comando `yarn run dev` no terminal, caso de tudo certo receberá uma mensagem parecida com essa:

```
[INFO] 17:23:18 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 4.8.4)
query: SELECT * FROM current_schema()
query: CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
query: SELECT version();
Servidor executando.
```

<a name="devs"></a>
