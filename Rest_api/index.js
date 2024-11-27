import express from 'express';
import ejs, { name } from 'ejs';
import mongoose from 'mongoose';
import path from 'path';


const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));

let data = [
    {
        id: "1",
        name: 'John Doe',
        age: 25
    },
    {
        id: "2",
        name: 'Jane Doe',
        age: 22
    },
    {
        id:"3",
        name: 'Jim Doe',
        age: 30
    },
    {
        id:"4",
        name: 'Jill Doe',
        age: 35
    },
    {
        id:"5",
        name: 'Jack Doe',
        age: 40
    }
]


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/post', (req, res) => {
    res.render('index', { data: data });
});

app.get('/post/create', (req, res) => {
    res.render("Create");
});

app.post('/post/create', (req, res) => {
    const { id, name, age } = req.body;
    data.push({ name, age, id });
    console.log(req.body);
    res.redirect('/post');
});


app.get('/post/:id', (req, res) => {
    const { id } = req.params
    console.log(req.params);
    const post = data.find((p) => id === p.id)
    console.log(post);
    res.render("show", {post})
});


// delete route 
app.delete("/post/delete/:id", (req, res) => {
    const { id } = req.params;
    const index = data.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).send({ message: "Post not found" });
    }
    data.splice(index, 1);
    res.redirect("/posts"); // redirect to a list of posts
  });

app.patch("/post/update/:id", (req, res)=>{
    
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

