import express from 'express';
import connection from './Database/database.js';
import path from 'path';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));
app.set('view engine', 'ejs');

// show all data from faker table
app.get('/', (req, res) => {
    let sql = 'SELECT count(*) FROM faker';
    try {
        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            let data= result[0]['count(*)'];
            res.render('home', {data});
        }); 
    } catch (error) {
        console.log(error);
    }
});

// show all data from faker table

app.get('/showuser', (req, res) => {
    let sql = 'SELECT * FROM faker';
    try {
        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            let data= result;
            res.render('showuser', {data});
        }); 
    } catch (error) {
        console.log(error);
    }
});





app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});



