var fs = require('fs')
    , http = require('http')
    , socketio = require('socket.io')
    , qs = require('querystring')
    , ft = require('./db_functions.js')
    , db = require('./lib_db.js');

var server = http.createServer(function(req, res){
    if(req.url === '/api/obter-mensagens'){
        if(req.method === 'GET'){            
            res.writeHead(200, {'Content-type': 'application/json'});
            db.all("SELECT * from mensagens", function(err, rows){
                res.end(JSON.stringify(rows));
            }); 
        }
    }else{
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(fs.readFileSync(__dirname + '/index.html')); 
    }
}).listen(3000, function(){
    console.log('Rodando porta em http://localhost:3000');
});

socketio.listen(server).on('connection', function(socket){
    socket.on('message', function(usuario, mensagem){
        console.log('Message Received: ' + mensagem + ' from '+ usuario);
        ft.submeter_mensagem(usuario, mensagem);
        socket.broadcast.emit('message', (usuario, mensagem));
    });
});

