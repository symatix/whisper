var expect = require('expect');
var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('shound generate the correct message object', () => {
        const from = 'test@test.com';
        const text = 'testing generateMessage func';

        const message = generateMessage(from, text);
        expect(message.text).toBe(text);
        expect(message.from).toBe(from);
        expect(typeof message.createdAt).toBe('number');
    })
})