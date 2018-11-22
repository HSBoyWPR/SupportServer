$(function () {

    bindEvent();
    initView();

    let map= myMap.init('mapContainer');

    function bindEvent() {
        $("#li_trackSearch").click(function () {
            Utils.Status.changeStatus({text: '页面打开中...'});
            $("#content").find("iframe").attr('src', '/record/track');
            Utils.Status.changeStatus({text: '就绪', state: 'suc'});
        });

        $("#track_attr tr").not(':eq(0)').click(pointsClick);
        $("#tb_track tr").not(':eq(0)').click(trackClick);
    }

    function initView() {
        $('#track_attrDIV').niceScroll({
            cursorborder: "", cursorcolor: "#17afd3", boxzoom: false, railpadding: {
                right: 0
            }
        });
        $('#trackListDIV').niceScroll({
            cursorborder: "", cursorcolor: "#17afd3", boxzoom: false, railpadding: {
                right: 0
            }
        });
    }

    function pointsClick(e) {
        let row = e.currentTarget;
        if (row) {
            let lon = row.cells[1].innerText;
            let lat = row.cells[2].innerText;
            let point = new BMap.Point(parseFloat(lon), parseFloat(lat));
            map.panTo(point); // 初始化地图,设置中心点坐标和地图级别
            let marker = new BMap.Marker(point);
            map.clearOverlays();
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        }
    }

    function trackClick(e) {
        let tk_id=$(e.currentTarget).attr('tk_id');
        Utils.AjaxLoadData(Conf.Url.getPointsByTkID,{"tk_id":tk_id},function (data) {
           if (data.status == 1) {
               let arr=data.data;
               let points=[];
               for (let p of arr) {
                   points.push(new BMap.Point(p['longitude'],p['latitude']))
               }

               myMap.drawArrowLine(map,points);
           }
        });
    }
});