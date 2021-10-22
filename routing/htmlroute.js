// dependency
let path = require("path");

// will be html get requests!
module.exports = function(app, fs) {
    app.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}