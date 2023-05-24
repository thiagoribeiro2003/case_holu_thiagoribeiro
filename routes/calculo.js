const express = require('express');
const router = express.Router();


// Retorna todos os Calculos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna todos os calculos'
    })
})

// Insere um Calculo
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Insere um Calculo'
    })
})

// Retorna os dados de um calculo
router.get('/:id', (req, res, next) => {
    const id = req.params.id
 
     res.status(200).send({
        id: id,
        mensagem: 'Você passou um ID'
    })   
})

// ALTERA UM CALCULO
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Calculo Alterado'
    })
})

// EXCLUI UM CALCULO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Calculo Excluído'
    })
})


module.exports = router;