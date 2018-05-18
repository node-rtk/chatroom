var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'));

io.on('connection', function(socket){
    console.log('User connected via socket.io in server!!!');

    //server listen
    socket.on('message', function(message){
        console.log('Message Received: '+message.text);

        //server broadcast back to client
        socket.broadcast.emit('message', message);
    });

    //server broadcast back to client
    socket.emit('message', {
        text:'Welcome to the chat applicaiton!'
    })
});



http.listen(PORT, function(){
    console.log('Server Started!!!');
});