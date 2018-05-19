var socket = io();


var name=getQuery('name')||'Ananymous';
var room=getQuery('room');

jQuery('.roomName').text(room);

socket.on('connect', function () {
    console.log('Connected to socket.io server in app');
});

socket.on('message', function (message) {
    console.log('New Message:');
    console.log(message.text);

    $mess=jQuery('.msg');
    var time =moment.utc(message.timestamp);
    $mess.append('<p><strong>'+ message.name+' '+time.format('h:mm a')+'</strong></p>');
    $mess.append('<p>'+message.text+'</p>');


});


//Handle submitting of new message
var $form = jQuery('#message-form');
$form.on('submit', function (event) {
    event.preventDefault();
   
    var $message=$form.find('input[name=message]');
    socket.emit('message', {
        name:name,
        text:  $message.val()
    });

    //clear
    $message.val('');
});


console.log(name +' join '+ room);
