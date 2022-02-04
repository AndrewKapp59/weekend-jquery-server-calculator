$(document).ready(onReady);

function onReady(){
$('#equal').on('click', addEquation)
}

buttonClicked = ;

function addEquation() {
  let firstInput = $('#inputOne').val();
  // let operator = $('')
  let secondInput = $('#inputTwo').val();
  $('#inputOne').val('');
  $('#inputTwo').val('');
  //use AJAX to make a post request to the server
  $.ajax({
    method: 'POST', 
    url: '/equation',
    data: {
      equationToAdd: {
        firstNumber: firstInput,
        // operator: '',
        secondNumber: secondInput,
      }
    }
  }).then(function(response){
    console.log('Equation Added');
    getInventory(); // to refresh the DOM with the new item
  }).catch(function(response){
    console.log('UGHHHH Equation not added');
  })
}

 function buttonClick(){
   if($('.button').on('click').text() === '/')
 
   $('.button').on('click').text() === '*';
   $('.button').on('click').text();
   $('.button').on('click').text();
 }
