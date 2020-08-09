const helpers = require('../helpers');

test('takes in any input, returns a string describing the object type of that input',() => {
    const { findType } = helpers;

    expect( findType('this is a string')        ).toBe('string');
    expect( findType(['this is an array'])      ).toBe('array');
    expect( findType({ 'this is':'an object'})  ).toBe('object');
    expect( findType(5)                         ).toBe('number');
    expect( findType(true)                      ).toBe('boolean');
    expect( findType(false)                     ).toBe('boolean');
    expect( findType(0)                         ).toBe('number');
    expect( findType(new Map())                 ).toBe('map');
    expect( findType(new Set())                 ).toBe('set');
    expect( findType(new Date())                ).toBe('date');
    expect( findType(new RegExp())              ).toBe('regex');
    expect( findType(Array.prototype.forEach)   ).toBe('function');
})