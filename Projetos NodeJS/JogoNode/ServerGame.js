var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');
global.jogadores = [];

var Server = http.createServer(function (requisicao, resposta) {
    resposta.writeHead(200, { 'Content-type': 'text/html' });

    if (requisicao.url.indexOf('.js') != -1) {
        resposta.writeHead(200, { 'Content-Type': 'text/javascript' });
        resposta.end(fs.readFileSync(__dirname + '/Script.js'));
    }

    if (requisicao.url.indexOf('.css') != -1) {
        resposta.writeHead(200, { 'Content-Type': 'text/css' });
        resposta.end(fs.readFileSync(__dirname + '/StyleSheet.css'));
    }

    resposta.end(fs.readFileSync(__dirname + '/index.html'));
    
}).listen(80, function () {
    console.log('Aguardando Conexões em http://localhost');
});

socketio.listen(Server).on('connection', function (socket) {

    socket.on('message', function (msg) {
        console.log('Mensagem Recebida: ', msg);
        socket.broadcast.emit('message', msg);
    });

    socket.on('login', function (nome) {

        global.jogadores.push({
            "id": socket.id,
            "nome": nome,
            "vida": 100
        });

        socket.broadcast.emit('message', nome + ' Entrou');
    });

    socket.on('listar', function (nome) {
        var lista = '';
        console.log('Usuário ' + nome + ' Listou Jogadores');
        socket.emit('listar', global.jogadores);
    });

    socket.on('iniciar', function (nome) {
        console.log('Usuário ' + nome + ' Iniciou o Jogo');
        socket.broadcast.emit(nome + ' Entrou no Jogo');
    });

    socket.on('comando', function (id) {
        if (id == global.jogadores[0].id) {
            return 'Jogador1';
        }
        if (id == global.jogadores[1].id) {
            return 'Jogador2';
        }
    });
});