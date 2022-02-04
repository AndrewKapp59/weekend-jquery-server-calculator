const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

//body parser
app.use(bodyParser.urlencoded({ extended: true }))

// points to where the html file is
app.use(express.static('server/public'));


//listens for the port and starts our server
app.listen(PORT, function(){
  console.log('listening on port', PORT);
});
