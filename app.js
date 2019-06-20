const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const indexRouter = require('./routes/index' )(io);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
server.listen(3000, function () {
   console.log('Listening port 3000');
});

app.use('/', indexRouter);

module.exports = app;
