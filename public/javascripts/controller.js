let myApp = angular.module('myApp', []);

myApp.controller('appCtrl', ['$scope', function ($scope) {
    const COUNTRY = 'es-CO';

    let socket = io('/view');
    let interval = null;

    socket.emit('hola', 'HOlaaaaa People');

    interval = setInterval(() => {
        $scope.actualTime = new Date(Date.now()).toLocaleTimeString(COUNTRY);
        $scope.$apply();
    }, 1000);

    socket.on('newTime', (message) => {
        console.log('Llega Nueva Fecha');
        clearInterval(interval);
        $scope.actualTime = new Date(message.newTime).toLocaleTimeString(COUNTRY);
        $scope.$apply();
    });

    socket.on('disconnect', () =>{
        socket.close();
        console.log('Conexión del socket cerrada');
    });
}]);
