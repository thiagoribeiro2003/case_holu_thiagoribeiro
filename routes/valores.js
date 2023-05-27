const express = require('express');
const conexao = require('../banco');
const app = express();

/* configurando suporte ao formato json */
app.use(express.json());


/*              VALORES        */

// Consulta todos os valores e resultados
app.get("/calculo", (req, res) => {
  const query = `
    SELECT valores.*, resultados.*
    FROM valores
    JOIN resultados ON valores.id = resultados.id
  `;

  conexao.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err);
      res.status(500).json({ error: "Erro ao consultar registros" });
      return;
    }

    const data = results.map((row) => ({
      valores: {
        id: row.id,
        potenciaTotalParametroKw: row.potenciaTotalParametroKw,
        potenciaTotalPainelW: row.potenciaTotalPainelW,
        alturaPainel: row.alturaPainel,
        larguraPainel: row.larguraPainel,
        maximoPainelPorMicroInversor: row.maximoPainelPorMicroInversor,
      },
      resultados: {
        id: row.id,
        quantidadeDePaineis: row.quantidadeDePaineis,
        quantidadeMicroInversores: row.quantidadeMicroInversores,
        quantidadeColunas: row.quantidadeColunas,
        comprimentoDaEstrutura: row.comprimentoDaEstrutura,
        alturaDaEstrutura: row.alturaDaEstrutura,
        areaUtil: row.areaUtil,
      },
    }));

    res.json(data);
  });
});

// Consulta valores e resultados específicos com base no ID
app.get("/calculo/:id", (req, res) => {
  const id = req.params.id;

  const query = `
    SELECT valores.*, resultados.*
    FROM valores
    JOIN resultados ON valores.id = resultados.id
    WHERE valores.id = ?
  `;

  conexao.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err);
      res.status(500).json({ error: "Erro ao consultar registros" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Cálculo não encontrado" });
      return;
    }

    const data = results.map((row) => ({
      valores: {
        id: row.id,
        potenciaTotalParametroKw: row.potenciaTotalParametroKw,
        potenciaTotalPainel: row.potenciaTotalPainel,
        alturaPainel: row.alturaPainel,
        larguraPainel: row.larguraPainel,
        maximoPainelPorMicroInversor: row.maximoPainelPorMicroInversor,
      },
      resultados: {
        id: row.id,
        quantidadeDePaineis: row.quantidadeDePaineis,
        quantidadeMicroInversores: row.quantidadeMicroInversores,
        quantidadeColunas: row.quantidadeColunas,
        comprimentoDaEstrutura: row.comprimentoDaEstrutura,
        alturaDaEstrutura: row.alturaDaEstrutura,
        areaUtil: row.areaUtil,
      },
    }));

    res.json(data[0]); // Retorna apenas o primeiro resultado encontrado
  });
});



// Insere os valores e com base neles enviam os resultados
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

      const id = result.insertId;

      // Calcular os valores adicionais
      const quantidadeDePaineis = Math.ceil(
        (potenciaTotalParametroKw * 1000) / potenciaTotalPainelW
      );
      const quantidadeMicroInversores = Math.ceil(
        quantidadeDePaineis / maximoPainelPorMicroInversor
      );
      const quantidadeColunas = Math.ceil(quantidadeDePaineis / 2);
      const comprimentoDaEstrutura = quantidadeColunas * larguraPainel;
      const alturaDaEstrutura = 2 * alturaPainel;
      const areaUtil = comprimentoDaEstrutura * alturaDaEstrutura;

      // Inserir os valores calculados na tabela "resultados"
      const resultadosQuery =
        "INSERT INTO resultados (quantidadeDePaineis, quantidadeMicroInversores, quantidadeColunas, comprimentoDaEstrutura, alturaDaEstrutura, areaUtil) VALUES (?,?,?,?,?,?)";
      conexao.query(
        resultadosQuery,
        [
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

// Altera os valores de um calculo e muda seus resultados com base num ID específico
app.patch("/calculo/:id", (req, res) => {
  const id = req.params.id;

  const {
    potenciaTotalParametroKw,
    potenciaTotalPainelW,
    alturaPainel,
    larguraPainel,
    maximoPainelPorMicroInversor,
  } = req.body;

  // Atualizar os valores na tabela "valores"
  const updateValoresQuery = `
    UPDATE valores
    SET potenciaTotalParametroKw = ?,
        potenciaTotalPainelW = ?,
        alturaPainel = ?,
        larguraPainel = ?,
        maximoPainelPorMicroInversor = ?
    WHERE id = ?
  `;

  conexao.query(
    updateValoresQuery,
    [
      potenciaTotalParametroKw,
      potenciaTotalPainelW,
      alturaPainel,
      larguraPainel,
      maximoPainelPorMicroInversor,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar valores:", err);
        res.status(500).json({ error: "Erro ao atualizar valores" });
        return;
      }

      // Calcular os novos valores
      const quantidadeDePaineis = Math.ceil(
        (potenciaTotalParametroKw * 1000) / potenciaTotalPainelW
      );
      const quantidadeMicroInversores = Math.ceil(
        quantidadeDePaineis / maximoPainelPorMicroInversor
      );
      const quantidadeColunas = Math.ceil(quantidadeDePaineis / 2);
      const comprimentoDaEstrutura = quantidadeColunas * larguraPainel;
      const alturaDaEstrutura = 2 * alturaPainel;
      const areaUtil = comprimentoDaEstrutura * alturaDaEstrutura;

      // Atualizar os resultados na tabela "resultados"
      const updateResultadosQuery = `
        UPDATE resultados
        SET quantidadeDePaineis = ?,
            quantidadeMicroInversores = ?,
            quantidadeColunas = ?,
            comprimentoDaEstrutura = ?,
            alturaDaEstrutura = ?,
            areaUtil = ?
        WHERE id = ?
      `;

      conexao.query(
        updateResultadosQuery,
        [
          quantidadeDePaineis,
          quantidadeMicroInversores,
          quantidadeColunas,
          comprimentoDaEstrutura,
          alturaDaEstrutura,
          areaUtil,
          id,
        ],
        (err, result) => {
          if (err) {
            console.error("Erro ao atualizar resultados:", err);
            res.status(500).json({ error: "Erro ao atualizar resultados" });
            return;
          }
          res.json({ message: "Valores e resultados atualizados com sucesso" });
        }
      );
    }
  );
});


// Exclui todos os valores e resultados do banco 
app.delete("/calculo", (req, res) => {
  // Excluir todos os registros da tabela "resultados"
  const resultadosQuery = "DELETE FROM resultados";

  conexao.query(resultadosQuery, (err, result) => {
    if (err) {
      console.error("Erro ao excluir registros da tabela 'resultados':", err);
      res.status(500).json({ error: "Erro ao excluir registros" });
      return;
    }

    // Excluir todos os registros da tabela "valores"
    const valoresQuery = "DELETE FROM valores";
    conexao.query(valoresQuery, (err, result) => {
      if (err) {
        console.error("Erro ao excluir registros da tabela 'valores':", err);
        res.status(500).json({ error: "Erro ao excluir registros" });
        return;
      }

      res.json({ message: "Registros excluídos com sucesso" });
    });
  });
});


// Exclui um calculo expecífico (junto com seus resultados)
app.delete("/calculo/:id", (req, res) => {
  const id = req.params.id;

  // Excluir o registro da tabela "resultados" usando o id_resultados correspondente na tabela "valores"
  const resultadosQuery = "DELETE FROM resultados WHERE id = (SELECT id FROM valores WHERE id = ?)";

  conexao.query(resultadosQuery, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir registro da tabela 'resultados':", err);
      res.status(500).json({ error: "Erro ao excluir registro" });
      return;
    }

    // Excluir o registro da tabela "valores"
    const valoresQuery = "DELETE FROM valores WHERE id = ?";
    conexao.query(valoresQuery, [id], (err, result) => {
      if (err) {
        console.error("Erro ao excluir registro da tabela 'valores':", err);
        res.status(500).json({ error: "Erro ao excluir registro" });
        return;
      }

      res.json({ message: "Registro excluído com sucesso" });
    });
  });
});

/* configurando o servidor */
app.listen(3000, () => {
  console.log("Servidor Express iniciado na porta 3000");
});