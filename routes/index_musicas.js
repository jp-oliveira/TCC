var express = require('express');
var router = express.Router();

router.get('/', async function(req, res){
    
    try{
        const usuario = req.body.form_usuario
        const senha   = req.body.form_senha
        const alerta  = req.body.alerta
        const docs    = req.body.docs
        const grupos  = req.body.grupos

        if(usuario == undefined || senha == undefined){
           throw new Error("Você está sem um login válido. Volte à página inicial e faça login novamente1!")
        }
        else{
            res.render('index_musicas', {docs,docs2:"nenhum",alerta:alerta,grupos:grupos});
        }
    }
    catch(ex){
        res.status(500).send('Você está sem um login válido. Volte à página inicial e faça login novamente.');
    }
});

router.post('/', async function(req, res){
    const db = require('../db');
    var docs = await db.findAll_musicas();
    try{
        const usuario = req.body.form_usuario
        const senha   = req.body.form_senha
        const grupos  = req.body.form_grupos
        
        if(usuario == undefined || senha == undefined){
            //throw Error("Você está sem um login válido. Volte à página inicial e faça login novamente2!")
        }
        else{
            res.render('index_musicas', {docs,usuario,senha,grupos:grupos,docs2:"nenhum",alerta:"nenhum",sentidocoluna:"",sentido1:"",sentido2:"",sentido3:"",sentido4:"",sentido5:"",sentido6:"",sentido7:"",sentido8:""});
        }
    }
    catch(ex){
        res.status(500).send('Você está sem um login válido. Volte à página inicial e faça login novamente.');
        //res.redirect('erro=${ex}');
    }
});

module.exports = router;