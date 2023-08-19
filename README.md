# README

Este é um exemplo de aplicativo Express.js que realiza consultas em um banco de dados e realiza cálculos com base nos valores inseridos.

## Instalação

1. Certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em seu sistema.
2. Faça o download ou clone este repositório em sua máquina local.
3. No diretório raiz do projeto, execute o comando `npm install` para instalar as dependências.

## Configuração do Banco de Dados

1. Certifique-se de ter um banco de dados MySQL configurado.
2. No arquivo `banco.js`, configure as informações de conexão com o seu banco de dados.

## Uso

1. Após a instalação e configuração, execute o comando `node src/valores.js` para iniciar o servidor.
2. O servidor estará em execução na porta 3000.
3. Use uma ferramenta de teste de API, como o Postman, para testar as rotas disponíveis.

## Rotas Disponíveis

### GET /api/valores

- Descrição: Retorna todos os valores da tabela "valores".
- Resposta: Array JSON com os valores encontrados.

### GET /api/resultados

- Descrição: Retorna todos os resultados da tabela "resultados".
- Resposta: Array JSON com os resultados encontrados.

### GET /api/todosValores

- Descrição: Retorna uma combinação dos valores e resultados, unindo as tabelas "valores" e "resultados" com base no campo "id".
- Resposta: JSON com as propriedades "values" e "calculations" contendo os valores e resultados, respectivamente.

### POST /api/valores

- Descrição: Insere valores na tabela "valores" e realiza cálculos adicionais, inserindo os resultados na tabela "resultados".
- Corpo da solicitação (JSON):
  - potenciaTotalParametroKw: Potência total do parâmetro em quilowatts.
  - potenciaTotalPainel: Potência total do painel.
  - alturaPainel: Altura do painel.
  - larguraPainel: Largura do painel.
  - maximoPainelPorMicroInversor: Número máximo de painéis por microinversor.
- Resposta: JSON com a mensagem "Valores e resultados inseridos com sucesso" em caso de sucesso.

## Rotas do Insomnia

As rotas a seguir podem ser importadas no Insomnia para testar as funcionalidades da API.

### Valores

- **GET** Todos os Valores: `/api/valores`
- **POST** Inserir Valores: `/api/valores`
- **DELETE** Limpar Valores: `/api/valores`

### Resultados

- **GET** Todos os Resultados: `/api/resultados`
- **POST** Inserir Resultados: `/api/resultados`
- **DELETE** Limpar Resultados: `/api/resultados`

### Todos Valores e Resultados

- **GET** Todos Valores e Resultados: `/api/todosValores`

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões de melhorias, abra uma issue ou envie um pull request.
