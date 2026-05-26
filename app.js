var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tweetsRouter = require('./routes/tweets');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);

// ==========================================
// TESTE DE LIGAÇÃO À BASE DE DADOS
// ==========================================
const { sequelize } = require('./models');

sequelize.authenticate()
  .then(() => {
    console.log('Ligação à Base de Dados estabelecida com sucesso!');
  })
  .catch((erro) => {
    console.error('Erro ao ligar à Base de Dados:', erro);
  });

module.exports = app;