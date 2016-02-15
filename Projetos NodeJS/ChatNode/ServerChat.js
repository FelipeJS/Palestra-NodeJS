var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');

var Server = http.createServer(function (requisicao, resposta) {
    resposta.writeHead(200, { 'Content-type': 'text/html' });
    resposta.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(80);

socketio.listen(Server).on('connection', function (socket) {
    socket.on('message', function (msg) {
        socket.broadcast.emit('message', msg);
    });
});
