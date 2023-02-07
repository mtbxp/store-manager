# Boas vindas ao repositório do projeto store-manager!

---

## Esse foi o primeiro projeto em que juntei tudo que vinha aprendendo ultimamente (Docker, Node, Mysql, Arquitetura de software de camadas MSC):

O objetivo era desenvolver uma API utilizando a arquitetura MSC (model-service-controller)!

A API construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Utilizei o banco de dados MySQL para a gestão de dados. Além disso, a API foi contruida no padrão RESTful.


## 🛠 Tecnologias usadas:

* JavaScript;
* Docker;
* Express;
* Node;
* Mysql;

## Execute localmente:

### 1. Clone o repositório
```
git clone git@github.com:mtbxp/store-manager.git
```

  * Entre na pasta do repositório que você acabou de clonar:
```
cd store-manager
```
### 2. Use os comandos:
```
docker-compose up -d
```
 (é preciso ter o docker instalado na maquina);
```
docker exec -it store_manager bash
```
(isso te dará acesso ao terminal do container);

### 3. Instale as dependências:
```
npm install
```
(para instalar as dependencias, é preciso ter o node instalado);

### 3. Crie o banco de dados

as querys para criar o banco de dados e popular estão presentes nos arquivos migration.sql e seed.sql respectivamente;


### 4. Inicie a aplicação com:
```
npm start 
```
ou 
```
npm run debug
```

### 4. Execute os testes da aplicação com:
```
npm test
```