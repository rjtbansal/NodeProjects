var PORT=process.env.PORT || 3000;
var express = require('express');
var app=express();
var http = require('http').Server(app); //tells node to start a new server and use this express app as boiler plate..so whatever express app
//is listening to the server is listening to as well
var io=require('socket.io')(http);
io.on('connection',function(){
    console.log("User connected via socket io");
});
app.use(express.static(__dirname+'/public'));

http.listen(PORT, function(){
    console.log('Server started at port: '+PORT);
});