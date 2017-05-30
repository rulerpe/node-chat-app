const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', ()=>{
  it('should reject non-string values', ()=>{
    var isString = isRealString(123);
    expect(isString).toBe(false);
  })
  it('should reject string with only spaces', ()=>{
    var isString = isRealString('');
    expect(isString).toBe(false);
  })
  it('should allow string with non-spane characters', ()=>{
    var isString = isRealString('   asdf   dfaf  ');
    expect(isString).toBe(true);
  })
})
