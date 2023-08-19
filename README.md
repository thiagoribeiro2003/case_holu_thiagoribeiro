# README

Este é um exemplo de aplicativo Express.js que realiza inserções e consultas em um banco de dados e realiza cálculos com base nos valores inseridos.

## Instalação

1. Certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em seu sistema.
2. Faça o download ou clone este repositório em sua máquina local.
3. No diretório raiz do projeto, execute o comando `npm install` para instalar as dependências.

## Configuração do Banco de Dados

1. Certifique-se de ter um banco de dados MySQL configurado.
2. No arquivo `banco.sql`, possui o código SQL para a criação do banco de dados.
3. No arquivo `banco.js`, configure as informações de conexão com o seu banco de dados.

## Uso

1. Após a instalação e configuração, execute o comando `node src/valores.js` para iniciar o servidor.
2. O servidor estará em execução na porta 3000.
3. Use uma ferramenta de teste de API, como o Postman, para testar as rotas disponíveis.

## Rotas Disponíveis

### GET /calculo

- Descrição: Retorna uma combinação dos valores e resultados, unindo as tabelas "valores" e "resultados" com base no campo "id".
- Resposta: Array JSON com os valores e resultados encontrados.

### GET /calculo/:id

- Descrição: Consulta "valores" e "resultados" específicos com base no ID.
- Resposta: Array JSON com os resultados encontrados.

### POST /calculo

- Descrição: Insere valores na tabela "valores" e realiza cálculos adicionais, inserindo os resultados na tabela "resultados".
- Corpo da solicitação (JSON):
  - potenciaTotalParametroKw: Potência total do parâmetro em quilowatts.
  - potenciaTotalPainelW: Potência total do painel.
  - alturaPainel: Altura do painel.
  - larguraPainel: Largura do painel.
  - maximoPainelPorMicroInversor: Número máximo de painéis por microinversor.
- Resposta: JSON com a mensagem "Valores e resultados inseridos com sucesso" em caso de sucesso.

### PATCH /calculo/:id

- Descrição: Altera os "valores" de um calculo e muda seus "resultados" com base num Id específico
- Resposta: JSON com a mensagem "Valores e resultados atualizados com sucesso".
## Rotas do Insomnia

As rotas a seguir podem ser importadas no Insomnia para testar as funcionalidades da API.

### Calculo

- **GET** Visualizar Todos os Valores e Seus Resultados: `/calculo`
- **DELETE** Limpar Todos os Valores e Resultados: `/calculo`
<br>
- **GET** Visualizar valores e resultados específicos com base no Id: `/calculo/:id`
- **POST** Inserir um ou mais valores: `/calculo/:id`
- **PATCH** Alterar os valores de um calculo e muda seus resultados com base num Id específico.
- **DELETE** Limpar um valor Específico e seus resultados com base no Id: `/calculo/:id`

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões de melhorias, abra uma issue ou envie um pull request.
