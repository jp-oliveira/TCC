var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

});

router.post('/', async function(req, res, next) {
    const db  = require('../db');
    const id  = req.body.id_local    //req.body se comporta como um json com todos os inputs do form
    const tipo = req.body.tipo;
    const usuario = req.body.form_usuario
    const senha   = req.body.form_senha
    const grupos  = req.body.form_grupos
    var filmes = await db.filmes_distinct('1');
    var filmes2 = await db.filmes_distinct('2');
    for(var i = 0; i < filmes2.length;i++){
        filmes.push(filmes2[i])
    }
    filmes = [...new Set(filmes)];  //remove duplicates
    
    if(tipo == "locacoes"){
        var doc = await db.findOne_locacoes(id);
        
        try{
            res.render('novo_locais', {title: 'Edição de Registro',usuario:usuario,filmes:filmes,docs2:"nenhum",senha:senha,grupos:grupos, doc,tipo, action:'/editar'})
        }
        catch(ex){
            res.redirect('erro=${ex}');
        }    
    }
    else{
        var doc = await db.findOne_musicas(id);
        try{
            res.render('novo_musicas', {title: 'Edição de Registro',usuario:usuario,filmes:filmes,docs2:"nenhum",senha:senha,grupos:grupos, doc,tipo, action:'/editar'})
        }
        catch(ex){
            res.redirect('erro=${ex}');
        }
    }
});
module.exports = router;