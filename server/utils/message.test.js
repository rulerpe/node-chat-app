var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message')

describe('generateMessage',()=>{
  it('should generate correct message object',()=>{
    var from = "Peter"
    var text = "hello hello"
    var message = generateMessage(from,text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA("number");

  })
})

describe('generateLocationMessage',()=>{
  it('should generate correct location object',()=>{
    var from = "Peter"
    var lat = "36.1007056"
    var lng = "-115.2703251"
    var message = generateLocationMessage(from,lat,lng);

    expect(message.from).toBe(from);
    expect(message.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`);
    expect(message.createdAt).toBeA("number");

  })
})
