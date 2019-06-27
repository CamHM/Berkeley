const express = require('express');
const router = express.Router();
let viewSocket;
let hourSocket;

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = function(io) {
    const COUNTRY = 'es-CO';
    let clientsCount = 0;
    let sockets = [];
    let actualTime = Date.now();
    let sum = 0;
    let avg = 0;
    let newTime = Date.now();

    viewSocket = io.of('/view');
    viewSocket.on('connection', (socket) => {
       console.log('New view connection');
    });

    hourSocket = io.of('/hour');
    hourSocket.setMaxListeners(20);
    hourSocket.on('connection', (socket) => {
        clientsCount++;
        console.log('New hour connection');
        socket.join('hour room');
        console.log('Socket add it to hour room');

        socket.on('send', (message) => {
            sockets.push(message);
            console.log(`This time came: ${new Date(message.hour).toLocaleTimeString(COUNTRY)}`);
            if (sockets.length === clientsCount) {
                sockets.forEach(socket => {
                    socket.difference = socket.hour - actualTime.getTime();
                    sum += socket.difference;
                    console.log(`Diferencia: ${new Date(Math.abs(socket.difference)).getMinutes()}:${new Date(Math.abs(socket.difference)).getSeconds()}`);
                });
                avg = sum / sockets.length;
                console.log(`avg: ${new Date(Math.abs(avg)).getMinutes()}:${new Date(Math.abs(avg)).getSeconds()}`);
                console.log(sockets);
                newTime = actualTime.getTime() + avg;
                console.log(`new server time: ${new Date(newTime).toLocaleTimeString(COUNTRY)}`);
                viewSocket.emit('newTime', {newTime});
            }
        });
    });

    setInterval(() => {
        actualTime = new Date(Date.now());
        sum = 0;
        avg = 0;
        sockets = [];
        hourSocket.to('hour room').emit('time');
    }, 20000);

    hourSocket.on('disconnect', () => {
        clientsCount--;
    });

    return router;
};
