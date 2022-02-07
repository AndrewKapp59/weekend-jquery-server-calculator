const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

//body parser
app.use(bodyParser.urlencoded({ extended: true }));

// points to where the html file is
app.use(express.static('server/public'));

let mathHistory = [];

// sends and updated object to the mathHistory array
app.post('/equation', (req, res) => {
  let equationString = req.body.equationToAdd.input;
  console.log(equationString);

  let answer = expr(equationString)
  console.log(answer);

  // adds the answer, element to the object
  req.body.equationToAdd['answer'] = answer;

  // pushes the updated object with the answer to the mathHistory array
  mathHistory.push(req.body.equationToAdd);

  // send back a status code of 201
  res.sendStatus(201);
});

// gets the current history and sends it to the client
app.get('/history', (req, res) => {
  res.send(mathHistory);
});

// sends an specified object from mathHistory to the client
app.get('/answer', (req, res) => {
  console.log(req.query.index);
  let object = mathHistory[req.query.index];
  console.log(object);
  res.send(object);
});

// empties the mathHistory array
app.delete('/history', (req, res) => {
  mathHistory = [];
  res.send(mathHistory);
});

function expr (expr) {

  var chars = expr.split("");
  var n = [], op = [], index = 0, oplast = true;

  n[index] = "";

  // Parses the string sent by the client
  for (var c = 0; c < chars.length; c++) {

      if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
          op[index] = chars[c];
          index++;
          n[index] = "";
          oplast = true;
      } else {
          n[index] += chars[c];
          oplast = false;
      }
  }

  // Calculates the expression
  expr = parseFloat(n[0]);
  for (var o = 0; o < op.length; o++) {
      var num = parseFloat(n[o + 1]);
      switch (op[o]) {
          case "+":
              expr = expr + num;
              break;
          case "-":
              expr = expr - num;

              break;
          case "*":
              expr = expr * num;

              break;
          case "/":
              expr = expr / num;
              console.log(expr);
              break;
      }
  }
  return expr;
}


//listens for the port and starts our server
app.listen(PORT, function () {
  console.log('listening on port', PORT);
});
