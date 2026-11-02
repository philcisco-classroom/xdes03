const express = require('express');
const cors = require('cors');
const fs = require('fs');
const port = 3000;

const app = express();

//Permitir requisições vindo do domínio localhost (a propria máquina), mas em uma porta diferente. 5173 (porta padrão do react com vite)
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173'
    ] 
}));

//Ligar o servidor;
//executar comando: nodemon server.js
app.listen(port, () => {

    console.log(`Servidor ligado na porta ${port}`);

});

//Rota get para buscar todos os pokemon
//o front faz uma requisicao em http://localhost:3000/pokemon
app.get('/pokemon', (req,res) => {

    const dados = fs.readFileSync('db/pokemon.json', 'utf-8');
    res.json(dados);

});

//Rota get para buscar todos os pokemon de determinado tipo
//o front faz uma requisicao em http://localhost:3000/pokemon/tipo (tipo é uma variavel)
app.get('/pokemon/:tipo', (req,res) => {

    //Pega o tipo enviado pelo front
    const {tipo} = req.params;
    
    //Abre o arquivo pokemon.json
    const dados = fs.readFileSync('db/pokemon.json', 'utf-8');

    //Convert o text do arquivo para JSON bem formatado
    const pokemon = JSON.parse(dados);

    //Agora temos um array. Faz o filtro buscando o tipo enviado pelo front
    const pokemonDoTipo = pokemon.filter(p => p.tipos.includes(tipo));

    //Devolve a resposta com os pokemon do tipo específico
    res.json(pokemonDoTipo);

});