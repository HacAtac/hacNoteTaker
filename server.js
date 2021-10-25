// require the express package
const express = require("express");
// require the fs package
const fs = require('fs');
// require path pacakge
const path = require('path');


let app = express();
//PORT is listenting to 3009
const PORT = process.env.PORT || 3009;

// Express middleware! For Data Parsing
app.use(express.static("public"));
//app.use("/assets", express.static("./assets"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require the html api routes
require('./routing/apiroute')(app, fs);
require('./routing/htmlroute')(app, fs);

// Starts and listens server
app.listen(PORT, function() {
    console.log(`Listening to port ${PORT}`);
});