var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var coords = { lat: 1, lon: 1};
        var from = 'Dino';

        const location = generateLocationMessage(from, coords.lat, coords.lon)
        expect(location.from).toBe(from);
        expect(typeof location.createdAt).toBe('number');
        expect(location.url).toBe('https://www.google.com./maps?q=1,1')
    })
})