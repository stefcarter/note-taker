const express = require('express');
const path = require('path');
const fs = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;



app.listen(PORT, () => console.log(`App listening on port ${PORT}`));