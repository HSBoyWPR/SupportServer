function myMap() {

}

myMap.init = (mapContainer) => {
    let map;
    map = new BMap.Map(mapContainer); // 创建Map实例
    map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

    //添加地图控件
    map.addControl(new BMap.MapTypeControl());
    map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT}));// 左上角，添加比例尺

    map.setMapStyle({style: "midnight"});

    setTimeout(()=>{
        myMap.getCurrentPosition(map);
    }, 2000);

    return map;
};

myMap.drawArrowLine = (map, pois) => {
    var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6,//图标缩放大小
        strokeColor: '#fff',//设置矢量图标的线填充颜色
        strokeWeight: '2',//设置线宽
    });
    var icons = new BMap.IconSequence(sy, '10', '30');
    let polyline = new BMap.Polyline(pois, {
        enableEditing: false,//是否启用线编辑，默认为false
        enableClicking: false,//是否响应点击事件，默认为true
        icons: [icons],
        strokeWeight: '8',//折线的宽度，以像素为单位
        strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
        strokeColor: "#18a45b" //折线颜色
    });

    map.addOverlay(polyline);
}

myMap.getCurrentPosition = (map) => {
    Sys.Status.changeStatus({s: 'wat', t: '定位中...'})
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
            let mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);



            let t='当前位置: ';
            for (let a in r.address){
                if (r.address[a]) {
                    t+=(r.address[a]+' ');
                }
            }
            //r.address.province + ", " + r.address.city + ", " + r.address.district + ", " + r.address.street + ", " + r.address.streetNumber;
            Sys.Status.changeStatus({s:'suc',t:t});
        }
        else {
            Sys.Status.changeStatus({s: 'err', t: '定位失败' + this.getStatus()})
        }

    }, {enableHighAccuracy: true})
};
