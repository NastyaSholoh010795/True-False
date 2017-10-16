$(function() {
    $('[data-toggle="popover"]').popover({
        trigger: 'hover'
    });
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function () {
    $('.fixed-btn').hover(function () {
        $(this).children('i').removeClass('fz-24').addClass('fz-36').css('transition','all 0.2s ease-in-out 0s');
    },function () {
        $(this).children('i').removeClass('fz-36').addClass('fz-24');
    });

    $(document).ready(function() {


        $(".transition-link").click(function(event){
            event.preventDefault();
            linkLocation = this.href;
            $("body").fadeOut(400, redirectPage);
            $("body").fadeIn(400, redirectPage);
        });

        function redirectPage() {
            window.location = linkLocation;
        }
    });
});