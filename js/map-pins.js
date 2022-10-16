var locations = [
    ["", 40.9628758, -74.1329207],
    ["", 41.0017644, -74.367096],
    ["", 41.01202955, -74.44885254],
    ["", 41.152708, -74.7671031],
    ["", 41.00788443, -74.56008911000001],
    ["", 41.10833, -74.48043823],
    ["", 41.0928072, -74.14604187000001],
    ["", 41.15849525, -74.18518066],
    ["", 41.0995342, -74.37263489],
    ["", 41.2287065, -75.2383842],
    ["", 40.8958927, -75.3229541],
    ["", 40.9831018, -74.9589405],
    ["", 43.1338972, -88.2220372],
    ["", 41.1953739, -73.4378988],
    ["", 41.1264849, -73.71401950000001],
    ["", 33.6594835, -117.9988026],
    ["", 40.8256536, -73.2026138],
];
var iconURLPrefix = "images";
var icons = ["images/marker_pin_1.png", "images/marker_pin_2.png", "images/marker_pin_3.png", "images/marker_pin_4.png", "images/marker_pin_5.png", "images/marker_pin_6.png", "images/marker_pin_7.png", "images/marker_pin_8.png", "images/marker_pin_1.png", "images/marker_pin_2.png", "images/marker_pin_3.png", "images/marker_pin_4.png", "images/marker_pin_5.png", "images/marker_pin_6.png", "images/marker_pin_7.png", "images/marker_pin_8.png", "images/marker_pin_3.png", ];
var icons_length = icons.length;
var shadow = {
    anchor: new google.maps.Point(37.8043637, -74.14487346999999),
    url: iconURLPrefix + "msmarker.shadow.png"
};
var myOptions = {
    center: new google.maps.LatLng(41.1311292, -74.3673254),
    styles: [{
        featureType: "all",
        stylers: [{
            saturation: -100
        }, {
            gamma: 3
        }]
    }],
    mapTypeId: "roadmap",
    mapTypeControl: true,
    streetViewControl: true,
    panControl: true,
    scrollwheel: false,
    draggable: true,
    zoom: 10
};
var map = new google.maps.Map(document.getElementById("travel-map-pins"), myOptions);
var infowindow = new google.maps.InfoWindow({
    locations: locations,
    maxWidth: 350
});
var marker;
var markers = new Array();
var iconCounter = 0;
for (var i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: icons[iconCounter],
        shadow: shadow
    });
    markers.push(marker);
    google.maps.event.addListener(marker, "click", (function (b, a) {
        return function () {
            infowindow.setContent(locations[a][0]);
            infowindow.open(map, b)
        }
    })(marker, i));
    iconCounter++;
    if (iconCounter >= icons_length) {
        iconCounter = 0
    }
}
google.maps.event.addListener(infowindow, "domready", function () {
    var c = $(".gm-style-iw").css("left:-70px", "top:30px");
    var a = c.prev();
    a.children(":nth-child(2)").css({
        display: "none"
    });
    a.children(":nth-child(4)").css({
        display: "none"
    });
    c.parent().parent().css({
        left: "15px",
        top: "0px"
    });
    a.children(":nth-child(1)").attr("style", function (d, e) {
        return e + "left: 20px !important;"
    });
    a.children(":nth-child(3)").attr("style", function (d, e) {
        return e + "left: 145px !important;"
    });
    a.children(":nth-child(3)").find("div").children().css({
        "z-index": "1"
    });
    var b = c.next();
    b.css({
        opacity: "1",
        right: "50px",
        top: "36px"
    });
    if ($(".iw-content").height() < 140) {
        $(".iw-bottom-gradient").css({
            display: "none"
        })
    }
    b.mouseout(function () {
        $(this).css({
            opacity: "1"
        })
    })
});