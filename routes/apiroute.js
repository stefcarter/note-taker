const router = require('express').Router();
const data = require('../db.json');

const { addNote } = require('../lib/data.js');

router.get('/notes', (req, res) => {
    req.send('data')
});

router.get('/', (req, res) => {
    res.send('api location');
});

router.post('/notes', (req, res) => {
    addNote(req.body);
    res.json();
});

module.exports = router;