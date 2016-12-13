$(function() {

  var $squares = $('li');
  var randomObject;
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

  function begin() {
    // Initially hide start button
    $(this).hide();
    timer = setInterval(countdownTimer, 1000);
    imagesInterval = setInterval(go, intervalSpeed);
  }

  function init() {
    $('button').on('click', begin);
  }

  init();

  function countdownTimer() {
    $('.countdown').each(function() {
      count = parseInt($(this).html());
      if (count !== 0) {
        $(this).html(count - 1);
      } else if (count <= 0){
        clearInterval(timer);
        clearInterval(imagesInterval);

        if (score >= 3) {
          $('.winner').fadeIn('fast');
          $('.winner').html('Well done! Next Level!');
          level += 1;
          nextLevel();
        } else {
          $('.winner').fadeIn('fast');
          $('.winner').html('Booooo Try again');
          reset();
        }
      }
    });
  }

  function go() {
    $random = $($squares[Math.floor(Math.random() * $squares.length)]);
    scale = Math.floor(Math.random() * 10);
    if (scale < 4) {
      arrayNumber = 0;
    } else if (scale < 7) {
      arrayNumber = 1;
    } else if (scale < 10) {
      arrayNumber = 2;
    }
    randomObject = objects[parseInt(arrayNumber)];
    $($random).css('background-image', 'url(' + randomObject.image + ')');
    flash($random);
  }

  function flash(argument) {
    setTimeout(function() {
      $('ul li img').remove();
      argument.css('background-image', 'none');
    }, randomObject.speed);
    eventListener($random);
  }

  // function eventListener(placeholder) {
  //   placeholder.one('click', function() {
  //     if (placeholder.css('background-image') !== 'none') {
  //       if (placeholder.css('background-image') === 'url("http://i.imgur.com/tvQxI6h.png")'); {
  //         var tomato = document.createElement('img');
  //         tomato.setAttribute('src', 'images/tomato.png');
  //         $(this).append(tomato);
  //       } else {
  //         placeholder.css('background-image', 'none')
  //       }
  //         $('.scoreboard').html(score += randomObject.points);
  //       }
  //     }
  //   });
  // }


  function eventListener(placeholder) {
    placeholder.one('click', function() {
      if (placeholder.css('background-image') !== 'none') {
        var tomato = document.createElement('img');
        tomato.setAttribute('src', 'images/tomato.png');
        $(this).append(tomato);
        $('.scoreboard').html(score += randomObject.points);
      }
    });
  }

  function reset() {
    count = 10;
    level = 1;
    $('.countdown').html(count);
    timer = '';
    imagesInterval = '';
    score = 0;
    $('.scoreboard').html('');
    intervalSpeed = 2000;
    $('button').show();
  }

  function nextLevel() {
    console.log('Now the level is', level);
    if (level === 2) {
      score = 0;
      $('.scoreboard').html('');
      intervalSpeed -= 500;
      objects.speed -= 500;
      count = 20;
      $('.countdown').html(count);
      $('button').show();
    } else if (level === 3) {
      score = 0;
      $('.scoreboard').html('');
      intervalSpeed -= 400;
      objects.speed -= 1000;
      count = 30;
      $('.countdown').html(count);
      console.log(intervalSpeed);
      $('button').show();
    }
  }


  var objects = [
    { name: 'drake',
      image: ('http://i.imgur.com/tvQxI6h.png'),
      speed: 1500,
      points: 1
    },
    { name: 'taylor',
      image: ('./images/tay.png'),
      speed: 1500,
      points: 2
    },
    { name: 'rihanna',
      image: ('./images/rih.png'),
      speed: 1500,
      points: -2
    }
  ];


});
