$(document).ready(onReady);

function onReady() {
  $('#equal').on('click', postEquation);
  $('#clear').on('click', clearInputs);
  $('#clearHistory').on('click', deleteMathHistory);
  $('#backspace').on('click', backspace);
  $('#percentage').on('click', percent);
  $('#divide').on('click', addInput);
  $('#multiply').on('click', addInput);
  $('#subtract').on('click', addInput);
  $('#add').on('click', addInput);
  $('#dot').on('click', addInput);
  $('#leftParen').on('click', addInput);
  $('#rightParen').on('click', addInput);
  $('#zero').on('click', addInput);
  $('#one').on('click', addInput);
  $('#two').on('click', addInput);
  $('#three').on('click', addInput);
  $('#four').on('click', addInput);
  $('#five').on('click', addInput);
  $('#six').on('click', addInput);
  $('#seven').on('click', addInput);
  $('#eight').on('click', addInput);
  $('#nine').on('click', addInput);
  $('#mathHistory').on('click', '.equation', runOldEquation);
}

// used in getMathHistory to post mathHistory to the DOM
function renderToDom(history) {
  $('#mathHistory').empty();
  for (let i of history) {
    indexCounter += 1;
    $('#mathHistory').append(`
      <li class = "equation" data-id = ${indexCounter}>${i.input} ${i.equals} ${i.answer}</li>
    `);
  }
  indexCounter = -1;
}

// adds the text of a button to the string in the input field
function addInput() {
  let input = $(this).text();
  $('#input').val($('#input').val() + input);
}

// empties the input field
function clearInputs() {
  $('#input').val('');
}

// removes the value at the end of the string
function backspace() {
  let value = $('#input').val();
  $('#input').val(value.slice(0, value.length - 1));
}

// converts the current number value in the input to a percentage
function percent() {
  let value = $('#input').val();
  let percent = value / 100;
  $('#input').val(percent);
  console.log($('#input').val());
}

// takes the equation string and posts it to the server inside an object
function postEquation() {
  let input = $('#input').val();
  console.log(input);
  $('#input').val('');
  $.ajax({
    method: 'POST',
    url: '/equation',
    data: {
      equationToAdd: {
        input: input,
        equals: '=',
        answer: '',
      },
    },
  })
    .then(function (response) {
      console.log('Equation Added');
      getMathHistory(); // to refresh the DOM with the new item
    })
    .catch(function (response) {
      console.log('UGHHHH Equation not added');
    });
}

// gets the mathHistory array from the server and posts it to the DOM
function getMathHistory() {
  $.ajax({
    method: 'GET',
    url: '/history',
  })
    .then(function (response) {
      console.log('History updated', response);
      // runs renderToDom to append the updated mathHistory array from the server
      renderToDom(response);
    })
    .catch(function (response) {
      console.log('getMathHistory not working', response);
    });
}

// sends a request to the sever to empty the mathHistory array
function deleteMathHistory() {
  $.ajax({
    method: 'DELETE',
    url: '/history',
  })
    .then(function (response) {
      console.log('History deleted', response);
      // runs renderToDom to append the updated mathHistory array from the server
      renderToDom(response);
    })
    .catch(function (response) {
      console.log('deleteMathHistory not working', response);
    });
  indexCounter = -1;
}

let indexCounter = -1;

function runOldEquation() {
  let index = $(this).data('id');
  $.ajax({
    method: 'GET',
    url: '/answer',
    data: {
      index: index,
    },
  })
    .then(function (response) {
      console.log('Answer added to input');
      $('#input').val(response.answer);
    })
    .catch(function (response) {
      console.log('runOldEquation not working', response);
    });
}
