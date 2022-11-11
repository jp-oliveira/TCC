/*new TYPE  //cannot use import outside a module
import { connect } from 'mongoose'  
connect
depois de fechar o endereço, colocar ',{}'  useMongoClient: true - erro = usemongoclient is not supported
*/
const mongoose = require('mongoose')
mongoose.Promise = global.Promise; // evita erros durante o processo de dev de alguma aplicação
mongoose.connect('mongodb://localhost/crud').then(() => {
    console.log("mongodb conectado com sucesso")
}).catch((err) => {   //aconteceria um erro se, por exemplo, o endereço estivesse errado
    console.log("houve o seguinte erro ao se conectar: " + err)
})

//nome da variavel com schema é só uma boa prática.
const userSchema = new mongoose.Schema({     //vantagem: mongo tem os mesmos tipos que javascript
    user: String,
    password: String
})

module.exports = {Mongoose: mongoose, userSchema: userSchema}