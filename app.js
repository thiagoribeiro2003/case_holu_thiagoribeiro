const express = require('express')
const app = express();

const rotaCalculo = require('./routes/calculo')

app.use('/calculo', rotaCalculo)

module.exports = app