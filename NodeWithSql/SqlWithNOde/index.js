import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
// import cors from 'cors';
import { getCon, putcon, postcon } from './Controller/Controller.js';
import router from './Routes/routes.js';



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// // without routes
// app.get('/getdata', getCon);

// app.post('/postdata', postcon );

// app.put('/putdata', putcon);

// with routes
app.use('/api', router);

app.use('/api', router );

app.use('/api', router);


app.listen(port, () => {
    console.log('Server is running on port', port);
});