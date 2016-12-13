$(function() {

  var $squares = $('li');
  var randomObject;
  var $random;
  var count = 20;
  var timer;
  var imagesInterval;
  var score = 0;
  var scale;
  var arrayNumber;
  var level = 1;
  var intervalSpeed = 2000;

  $('.countdown').html(count);

  function begin() {
    new Audio('http://peal.io/download/ahutc').play();
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

        if (score >= 5) {
          $('.winner').fadeIn('fast');
          $('.winner p').html('Nice one mate!');
          $('.winner button').html('Next level');
          level += 1;
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
    if (scale < 5) {
      arrayNumber = 0;
    } else if (scale < 8) {
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
        new Audio('./audio/Dart.mp3').play();
        $('.scoreboard').html(score += randomObject.points);
      }
    });
  }

  function reset() {
    count = 20;
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
      new Audio('./audio/uhhuh.mp3').play();
      score = 0;
      $('.scoreboard').html('');
      intervalSpeed -= 500;
      objects.speed -= 500;
      count = 10;
      $('.countdown').html(count);
      $('button').show();
    } else if (level === 3) {
      score = 0;
      $('.scoreboard').html('');
      intervalSpeed -= 400;
      objects.speed = 20;
      count = 10;
      $('.countdown').html(count);
      $('.winner p').html('FINISHED!');
      $('button').hide();
      new Audio('http://peal.io/download/5ypcq').play();
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
