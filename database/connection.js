// // MySQL connection
let mysql = require('mysql2');

let connection = mysql.createConnection({
    user: "root",
    password: "my-secret-pw",
    database: "uber",
    multipleStatements: true //when multiple queries are executed at the same time
});

connection.connect(err => {
    if(err) throw err
    console.log("Database connected")
})

module.exports = connection;