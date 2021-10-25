let path = require("path");
// function to hold get/post/delete routes also exports function
module.exports = function(app, fs) {
    const data = require('../db/db.json');

    let database = path.join(__dirname, '../db/db.json');

    app.get('/api/notes', function (req, res) {
        res.json(data);
    });

    //post route to create user nots
    app.post('/api/notes', function(req, res) {
        //variable that stores req.body
        let newNote = req.body;
        //variable to store id # and assigning it to the value of one
        let id = 1;
        //for loop to loop through json objects data.length
        for (let i = 0; i < data.length; i++) {
        // variable that stores the index of data
            let note = data[i];
        // if note.id is greater than the id #
            if (note.id > id) {
        // then updates the id to the value of note.id
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
            console.log("SAVED!");
        });
        //responds the newNote variable 'req.body' as json object
        res.json(newNote);
    });
    
    //deletes note with id #
    app.delete('/api/notes/:id', function(req, res) {
        let database = path.join(__dirname, '../db/db.json')
        //loop through to find id
        for(let i = 0; i < data.length; i++) {
        
            if(data[i].id == req.params.id) {
        
                //splice note
                data.splice(i, 1);   
                break;
                }
            }
            //console log to show deleted note
            fs.writeFile(database, JSON.stringify(data), function(err) {
        
                if(err) {
                    return console.log(err);
                } else {
                    console.log("SHE GONE!");
                }
            });
            //response in json format with database data paramas
            res.json(data);
        });


}