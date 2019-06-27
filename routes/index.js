const express = require('express');
const router = express.Router();
let viewSocket;
let hourSocket;

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = function(io) {
    const COUNTRY = 'es-CO';
    let sockets = new Map();

    viewSocket = io.of('/view');
    viewSocket.on('connection', (socket) => {
       console.log('New view connection');
    });

    hourSocket = io.of('/hour');
    hourSocket.setMaxListeners(20);
    hourSocket.on('connection', (socket) => {
        console.log('New hour connection');
        socket.join('hour room');
        console.log('Socket add it to hour room');

        setInterval(() => {
            hourSocket.to('hour room').emit('time', 'send Time');
        }, 20000);

        socket.on('send', (message) => {
            sockets.set(socket, message.hour);
            console.log(sockets);
            console.log(`This time came: ${new Date(message.hour).toLocaleTimeString(COUNTRY)}`)
        });
    });

    return router;
};
