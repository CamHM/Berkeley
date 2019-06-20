const express = require('express');
const router = express.Router();
const axios = require('axios');

let servers = ['http://192.168.1.27:3100'];

router.get('/', function(req, res, next) {
  res.render('index');
});

function getHours(io) {
 let timeServer = Date.now();
 let sumDifferences = 0;

 servers.forEach(server => {
   axios.post(`${server}/time`, {timeServer})
       .then( res => {
         io.emit('difference', {server: servers.indexOf(server), difference: res.data.difference});
           sumDifferences += res.data.difference;
           console.log('differences: ', sumDifferences);
       })
       .catch(err => {
         //console.log(err);
       });
 });
    let average = sumDifferences / (servers.length + 1);
 console.log(sumDifferences , ' ' , (servers.length + 1) , ' ' , (sumDifferences / (servers.length + 1)));
 io.emit('average', {average});
}
module.exports = function(io) {
    io.on('connection', function (socket) {
        setInterval(getHours, 10000, socket);
    });
    return router;
};
