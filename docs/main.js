
// TODO:
//   - get position of right most side of last image
//     - store in variable
//   - on load, start on the left? center?
//   - get a scroll width
//     - if the scroll width <0 or >right most, calculate difference

function load_scrollers() {

  var total_width = -$('.list').css('right');
  console.log(total_width);

  var scroll_width = function() {
    var left_position = left_position();
    console.log(left_position);

    var standard_scroll_width = (total_width / 4);
    console.log(standard_scroll_width);

    if (left_position + standard_scroll_width) {
      return (total_width - left_position);
    }
    else {
      return standard_scroll_width;
    }
  }

  var left_position = function() {
    return -$('.list').position().left;
  }

  $('.scroller-right').click(function() {
    var scroll_amount = scroll_width();
    $('.scroller-left').fadeIn('slow');
    $('.list').animate({left:"-="+ scroll_amount +"px"},'slow',function(){ });
  });

  $('.scroller-right').click(function() {
    var scroll_amount = scroll_width();
    $('.scroller-left').fadeIn('slow');
    $('.list').animate({left:"-="+ scroll_amount +"px"},'slow',function(){ });
  });

  var adjust = function(){
    if (($('.wrapper').outerWidth()) < total_width) {
      $('.scroller-right').show();
    }
    else {
      $('.scroller-right').hide();
    }

    if (left_position()<0) {
      $('.scroller-left').show();
    }
    else {
      $('.item').animate({left:"+="+left_position()+"px"},'slow');
    	$('.scroller-left').hide();
    }
  }

  adjust();

  $(window).on('resize',function(e){
    	adjust();
  });

  // var widthOfList = function(){
  //   var itemsWidth = 0;
  //   $('.list li').each(function(){
  //     var itemWidth = $(this).outerWidth();
  //     itemsWidth+=itemWidth;
  //   });
  //   return itemsWidth;
  // };
  //
  // var scroll_width = function(){
  //   return ((($('.wrapper').outerWidth())+widthOfList()) / 4);
  // };
  //
  // var getLeftPosi = function(){
  //   return $('.list').position().left;
  // };
  //
  // var reAdjust = function(){
  //   if (($('.wrapper').outerWidth()) < widthOfList()) {
  //     $('.scroller-right').show();
  //   }
  //   else {
  //     $('.scroller-right').hide();
  //   }
  //
  //   if (getLeftPosi()<0) {
  //     $('.scroller-left').show();
  //   }
  //   else {
  //     $('.item').animate({left:"+="+getLeftPosi()+"px"},'slow');
  //   	$('.scroller-left').hide();
  //   }
  // }
  //
  // reAdjust();
  //
  // $(window).on('resize',function(e){
  //   	reAdjust();
  // });
  //
  // $('.scroller-right').click(function() {
  //   console.log(getLeftPosi());
  //   console.log(scroll_width());
  //   console.log(widthOfList());
  //
  //   if ((-getLeftPosi() + scroll_width()) > widthOfList()) {
  //     scroll_amount = widthOfList() - (-getLeftPosi());
  //   }
  //   else {
  //     scroll_amount = scroll_width();
  //   }
  //
  //   $('.scroller-left').fadeIn('slow');
  //   $('.list').animate({left:"-="+ scroll_amount +"px"},'slow',function(){ });
  // });
  //
  // $('.scroller-left').click(function() {
  // 	$('.scroller-right').fadeIn('slow');
  // 	// $('.scroller-left').fadeOut('slow');
  //     $('.list').animate({left:"+="+scroll_width()+"px"},'slow',function(){ });
  // });
};
