/*global $:false */
/*global window: false */

(function(){
  "use strict";


$(function ($) {

    
     //Detecting viewpot dimension and calculating the adjustments of components   
     var vH = $(window).height();
     var vHperc40 = vH*40/100;
     var vHperc10 = vH*10/100;
     $('#home').css('height', vH);
     $('#intro').css('margin-top', vHperc10);
     $('.scroll-trigger').css('margin-top', vHperc40);
     //swiper optimization for large screens
     var sH = $('.swiper-slide').height();
     if(sH === 1008){
     var sHneg = sH-400;
     $('.swiper-container').css('max-height',sHneg+'px');
     }

  //Switching Feed Panels
  $('.feed-trigger').click(function(){
    var feedTrigger = $(this).attr('data-feed-trigger');
    $('.feed').hide();
    $('#'+feedTrigger).slideDown('slow');
    $('.feed-trigger').css('opacity','0.3');
    $(this).css('opacity','1');
  });
    
  //Home Page Animations
  setTimeout(function(){
  $('.backstretch').fadeIn();
  }, 1000);
  setTimeout(function(){
  $('#logo').show().addClass('animated rotateIn');
  }, 1200);
	setTimeout(function(){
  $('#intro h1').show().addClass('animated fadeInUpBig');
  }, 1500);
  setTimeout(function(){
  $('#intro h2 > span').fadeIn('slow');
  }, 3500);
  setTimeout(function(){
  $('#explore a img').fadeIn('slow');
  }, 3600);


    $('#explore a img').mouseenter(function(){
        $(this).addClass('animated pulse');
    });
    $('#explore a img').mouseleave(function(){
        $(this).removeClass('animated pulse');
    });

    //Nav highlight
    $('#mast-nav li > a').click(function(){
        $('#mast-nav li > a').removeClass('active');
        $(this).addClass('active');
    });

    $('.page-section').mouseenter(function(){
        var sectionId = $(this).attr('id');
        $('#mast-nav li > a').removeClass('active');
        $('#'+sectionId+'-linker').addClass('active');
    });

    //Parallax Init
    $(window).stellar({
        responsive: false,
        horizontalScrolling: false,
        parallaxBackgrounds: true,
        parallaxElements: true,
        hideDistantElements: true
    });




    //WAYPOINTS - INTERACTION
    //=======================

    //Triggering Navigation as Sticky when scrolled to second section:
    $('.navigation-fadeIn').waypoint(function (event, direction) {
        if (direction === 'down') {
            $('#masthead').slideDown('slow');
        } else {
            $('#masthead').slideUp('slow');
        }
    }, { offset: 10 });

});

})();