var socket = io();

socket.on('connect', function(){
    console.log('=> connected to server')

    socket.emit('createMessage', {
        from:'boss@client.io',
        to:'boss@server.io',
        text:'yo server! what up?'
    })
});

socket.on('disconnect', function(){
    console.log('=> disconnected from server')
});

socket.on('newMessage', function(msg){
    console.log('-> new message\n', msg);
})