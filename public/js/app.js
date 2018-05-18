var socket = io();

socket.on('connect', function () {
    console.log('Connected to socket.io server in app');
});

socket.on('message', function (message) {
    console.log('New Message:');
    console.log(message.text);

    jQuery('.msg').append('<p>'+message.text+'</p>');


});


//Handle submitting of new message
var $form = jQuery('#message-form');
$form.on('submit', function (event) {
    event.preventDefault();
    var $message=$form.find('input[name=message]');
    socket.emit('message', {
        text: $message.val()
    });

    //clear
    $message.val('');
});
