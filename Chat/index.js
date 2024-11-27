import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import database from './database/db.js';
import Chat from './models/chat.js';
import cors from 'cors';


const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(cors());


// this routes showa all the chats
app.get('/chats', async (req, res) => {
    const chats = await Chat.find({});
    res.json(chats);
})


// this routes create a chat
app.post('/Create', async (req, res) => {
    const { from, to, message } = req.body;
    try {
        const chat = new Chat({
            from,
            to,
            message
        });
        res.json(chat);
        await chat.save();
    } catch (error) {
        console.log(error);
    }

})



// this routes delete a chat 
app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    const chat = await Chat.findByIdAndDelete(id);
    res.send("deleted chat");
})

// this routes delete many chats
app.delete("/deleteMany", async (req, res) => {
    const chat = await Chat.deleteMany({});
    res.send("deleted all chats");
})



// this routes update a chat
app.patch("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { message, to, from } = req.body;
    try {
        const chat = await Chat.findByIdAndUpdate(id, { from, to, message });
        res.send("updated chat");
    } catch (error) {
        console.log(error);
    }
})


// app.get("/search", (req, res)=>{
//     const query = req.query.query.toLowerCase();
//     const filteredUsers = Chat.filter(user =>
//         user.from.toLowerCase().includes(query) ||
//         user.to.toLowerCase().includes(query) ||
//         user.message.toLowerCase().includes(query)
//       );
//     res.json(filteredUsers);
// })

app.get("/search", async (req, res) => {
    const query = req.query.query.toLowerCase();
    try {
        const filteredUsers = await Chat.find({
            $or: [
                { from: { $regex: query, $options: 'i' } },
                { to: { $regex: query, $options: 'i' } },
                { message: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(filteredUsers);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while searching");
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})