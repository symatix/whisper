const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('-> new client connected');

    // when user joins
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Whisper'));
    socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined'))

    socket.on('createMessage', (msg, callback) => {
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback('data sent');
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {
        console.log('-> client disconnected');
      });
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`=> Server is running on port ${PORT}`)
})