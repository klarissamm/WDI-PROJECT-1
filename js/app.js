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
  var tomato;

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
    if (count <= 0) {
      clearInterval(imagesInterval);
      $('.scoreboard').html('');
      if (score >= 3) {
        $('.winner').fadeIn('fast');
        $('.winner').html('Well done! on to the next level');
        level += 1;
        nextLevel();
      } else if (score < 3) {
        $('.winner').fadeIn('fast');
        $('.winner').html('Try again, you do not have enough points to get to the next level');
        reset();
      }
    }
  }

  function flash(argument) {
    setTimeout(function() {
      $('ul li img').remove();
      argument.css('background-image', 'none');
    }, randomObject.speed);
    eventListener($random);
  }

  function eventListener(placeholder) {
    placeholder.one('click', function() {
      if (placeholder.css('background-image') !== 'none') {
        console.log(placeholder.css('background-image') !== 'none');
        var tomato = document.createElement('img');
        tomato.setAttribute('src', 'images/tomato.png');
        $(this).append(tomato);
        $('.scoreboard').html(score += randomObject.points);
        // placeholder.css('background-image', 'url("images/tomato.png")');
      }
    });
  }

  //check for that post click bit of code and also why my score is not incrementing!!!

  function reset() {
    count = 10;
    $('.countdown').html(count);
    timer = '';
    imagesInterval = '';
    score = 0;
    level = 1;
    intervalSpeed = 2000;
    $('button').show();
  }

  function nextLevel() {
    console.log('Now the level is', level);
    if (level === 2) {
      intervalSpeed -= 200;
      count = 20;
      $('.countdown').html(count);
      score = 0;
      $('button').show();
    } else if (level === 3) {
      intervalSpeed -= 200;
      count = 30;
      $('.countdown').html(count);
      score = 0;
      console.log(intervalSpeed);
      $('button').show();
    }
  }


  var objects = [
    { name: 'drake',
      image: ('http://i.imgur.com/tvQxI6h.png'),
      speed: 2000,
      points: 1
    },
    { name: 'taylor',
      image: ('./images/tay.png'),
      speed: 2000,
      points: 2
    },
    { name: 'rihanna',
      image: ('./images/rih.png'),
      speed: 2000,
      points: -2
    }
  ];


});
