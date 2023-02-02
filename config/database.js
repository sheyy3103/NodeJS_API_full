const mysql = require('mysql');
const conn = mysql.createConnection({
    host:process.env.DB_HOST || 'localhost',
    user:process.env.DB_USERNAME || 'root',
    password:process.env.DB_PASSWORD || '',
    database:process.env.DB_DATABASE || ''
});
module.exports = conn;