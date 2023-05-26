const mysql = require('../banco')
//const express = require('express');


function ler(res){
    const sql = "SELECT * FROM valores";
    
    /* conectando ao Banco de Dados */
    conexao.query(sql,(erro, resultados)=>{
        if(resultados.length === 0){
            res.status(204).end(); /* 204 = sem conteudo. O método .end()para qualquer aplicação*/
            return; /* die() */
        }
        if(erro){
            res.status(400).json(erro.code); /* 400 = bad request, requisição inválida*/
        }else{
            res.status(200).json(resultados); /*  deu certo */
        }
    })
    }
    /* inserindo valores */
    function inserir(valores,res){
        /* inserir dados via node muda a forma do sql adicionando o set e um caracter coringa  ? */
    const sql = "INSERT INTO valores (potenciaTotalParametroKw, potenciaTotalPainelW, alturaPainel, larguraPainel, maximoPainelPorMicroInversor) VALUES (?,?,?,?,?)";
    
    conexao.query(sql,valores,(erro)=>{
        
        if(erro){
            res.status(400).json(erro.code);
        }else{
            res.status(201).json({"status": "valores inseridos!"});
        }
    })
    }
    function lerUm(id,res){
        const sql = "SELECT * FROM valores WHERE id_valores = ?";
        conexao.query(sql,id,(erro,resultados)=>{
            if(resultados.lenght === 0){
                res.status(204).end();
            }
            if(erro){
                res.status(400).json(erro.code);
            }else{
                res.status(200).json(resultados[0]);
            }
        })
    }
    function atualizar(id, valores, res){
        const sql = "UPDATE valores SET ? WHERE id_valores = ?";
        /* a ordem importa por conta do sql, primeiro pega dados dos valores dps o id */
        conexao.query(sql,[valores, id],(erro,resultados)=>{
            if(erro){
                res.status(400).json(erro.code);
            }else{/* 
                res.status(200).json({"status":"atualizado com sucesso!"}); */
                /* spread operator(operador de 'espalhamento' de objeto) */
                res.status(200).json({...valores,id});
    
            }
            
        });
    }
    function excluir(id, res){
        const sql = "DELETE FROM valores WHERE id_valores = ?";
    
        conexao.query(sql, id, (erro,resultados)=>{
            if(erro){
                res.status(400).json(erro.code);
            }else{    
             res.status(200).json({"status" : "valores excluídos",id});
            }
        });
    }
    module.exports = {ler,inserir, lerUm, atualizar, excluir};

















































//const router = express.Router()



/*
// Retorna todos os calculos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Retorna todos os calculo"
    });
});

// Insere um Calculo
router.post('/', (req, res, next) => {

    const calculo = {
        potenciaTotalParametroKw: req.body.potenciaTotalParametroKw,
        potenciaTotalPainelW: req.body.potenciaTotalPainelW,
        alturaPainel: req.body.alturaPainel,
        larguraPainel: req.body.larguraPainel,
        maximoPainelPorMicroInversor: req.body.maximoPainelPorMicroInversor
    }

   

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO valores (potenciaTotalParametroKw, potenciaTotalPainelW, alturaPainel, larguraPainel, maximoPainelPorMicroInversor) VALUES(?,?,?,?,?)',
            [
                req.body.potenciaTotalParametroKw,
                req.body.potenciaTotalPainelW,
                req.body.alturaPainel,
                req.body.larguraPainel,
                req.body.maximoPainelPorMicroInversor
            ],
            (error, resultado, field) => {
                conn.release()

                if(error){
                    res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(201).send({
                    mensagem: "Valores inseridos com sucesso",
                    id: resultado.insertId                
                })
            }
        )
    })


    // res.status(201).send({
    //     mensagem: "Insere um calculo",
    //     calculoCriado: calculo
    // })
})




// Insere um Calculo
router.post('/resultados', (req, res, next) => {
  
    const resultado = {
        quantidadeDePaineis: req.body.quantidadeDePaineis,
        quantidadeMicroInversores: req.body.quantidadeMicroInversores,
        quantidadeDeColunas: req.body.quantidadeMicroInversores,
        comprimentoDaEstrutura: req.body.comprimentoDaEstrutura,
        alturaDaEstrutura: req.body.comprimentoDaEstrutura,
        areaUtil: req.body.areaUtil
    }

    res.status(201).send({
        mensagem: "Insere um calculo",
        resultadoCriado: resultado
    })
})
























// Retorna os dados de um Calculo
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    res.status(200).send({
        id: id,
        mensagem: 'Usando o GET de um calculo específico'
        
    })
})

// Atualiza os dados de um Calculo
router.patch('/:id', (req, res, next) => {
    res.status(201).send({
        mensagem: "Usando o PATCH dentro da rota de calculo"
    });
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: "Usando o DELETE dentro da rota de calculo"
    });
});

connection.end();

module.exports = router
*/