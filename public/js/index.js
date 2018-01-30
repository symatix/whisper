var socket = io();

socket.on('connect', function(){
    console.log('=> connected to server')

    // socket.emit('createMessage', {
    //     from:'boss@client.io',
    //     to:'boss@server.io',
    //     text:'yo server! what up?'
    // })
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

// socket.emit('createMessage', {
//     from:'Frank',
//     text:'Hi'
// }, function(data){
//     console.log('-> server:');
// })

$('#form-chat').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from:$('#form-from').val(),
        text:$('#form-text').val()
    }, function(data){
        console.log('MESSAGE SENT', data)
    });
});