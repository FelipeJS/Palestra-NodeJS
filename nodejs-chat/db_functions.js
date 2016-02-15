var db = require('./lib_db.js');

var db_functions = {
    submeter_mensagem: function(usuario, mensagem){
        var timestamp = new Date().getTime();
        var sql = 'insert into mensagens values('+ timestamp +',"' + usuario +'", "'+ mensagem +'")';
        var stmt = db.prepare(sql);
        stmt.run();
        stmt.finalize();
    }/*,
    obter_mensagens: function(){
        var mensagens = [];
        db.all("SELECT * from mensagens", function(err, rows){
            return rows;
        });
    }*/

}

module.exports = db_functions;


/*var submeter_mensagem = function(nome, mensagem){
    //var sql = 'insert into mensagens values('+  +',' + nome ', '+ mensagem' + ')';
    var timestamp = new Date().getTime();
    var date = new Date( timestamp * 1000 );
    var hours = date.getHours();
	var s_hours = hours < 10 ? "0"+hours : ""+hours;
	var minutes = date.getMinutes();
	var s_minutes = minutes < 10 ? "0"+minutes : ""+minutes;
	var seconds = date.getSeconds();
	var s_seconds = seconds < 10 ? "0"+seconds : ""+seconds;
	console.log( s_hours + ":" + s_minutes + ":" + s_seconds);
}*/