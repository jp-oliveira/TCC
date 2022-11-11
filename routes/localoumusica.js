var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  try{
    const usuario   = req.body.form_usuario
    const senha     = req.body.form_senha
    const grupos  = req.body.form_grupos
    if(usuario == undefined || senha == undefined){
      throw new Error("Você está sem um login válido. Volte à página inicial e faça login novamente!")
    }
    res.render('localoumusica', {usuario,senha, title: 'localoumusica',grupos:grupos });
  }
  catch(ex){
      res.status(500).send('Você está sem um login válido. Volte à página inicial e faça login novamente.');
  }
});

router.post('/', function(req, res, next) {
  
  try{
    const usuario = req.body.form_usuario
    const senha   = req.body.form_senha
    const grupos  = req.body.form_grupos
    res.render('localoumusica', {usuario,senha, title: 'localoumusica',grupos:grupos });
  }
  catch(ex){
    res.status(500).send('Você está sem um login válido. Volte à página inicial e faça login novamente.');
  }
});

module.exports = router;
