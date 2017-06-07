/* jslint browser:true */
/* global $:false, console:false */

$(document).ready(function($) {
  'use strict';
  console.log('%c Hi, let me know if you found anything interesting here ( ͡° ͜ʖ ͡° )', 'background: #222; color: #bada55; padding: 5px');
  // Control SVG animation at ABOUT_ME section
  setTimeout(function() {
    $('.bio-container').fadeIn(3000);
    $('.img-bg1').fadeIn(3000);
    $('.img-bg2').fadeOut(3000);
  }, 3000);

  // idea of determine scroll direction taken from:
  // http://stackoverflow.com/questions/4326845/how-can-i-determine-the-direction-of-a-jquery-scroll-event
  var lastScrollTop = 0;
  var scrollSpeed = 2.0;
  $(window).scroll(function(event) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) { // if scroll down
      $('#projects-bg').addClass('projects');
      $('.img-bg1').css('top', '-' + Math.floor($(window).scrollTop() * scrollSpeed) + 'px');
      $('.img-bg2').css('top', '-' + Math.floor($(window).scrollTop() * scrollSpeed) + 'px');
      $('.sun').css('top', Math.floor($(window).scrollTop()) * 0.04) + 'px';

    } else { // if scroll up
      $('.img-bg1').css('top', '-' + Math.floor($(window).scrollTop() * scrollSpeed) + 'px');
      $('.img-bg2').css('top', '-' + Math.floor($(window).scrollTop() * scrollSpeed) + 'px');
      $('.sun').css('top', Math.floor($(window).scrollTop()) * 0.04) + 'px';
    }
    lastScrollTop = st;
  });
  // oppening and closing fake console
  $('.ui-x').click(function() {
    $(this).parent().parent().css('display', 'none');
  });
  $('.ui-up').click(function() {
    $(this).parent().parent().css({
      'height': '20px',
      'resize': 'none',
      'overflow': 'hidden',
      'padding': '13px'
    });
  });
  $('.ui-down').click(function() {
    $(this).parent().parent().css({
      'height': '340px',
      'resize': 'both',
      'overflow': 'auto',
      'padding': '40px 5px 5px'
    });
  });

  $('.bio').textillate({
    loop: false,
    initialDelay: 2500,
    autoStart: true,
    in: {
      effect: 'fadeInRightBig',
      delayScale: 1.5,
      delay: 5,
      sync: false,
      shuffle: false,
      reverse: false
    },
    type: 'char'
  });

  $('.img-wrapper').AniView();
  $('.console-wrapper').AniView();
  // When menu is open move all images to the right by 250px
  // When it's closed move it back
  $('.navbar-toggle').on('click', function() {
    console.log($('.cloud3').position());
    var sunPositionMove = ($('.sun').position().left + 250) + 'px';
    var cloud1PositionMove = ($('.cloud1').position().left + 250) + 'px';
    var cloud2PositionMove = ($('.cloud2').position().left + 250) + 'px';
    var cloud3PositionMove = ($('.cloud3').position().left + 250) + 'px';
    if ($('.sidenav').hasClass('menu-hidden')) {
      $('.sidenav').toggleClass('menu-show menu-hidden');
      $('.navbar-toggle').toggleClass('collapsed');
      $('.sidenav').css({
        'transition': 'width 1s ease',
        'width': '250px'
      });
      $('.site-wrap').css({
        'transition': 'left 1s ease',
        'left': '250px'
      });
      $('.navbar-toggle').css({
        'transition': 'left 1s ease',
        'left': '180px'
      });
      $('.sun').css({
        'transition': 'left 1s ease',
        'left': sunPositionMove
      });
      $('.cloud1').css({
        //'transition': 'left 1s ease',
        'left': cloud1PositionMove
      });
      $('.cloud2').css({
        //'transition': 'right 1s ease',
        'left': cloud2PositionMove
      });
      $('.cloud3').css({
        //'transition': 'right 1s ease',
        'left': cloud3PositionMove
      });
    } else {
      $('.sidenav').toggleClass('menu-show menu-hidden');
      $('.navbar-toggle').toggleClass('collapsed');
      $('.sidenav').css('width', '0px');
      $('.site-wrap').css('left', '0px');
      $('.navbar-toggle').css('left', '15px');
      $('.sun').css({
        //'transition': 'left 1s ease',
        'left': ''
      });
      $('.cloud1').css({
        //'transition': 'left 1s ease',
        'left': ''
      });
      $('.cloud2').css({
        //'transition': 'left 1s ease',
        'left': ''
      });
      $('.cloud3').css({
        //'transition': 'left 1s ease',
        'left': ''
      });
    }
  });
  // Canvas for skills cloud with parameters
  // http://www.goat1000.com/tagcanvas-examples.php
  if (!$('#myCanvas').tagcanvas({
      textColour: '#fff',
      outlineColour: 'transparent',
      reverse: true,
      depth: 0.3,
      maxSpeed: 0.1,
      initial: [0.030, 0.150],
      imageScale: 0.8,
      activeCursor: 'default',
      noSelect: true,
      wheelZoom: false

    }, 'tags')) {
    // something went wrong, hide the canvas container
    $('#myCanvasContainer').hide();
  }
  // Show and hide clouds when scrolling using waypoints.js
  $('.cloud1-trigger').waypoint(function(direction) {
    if (direction === 'down') {
      $('.cloud1').addClass('cloud1-vissible');
    } else {
      $('.cloud1').removeClass('cloud1-vissible');
    }
  });

  $('.cloud2-trigger').waypoint(function(direction) {
    if (direction === 'down') {
      $('.cloud2').addClass('cloud2-vissible');
    } else {
      $('.cloud2').removeClass('cloud2-vissible');
    }
  });

  $('.cloud3-trigger').waypoint(function(direction) {
    if (direction === 'down') {
      $('.cloud3').addClass('cloud3-vissible');
    } else {
      $('.cloud3').removeClass('cloud3-vissible');
    }
  });
  // Add class .active to current menu position
  $(".nav a").on("click", function() {
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });

  // Add smooth scrolling to all links
  // Idea taken from https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_animate_smoothscroll
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

});
