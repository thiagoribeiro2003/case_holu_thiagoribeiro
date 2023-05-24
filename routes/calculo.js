const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de calculo'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de calculo'
    })
})

modeule.exports = router