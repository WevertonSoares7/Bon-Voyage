jQuery(document).ready(function (a) {
    if (jQuery(".kf-countdown-1").length) {
        jQuery(".kf-countdown-1").downCount({
            date: "08/08/2018 12:00:00",
            offset: +1
        })
    }
    if (jQuery(".write").length) {
        jQuery(".write").typed({
            stringsElement: jQuery(".add-write"),
            typeSpeed: 100,
            contentType: "html",
        })
    }
    if (jQuery('[data-toggle="tooltip"]').length) {
        jQuery('[data-toggle="tooltip"]').tooltip()
    }
    if (jQuery(".control-search").length) {
        jQuery(".control-search").click(function () {
            jQuery("body").addClass("mode-search");
            jQuery(".input-search").focus()
        })
    }
    if (jQuery(".search-icon-close").length) {
        jQuery(".search-icon-close").click(function () {
            jQuery("body").removeClass("mode-search")
        })
    }
    if (jQuery(".ipd").length) {
        jQuery(".ipd").label_better({
            easing: "bounce"
        })
    }
    if (jQuery(".kode_banner").length) {
        jQuery(".kode_banner").ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.01,
        })
    }
    if (jQuery("a[rel^='prettyPhoto']").length) {
        jQuery("a[rel^='prettyPhoto']").prettyPhoto()
    }
    if (jQuery(".banner-img").length) {
        jQuery(".banner-img").ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.01,
        })
    }
    if (jQuery(".tilt").length) {
        jQuery(".tilt").tilt({
            sensitivity: 5,
            perspective: 2000,
            shine: true
        })
    }
    if (jQuery(".zoom-picture1").length) {
        jQuery(".zoom-picture1").zoom()
    }
    if (jQuery(".banner-slider").length) {
        jQuery(".banner-slider").slick({
            slidesToShow: 1,
            dots: false,
            arrows: false,
            loop: false,
            autoplay: true
        })
    }
    if (jQuery(".tabscontrol").length) {
        jQuery(".tabscontrol").tabs({
            fxFade: true,
            fxSpeed: "slow"
        })
    }
    if (jQuery(".kf_testimonial").length) {
        jQuery(".kf_testimonial").slick({
            centerMode: true,
            dots: false,
            arrows: false,
            slidesToShow: 2,
            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    dots: true,
                    centerPadding: "40px",
                    slidesToShow: 1
                }
            }]
        })
    }
    if (jQuery(".kf_instagram_updates").length) {
        jQuery(".kf_instagram_updates").slick({
            dots: false,
            arrows: false,
            slidesToShow: 13,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 8000,
            cssEase: "linear",
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: false,
                    arrows: false,
                    slidesToShow: 8,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 0,
                    speed: 8000,
                    cssEase: "linear"
                }
            }, {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 0,
                    speed: 8000,
                    cssEase: "linear"
                }
            }]
        })
    }
    if (jQuery(".blog-slider-6items").length) {
        jQuery(".blog-slider-6items").slick({
            dots: true,
            arrows: false,
            centerMode: true,
            slidesToShow: 6,
            infinite: true,
            autoplay: false,
            cssEase: "linear",
            responsive: [{
                breakpoint: 1200,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    cssEase: "linear"
                }
            }, {
                breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    cssEase: "linear"
                }
            }, {
                breakpoint: 676,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    cssEase: "linear"
                }
            }, {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    cssEase: "linear"
                }
            }]
        })
    }
    if (jQuery(".widget-slider").length) {
        jQuery(".widget-slider").slick({
            dots: true,
            arrows: false,
            centerMode: true,
            slidesToShow: 1,
            infinite: true,
            autoplay: false,
            cssEase: "linear",
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 8000,
                    cssEase: "linear"
                }
            }, {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 8000,
                    cssEase: "linear"
                }
            }]
        })
    }
    if (jQuery(".brands-slider").length) {
        jQuery(".brands-slider").slick({
            dots: true,
            arrows: false,
            slidesToShow: 6,
            infinite: true,
            autoplay: false,
            cssEase: "linear",
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    speed: 8000,
                    cssEase: "linear"
                }
            }, {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 8000,
                    cssEase: "linear"
                }
            }]
        })
    }
    if (jQuery(".travel-slider-items").length) {
        jQuery(".travel-slider-items").slick({
            slidesToShow: 1,
            slidesToScroll: 2,
            arrows: true,
            fade: true,
            asNavFor: ".travel-slider-items-nav",
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    arrows: true,
                    fade: true,
                    dots: false,
                    cssEase: "linear"
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    arrows: false,
                    fade: true,
                    dots: false,
                    cssEase: "linear"
                }
            }]
        })
    }
    if (jQuery(".travel-slider-items-nav").length) {
        jQuery(".travel-slider-items-nav").slick({
            slidesToShow: 5,
            slidesToScroll: 2,
            asNavFor: ".travel-slider-items",
            arrows: false,
            focusOnSelect: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    cssEase: "linear"
                }
            }, {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    cssEase: "linear"
                }
            }]
        })
    }
    if (jQuery(".rateing").length) {
        jQuery(".rateing").rateYo({
            rating: 3.6
        })
    }
    if (jQuery(".fade-slider").length) {
        jQuery(".fade-slider").slick({
            slidesToShow: 1,
            dots: false,
            arrows: false,
            loop: false,
            autoplay: true,
            fade: true
        })
    }
    if (jQuery(".select").length) {
        jQuery(".select").selectric()
    }
    if (jQuery(".select-menu").length) {
        jQuery(".select-menu").selectric()
    }
    if (jQuery("a[href*='#']").length) {
        jQuery('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on("click", function (c) {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var d = jQuery(this.hash);
                d = d.length ? d : jQuery("[name=" + this.hash.slice(1) + "]");
                if (d.length) {
                    c.preventDefault();
                    jQuery("html, body").animate({
                        scrollTop: d.offset().top
                    }, 1000, function () {
                        var e = jQuery(d);
                        e.focus();
                        if (e.is(":focus")) {
                            return false
                        } else {
                            e.attr("tabindex", "-1");
                            e.focus()
                        }
                    })
                }
            }
        })
    }
    if (jQuery(".btn-weel").length > 0) {
        jQuery(".btn-weel").on("mouseenter", function (c) {
            var d = jQuery(this).offset(),
                f = c.pageX - d.left,
                g = c.pageY - d.top;
            if (jQuery(this).find("span")) {
                jQuery(".btn-weel span").css({
                    top: g,
                    left: f,
                })
            }
        });
        jQuery(".btn-weel").on("mouseout", function (c) {
            var d = jQuery(this).offset(),
                f = c.pageX - d.left,
                g = c.pageY - d.top;
            if (jQuery(this).find("span")) {
                jQuery(".btn-weel span").css({
                    top: g,
                    left: f,
                })
            }
        })
    }
    if (jQuery("#live-date").length) {
        var b = new Date();
        document.getElementById("live-date").innerHTML = b.toDateString()
    }
    if (jQuery(".video-play").length) {
        jQuery(".video-play").jPlayer({
            ready: function () {
                jQuery(this).jPlayer("setMedia", {
                    m4v: "js/videoplay/history.m4v",
                    ogv: "js/videoplay/history.ogv",
                    webmv: "js/videoplay/history.webm",
                    poster: "extra-images/history-img01.jpg"
                })
            },
            swfPath: "../../dist/jplayer",
            supplied: "webmv, ogv, m4v",
            size: {
                width: "",
                height: "345px",
                cssClass: ""
            },
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            remainingDuration: true,
            toggleDuration: true
        })
    }
    if (jQuery(".slider-range").length) {
        jQuery(".slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [50, 450],
            slide: function (c, d) {
                jQuery(".amount").val("jQuery" + d.values[0] + " - jQuery" + d.values[1])
            }
        });
        jQuery(".amount").val("jQuery" + jQuery(".slider-range").slider("values", 0) + " - jQuery" + jQuery(".slider-range").slider("values", 1))
    }
    if (jQuery(".accordion").length) {
        jQuery.fn.slideFadeToggle = function (e, d, c) {
            return this.animate({
                opacity: "toggle",
                height: "toggle"
            }, e, d, c)
        };
        jQuery(".accordion").accordion({
            defaultOpen: "section1",
            speed: "slow",
            cookieName: "",
            animateOpen: function (c, d) {
                c.next().stop(true, true).slideFadeToggle(d.speed)
            },
            animateClose: function (c, d) {
                c.next().stop(true, true).slideFadeToggle(d.speed)
            }
        })
    }
    if (jQuery("#filterable-item-holder-1").length) {
        jQuery(window).load(function (d) {
            var c = d("#filterable-item-holder-1");
            c.children().css("position", "relative");
            c.masonry({
                singleMode: true,
                itemSelector: ".filterable-item:not(.hide)",
                animate: true,
                animationOptions: {
                    duration: 800,
                    queue: false
                }
            });
            d(window).resize(function () {
                var e = c.children().filter(":first").width();
                c.masonry({
                    columnWidth: e,
                    singleMode: true,
                    itemSelector: ".filterable-item:not(.hide)",
                    animate: true,
                    animationOptions: {
                        duration: 800,
                        queue: false
                    }
                })
            });
            d("ul#filterable-item-filter-1 a").on("click", function (f) {
                d(this).addClass("active");
                d(this).parents("li").siblings().children("a").removeClass("active");
                f.preventDefault();
                var g = d(this).attr("data-value");
                if (g == "All" || d(this).parent().index() == 0) {
                    c.children().each(function () {
                        if (d(this).hasClass("hide")) {
                            d(this).removeClass("hide");
                            d(this).fadeIn()
                        }
                    })
                } else {
                    c.children().not("." + g).each(function () {
                        if (!d(this).hasClass("hide")) {
                            d(this).addClass("hide");
                            d(this).fadeOut()
                        }
                    });
                    c.children("." + g).each(function () {
                        if (d(this).hasClass("hide")) {
                            d(this).removeClass("hide");
                            d(this).fadeIn()
                        }
                    })
                }
                c.masonry()
            })
        })
    }
    if (jQuery("[data-popup-open]").length) {
        jQuery("[data-popup-open]").on("click", function (c) {
            var d = jQuery(this).attr("data-popup-open");
            jQuery('[data-popup="' + d + '"]').fadeIn(350);
            c.preventDefault()
        })
    }
    if (jQuery("[data-popup-close]").length) {
        jQuery("[data-popup-close]").on("click", function (c) {
            var d = jQuery(this).attr("data-popup-close");
            jQuery('[data-popup="' + d + '"]').fadeOut(350);
            c.preventDefault()
        })
    }
    if (typeof (jQuery.fn.dlmenu) == "function") {
        jQuery(".dl-menuwrapper").each(function () {
            jQuery(this).find(".dl-submenu").each(function () {
                if (jQuery(this).siblings("a").attr("href") && jQuery(this).siblings("a").attr("href") != "#") {
                    var c = jQuery('<li class="menu-item"></li>');
                    c.append(jQuery(this).siblings("a").clone());
                    jQuery(this).prepend(c)
                }
            });
            jQuery(this).dlmenu()
        })
    }
    jQuery(window).scroll(function () {
        if (jQuery(window).scrollTop() >= 480) {
            jQuery(".sticky_nav_menu").addClass("fixed-header")
        } else {
            jQuery(".sticky_nav_menu").removeClass("fixed-header")
        }
    });
    jQuery(window).scroll(function () {
        if (jQuery(window).scrollTop() >= 10) {
            jQuery(".header-v1_navigation_row").addClass("fixed-header-nav")
        } else {
            jQuery(".header-v1_navigation_row").removeClass("fixed-header-nav")
        }
    });
    if (jQuery("#travel-map-pins").length) {
        google.maps.event.addDomListener(window, "load", initialize)
    }
    a(window).scroll(function () {
        if (a(this).scrollTop() >= 50) {
            a("#top-btn").fadeIn(200)
        } else {
            a("#top-btn").fadeOut(200)
        }
    });
    a("#top-btn").click(function () {
        a("body,html").animate({
            scrollTop: 0
        }, 500)
    })
});
jQuery(window).on("load", function () {
    jQuery(".pre-loader").fadeOut();
    jQuery(".pre-loader-img").delay(350).fadeOut("slow");
    jQuery("body").delay(350).css({
        overflow: "visible"
    })
});

function openCity(b, a) {
    var c, d, e;
    d = document.getElementsByClassName("tabcontent");
    for (c = 0; c < d.length; c++) {
        d[c].style.display = "none"
    }
    e = document.getElementsByClassName("tablinks");
    for (c = 0; c < e.length; c++) {
        e[c].className = e[c].className.replace(" active", "")
    }
    document.getElementById(a).style.display = "block";
    b.currentTarget.className += " active"
}

function initialize() {
    var g = "custom_style";
    var d;
    var a = new google.maps.LatLng(40.674389, -73.9455);
    var c = [{
        featureType: "administrative",
        elementType: "all",
        stylers: [{
            saturation: "-100"
        }]
    }, {
        featureType: "administrative.province",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "landscape",
        elementType: "all",
        stylers: [{
            saturation: -100
        }, {
            lightness: 65
        }, {
            visibility: "on"
        }]
    }, {
        featureType: "poi",
        elementType: "all",
        stylers: [{
            saturation: -100
        }, {
            lightness: "50"
        }, {
            visibility: "simplified"
        }]
    }, {
        featureType: "road",
        elementType: "all",
        stylers: [{
            saturation: "-100"
        }]
    }, {
        featureType: "road.highway",
        elementType: "all",
        stylers: [{
            visibility: "simplified"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "all",
        stylers: [{
            lightness: "30"
        }]
    }, {
        featureType: "road.local",
        elementType: "all",
        stylers: [{
            lightness: "40"
        }]
    }, {
        featureType: "transit",
        elementType: "all",
        stylers: [{
            saturation: -100
        }, {
            visibility: "simplified"
        }]
    }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
            hue: "#ffff00"
        }, {
            lightness: -25
        }, {
            saturation: -97
        }]
    }, {
        featureType: "water",
        elementType: "labels",
        stylers: [{
            lightness: -25
        }, {
            saturation: -100
        }]
    }];
    var e = {
        zoom: 14,
        scrollwheel: false,
        center: a,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, g]
        },
        mapTypeId: g
    };
    d = new google.maps.Map(document.getElementById("travel-map-pins"), e);
    var h = {
        name: "Custom Style"
    };
    var b = new google.maps.StyledMapType(c, h);
    d.mapTypes.set(g, b);
    var f = new google.maps.Marker({
        position: a,
        icon: "images/map.png"
    });
    f.setMap(d)
};