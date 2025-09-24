const express = require('express');
const fs = require('fs');
const path = require('path');

const dbPath = path.join('db','disciplinas.json');

const app = express();


app.use(express.urlencoded({extended: true}));

app.get('/disciplinas', (req,res) => {

    const {sigla} = req.query;

    //buscar no banco de dados
    disciplnasString = fs.readFileSync(dbPath, {encoding: "utf8"});
    disciplinasJSON = JSON.parse(disciplnasString);

    //buscar a sigla
    disciplina = disciplinasJSON.find((d) => d.sigla.toLowerCase() === sigla.toLowerCase());
    if(disciplina){
        res.status(200).send(disciplina);
    }else{
        res.status(404).send('Disciplina Não Encontrada');
    }
    

});

app.post('/disciplinas', (req,res) => {
    
    //abri conexao com o banco de dados
    disciplnasString = fs.readFileSync(dbPath, {encoding: "utf8"});
    disciplinasJSON = JSON.parse(disciplnasString);

    const {descricao, sigla, nome} = req.body;
    console.log(descricao,nome,sigla);
    if(!descricao)
    {
        res.status(400).send('Obrigatório informar descrição');
    }
    else if(!sigla){
        res.status(400).send('Obrigatório informar uma sigla');
    }
    else if(!nome){
        res.status(400).send('Obrigatório informar um nome');
    }

    const novaDisciplinas = {
        id: disciplinasJSON.length + 1,
        sigla,
        ementa: 'asdasd',
        equivalencia: descricao
    }

    disciplinasJSON.push(novaDisciplinas);
    fs.writeFileSync(dbPath, JSON.stringify(disciplinasJSON,null,2));

    res.status(201).send('Sigla criada com sucesso');
})

app.listen(3000,() => {
    console.log('Servidor Ligado');
})