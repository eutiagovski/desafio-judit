# Desafio Judit

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

1. Certifique-se de ter o MongoDB instalado e em execução em sua máquina.
2. Copie o arquivo `.env.example` e renomeie para `.env`. Configure as variáveis de ambiente, como a URL do banco de dados MongoDB.

## Execução

Para executar o projeto, utilize o comando:

npm start

O servidor estará disponível em http://localhost:3000.

Rotas da API
Captura de Processos via CNJ

    POST /capture
        Captura um novo processo via CNJ e o coloca na lista de backlog.
        Parâmetros:
            lawsuit_cnj: Número do processo CNJ a ser capturado.

Movimentação de Processos entre Listas

    POST /capture/move
        Move um processo de uma lista para outra.
        Parâmetros:
            processId: ID do processo a ser movido.
            newList: Nova lista para onde o processo será movido (backlog, discover, lead, deal, archived).

Listagem de Processos

    GET /capture/list
        Lista todos os processos capturados, informando em qual lista eles estão.

    GET /processos/lista/:listaId
        Lista os processos presentes em uma lista específica, passando como parâmetro o ID da lista.

Estrutura do Banco de Dados

O banco de dados MongoDB é utilizado para armazenar os processos capturados. Os processos são organizados em diferentes listas:

    Backlog
    Discover
    Lead
    Deal
    Archived

Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request com melhorias, correções de bugs ou novas funcionalidades.
Licença

Este projeto está licenciado sob a MIT License.