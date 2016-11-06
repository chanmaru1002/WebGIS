var t_osm = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var t_std = new L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html#std' target='_blank'>国土地理院</a>"
});

var t_ort = new L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg', {
    attribution: "<a href='http://maps.gsi.go.jp/development/ichiran.html#ort' target='_blank'>国土地理院</a>"
});

var lat = 34.6842485;
var lng = 135.82752749999997;

var map = L.map('map', {
    center: [lat, lng],
    zoom: 15,
    maxZoom: 18,
    zoomControl: true,
    layers: [t_osm]
});

var point = L.geoJson(pointdata, {
    onEachFeature: function(feat, layer) {
        var field = "避難所施設：" + feat.properties.施設名等;
        layer.bindPopup(field);
    },
    clickable: true
}).addTo(map);

var polyline = L.geoJson(linedata, {
    color: 'red',
    onEachFeature: function(feat, layer) {
        var field = "路線名：" + feat.properties.N10_004;
        layer.bindPopup(field);
    }
}).addTo(map);

var Map_AddLayer = {
    "避難所": point,
    "緊急輸送道路(県域)": polyline
};

var Map_BaseLayer = {
    "OpenStreetmap": t_osm,
    "地理院地図": t_std,
    "航空写真": t_ort
};

L.control.scale({
    imperial: false,
    maxWidth: 300
}).addTo(map);

L.control.layers(
    Map_BaseLayer,
    Map_AddLayer,
    {collapsed: false}
).addTo(map);
