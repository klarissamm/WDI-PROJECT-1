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
    $('.instructions').hide();
    $('.winner').hide();
    $('.shader').hide();
    // Initially hide start button
    // $(this).hide();
    timer = setInterval(countdownTimer, 1000);
    imagesInterval = setInterval(go, intervalSpeed);
  }

  function init() {
    $('#button').on('click', begin);
    $('.winner #again').on('click', begin);
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
          $('.winner p').html('Nice one mate!');
          $('.winner button').html('Next level');
          level += 1;
          new Audio('./audio/uhhuh.mp3').play();
          nextLevel();
        } else {
          $('.winner').fadeIn('fast');
          $('.winner p').html('Loser! Try again');
          $('.winner button').html('Try again');
          new Audio('./audio/haha.mp3').play();
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
