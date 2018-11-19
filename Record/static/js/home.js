$(function () {

    bindEvent();
    initMap();

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

    function initMap() {
        	let map = new BMap.Map("mapContainer"); // 创建Map实例
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
			map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
			map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    }
});