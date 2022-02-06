const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

//body parser
app.use(bodyParser.urlencoded({ extended: true }))

// points to where the html file is
app.use(express.static('server/public'));

let mathHistory = []

let firstNumber = 0;
let operator = '';
let secondNumber = 0;

app.post('/equation', function(req, res){
  // the data that is send from the client is saved for us in req.body
  // console.log('req.body from the POST is', req.body);
  
  // sets the elements of the object sent by the client to values
  // let firstNumber = Number(req.body.equationToAdd.firstNumber);
  // let secondNumber = Number(req.body.equationToAdd.secondNumber);
  // let operator = req.body.equationToAdd.operator;
  // let equals = req.body.equationToAdd.equals;
  
  let equationString = (req.body.equationToAdd.input)
  console.log(equationString);

  // enters the values into a function that does the math
  // and returns an answer
  // let answer = doMath(firstNumber, operator, secondNumber)

  // let answer = doMath()
  
  let answer = doMathDifferently(equationString)

  console.log(answer);

  // adds the answer element to the object
  req.body.equationToAdd['firstNumber'] = firstNumber;
  req.body.equationToAdd['secondNumber'] = secondNumber;
  req.body.equationToAdd['operator'] = operator;
  req.body.equationToAdd['answer'] = answer;

  // // pushes the updated object with the answer to 
  // // the array that records each equation
  mathHistory.push(req.body.equationToAdd);

  // send back a status code of 201
  res.sendStatus(201);
})

// gets the current history and sends it to the client
app.get('/history', function(req, res){
  res.send(mathHistory);
});

app.delete('/history', function(req, res){
  mathHistory = [];
  res.send(mathHistory);
});

function doMathDifferently (str) {
  let numOne = '';
  let symbol = '';
  let numTwo = '';

  for (let i=0; i<str.length; i++) {
    if (!isNaN(String(str[i]) * 1)) {
      numOne += str[i];
    }
    if (String(str[i]) === '.' ) {
      numOne += str[i];
    }
    if (String(str[i]) === '/' || str[i] === '*' || str[i] === '-' || str[i] === '+'){
      symbol = str[i];
      break;
    }
  }

  for (let i=numOne.length + 1; i<str.length; i++) {
    if (!isNaN(String(str[i]) * 1)) {
      numTwo += str[i];
    }
    if (String(str[i]) === '.' ) {
      numTwo += str[i];
    }
  }
  
  console.log(numOne);
  console.log(symbol);
  console.log(numTwo);

  firstNumber = numOne;
  operator = symbol;
  secondNumber = numTwo;

  return doMath(numOne, symbol, numTwo)
}


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
    let answer = Number(first) + Number(second);
    return answer; 
  }
}



//listens for the port and starts our server
app.listen(PORT, function(){
  console.log('listening on port', PORT);
});