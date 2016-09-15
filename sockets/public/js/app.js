/*calling getQueryVariable from queryparams.js to get query params*/
var name = getQueryVariable('name') || 'Default';
var room = getQueryVariable('room') || 'Random Room';

var socket=io();

$('.roomname').html(room);
/*connect event associated with client side*/
socket.on('connect', function(){
    console.log('Connected to socket io server');
    /*once connected we are emitting joinRoom event with client name and the room name*/
    socket.emit('joinRoom',{
        name:name,
        room:room
    });
});


//listening to custom event 
//arg1 : event_name (check server.js) , arg2 : callback with message object
socket.on('message', function(message){
    var momentTimestamp=moment.utc(message.timestamp); //getting utc timestamp
    console.log('New message from server --> '+message.text); //text was are key in the message object(check server.js)
    $('.messages').append('<li class="list-group-item"><p><strong>'+ momentTimestamp.local().format('h:mm a') +' '+message.name+' </strong></p> <p>'+message.text+'</p></li>'); //getting local time 
});

//Handle message submit through form
$('#msg-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('message',{
        name:name,
        text: $('#msg-form').find('input[name=message]').val()
    });
    $('#msg-form').find('input[name=message]').val('');
});
