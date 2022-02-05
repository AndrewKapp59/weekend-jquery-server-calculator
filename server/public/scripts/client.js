$(document).ready(onReady);

function onReady(){
  // $('.button').on('click', buttonClick)
  // $('.button').on('click', buttonText)
  $('#divide').on('click', divideClicked)
  $('#multiply').on('click', multiplyClicked)
  $('#subtract').on('click', subtractClicked)
  $('#add').on('click', addClicked)
  $('#equal').on('click', addEquation)
}

let buttonClicked;

// one of these functions gets run to update the buttonClicked value
// when the corresponding button is pressed by the user
function divideClicked () {
  buttonClicked = '/'
  console.log(buttonClicked);
}
function multiplyClicked () {
  buttonClicked = '*'
  console.log(buttonClicked);
}
function subtractClicked () {
  buttonClicked = '-'
  console.log(buttonClicked);
}
function addClicked () {
  buttonClicked = '+'
  console.log(buttonClicked);
}

function addEquation() {
  let firstInput = $('#inputOne').val();
  let secondInput = $('#inputTwo').val();
  let operatorInput = buttonClicked;
  $('#inputOne').val('');
  $('#inputTwo').val('');
  //using AJAX to send a post request to the server
  $.ajax({
    method: 'POST', 
    url: '/equation',
    data: {
      equationToAdd: {
        firstNumber: firstInput,
        secondNumber: secondInput,
        operator: operatorInput,
        equals: '=',
        answer: '',
      }
    }
  }).then(function(response){
    console.log('Equation Added');
    // getInventory(); // to refresh the DOM with the new item
  }).catch(function(response){
    console.log('UGHHHH Equation not added');
  })
}


