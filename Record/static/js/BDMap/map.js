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
        enableClicking: true,//是否响应点击事件，默认为true
        icons: [icons],
        strokeWeight: '8',//折线的宽度，以像素为单位
        strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
        strokeColor: "#18a45b" //折线颜色
    });

    map.addOverlay(polyline);
}
