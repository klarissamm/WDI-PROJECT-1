$(function(){

  var $squares = $('li');
  var randomPerson;
  var $random;
  var count = 10;
  var timer;
  var imagesInterval;
  var score = 0;
  var scale;
  var arrayNumber;
  var level = 1;
  var intervalSpeed = 2000;

  $('.countdown').html(count);

  // var score;
  // var points = 0;
  // var timerInterval = 0;
  // var squaresArray = [];
  // var playerScore = 0;


  var objects = [
    { name: 'drake',
      image: ('http://www.technobuffalo.com/wp-content/uploads/2016/04/set_drake_hotling_bling_video-640-200x200.jpg'),
      speed: 1000,
      points: 1
    },
    { name: 'taylor',
      image: ('https://s-media-cache-ak0.pinimg.com/236x/b3/e7/ba/b3e7babe1d81c2d006de00d7e07dc4d1.jpg'),
      speed: 1000,
      points: 2
    },
    { name: 'rihanna',
      image: ('https://vg-images.condecdn.net/image/NNPLx6AejnV/crop/200/square/top'),
      speed: 1000,
      points: -2
    }
  ];
    // { name: 'bonus',
    //   image: ('https://media4.giphy.com/media/3o7WTKIeUbhbDNnS5W/200_s.gif'),
    //   speed: 500,
    //   points: 10
    // }



  function beginGame() {
    $('button').on('click', function() {
      timer = setInterval(countdownTimer, 1000);
      imagesInterval = setInterval(go, intervalSpeed);
    });
  }

  beginGame();


  function countdownTimer() {
    $('.countdown').each(function() {
      count = parseInt($(this).html());
      if (count !== 0) {
        $(this).html(count - 1);
      } else if (count <=0 ) {
        clearInterval(timer);
      }
    });
  }

  function go() {
    $random = $($squares[Math.floor(Math.random() * $squares.length)]);
    scale = Math.floor(Math.random() * 10);
    if (scale < 5) {
      arrayNumber = 0;
    } else if (scale < 7) {
      arrayNumber = 1;
    } else {
      arrayNumber = 2;
    }
    randomPerson = objects[parseInt(arrayNumber)];
    $($random).css('background-image', 'url(' + randomPerson.image + ')');
    flash($random);
    if (count <= 2) {
      clearInterval(imagesInterval);
      $('.scoreboard').html('');
      if (score >= 3) {
        $('.winner').fadeIn('fast');
        $('.winner').html('Well done! You got enough points to get to the next level!');
        level =+ 1;
        nextLevel(level);
      } else if (score < 3) {
        $('.winner').fadeIn('fast');
        $('.winner').html('You failed... try again!');
        // reset
      }
    }
  }

  function nextLevel(holder) {
    if (level === holder) {
      intervalSpeed -= 1000;
      count = 20;
      score = 0;
      beginGame();
    }
  }


  function flash(argument) {
    setTimeout(function() {
      argument.css('background-image', 'none');
    }, randomPerson.speed);
    eventListener($random);
  }

  function eventListener(placeholder) {
    placeholder.one('click', function() {
      if (placeholder.css('background-image') !==  'none') {
        console.log(placeholder.css('background-image') !== 'none');
        $('.scoreboard').html(score += randomPerson.points);
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
