var locations = [
    ["", 40.9628758, -74.1329207],
];
var iconURLPrefix = "images";
var icons = ["images/marker_pin_1.png", ];
var icons_length = icons.length;
var shadow = {
    anchor: new google.maps.Point(37.8043637, -74.14487346999999),
    url: iconURLPrefix + "msmarker.shadow.png"
};
var myOptions = {
    center: new google.maps.LatLng(41.1311292, -74.3673254),
    styles: [{
        elementType: "geometry",
        stylers: [{
            color: "#ebe3cd"
        }]
    }, {
        elementType: "labels.text.fill",
        stylers: [{
            color: "#523735"
        }]
    }, {
        elementType: "labels.text.stroke",
        stylers: [{
            color: "#f5f1e6"
        }]
    }, {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#c9b2a6"
        }]
    }, {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#dcd2be"
        }]
    }, {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#ae9e90"
        }]
    }, {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{
            color: "#dfd2ae"
        }]
    }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
            color: "#dfd2ae"
        }]
    }, {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#93817c"
        }]
    }, {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{
            color: "#a5b076"
        }]
    }, {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#447530"
        }]
    }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
            color: "#f5f1e6"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{
            color: "#fdfcf8"
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{
            color: "#f8c967"
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#e9bc62"
        }]
    }, {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{
            color: "#e98d58"
        }]
    }, {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#db8555"
        }]
    }, {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#806b63"
        }]
    }, {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{
            color: "#dfd2ae"
        }]
    }, {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#8f7d77"
        }]
    }, {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [{
            color: "#ebe3cd"
        }]
    }, {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{
            color: "#dfd2ae"
        }]
    }, {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{
            color: "#b9d3c2"
        }]
    }, {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#92998d"
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
var map = new google.maps.Map(document.getElementById("map-general"), myOptions);
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
[{
    elementType: "geometry",
    stylers: [{
        color: "#ebe3cd"
    }]
}, {
    elementType: "labels.text.fill",
    stylers: [{
        color: "#523735"
    }]
}, {
    elementType: "labels.text.stroke",
    stylers: [{
        color: "#f5f1e6"
    }]
}, {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{
        color: "#c9b2a6"
    }]
}, {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [{
        color: "#dcd2be"
    }]
}, {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#ae9e90"
    }]
}, {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{
        color: "#dfd2ae"
    }]
}, {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{
        color: "#dfd2ae"
    }]
}, {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#93817c"
    }]
}, {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{
        color: "#a5b076"
    }]
}, {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#447530"
    }]
}, {
    featureType: "road",
    elementType: "geometry",
    stylers: [{
        color: "#f5f1e6"
    }]
}, {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{
        color: "#fdfcf8"
    }]
}, {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{
        color: "#f8c967"
    }]
}, {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{
        color: "#e9bc62"
    }]
}, {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [{
        color: "#e98d58"
    }]
}, {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [{
        color: "#db8555"
    }]
}, {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#806b63"
    }]
}, {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [{
        color: "#dfd2ae"
    }]
}, {
    featureType: "transit.line",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#8f7d77"
    }]
}, {
    featureType: "transit.line",
    elementType: "labels.text.stroke",
    stylers: [{
        color: "#ebe3cd"
    }]
}, {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{
        color: "#dfd2ae"
    }]
}, {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{
        color: "#b9d3c2"
    }]
}, {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#92998d"
    }]
}];