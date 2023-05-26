const mysql = require('mysql2')
/* configurando a conexão */
const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database: 'desafio_holu' 
});
/* conectando ao banco de dados */
conexao.connect(); 
conexao.connect(erro =>{
    if(erro){
        console.error(`Erro ao conectar: ${erro.message}`);
    }else{
        console.log(`Banco conectado em: ${conexao.config.host}`);
    }
});
module.exports = conexao;