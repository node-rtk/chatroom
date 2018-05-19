var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var moment=require('moment');



app.use(express.static(__dirname+'/public'));

io.on('connection', function(socket){
    console.log('User connected via socket.io in server!!!');

    //server listen
    socket.on('message', function(message){
        console.log('Message Received: '+message.text);
        message.timestamp=moment().valueOf();
        //server broadcast back to client
        io.emit('message', message);
    });

    //server broadcast back to client
    socket.emit('message', {
        name:'System',
        text: 'Welcome to the chat applicaiton!',
        timestamp: moment().valueOf()
    });
});



http.listen(PORT, function(){
    console.log('Server Started!!!');
});