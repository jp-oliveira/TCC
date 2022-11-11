var express = require('express');
var router = express.Router();

router.get('/', async function(req, res){

});

router.post('/', async function(req, res, next) {
    try{
        const db  = require('../db');
        const id  = req.body.id_local    //req.body se comporta como um json com todos os inputs do form
        const tipo = req.body.tipo;
        const usuario = req.body.form_usuario
        const senha   = req.body.form_senha
        const grupos  = req.body.form_grupos

        if(tipo == "locacoes"){
            await db.deleteOne_locacoes(id);
            var docs = await db.findAll_locacoes();
            res.render('index_locais',{docs,usuario:usuario,docs2:"nenhum",senha:senha,grupos:grupos, alerta: 'REGISTRO EXCLUÍDO COM SUCESSO.',sentidocoluna:"",sentido1:"",sentido2:"",sentido3:"",sentido4:"",sentido5:"",sentido6:"",sentido7:"",sentido8:""})
        }
        else{
            await db.deleteOne_musicas(id);
            var docs = await db.findAll_musicas();
            res.render('index_musicas', {docs,usuario:usuario,docs2:"nenhum",senha:senha,grupos:grupos,alerta: 'REGISTRO EXCLUÍDO COM SUCESSO.',sentidocoluna:"",sentido1:"",sentido2:"",sentido3:"",sentido4:"",sentido5:"",sentido6:"",sentido7:"",sentido8:""})
        }

    }
    catch(ex){
        res.redirect('erro=${ex}');
    }
});
module.exports = router;