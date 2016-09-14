var PORT=process.env.PORT || 3000;
var express = require('express');
var app=express();
var http = require('http').Server(app); //tells node to start a new server and use this express app as boiler plate..so whatever express app
//is listening to the server is listening to as well
var io=require('socket.io')(http);
var moment=require('moment');
app.use(express.static(__dirname+'/public'));

var client_info={};
//connection event asssociated with server side
io.on('connection',function(socket){
    console.log("User connected via socket io");

    socket.on('joinRoom',function(req){
       client_info[socket.id]=req; //attaching socket's id(again id is inbuilt) to client info object(cusstom obj)
       socket.join(req.room); //get attached to room..join is inbuilt socketio function
       socket.broadcast.to(req.room).emit('message',{
           name:'System',
           text:req.name+' just joined this room',
           timestamp:moment().valueOf()
       })   
    });
    socket.on('message',function(message){
        console.log('Message recieved: '+message.text);

        //socket.broadcast.emit sends the message to every reciever except sender..use 'io.emit'' if you also want to send it msg sender
        //socket.broadcast.emit('message',message);
        message.timestamp=moment().valueOf();
        io.to(client_info[socket.id].room).emit('message',message);
    });
    //emitting our events..here message is an event..it can be anything based on our requirements
    //first argument in emit is the event name and 2ns argument is the value..its best to use an object to store enough data since only 1 argument can be passed
    socket.emit('message',{
        name:'System',
        text : "Welcome to live chat",
        timestamp : moment().valueOf() //getting timestamp value as milliseconds
    });
});


http.listen(PORT, function(){
    console.log('Server started at port: '+PORT);
});