$(function () {

    bindEvent();


    function bindEvent() {
        $("#left").mouseleave(function () {
            $("#left").animate({
                opacity: 0,
                left: "-=1000",
            }, 500);

            $("#left_expand").animate({
                opacity: 1
            }, 500);
        });

        $("#left_expand").mouseenter(function () {
            $("#left").animate({
                opacity: 1,
                left: "+=1000",
            }, 500);

            $("#left_expand").animate({
                opacity: 0
            }, 500);
        })

        $("#li_trackSearch").click(function () {
            Utils.Status.changeStatus({text: '页面打开中...'});
            $("#content").find("iframe").attr('src', '/record/track');
              Utils.Status.changeStatus({text: '就绪',state:'suc'});
        })
    }
});