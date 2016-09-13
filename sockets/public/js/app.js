var socket=io();

/*connect event associated with client side*/
socket.on('connect', function(){
    console.log('Connected to socket io server');
});