// const express = require('express');
// const path = require('path');
// const fs = require('fs');


// const app = express();
// const PORT = process.env.PORT || 3001;

// // middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

// app.use(express.static('public'));

// // homepage route
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

// // notes route
// app.get('/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

// app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let store = require('./db/db.json');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();
    store.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(store), err => { if (err) throw err });
    res.json(store);
})

// GET request for notes
app.get('/api/notes', (req, res) => {
    res.json(store);
});

// * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;
    store = store.filter((note) => {
        return note.id !== noteID;
    })
    fs.writeFile('./db/db.json', JSON.stringify(store), err => {
        if (err) throw err
    })
    console.log(req.params)
    res.status(204).send('deleted');
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);