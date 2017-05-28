var socket = io();
socket.on('connect',function () {
  console.log('connected')
})

socket.on('disconnect',function () {
  console.log('Disconnect from server');
})


socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    text:message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);

})

$('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextBox = $('[name=message]')
  socket.emit('createMessage',{
    from: 'User',
    text: messageTextBox.val()
  }, function(){
    messageTextBox.val('');
  })
})

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var tempalte = $('#location-message-template').html();
  var html = Mustache.render(tempalte,{
    url:message.url,
    from:message.from,
    createdAt: formattedTime
  })
  $('#messages').append(html);
})

var locationButton = $('#send-location');

locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your brower')
  }

  locationButton.attr('disabled','disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location')
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
    console.log(position)
  },function(){
    locationButton.removeAttr('disabled').text('Send location')
    alert('Unable to fetch location')
  })
})
