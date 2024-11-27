import express from 'express';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    res.send('Hello World');
});


app.post('/about', (req, res) => {
    console.log(req.body);
    res.send('About Us');
});


// root route
app.get('/hello/:user/:id', (req, res) => {
    const { user, id } = req.params;
    console.log(req.params.user);
    let htmlstr = `<h1>Hello ${user}@${id}</h1>`;
    res.send(htmlstr);
});


// search query
app.get("/serach", (req, res) => {
    const {q, course, session} = req.query;
    let htmlstr = `<h1 style="text-decoration:underline">Search results for:-${q}${course}${session}</h1>`;
    let htmlstr1 = `<h1>Nothing found if nothing searched </h1>`;
    console.log(req.query);
    try {
        if (!q) {
            res.send(htmlstr1);
        }
        res.send(htmlstr);
    } catch (error) {
        console.log(error);
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);