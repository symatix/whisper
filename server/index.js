const path = require('path');
const express = require('express');

const app = express();

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));


const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`)
})