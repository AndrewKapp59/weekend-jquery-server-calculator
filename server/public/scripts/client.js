$(document).ready(onReady);

function onReady(){
  // $('#divide').on('click', divideClicked)
  // $('#multiply').on('click', multiplyClicked)
  // $('#subtract').on('click', subtractClicked)
  // $('#add').on('click', addClicked)
  $('#equal').on('click', postEquation)
  $('#clear').on('click', clearInputs)
  $('#backspace').on('click', backspace)
  $('#divide').on('click', addInput)
  $('#multiply').on('click', addInput)
  $('#subtract').on('click', addInput)
  $('#add').on('click', addInput)
  $('#one').on('click', addInput)
  $('#two').on('click', addInput)
  $('#three').on('click', addInput)
  $('#four').on('click', addInput)
  $('#five').on('click', addInput)
  $('#six').on('click', addInput)
  $('#seven').on('click', addInput)
  $('#eight').on('click', addInput)
  $('#nine').on('click', addInput)
}

let buttonClicked;

let equation = {}

function equationObject () {
  label
  let input = $(this).text();
  equation['number' ]

  $('#input').val($('#input').val() + input)
  console.log($('#input').val());
}


// one of these functions gets run to update the buttonClicked value
// when the corresponding button is pressed by the user
// function divideClicked () {
//   buttonClicked = '/'
//   console.log(buttonClicked);
// }

// function multiplyClicked () {
//   buttonClicked = '*'
//   console.log(buttonClicked);
// }

// function subtractClicked () {
//   buttonClicked = '-'
//   console.log(buttonClicked);
// }

// function addClicked () {
//   buttonClicked = '+'
//   console.log(buttonClicked);
// }


function clearInputs () {
  $('#input').val('');
  // $('#inputOne').val('');
  // $('#inputTwo').val('');
}

function addInput () {
  let input = $(this).text();
  $('#input').val($('#input').val() + input)
  console.log($('#input').val());
}


function backspace () {
  let value = $("#input").val();
  if (!(parseInt(parseFloat(value)) == 0 && value.length == 1))
      $("#input").val(value.slice(0, value.length - 1));
  if (value.length == 1)
      $("#expression").val("0");
};


function postEquation() {
  let input = $('#input').val()
  // let firstInput = $('#inputOne').val();
  // let secondInput = $('#inputTwo').val();
  // let operatorInput = buttonClicked;
  $('#input').val('');
  // $('#inputOne').val('');
  // $('#inputTwo').val('');
  //using AJAX to send a post request to the server
  $.ajax({
    method: 'POST', 
    url: '/equation',
    data: {
      equationToAdd: {
        input: input,
        // firstNumber: firstInput,
        // secondNumber: secondInput,
        // operator: buttonClicked,
        equals: '=',
        answer: '',
      }
    }
  }).then(function(response){
    console.log('Equation Added');
    getMathHistory(); // to refresh the DOM with the new item
  }).catch(function(response){
    console.log('UGHHHH Equation not added');
  })
}

function getMathHistory () {
  // using AJAX to make a get request to the server for the scoreboard array
  $.ajax({
    method: 'GET',
    url: '/history'
  }).then(function(response){
    console.log('History updated', response);
    // runs renderToDom to append the updated mathHistory array from the server
    renderToDom(response);
  }).catch(function(response){
    console.log('getMathHistory not working', response);
  });
}

function renderToDom(history) {
  // empties HTML elements before reappending everything
  $('#mathHistory').empty()
  for (let i of history) {
    $('#mathHistory').append(`
      <li>${i.firstNumber} ${i.operator} ${i.secondNumber} ${i.equals} ${i.answer}</li>
    `)
  }
}



