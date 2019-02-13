
var $marker = $('.box');
var $window = $(window);

function check_if_in_view() {
  
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
   

    $.each($marker, function () {
      
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
        console.log(element_height);
       
        if ((element_bottom_position > window_top_position) &&
        (element_top_position <= window_bottom_position)) {
            $element.addClass('active');
        } else {
           
        }
    });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');


