let path = require("path");

module.exports = function(app, fs) {
    const data = require('../db/db.json');

    let database = path.join(__dirname, '../db/db.json');

    app.get('/api/notes', function (req, res) {
        res.json(data);
    });

    //post route to create user nots
    app.post('/api/notes', function(req, res) {
        let newNote = req.body;
        let id = 1;
        for (let i = 0; i < data.length; i++) {
            let note = data[i];
            if (note.id > id) {
                id = note.id;
            }
        }

        //new note to newest id
        newNote.id = id + 1;
        data.push(newNote)
        //console logging to show saved properly
        fs.writeFile(database, JSON.stringify(data), function(err){
            if (err) {
                return console.log(err);
            }
            console.log("Input has been saved!");
        });
        res.json(newNote);
    });
    



}