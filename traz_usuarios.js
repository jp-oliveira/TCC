const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // evita erros durante o processo de dev de alguma aplicação
await main().catch(err => console.log("o erro foi o seguinte = " + err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/crud');

    const userSchema = new mongoose.Schema({
        user: String,
        password: String
    });
      
    const user_Model = mongoose.model('nome_do_modelo', userSchema,'CONTROLE_ACESSO');
    //const user_New = new user_Model({ user: 'usuario de teste do oliveira',password:'153'});
    //await user_New.save();
    const todos_usuarios = await user_Model.find();
    console.log(todos_usuarios);
    return todos_usuarios;
}
module.exports = {main}