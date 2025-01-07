import { error } from 'console';
import express from 'express';
const app = express();
import path from "path"



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("public")))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index');
});

app.get("/error", (req, res, next) => {
    throw Error("i am the error")
    next()
})

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
    const { q, course, session } = req.query;
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


// default error handing route
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
}


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);