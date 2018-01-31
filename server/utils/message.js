var generateMessage = (from, text) => {
    return {
        from, 
        text,
        createdAt:Date.now()
    }
}

var generateLocationMessage = (from, lat, lon) => {
    return {
        from, 
        url: `https://www.google.com./maps?q=${lat},${lon}`,
        createdAt:Date.now()
    }
}

module.exports = { generateMessage, generateLocationMessage };