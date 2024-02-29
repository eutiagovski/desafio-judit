# Desafio Judit - Backend

Este é um desafio de implementação de uma API em Node.js utilizando TypeScript e MongoDB para gerenciar consultas a API da Judit. A API permite capturar processos via CNJ, movê-los entre listas e listar os processos presentes em cada lista.

## Requisitos do Projeto

- Node.js
- TypeScript
- MongoDB
- Express.js
- Mongoose

## Instalação

1. Clone este repositório para o seu ambiente local.
2. Instale as dependências do projeto executando `npm install`.

## Configuração do Ambiente

Para facilitar a execução deste desafio, optei por utilizar o Atlas (versão MongoDb online).

1. Não é necessário ter o MongoDB instalado e em execução em sua máquina.
2. Como este é apenas um desafio de código, o arquivo .env não esta sendo ignorado pelo github, de modo a facilitar a configuração do ambiente.

Caso prefira, poderá utilizar o modo container dessa aplicação.

## Execução

Para executar o projeto, utilize o comando:

npm start

O servidor estará disponível em http://localhost:4000.

Rotas da API

-- Captura de Processos via CNJ

    POST /capture
        Captura um novo processo via CNJ e o coloca na lista de backlog.
        Parâmetros:
            lawsuit_cnj: Número do processo CNJ a ser capturado.

-- Mover um Processo entre Listas

    POST /capture/move
        Move um processo de uma lista para outra.
        Parâmetros:
            lawsuit_cnj: Numero do processo a ser movido.
            newList: Nova lista para onde o processo será movido (backlog, discover, lead, deal, archived).

-- Listagem de Processos

    GET /capture/list
        Lista todos os processos capturados, informando em qual lista eles estão.

    GET /capture/lista?lista=backlog
        Pode-se usar uma query para filtrar a lista que deseja observar

Estrutura do Banco de Dados

O banco de dados MongoDB é utilizado para armazenar os processos capturados. Os processos são organizados em diferentes listas:

    Backlog
    Discover
    Lead
    Deal
    Archived

