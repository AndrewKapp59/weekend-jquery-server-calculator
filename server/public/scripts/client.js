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
  let operator = buttonClicked;
  let secondInput = $('#inputTwo').val();
  $('#inputOne').val('');
  $('#inputTwo').val('');
  //using AJAX to send a post request to the server
  $.ajax({
    method: 'POST', 
    url: '/equation',
    data: {
      equationToAdd: {
        firstNumber: firstInput,
        operator: operator,
        secondNumber: secondInput,
      }
    }
  }).then(function(response){
    console.log('Equation Added');
    // getInventory(); // to refresh the DOM with the new item
  }).catch(function(response){
    console.log('UGHHHH Equation not added');
  })
}

// function buttonText () {
//   let buttonPressed = $('.button').on('click').text()
//   console.log(buttonPressed);
// }


// .button on click text ends up equalling all buttons pressed at once

// function buttonClick(){
//   if($('#divide').on('click').text() === '/'){
//     buttonClicked =  '/';
//   }
//   else if ($('.button').on('click').text() === '*') {
//     buttonClicked = '*'; 
//   }
//   else if ($('.button').on('click').text() === '-') {
//     buttonClicked = '-'; 
//   }
//   else if ($('.button').on('click').text() === '+') {
//     buttonClicked = '-'; 
//   }
// }
