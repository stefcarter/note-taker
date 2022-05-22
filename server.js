const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

const apiRoute = require('./routes/api');
const htmlRoute = require('./routes/html');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api', apiroute);
app.use('/', htmlroute);

app.listen(PORT, () => {
    console.log(`${PORT} is the current server`)
});