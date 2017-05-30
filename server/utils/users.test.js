var expect = require('expect');

var {Users} = require('./users')

describe('Users',()=>{
  var users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Peter',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Chew Chew',
      room: 'React Course'
    },{
      id: '3',
      name: 'JOJO',
      room: 'Node Course'
    }]
  })

  it('should add new user',()=>{
    var users = new Users();
    var user = {
      id:'123',
      name: 'Peter',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name,user.room);

    expect(users.users).toEqual([user]);
  })

  it('should remove a user', ()=>{
    var removedUser = users.removeUser('1');
    expect(users.users.length).toBe(2)
  })
  it('should not remve a user', ()=>{
    var removedUser = users.removeUser('5');
    expect(users.users.length).toBe(3)
  })
  it('should find a user', ()=>{
    var gotUser = users.getUser('1');
    expect(gotUser.id).toBe('1')
  })
  it('should not find a user', ()=>{
    var gotUser = users.getUser('55');
    expect(gotUser).toNotExist()
  })

  it('should return anmes for node course',()=>{
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Peter','JOJO'])
  })
})
