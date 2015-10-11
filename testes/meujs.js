var main = function() {
  $('#uff').click(function() {
      $('.tl-timeline').hide();
      $('#timeline-uff').show();
  });

  $('#ufop').click(function() {
      $('.tl-timeline').hide();
      $('#timeline-ufop').show();
  });

  /* Empurra o body e o bottom bar para 200px acima */
  $('.menu').click(function() {
    $('.bottombar').animate({
      bottom: "0px"
    }, 200);

    $('body').animate({
      bottom: "300px"
    }, 200);
  });

  /* Volta para posição original */
  $('.close-bottom').click(function() {
    $('.bottombar').animate({
      bottom: "-300px"
    }, 200);

    $('body').animate({
      bottom: "0px"
    }, 200);
  });
};


$(document).ready(main);
