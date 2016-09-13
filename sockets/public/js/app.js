var socket=io();

/*connect event associated with client side*/
socket.on('connect', function(){
    console.log('Connected to socket io server');
});

//listening to custom event 
//arg1 : event_name (check server.js) , arg2 : callback with message object
socket.on('message', function(message){
    console.log('New message from server --> '+message.text); //text was are key in the message object(check server.js)
    $('.messages').append('<p>'+message.text+'</p>');
});

//Handle message submit through form
$('#msg-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('message',{
        text: $('#msg-form').find('input[name=message]').val()
    });
    $('#msg-form').find('input[name=message]').val('');
});
