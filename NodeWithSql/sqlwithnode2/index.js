// Code to create a user in the database
import {createRandomUser} from './faker.js';
import { it } from '@faker-js/faker';
import express from 'express';
import { showTable , showData, createTable , insertData} from './Database/Database.js';

// createTable();
// insertData();
// console.log(showTable());
// console.log(showData());

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    let data = showData();
    res.send(data);
}
);



app.listen(4000, () => {
    console.log('Server is running on port 3000');
});



