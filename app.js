var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');

//PAGINAS DO SITE - rotas e os parâmetros passados
var indexRouter   = require('./routes/index'        );
var novoUsuario   = require('./routes/novo_usuario' );
var usersRouter   = require('./routes/users'        );
var novolocais    = require('./routes/novo_locais'  );
var novomusicas   = require('./routes/novo_musicas' );
var indexlocais   = require('./routes/index_locais' );
var indexmusicas  = require('./routes/index_musicas');
var local_musica  = require('./routes/localoumusica');
var avalia_login  = require('./routes/avalia_login');
var exemplo_filme = require('./routes/exemplo_filme');
var editar_registro     = require('./routes/editar');
var deletar_registro    = require('./routes/deletar');
var atualizar_registro  = require('./routes/atualizar');
var ordenar_registros   = require('./routes/ordenar');
var pesquisar_registros = require('./routes/pesquisa');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//PAGINAS DO SITE - de fato o html
app.use('/',              indexRouter );
app.use('/novo_usuario',  novoUsuario );
app.use('/exemplo_filme', exemplo_filme);
app.use('/users',         usersRouter );
app.use('/novo_locais',   novolocais  );
app.use('/novo_musicas',  novomusicas );
app.use('/index_locais',  indexlocais );
app.use('/index_musicas', indexmusicas);
app.use('/localoumusica', local_musica);
app.use('/editar',     editar_registro);
app.use('/deletar',   deletar_registro);
app.use('/atualizar', atualizar_registro);
app.use('/ordenar',  ordenar_registros);
app.use('/avalia_login',  avalia_login);
app.use('/pesquisa',  pesquisar_registros);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;