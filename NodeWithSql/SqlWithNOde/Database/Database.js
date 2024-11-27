import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// one connections connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'avinash',
    port: 3308,
});

connection.connect((err) => {
    if (err) {
        console.log('Error in connection');
        return;
    }
    console.log('Connected');
});


// second connection conn
const {HOST, USER, DATABASE, DATABASE_PORT, PASSWORD} = process.env;
const conn = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: 'root',
    // database: 'avinash',
    // port: 3308


    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: DATABASE_PORT

    // host: process.env.HOST,
    // user: process.env.USER,
    // password: process.env.PASSWORD,
    // database: process.env.DATABASE,
    // port: process.env.DATABASE_PORT


});

conn.connect((err) => {
    if (err) {
        console.log('Error in connection');
    }
    console.log('Connected');
});


// third connection conn1
const conn1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees',
    port: 3308,
});

conn.connect((err) => {
    if (err) {
        console.log('Error in connection');
    }
    console.log('Connected');
});



export {connection, conn, conn1};