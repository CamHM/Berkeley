const express = require('express');
const logger = require('morgan');

const app = express();
const server = app.listen('3100');
const io = require('socket.io').listen(server);

const indexRouter = require('./routes/index' )(io);

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);

module.exports = app;
