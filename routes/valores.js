const express = require('express');
const conexao = require('../banco');
const app = express();

/* configurando suporte ao formato json */
app.use(express.json());



// Consulta todos os valores
app.get("/calculo", (req, res) => {
    conexao.query("SELECT * FROM valores", (err, results) => {
        if(err) {
            console.log("Erro ao executar a consulta:", err);
            res.status(500).json({ error: "Erro ao consultar registros"})
            return
        }
        res.json(results)
    })
  })


// Inserção de valores e cálculo dos resultados

app.post("/calculo", (req, res) => {
  const {
    potenciaTotalParametroKw,
    potenciaTotalPainelW,
    alturaPainel,
    larguraPainel,
    maximoPainelPorMicroInversor,
  } = req.body;

  const query =
    "INSERT INTO valores (potenciaTotalParametroKw, potenciaTotalPainelW, alturaPainel, larguraPainel, maximoPainelPorMicroInversor) VALUES (?, ?, ?, ?, ?)";
  conexao.query(
    query,
    [
      potenciaTotalParametroKw,
      potenciaTotalPainelW,
      alturaPainel,
      larguraPainel,
      maximoPainelPorMicroInversor,
    ],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir valores:", err);
        res.status(500).json({ error: "Erro ao inserir valores" });
        return;
      }

      const id_valores = result.insertId;

      // Calcular os valores adicionais
      const quantidadeDePaineis = Math.ceil(
        (potenciaTotalParametroKw * 1000) / potenciaTotalPainelW
      );
      const quantidadeMicroInversores = Math.ceil(
        quantidadeDePaineis / maximoPainelPorMicroInversor
      );
      const quantidadeColunas = Math.ceil(quantidadeDePaineis / 2);
      const comprimentoDaEstrutura = quantidadeColunas * larguraPainel;
      const alturaDaEstrutura = 2 * comprimentoDaEstrutura;
      const areaUtil = comprimentoDaEstrutura * alturaDaEstrutura;

      // Inserir os valores calculados na tabela "resultados"
      const resultadosQuery =
        "INSERT INTO resultados (id_valores, quantidadeDePaineis, quantidadeMicroInversores, quantidadeColunas, comprimentoDaEstrutura, alturaDaEstrutura, areaUtil) VALUES (?,?,?,?,?,?,?)";
      conexao.query(
        resultadosQuery,
        [
          id_valores,
          quantidadeDePaineis,
          quantidadeMicroInversores,
          quantidadeColunas,
          comprimentoDaEstrutura,
          alturaDaEstrutura,
          areaUtil,
        ],
        (err, result) => {
          if (err) {
            console.error("Erro ao inserir resultados:", err);
            res.status(500).json({ error: "Erro ao inserir resultados" });
            return;
          }
          res
            .status(201)
            .json({ message: "Valores e resultados inseridos com sucesso" });
        }
      );
    }
  );
});








/* configurando o servidor */
app.listen(3000, () => {
  console.log("Servidor Express iniciado na porta 3000");
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
