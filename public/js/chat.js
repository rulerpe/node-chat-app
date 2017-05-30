var socket = io();

function scrollToBottom(){
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect',function () {
  var params = $.deparam(window.location.search);

  socket.emit('join', params,function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else{
      console.log('not err')
    }
  })
})

socket.on('disconnect',function () {
  console.log('Disconnect from server');
})
socket.on('updateUserList',function (users) {
  var ol = $('<ol></ol>');

  users.forEach(function(user){
    ol.append($('<li></li>').text(user));
  })
  $('#users').html(ol);
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
  scrollToBottom();

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
  scrollToBottom();
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
