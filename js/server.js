const path = require('path');
// require express module
const express = require('express');
// define path to static dir public
const publicDir = path.join(__dirname, '../public');
// define variable to call express methods
var app = express();
// configure express static middleware
app.use(express.static(publicDir));
// start server on port 3030 - add callback function
app.listen(8080, () => {
console.log('server running on port 8080');
});