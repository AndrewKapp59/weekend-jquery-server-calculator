const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

//body parser
app.use(bodyParser.urlencoded({ extended: true }))

// points to where the html file is
app.use(express.static('server/public'));

let mathHistory = []


app.post('/equation', function(req, res){
  // the data that is send from the client is saved for us in req.body
  console.log('req.body from the POST is', req.body);
  
  // sets the elements of the object sent by the client to values
  let firstNumber = Number(req.body.equationToAdd.firstNumber);
  let secondNumber = Number(req.body.equationToAdd.secondNumber);
  let operator = req.body.equationToAdd.operator;
  let equals = req.body.equationToAdd.equals;
  
  // enters the values into a function that does the math
  // and returns an answer
  let answer = doMath(firstNumber, operator, secondNumber)
  
  console.log(answer);

  // adds the answer element to the object
  req.body.equationToAdd['answer'] = answer

  // pushes the updated object with the answer to 
  // the array that records each equation
  mathHistory.push(req.body.equationToAdd);

  // send back a status code of 201
  res.sendStatus(201);
})

// gets the current scoreboard and sends it to the client
app.get('/history', function(req, res){
  res.send(mathHistory);
});



//listens for the port and starts our server
app.listen(PORT, function(){
  console.log('listening on port', PORT);
});

function doMath (first, operator, second) {
  if (operator === '/') {
    // console.log('doMath is running');
    let answer = first / second;
    return answer; 
  }
  else if (operator === '*') {
    let answer = first * second;
    return answer; 
  }
  else if (operator === '-') {
    let answer = first - second;
    return answer; 
  }
  else if (operator === '+') {
    let answer = first + second;
    return answer; 
  }
}
