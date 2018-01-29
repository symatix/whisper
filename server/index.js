const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('-> new client connected');

    socket.emit('newMessage', {
        from:'server',
        text:'emitting message',
        createdAt: Date.now()
    })

    socket.on('createMessage', (msg) => {
        msg.createdAt = Date.now();

        console.log('-> [createMessage]\n', msg);
    })

    socket.on('disconnect', () => {
        console.log('-> client disconnected');
      });
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`=> Server is running on port ${PORT}`)
})