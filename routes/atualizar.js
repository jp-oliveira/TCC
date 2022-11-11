var express = require('express');
var router = express.Router();

router.post('/', async function(req, res, next) {
    try{
        const db  = require('../db');
        const id  = req.body.meuid
        const tipo  = req.body.tipo
        const novo  = req.body.novo
        const usuario   = req.body.form_usuario
        const senha     = req.body.form_senha
        const grupos  = req.body.form_grupos
        const genero  = req.body.genero
        const comentarios = req.body.comentarios
        if(tipo == "locacoes"){
            const nome = req.body.nome;
            const ano = req.body.ano;
            const pais = req.body.pais;
            const regiao = req.body.regiao;
            const uf = req.body.uf;
            const cidade = req.body.cidade;
            if(novo == "SIM"){
                await db.insert_locacoes({"NOME_FILME":nome,"ANO_FILME":ano,"PAIS_FILME":pais,"REGIAO_FILME":regiao,"ESTADO_FILME":uf,"CIDADE_LOCACAO":cidade,"GENERO":genero,"COMENTARIOS":comentarios});
                var alerta_2 = "REGISTRO INCLUÍDO COM SUCESSO"
            }
            else{
                await db.update_locacoes(id,{"NOME_FILME":nome,"ANO_FILME":ano,"PAIS_FILME":pais,"REGIAO_FILME":regiao,"ESTADO_FILME":uf,"CIDADE_LOCACAO":cidade,"GENERO":genero,"COMENTARIOS":comentarios});
                var alerta_2 = "REGISTRO ALTERADO COM SUCESSO"
            }
            var docs = await db.findAll_locacoes();
            res.render('index_locais',{docs,docs2:"nenhum",usuario:usuario,senha:senha,grupos:grupos,alerta: alerta_2,sentidocoluna:"",sentido1:"",sentido2:"",sentido3:"",sentido4:"",sentido5:"",sentido6:"",sentido7:"",sentido8:""})
        }
        else{
            const nome = req.body.nome;
            const ano = req.body.ano;
            const grupo = req.body.artista;
            const musica = req.body.musica;
            const album = req.body.album;
            const anoalbum = req.body.anoalbum;
            if(novo == "SIM"){
                await db.insert_musicas({"NOME_FILME":nome,"ANO_FILME":ano,"NOME_GRUPO":grupo,"NOME_MUSICA":musica,"NOME_ALBUM":album,"ANO_ALBUM":anoalbum,"GENERO":genero,"COMENTARIOS":comentarios});
                var alerta_2 = "REGISTRO INCLUÍDO COM SUCESSO"
            }
            else{
                await db.update_musicas(id,{"NOME_FILME":nome,"ANO_FILME":ano,"NOME_GRUPO":grupo,"NOME_MUSICA":musica,"NOME_ALBUM":album,"ANO_ALBUM":anoalbum,"GENERO":genero,"COMENTARIOS":comentarios});
                var alerta_2 = "REGISTRO ALTERADO COM SUCESSO"
            }
            var docs = await db.findAll_musicas();
            res.render('index_musicas', {docs,docs2:"nenhum",usuario:usuario,senha:senha,grupos:grupos,alerta: alerta_2,sentidocoluna:"",sentido1:"",sentido2:"",sentido3:"",sentido4:"",sentido5:"",sentido6:"",sentido7:"",sentido8:""})
        }
    }
    
    catch(ex){
        res.redirect('erro=${ex}');
    }
});
module.exports = router;