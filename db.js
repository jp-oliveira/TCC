const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
mongoClient.connect("mongodb://localhost").then(conn => global.conn = conn.db("crud")).catch(err => console.log("o erro foi: "+err))

async function findAll_usuarios(){
	return global.conn.collection("CONTROLE_ACESSO").find().toArray();
}

async function findAll_musicas(){
	return global.conn.collection("FILMES_MUSICAS").find().toArray();
}

async function findAll_locacoes(){
	return global.conn.collection("FILMES_LOCACOES").find().toArray();
}

async function pesquisa_musicas(objeto){
	return global.conn.collection("FILMES_MUSICAS").find(objeto).toArray();
}

async function pesquisa_locacoes(objeto){
	return global.conn.collection("FILMES_LOCACOES").find(objeto).toArray();
}

async function pesquisa_cidades(objeto){
	return global.conn.collection("CIDADES").find(objeto).toArray();
}

async function filmes_distinct(arg){
	if(arg == 1)
		return global.conn.collection("FILMES_LOCACOES").distinct("NOME_FILME");
	else
		return global.conn.collection("FILMES_MUSICAS").distinct("NOME_FILME");
}

async function find_musicas_ordenado(registros,campo,sentido){
	var ordem;
	if (sentido == "direto"){ordem =1}
	else{ordem = -1}

	if (campo == "NOME_FILME"){	
		var mysort = {NOME_FILME: ordem}
		return global.conn.collection("FILMES_MUSICAS").find().sort(mysort).toArray();
	}
	else if (campo == "ANO_FILME"){
		var mysort = {ANO_FILME: ordem}
		return global.conn.collection("FILMES_MUSICAS").find().sort(mysort).toArray();
	}
	else if (campo == "NOME_MUSICA"){
		var mysort = {NOME_MUSICA: ordem}
		return global.conn.collection("FILMES_MUSICAS").find().sort(mysort).toArray();
	}
	else if (campo == "NOME_GRUPO"){
		var mysort = {NOME_GRUPO: ordem}
		return global.conn.collection("FILMES_MUSICAS").find().sort(mysort).toArray();
	}
	else if (campo == "NOME_ALBUM"){
		var mysort = {NOME_ALBUM: ordem}
		return global.conn.collection("FILMES_MUSICAS").find().sort(mysort).toArray();
	}
	else if (campo == "GENERO"){
		var mysort = {GENERO: ordem}
		return global.conn.collection("FILMES_MUSICAS").find().sort(mysort).toArray();
	}
	else if (campo == "COMENTARIOS"){
		var mysort = {COMENTARIOS: ordem}
		return global.conn.collection("FILMES_MUSICAS").find().sort(mysort).toArray();
	}
	else{
		var mysort = {ANO_ALBUM: ordem}
		return global.conn.collection("FILMES_MUSICAS").find().sort(mysort).toArray();
	}
}

async function find_locacoes_ordenado(registros,campo,sentido){
	var ordem;
	if (sentido == "direto"){ordem =1}
	else{ordem = -1}

	if (campo == "NOME_FILME"){
		var mysort = {NOME_FILME: ordem}
		return global.conn.collection("FILMES_LOCACOES").find().sort(mysort).toArray();
	}
	else if (campo == "ANO_FILME"){
		var mysort = {ANO_FILME: ordem}
		return global.conn.collection("FILMES_LOCACOES").find().sort(mysort).toArray();
	}
	else if (campo == "PAIS_FILME"){
		var mysort = {PAIS_FILME: ordem}
		return global.conn.collection("FILMES_LOCACOES").find().sort(mysort).toArray();
	}
	else if (campo == "NOME_GRUPO"){
		var mysort = {NOME_GRUPO: ordem}
		return global.conn.collection("FILMES_LOCACOES").find().sort(mysort).toArray();
	}
	else if (campo == "REGIAO_FILME"){
		var mysort = {REGIAO_FILME: ordem}
		return global.conn.collection("FILMES_LOCACOES").find().sort(mysort).toArray();
	}
	else if (campo == "ESTADO_FILME"){
		var mysort = {ESTADO_FILME: ordem}
		return global.conn.collection("FILMES_LOCACOES").find().sort(mysort).toArray();
	}
	else if (campo == "GENERO"){
		var mysort = {GENERO: ordem}
		return global.conn.collection("FILMES_LOCACOES").find().sort(mysort).toArray();
	}
	else if (campo == "COMENTARIOS"){
		var mysort = {COMENTARIOS: ordem}
		return global.conn.collection("FILMES_LOCACOES").find().sort(mysort).toArray();
	}
	else{
		var mysort = {CIDADE_LOCACAO: ordem}
		return global.conn.collection("FILMES_LOCACOES").find().sort(mysort).toArray();
	}
}

async function findOne_musicas(id){
	return global.conn.collection("FILMES_MUSICAS").findOne(new ObjectId(id));
}

async function findOne_locacoes(id){
	return global.conn.collection("FILMES_LOCACOES").findOne(new ObjectId(id));
}

async function insert_musicas(customer){
	return global.conn.collection("FILMES_MUSICAS").insertOne(customer);
}

async function insert_locacoes(customer){
	return global.conn.collection("FILMES_LOCACOES").insertOne(customer);
}

async function update_musicas(id, customer){
	return global.conn.collection("FILMES_MUSICAS").updateOne({_id : new ObjectId(id)}, {$set: customer});
}
//db.FILMES_MUSICAS.updateMany({COMENTARIOS:true}, {$set: {COMENTARIOS:""}});
async function update_locacoes(id, customer){
	return global.conn.collection("FILMES_LOCACOES").updateOne({_id : new ObjectId(id)}, {$set: customer});
}
async function deleteOne_musicas(id){
	return global.conn.collection("FILMES_MUSICAS").deleteOne({ _id: new ObjectId(id) });
}
async function deleteOne_locacoes(id){
	return global.conn.collection("FILMES_LOCACOES").deleteOne({ _id: new ObjectId(id) });
}
module.exports = {findAll_usuarios,findAll_locacoes,findAll_musicas, insert_locacoes, insert_musicas,findOne_locacoes,find_locacoes_ordenado,
find_musicas_ordenado,findOne_musicas, update_locacoes,update_musicas,pesquisa_cidades,filmes_distinct, deleteOne_locacoes, deleteOne_musicas,pesquisa_locacoes,pesquisa_musicas}