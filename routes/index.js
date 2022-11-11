var express = require('express');
var router = express.Router();
//const db = require("../db");   // se colocasse somente db ele ia procurar na pasta de modulos
//const db2 = require("../db") não ia imprimir de novo, pois a conexão fica salva numa especie de cache

/* GET home page. */
router.get('/', async(req, res) =>{ //se botar _req fala que req não está sendo usado
  const alerta     = req.body.alerta
  try{
    res.render('index', {alerta:alerta});
  }
  catch(ex){
    res.redirect('erro=${ex}');
  }
});
module.exports = router;