// require the express package
const express = require("express");
const path = require("path");
const fs = require("fs");
//instantiate the server
const app = express();
const PORT = 3003;

// Express middleware! For Data Parsing
app.use(express.static('public'));
app.use("/assets", express.static("./assets"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//require the html api routes
require("./routing/html-routes")(app);
require("./routing/apiroute")(app);


// Starts and listens server
app.listen(PORT, function() {
    console.log(`Listening to port ${PORT}`);
})