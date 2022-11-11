var express = require('express');
var router = express.Router();

router.get('/', async function(req, res){
    try{
        const usuario = req.body.form_usuario
        const senha   = req.body.form_senha
        const grupos  = req.body.form_grupos
        if(usuario == undefined || senha == undefined){
            throw new Error("Você está sem um login válido. Volte à página inicial e faça login novamente!")
        }
        else{
            var doc={NOME_FILME:"", ANO_FILME:"", NOME_MUSICA:"",NOME_GRUPO:"",NOME_ALBUM:"",ANO_ALBUM:""}
            res.render('novo_locais', {doc,docs2:"nenhum",usuario:usuario,senha:senha,grupos:grupos,alerta:"nenhum"});
        }
    }
    catch(ex){
        res.status(500).send('Você está sem um login válido. Volte à página inicial e faça login novamente.');
    }
});

router.post('/', async function(req, res){

    try{
        const usuario = req.body.form_usuario
        const senha   = req.body.form_senha
        const grupos  = req.body.form_grupos
        const tipo    = req.body.tipo;
        
        if(usuario == undefined || senha == undefined){
            //throw Error("Você está sem um login válido. Volte à página inicial e faça login novamente2!")
        }
        else{
            var filmes = await db.filmes_distinct('1');
            var filmes2 = await db.filmes_distinct('2');
            for(var i = 0; i < filmes2.length;i++){
                filmes.push(filmes2[i])
            }
            filmes = [...new Set(filmes)];  //remove duplicates

            var doc={NOME_FILME:"", ANO_FILME:"", NOME_MUSICA:"",NOME_GRUPO:"",NOME_ALBUM:"",ANO_ALBUM:""}
            res.render('novo_locais', { title: 'Edição de Registro',filmes:filmes,usuario:usuario,senha:senha,grupos:grupos,tipo:tipo,doc,action:'/novo_locais' });
        }
    }
    catch(ex){
        res.status(500).send('Você está sem um login válido. Volte à página inicial e faça login novamente.');
        //res.redirect('erro=${ex}');
    }
});

module.exports = router;