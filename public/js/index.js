var socket = io();

socket.on('connect', function(){
    console.log('=> connected to server')
});

socket.on('disconnect', function(){
    console.log('=> disconnected from server')
});

socket.on('newMessage', function(msg){
    console.log('-> new message\n', msg);
    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    $('#form-chat').append(li);
})

socket.on('newLocationMessage', function(msg){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${msg.from}: `);
    a.attr('href', msg.url);

    li.append(a);
    $('#form-chat').append(li);
})

$('#form-chat').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from:$('#form-from').val(),
        text:$('#form-text').val()
    }, function(data){
        console.log('MESSAGE SENT', data)
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function(e){
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        alert('Unable to fetch location.');
    })
})
