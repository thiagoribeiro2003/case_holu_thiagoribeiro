/*const mysql = require("./banco")
 
conxao.connect();

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS desafio_holu.testandooo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    potenciaTotalParametroKw FLOAT,
    potenciaTotalPainel INT,
    alturaPainel INT,
    larguraPainel FLOAT,
    maximoPainelPorMicroInversor FLOAT
  );
`;

connection.query(createTableQuery, (error, results, fields) => {
  if (error) {
    console.error('Erro ao criar tabela:', error);
  } else {
    console.log('Tabela criada com sucesso');
  }
});

conexao.end();*/


const express = require('express');
const { ler, inserir, lerUm, atualizar, excluir } = require("./routes/valores");

const app = express();
const porta = process.env.PORT || 3000;

/* configurando suporte ao formato json */
app.use(express.json());

/* Configurar suporte a dados de inputs de formularios */
app.use(express.urlencoded({extended:true}));


/* Rotas */
/* rota (endpoint) para a raiz da API */
app.get('/calculo', (req, res)=>{
  res.send(`página inicial da aplicação`);
  ler(req);
});

/* rota para exibir todos os alunos */
app.get('/calculo', (req, res)=>{
  /* res.send(`Exibir todos os alunos.`); */
  ler(res);
});

/* rota para exibir um unido aluno */
app.get('/calculo/:id', (req, res)=>{
  /* res.send(`Exibir dados de UM aluno.`); */
  const id = parseInt(req.params.id);
  lerUm(id,res);
});

/* rota  */
app.post('/calculo', (req, res)=>{
  
  /* res.send(`Inserir calculo.`); */
  /* capturando os dados a partir do corpo da requisição */
  const novoCalculo = req.body;
  /* executando a função inserir e passando os parâmetros novoCalculo e res */
  inserir(novoCalculo,res);
  
});

/* rota para atualizar todos os alunos */
app.put('/calculo/:id', (req, res)=>{
  
  res.send(`atualizar todos os dados de um calculo`);
});

/* rota para atualizar alguns/todos alunos */
app.patch('/calculo/:id', (req, res)=>{
  
 /*  res.send(`atualizar alguns/todos alunos`); */
 const id = parseInt(req.params.id);
 const calculo = req.body;
 atualizar(id,calculo,res);
});

/* rota para excluir alunos */
app.delete('/calculo/:id', (req, res)=>{ 
  
  /* res.send(`excluir aluno`); */
  const id = parseInt(req.params.id);
  excluir(id,res);
});

/* configurando o servidor */
app.listen(porta, ()=>{
  console.log(`Servidor express rodando...`);
});




















/*
const potenciaTotalParametroKw = 4.5;
const potenciaTotalPainelW = 550;
const alturaPainel = 1.95;
const larguraPainel = 1.1;
const maximoPainelPorMicroInversor = 4;

function descobrindoValores(potenciaTotalParametroKw){
  const quantidadeDePaineis = Math.ceil(potenciaTotalParametroKw * 1000 / potenciaTotalPainelW);
  const quantidadeMicroInversores =  Math.ceil(quantidadeDePaineis / maximoPainelPorMicroInversor);
  const quantidadeDeColunas = Math.ceil(quantidadeDePaineis / 2);                          
  const comprimentoDaEstrutura = quantidadeDeColunas * larguraPainel;
  const alturaDaEstrutura = 2 * alturaPainel; // 2 - Quantidade de linhas (pois será uma linha com 5 paineis e outra com 4 paineis)
  const areaUtil = comprimentoDaEstrutura * alturaDaEstrutura

  return{
    quantidadeDePaineis,
    quantidadeMicroInversores,
    quantidadeDeColunas,
    comprimentoDaEstrutura,
    alturaDaEstrutura,
    areaUtil
  } 
}

const resultado = descobrindoValores(potenciaTotalParametroKw);

console.log(`Quantidade de painéis necessários: ${resultado.quantidadeDePaineis}`);
console.log(`Quantidade de micro inversores necessários: ${resultado.quantidadeMicroInversores}`);
console.log(`Comprimento da estrutura necessária: ${resultado.comprimentoDaEstrutura}m`);
console.log(`Área útil nescessária: ${resultado.areaUtil}m²`);
*/







