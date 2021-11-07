# CRUD de posts com Adonis.js  e PostgreSQL :rocket:

## Lista de comandos importantes:point_down:

### :arrow_forward: Instalar o lucid

```
npm i @adonisjs/lucid
```

### :arrow_forward: Configurar qual banco de dados utilizar

- Quando o comando abaixo for utilizado, você poderá selecionar qual banco irá utilizar, como por exemplo: **MySQL**, **PostgreSQL**, **MsSQL Driver**, **OracleDB**, **SQLite**, etc...

- :warning: **Observação:** Não esquecer de definir os tipos das variáveis de ambiente no arquivo **env.ts**

```
node ace configure @adonisjs/lucid
```

### :arrow_forward: Criar um migração

```
node ace make:migration <nomedamigracao>
```

- Quando o comando acima for executado no  terminal, será criado um arquivo de migração como o nome informado no diretório: <code>database/migrations</code>

### :arrow_forward: Executar migração para conectar com o banco de dados configurado

```
node ace migration:run
```

### :arrow_forward: Criar um model

```
node ace make:model <nomedomodel>
```

### :arrow_forward: Criar um controller

```
node ace make:controller <nomedocontroller> -r
```

### :arrow_forward: Rodando a API com hot-reload :fire:

```
npm run dev
```
