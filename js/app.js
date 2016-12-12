$(function(){

  var $squares = $('li');
  var randomPerson;
  var $random;
  // var points = 0;
  // var timerInterval = 0;
  // var squaresArray = [];
  // var playerScore = 0;


  var objects = [
    { name: 'drake',
      image: ('http://fillmurray.com/200/200'),
      speed: 2000,
      points: 1
    },
    { name: 'taylor',
      image: ('http://placehold.it/200x200'),
      speed: 2000,
      points: 2
    },
    { name: 'rihanna',
      image: ('http://lorempixel.com/200/200/sports/Dummy-Text/'),
      speed: 2000,
      points: -2
    },
    { name: 'bonus',
      image: ('http://lorempixel.com/200/200/'),
      speed: 2000,
      points: 10
    }
  ];



  function go() {
    $random = $($squares[Math.floor(Math.random() * $squares.length)]);
    randomPerson = objects[Math.floor(Math.random() * objects.length)];
    $($random).css('background-image', 'url(' + randomPerson.image + ')');
    flash($random);

  }

  go();


  function flash(argument) {
    setTimeout(function() {
      argument.css('background-image', 'none');
    }, randomPerson.speed);
    eventListener($random);
  }

  function eventListener(placeholder) {
    placeholder.on('click', function() {
      if (placeholder.css('background-image', 'none')!== true) {
        console.log(randomPerson.points);
      }
    });



  }




// Build the start button which starts both the countdown timer and the game which are linked
// We need to loop through the go function and sort out intervaltiming so that it keeps happening until the countdown timer becomes 0,
  // and build the countdown timer
// We need to store the points in a separate scoreboard, linked to successful clicks
// We need to make the game end and declare whether the player has won or lost / level up



 //
 // $('li').on('click', function(){
 //
 //  function flash (argument) {
 //    if ($random.on('click', function( ) {
 //      $($random).css('background-color': #FFF);
 //  } else {
 //    setTimeout(function(){
 //      $($random).css('background-color': #FFF);
 //    }, 1000);
 //  }

  // //
  //
  // function randomCell() {
  //   var $random = $($squares[Math.floor(Math.random() * $squares.length)]);
  //   console.log($random);
  //   $random.addClass('red');
  //   flash($random);
  //
  // }
  //
  // randomCell();

















});
