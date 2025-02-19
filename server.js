// Creating a Server for Video Chat Application
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: '*',
        methods: 'GET,POST',
    }
});

io.on('connection', (socket) => {
    socket.emit("me", socket.id)

    socket.on("disconnect",()=>{
        socket.broadcast.emit("callEnded")
    })

    socket.on("callUser", (data) => {
        io.to(data.to).emit("callUser", {signal: data.signalData, from: data.from, name: data.name})
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signalData)
    })
    
});

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});