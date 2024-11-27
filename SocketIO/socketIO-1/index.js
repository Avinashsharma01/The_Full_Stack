import http from 'http';
import express from 'express';
import path from 'path';
import { Server } from 'socket.io';



const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));

const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('message', (message) => {
        io.emit('message', message);
    });
});


server.listen(3000, () => {
    console.log(`server is running on port ${3000}`);
});