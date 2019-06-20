let myApp = angular.module('myApp', []);

myApp.controller('appCtrl', ['$http', function ($http) {
    let ctrl = this;
    let socket = io().connect('http://localhost:3000');

    socket.on('difference', function (message) {
        console.log(`Servidor ${message.server + 1} tiene una diferencia de ${message.difference}`);
        ctrl.serverDifference = message;
    });
    
    socket.on('average', function (message) {
        console.log(`El tiempo promedio de ajuste es ${message.average}`);
    });

    socket.on('disconnect', () => {
        socket.close();
        console.log('Conexión del socket cerrada');
    });

    const COUNTRY = 'es-CO';

    ctrl.actualTime = new Date(Date.now()).toLocaleTimeString(COUNTRY);
}]);
