var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',async function(req, res, next) {
  /* const db = require("../usuarios");
     const user_Model = db.Mongoose.model('nome_do_modelo', db.userSchema,'CONTROLE_ACESSO');
	   const todos_usuarios = await user_Model.find(); */

  res.render('novo_usuario', {alerta:""});
});

/* POST new user */
router.post('/', async function(req, res){
 
  const usuario = req.body.username;
  const password = req.body.pass;
  const db = require("../db");
	const users = await db.findAll_usuarios();
  var usuarios = [];
  var alerta = "";
  users.forEach((elemento)=> {
    usuarios.push(elemento.user)
  })
  
  if(usuarios.indexOf(usuario) >= 0){
    alerta = "Já existe um usuário com esse mesmo nome. Favor inserir outro."
    res.render('novo_usuario', {alerta:alerta});
  }
  else{
    const db = require("../usuarios");
    const Users = db.Mongoose.model('users', db.userSchema, 'CONTROLE_ACESSO');
    const user = new Users({ user:usuario, password:password });
    await user.save();
    alerta = "NOVO USUÁRIO CRIADO COM SUCESSO."
    res.render('index', {alerta:alerta});
    //res.redirect("/");
  }
  
});
module.exports = router;