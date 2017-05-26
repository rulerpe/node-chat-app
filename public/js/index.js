var socket = io();
socket.on('connect',function () {
  console.log('connected')

  socket.emit('createMessage', {
    from :'jojo',
    text: 'Hey hows it going'
  })
})

socket.on('disconnect',function () {
  console.log('Disconnect from server');
})

socket.on('newEmail', function (email) {
  console.log('New email', email)
})

socket.on('newMessage', function (message) {
  console.log('New message', message)
})