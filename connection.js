// Create the connection to database
// Import the mysql2/promise module to use MySQL with promises
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    database: 'aureo',
});


export default connection;


