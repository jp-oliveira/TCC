var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
	try{
		const usuario   = req.body.form_usuario
		const senha     = req.body.form_senha
		if(usuario == undefined || senha == undefined){
		  throw new Error("Você está sem um login válido. Volte à página inicial e faça login novamente!")
		}
		res.render('localoumusica', {usuario,senha, title: 'localoumusica' });
	}
	catch(ex){
	  res.status(500).send('Você está sem um login válido. Volte à página inicial e faça login novamente.');
	}
});

router.post('/', async function(req, res, next) {
    
	const usuario   = req.body.form_usuario
    const senha     = req.body.form_senha
	const tipo      = req.body.tipo

	if(tipo == "leitura"){
		res.render('localoumusica', {usuario:"LEITOR",senha:"SENHA_LEITOR",grupos:"LEITOR"})
	}
	else{
		const db = require("../db");
		const users = await db.findAll_usuarios();
		var usuarios = [];
		var senhas = [];
		var alerta = "";
		
		users.forEach((elemento)=> {
			usuarios.push(elemento.user)
			senhas.push(elemento.password)
		})
		
		if (usuarios.indexOf(usuario) >= 0){
			var index = usuarios.indexOf(usuario)
			
			if(senhas.indexOf(senha) == index){
				var grupos = users[index].GRUPOS_USUARIO  //LEITOR, ADM, ETC.
				
				var mudada    = [];
				mudada.push(2)
				//senha criptografa - criptografia 23
				for(var i = 0;i < senha.length;i++){
					mudada.push(senha[i].charCodeAt()*23 + 23)
					mudada.push(23*i + 23)
				}
				mudada.push(3)
				//fim criptografia
				res.render('localoumusica', {usuario:usuario,senha:mudada,grupos:grupos})
			}
				
			else{
				alerta = "Senha Incorreta! Favor rever suas credenciais."
				res.render('index', {alerta:alerta})
			}
		}
		else{
			alerta = "Usuário Inexistente! Favor rever suas credenciais."
			res.render('index', {alerta:alerta})
		}
	}
});

module.exports = router;