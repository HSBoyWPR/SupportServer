$(function () {
    let map;
    bindEvent();
    initMap();

    function bindEvent() {
        $("#li_trackSearch").click(function () {
            Utils.Status.changeStatus({text: '页面打开中...'});
            $("#content").find("iframe").attr('src', '/record/track');
            Utils.Status.changeStatus({text: '就绪', state: 'suc'});
        });

        $("#track_attr tr").not(':eq(0)').click(pointsClick)
    }

    function initMap() {
        map = new BMap.Map("mapContainer"); // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    }

    function pointsClick(e) {
        let row = e.currentTarget;
        if (row) {
            let lon = row.cells[1].innerText;
            let lat = row.cells[2].innerText;
            let point=new BMap.Point(parseFloat(lon), parseFloat(lat));
            map.panTo(point); // 初始化地图,设置中心点坐标和地图级别
            let marker = new BMap.Marker(point);
            map.clearOverlays();
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        }
    }
});