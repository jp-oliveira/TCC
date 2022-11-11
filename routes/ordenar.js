var express = require('express');
var router = express.Router();

router.post('/', async function(req, res, next) {
    try{
        const db  = require('../db');
        const coluna    = req.body.coluna;
        const tipo      = req.body.tipo;
        const usuario   = req.body.form_usuario
        const senha     = req.body.form_senha
        const grupos    = req.body.form_grupos
        const registros = req.body.registros
        //registros é uma string
        //console.log( typeof registros)
        const sentidocoluna = req.body.sentidocoluna
        const sentido1 = req.body.sentido1
        const sentido2 = req.body.sentido2
        const sentido3 = req.body.sentido3
        const sentido4 = req.body.sentido4
        const sentido5 = req.body.sentido5
        const sentido6 = req.body.sentido6
        const sentido7 = req.body.sentido7
        const sentido8 = req.body.sentido8

        if(tipo == "locacoes"){
            var docs = await db.find_locacoes_ordenado(registros,coluna,sentidocoluna);
            res.render('index_locais',{docs2: "nenhum",usuario:usuario,senha:senha,grupos:grupos,docs, alerta: 'nenhum',sentidocoluna:sentidocoluna,sentido1:sentido1,sentido2:sentido2,sentido3:sentido3,sentido4:sentido4,sentido5:sentido5,sentido6:sentido6,sentido7:sentido7,sentido8:sentido8})
        }
        else{
            var docs = await db.find_musicas_ordenado(registros,coluna,sentidocoluna);
            res.render('index_musicas', {docs2:"nenhum",usuario:usuario,senha:senha,grupos:grupos,docs,alerta: 'nenhum',sentidocoluna:sentidocoluna,sentido1:sentido1,sentido2:sentido2,sentido3:sentido3,sentido4:sentido4,sentido5:sentido5,sentido6:sentido6,sentido7:sentido7,sentido8:sentido8})
        }
    }
    catch(ex){
        res.redirect('erro=${ex}');
    }
});
module.exports = router;