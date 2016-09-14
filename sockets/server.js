var PORT=process.env.PORT || 3000;
var express = require('express');
var app=express();
var http = require('http').Server(app); //tells node to start a new server and use this express app as boiler plate..so whatever express app
//is listening to the server is listening to as well
var io=require('socket.io')(http);
var moment=require('moment');

//connection event asssociated with server side
io.on('connection',function(socket){
    console.log("User connected via socket io");

    socket.on('message',function(message){
        console.log('Message recieved: '+message.text);

        //socket.broadcast.emit sends the message to every reciever except sender..use 'io.emit'' if you also want to send it msg sender
        //socket.broadcast.emit('message',message);
        message.timestamp=moment().valueOf();
        io.emit('message',message);
    });
    //emitting our events..here message is an event..it can be anything based on our requirements
    //first argument in emit is the event name and 2ns argument is the value..its best to use an object to store enough data since only 1 argument can be passed
    socket.emit('message',{
        text : "Welcome to live chat",
        timestamp : moment().valueOf()
    });
});
app.use(express.static(__dirname+'/public'));

http.listen(PORT, function(){
    console.log('Server started at port: '+PORT);
});