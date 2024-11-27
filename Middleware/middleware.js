import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use((req, res, next) => {
    console.log('Time:', new Date(), "Avinash Date");
    next();
});

// http://localhost:3000/?query=Hello  this is a middleware
app.use((req, res, next) => {
    const { query } = req.query;
    const { method, path } = req;
    console.log('Query:', query);
    console.log('Method:', method, 'Path:', path);
    next();
});

// home page
app.get('/', (req, res) => {
    res.send('Hello World');
});

// about page
app.get('/about', (req, res) => {
    res.send('This is about page');
    console.log(req._header);
});


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});



