var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', async function(req, res){
    
    try{
        const usuario = req.body.form_usuario
        const senha   = req.body.form_senha
        const tipo    = req.body.tipo
        
        if(usuario == undefined || senha == undefined){
           throw new Error("Você está sem um login válido. Volte à página inicial e faça login novamente!")
        }
        else{
            res.render('pesquisa', {usuario,senha,tipo});
        }
    }catch(ex){
        res.status(500).send('Você está sem um login válido. Volte à página inicial e faça login novamente.');
    }
});

router.post('/', async function(req, res){
    try{
        const usuario = req.body.form_usuario
        const senha   = req.body.form_senha
        const grupos  = req.body.form_grupos
        const tipo    = req.body.tipo
        const acao    = req.body.acao
        const filtro  = req.body.filtro

        if(filtro == "S"){
            const ESTADO = req.body.estado
            console.log(ESTADO + "cheguei aqui")
            const db = require("../db");
            const docs = await db.pesquisa_cidades({ESTADO:ESTADO},{CIDADE:1});
            res.send(docs)
        }
        else{
            if(usuario == undefined || senha == undefined){
                throw new Error("Você está sem um login válido. Volte à página inicial e faça login novamente!")
            }
            else{
                if(acao == "pesquisar"){
                    const nome = req.body.nome.length == 0  ? ".*.*" : ".*" + req.body.nome + ".*"
                    const ano  = req.body.ano.length  == 0  ? ".*.*" : ".*" + req.body.ano  + ".*"
                    const genero  = req.body.genero.length  == 0  ? ".*.*" : ".*" + req.body.genero  + ".*"
                    const comentarios  = req.body.comentarios.length  == 0  ? ".*.*" : ".*" + req.body.comentarios  + ".*"
                    if(tipo == "locacoes"){
                        const pais   = req.body.pais.length   == 0  ? ".*.*" : ".*" + req.body.pais   + ".*"
                        const regiao = req.body.regiao == undefined ? ".*.*" : ".*" + req.body.regiao + ".*"
                        const uf     = req.body.uf == undefined ? ".*.*" : ".*" + req.body.uf + ".*"
                        const cidade = req.body.cidade.length == 0  ? ".*.*" : ".*" + req.body.cidade + ".*"
                        
                        var procura = {NOME_FILME:{$regex:nome,$options : 'i'},ANO_FILME:{$regex:ano},GENERO:{$regex:genero,$options : 'i'},COMENTARIOS:{$regex:comentarios,$options : 'i'},PAIS_FILME:{$regex:pais,$options : 'i'},REGIAO_FILME:{$regex:regiao,$options : 'i'},ESTADO_FILME:{$regex:uf,$options : 'i'},CIDADE_LOCACAO:{$regex:cidade,$options : 'i'}}
                        const db = require("../db");
                        const docs = await db.pesquisa_locacoes(procura);
                        res.render('index_locais', {docs,alerta:"nenhum",usuario:usuario,senha:senha,grupos:grupos,docs2:"nenhum",sentidocoluna:"",sentido1:"",sentido2:"",sentido3:"",sentido4:"",sentido5:"",sentido6:"",sentido7:"",sentido8:""});
                    }
                    else{
                        const musica   = req.body.musica.length == 0   ? ".*.*" : ".*" + req.body.musica   + ".*"
                        const artista  = req.body.artista.length == 0  ? ".*.*" : ".*" + req.body.artista  + ".*"
                        const album    = req.body.album.length == 0    ? ".*.*" : ".*" + req.body.album    + ".*"
                        const anoalbum = req.body.anoalbum.length == 0 ? ".*.*" : ".*" + req.body.anoalbum + ".*"
                        console.log(artista)
                        var procura = {NOME_FILME:{$regex:nome,$options : 'i'},ANO_FILME:{$regex:ano},GENERO:{$regex:genero,$options : 'i'},COMENTARIOS:{$regex:comentarios,$options : 'i'},NOME_MUSICA:{$regex:musica,$options : 'i'},NOME_GRUPO:{$regex:artista,$options : 'i'},NOME_ALBUM:{$regex:album,$options : 'i'},ANO_ALBUM:{$regex:anoalbum}}
                        const db = require("../db");
                        const docs = await db.pesquisa_musicas(procura);
                        res.render('index_musicas', {docs,alerta:"nenhum",usuario:usuario,senha:senha,grupos:grupos,docs2:"nenhum",sentidocoluna:"",sentido1:"",sentido2:"",sentido3:"",sentido4:"",sentido5:"",sentido6:"",sentido7:"",sentido8:""});
                    }
                }
                else{
                    var filmes = await db.filmes_distinct('1');
                    var filmes2 = await db.filmes_distinct('2');
                    for(var i = 0; i < filmes2.length;i++){
                        filmes.push(filmes2[i])
                    }
                    filmes = [...new Set(filmes)];  //remove duplicates
                    
                    res.render('pesquisa', {usuario,filmes:filmes,docs:"",senha,grupos:grupos,tipo});
                }
            }
        }
    }
    catch(ex){
        res.status(500).send('Você está sem um login válido. Volte à página inicial e faça login novamente.');
    }
});

module.exports = router;