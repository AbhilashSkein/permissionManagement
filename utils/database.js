const mysql = require('mysql2');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'signup_app'
});

db.connect(function(err){
    if(err) throw err
    console.log('connected!!!');
    return;
});

module.exports = db;