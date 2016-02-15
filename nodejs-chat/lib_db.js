var fs = require('fs')
    , file = 'bate-papo.db'
    , exists = fs.existsSync(file)
    , sqlite3 = require('sqlite3').verbose()
    , db = new sqlite3.Database(file);


if(!exists) {
  console.log("Creating DB file.");
  fs.openSync(file, "w");
}


module.exports = db.serialize(function() {
  if(!exists){ 
    db.run('create table mensagens (timestamp integer, usuario text, mensagem text)');
    db.close();
  }
  return new sqlite3.Database(file); 
  
});