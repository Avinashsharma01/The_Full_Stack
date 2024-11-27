import mysql from 'mysql2';
import {createRandomUser} from '../faker.js';

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'avinash',
    port: 3308
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});


let create = `create table soumya (
   id int primary key,
   name varchar(255),
   age int)`;

let create2 = `create table faker (
    userId varchar(255) primary key,
    username varchar(255),
    email varchar(255),
    avatar varchar(255),
    password varchar(255),
    birthdate date,
    registeredAt date)`;



let createTable = () => {
    try {
        connection.query(create2, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    } catch (error) {
        console.log(error);
    }
}



let insert = `insert into soumya (id, name, age) values (1, 'avinash', 23), (2, 'avinashh', 24)`;




let insert2 = `insert into soumya (id, name, age) values (?, ?, ?)`;
let values = [3, 'avinashhh', 25];


let insert3 = `insert into faker (userId, username, email, avatar, password, birthdate)  values  ?`;

let values2 = [];
for(let i = 0; i < 100; i++) {
    values2.push(createRandomUser());
}

// console.log(values2);


let insertData = () => {
    try {
        connection.query(insert3, [values2], (err, result) =>{
            if(err) throw err;
            console.log(result);
        });
    } catch (error) {
        console.log(error);
    }
}





let showTable = () => {
    try {
        connection.query("show tables", (err, result) => {
            if (err) throw err;
            console.log(result);
        })
    } catch (error) {
        console.log(error);
    }
}

let showData = () => {
    try {
        connection.query("select * from faker", (err, result) => {
            if (err) throw err;
            console.log(result);
            return result;
        });
    } catch (error) {
        console.log(error);
    }
}

export { showTable, showData, createTable, insertData };
