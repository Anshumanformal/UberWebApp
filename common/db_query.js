const db_connection = require('../database/connection');

const execute_query = (sql_query, values, callback) => {
     return db_connection.query(sql_query, values, (err, results) => {
        if (err) callback(err)
        else {
            return callback(null,results)
        }
    })
}

module.exports = {execute_query}