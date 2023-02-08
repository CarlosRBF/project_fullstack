# Backend Application 

Este é um projeto de aplicação back-end feito com Node.js Express e utiliza o banco de dados PostgreSQL. O gerenciador de pacotes Yarn foi utilizado para adicionar algumas ferramentas úteis.

##  Instalação e uso

### Pré-requisitos:
Antes de começar, você precisa ter o seguinte software instalado em sua máquina:
- NodeJs a partir da versão 16.14.1
- Gerenciador de pacotes yarn ou npm
- Banco de dados PostgreSQL

###  Instalação
Siga os passos abaixo para instalar e executar a aplicação:
1 - Clone o repositório para sua máquina local:
$ git clone https://github.com/seu-usuario/seu-repositorio.git

2 - Instale as dependências do package json do projeto com o seguinte comando:
yarn install`

3 - Crie o banco de dados no PostgreSQL e altere as configurações de conexão no .env na raiz do arquivo para corresponderem às suas configurações:
```
POSTGRES_USER="postgres://seu nome de usuário"
POSTGRES_PASSWORD="postgres://senha do seu usário postgres"
POSTGRES_DB="postgres:nome da database que criar para gerar o banco de dados"
SECRET_KEY=chave secreta definida pelo seu time de desenvolvimento
HOST="localhost"
PORT="3000"
```

4 - Execute as migrations para criar as tabelas no banco de dados:
Primeira use esse comando para gerar as migrações iniciais:
yarn typeorm migration:generate -d src/data-source.ts src/migrations/nomeDaSuaPrimeiraMigrate
Depois faça isso para persistir e salvas as alterações no banco de dados: 
yarn typeorm migration:run -d src/data-source.ts

3 - Para rodar projeto utilize o comando `yarn run dev` no terminal, caso de tudo certo receberá uma mensagem parecida com essa:

```
[INFO] 17:23:18 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 4.8.4)
query: SELECT * FROM current_schema()
query: CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
query: SELECT version();
Servidor executando.
```
Agora, a aplicação estará disponível em http://localhost:3000.

<a name="devs"></a>

### Ferramentas adicionais: 
Algumas ferramentas úteis foram adicionadas ao projeto utilizando o Yarn, incluindo:

Express: framework para desenvolvimento de aplicações web com Node.js
TypeORM: TypeORM para trabalhar com banco de dados SQL no Node.js
PostgreSQL: banco de dados relacional
Bcrypt: biblioteca para criptografia de senhas
JWT: biblioteca para autenticação JSON Web Tokens

### Estrutura do projeto:
A estrutura do projeto é a seguinte:
.
+-- dist
+--node_modules
+--src
|   +-- database.js # configurações de conexão com o banco de dados
+-- @types # utilizado para sobrescrever a leitura global de alguns objetos na aplicação
+-- controllers # controlar das execições dos services de cada rota
+-- entities # entidades de cada tabela feita no projeto
+-- errors # criacao de erro global utilizada em todo projeto
+-- interfaces # interfaces das rotas, como sera o modelo de cada tabela, onde define os nomes das chaves e tamanho de cada valor
+-- middleware # middlewares que são criados para alguns controles específicos em algumas rotas
+-- migrations # migrations do banco de dados
+-- routes # rotas da aplicação
+-- services # serviços da aplicação, para cada uma das rotas do CRUD
|   +-- app.ts # ponto de entrada da aplicação
|   +-- data-source # responsável por verificar as configurações de ambiente e onde rodará o process.env, se vai ser somente na memória da própria aplicação (recomendado sqlite) somente em ambiente de desenvolvimento, para depois executar o Postgres
|   +-- server.ts # controlador de execução do localhost
+-- .env.example # nomes das variaveis de ambiente
+-- .env # variáveis de ambiente (precisa seguir o .env.example)
+-- .gitignore # arquivo de texto que diz ao Git quais arquivos ou pastas ele deve ignorar em um projeto.
+-- jest.config.ts # arquivo de testes em jest do projeto, caso exista, segue o mesmo do package.json
+-- package.json # arquivo que contém tudo necessário para instalar na aplicação, seprando o que irá rodar globalmente e o que será localmente
+-- tsconfig.json # configurações necessárias para o Typescript entender e rodar a aplicação
+-- yarn.lock # bloqueia as dependências instaladas em uma versão especifica
