const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

const apiroute = require('./routes/apiroute');
const htmlroute = require('./routes/htmlroute');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api', apiroute);
app.use('/', htmlroute);

app.listen(PORT, () => {
    console.log(`Application deployed at http://localhost:${PORT}`)
});