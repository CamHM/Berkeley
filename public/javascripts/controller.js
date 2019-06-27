let myApp = angular.module('myApp', []);

myApp.controller('appCtrl', ['$scope', function ($scope) {
    let socket = io('/view');

    socket.emit('hola', 'HOlaaaaa People');

    const COUNTRY = 'es-CO';
    setInterval(() => {
        $scope.actualTime = new Date(Date.now()).toLocaleTimeString(COUNTRY);
        $scope.$apply();
    }, 1000);
}]);
