(function (a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        if (typeof exports !== "undefined") {
            module.exports = a(require("jquery"))
        } else {
            a(jQuery)
        }
    }
}(function (a) {
    var b = window.Slick || {};
    b = (function () {
        var c = 0;

        function d(g, h) {
            var e = this,
                f;
            e.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: a(g),
                appendDots: a(g),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (k, j) {
                    return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(j + 1)
                },
                dots: false,
                dotsClass: "slick-dots",
                draggable: true,
                easing: "linear",
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: false,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };
            e.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };
            a.extend(e, e.initials);
            e.activeBreakpoint = null;
            e.animType = null;
            e.animProp = null;
            e.breakpoints = [];
            e.breakpointSettings = [];
            e.cssTransitions = false;
            e.focussed = false;
            e.interrupted = false;
            e.hidden = "hidden";
            e.paused = true;
            e.positionProp = null;
            e.respondTo = null;
            e.rowCount = 1;
            e.shouldClick = true;
            e.$slider = a(g);
            e.$slidesCache = null;
            e.transformType = null;
            e.transitionType = null;
            e.visibilityChange = "visibilitychange";
            e.windowWidth = 0;
            e.windowTimer = null;
            f = a(g).data("slick") || {};
            e.options = a.extend({}, e.defaults, h, f);
            e.currentSlide = e.options.initialSlide;
            e.originalSettings = e.options;
            if (typeof document.mozHidden !== "undefined") {
                e.hidden = "mozHidden";
                e.visibilityChange = "mozvisibilitychange"
            } else {
                if (typeof document.webkitHidden !== "undefined") {
                    e.hidden = "webkitHidden";
                    e.visibilityChange = "webkitvisibilitychange"
                }
            }
            e.autoPlay = a.proxy(e.autoPlay, e);
            e.autoPlayClear = a.proxy(e.autoPlayClear, e);
            e.autoPlayIterator = a.proxy(e.autoPlayIterator, e);
            e.changeSlide = a.proxy(e.changeSlide, e);
            e.clickHandler = a.proxy(e.clickHandler, e);
            e.selectHandler = a.proxy(e.selectHandler, e);
            e.setPosition = a.proxy(e.setPosition, e);
            e.swipeHandler = a.proxy(e.swipeHandler, e);
            e.dragHandler = a.proxy(e.dragHandler, e);
            e.keyHandler = a.proxy(e.keyHandler, e);
            e.instanceUid = c++;
            e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
            e.registerBreakpoints();
            e.init(true)
        }
        return d
    }());
    b.prototype.activateADA = function () {
        var c = this;
        c.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    };
    b.prototype.addSlide = b.prototype.slickAdd = function (f, e, d) {
        var c = this;
        if (typeof (e) === "boolean") {
            d = e;
            e = null
        } else {
            if (e < 0 || (e >= c.slideCount)) {
                return false
            }
        }
        c.unload();
        if (typeof (e) === "number") {
            if (e === 0 && c.$slides.length === 0) {
                a(f).appendTo(c.$slideTrack)
            } else {
                if (d) {
                    a(f).insertBefore(c.$slides.eq(e))
                } else {
                    a(f).insertAfter(c.$slides.eq(e))
                }
            }
        } else {
            if (d === true) {
                a(f).prependTo(c.$slideTrack)
            } else {
                a(f).appendTo(c.$slideTrack)
            }
        }
        c.$slides = c.$slideTrack.children(this.options.slide);
        c.$slideTrack.children(this.options.slide).detach();
        c.$slideTrack.append(c.$slides);
        c.$slides.each(function (h, g) {
            a(g).attr("data-slick-index", h)
        });
        c.$slidesCache = c.$slides;
        c.reinit()
    };
    b.prototype.animateHeight = function () {
        var c = this;
        if (c.options.slidesToShow === 1 && c.options.adaptiveHeight === true && c.options.vertical === false) {
            var d = c.$slides.eq(c.currentSlide).outerHeight(true);
            c.$list.animate({
                height: d
            }, c.options.speed)
        }
    };
    b.prototype.animateSlide = function (f, e) {
        var d = {},
            c = this;
        c.animateHeight();
        if (c.options.rtl === true && c.options.vertical === false) {
            f = -f
        }
        if (c.transformsEnabled === false) {
            if (c.options.vertical === false) {
                c.$slideTrack.animate({
                    left: f
                }, c.options.speed, c.options.easing, e)
            } else {
                c.$slideTrack.animate({
                    top: f
                }, c.options.speed, c.options.easing, e)
            }
        } else {
            if (c.cssTransitions === false) {
                if (c.options.rtl === true) {
                    c.currentLeft = -(c.currentLeft)
                }
                a({
                    animStart: c.currentLeft
                }).animate({
                    animStart: f
                }, {
                    duration: c.options.speed,
                    easing: c.options.easing,
                    step: function (g) {
                        g = Math.ceil(g);
                        if (c.options.vertical === false) {
                            d[c.animType] = "translate(" + g + "px, 0px)";
                            c.$slideTrack.css(d)
                        } else {
                            d[c.animType] = "translate(0px," + g + "px)";
                            c.$slideTrack.css(d)
                        }
                    },
                    complete: function () {
                        if (e) {
                            e.call()
                        }
                    }
                })
            } else {
                c.applyTransition();
                f = Math.ceil(f);
                if (c.options.vertical === false) {
                    d[c.animType] = "translate3d(" + f + "px, 0px, 0px)"
                } else {
                    d[c.animType] = "translate3d(0px," + f + "px, 0px)"
                }
                c.$slideTrack.css(d);
                if (e) {
                    setTimeout(function () {
                        c.disableTransition();
                        e.call()
                    }, c.options.speed)
                }
            }
        }
    };
    b.prototype.getNavTarget = function () {
        var c = this,
            d = c.options.asNavFor;
        if (d && d !== null) {
            d = a(d).not(c.$slider)
        }
        return d
    };
    b.prototype.asNavFor = function (e) {
        var c = this,
            d = c.getNavTarget();
        if (d !== null && typeof d === "object") {
            d.each(function () {
                var f = a(this).slick("getSlick");
                if (!f.unslicked) {
                    f.slideHandler(e, true)
                }
            })
        }
    };
    b.prototype.applyTransition = function (d) {
        var c = this,
            e = {};
        if (c.options.fade === false) {
            e[c.transitionType] = c.transformType + " " + c.options.speed + "ms " + c.options.cssEase
        } else {
            e[c.transitionType] = "opacity " + c.options.speed + "ms " + c.options.cssEase
        }
        if (c.options.fade === false) {
            c.$slideTrack.css(e)
        } else {
            c.$slides.eq(d).css(e)
        }
    };
    b.prototype.autoPlay = function () {
        var c = this;
        c.autoPlayClear();
        if (c.slideCount > c.options.slidesToShow) {
            c.autoPlayTimer = setInterval(c.autoPlayIterator, c.options.autoplaySpeed)
        }
    };
    b.prototype.autoPlayClear = function () {
        var c = this;
        if (c.autoPlayTimer) {
            clearInterval(c.autoPlayTimer)
        }
    };
    b.prototype.autoPlayIterator = function () {
        var c = this,
            d = c.currentSlide + c.options.slidesToScroll;
        if (!c.paused && !c.interrupted && !c.focussed) {
            if (c.options.infinite === false) {
                if (c.direction === 1 && (c.currentSlide + 1) === (c.slideCount - 1)) {
                    c.direction = 0
                } else {
                    if (c.direction === 0) {
                        d = c.currentSlide - c.options.slidesToScroll;
                        if (c.currentSlide - 1 === 0) {
                            c.direction = 1
                        }
                    }
                }
            }
            c.slideHandler(d)
        }
    };
    b.prototype.buildArrows = function () {
        var c = this;
        if (c.options.arrows === true) {
            c.$prevArrow = a(c.options.prevArrow).addClass("slick-arrow");
            c.$nextArrow = a(c.options.nextArrow).addClass("slick-arrow");
            if (c.slideCount > c.options.slidesToShow) {
                c.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
                c.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
                if (c.htmlExpr.test(c.options.prevArrow)) {
                    c.$prevArrow.prependTo(c.options.appendArrows)
                }
                if (c.htmlExpr.test(c.options.nextArrow)) {
                    c.$nextArrow.appendTo(c.options.appendArrows)
                }
                if (c.options.infinite !== true) {
                    c.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")
                }
            } else {
                c.$prevArrow.add(c.$nextArrow).addClass("slick-hidden").attr({
                    "aria-disabled": "true",
                    tabindex: "-1"
                })
            }
        }
    };
    b.prototype.buildDots = function () {
        var c = this,
            e, d;
        if (c.options.dots === true && c.slideCount > c.options.slidesToShow) {
            c.$slider.addClass("slick-dotted");
            d = a("<ul />").addClass(c.options.dotsClass);
            for (e = 0; e <= c.getDotCount(); e += 1) {
                d.append(a("<li />").append(c.options.customPaging.call(this, c, e)))
            }
            c.$dots = d.appendTo(c.options.appendDots);
            c.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    };
    b.prototype.buildOut = function () {
        var c = this;
        c.$slides = c.$slider.children(c.options.slide + ":not(.slick-cloned)").addClass("slick-slide");
        c.slideCount = c.$slides.length;
        c.$slides.each(function (e, d) {
            a(d).attr("data-slick-index", e).data("originalStyling", a(d).attr("style") || "")
        });
        c.$slider.addClass("slick-slider");
        c.$slideTrack = (c.slideCount === 0) ? a('<div class="slick-track"/>').appendTo(c.$slider) : c.$slides.wrapAll('<div class="slick-track"/>').parent();
        c.$list = c.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent();
        c.$slideTrack.css("opacity", 0);
        if (c.options.centerMode === true || c.options.swipeToSlide === true) {
            c.options.slidesToScroll = 1
        }
        a("img[data-lazy]", c.$slider).not("[src]").addClass("slick-loading");
        c.setupInfinite();
        c.buildArrows();
        c.buildDots();
        c.updateDots();
        c.setSlideClasses(typeof c.currentSlide === "number" ? c.currentSlide : 0);
        if (c.options.draggable === true) {
            c.$list.addClass("draggable")
        }
    };
    b.prototype.buildRows = function () {
        var d = this,
            e, f, g, h, i, j, m;
        h = document.createDocumentFragment();
        j = d.$slider.children();
        if (d.options.rows > 1) {
            m = d.options.slidesPerRow * d.options.rows;
            i = Math.ceil(j.length / m);
            for (e = 0; e < i; e++) {
                var l = document.createElement("div");
                for (f = 0; f < d.options.rows; f++) {
                    var k = document.createElement("div");
                    for (g = 0; g < d.options.slidesPerRow; g++) {
                        var n = (e * m + ((f * d.options.slidesPerRow) + g));
                        if (j.get(n)) {
                            k.appendChild(j.get(n))
                        }
                    }
                    l.appendChild(k)
                }
                h.appendChild(l)
            }
            d.$slider.empty().append(h);
            d.$slider.children().children().children().css({
                width: (100 / d.options.slidesPerRow) + "%",
                display: "inline-block"
            })
        }
    };
    b.prototype.checkResponsive = function (f, e) {
        var c = this,
            d, i, g, j = false;
        var h = c.$slider.width();
        var k = window.innerWidth || a(window).width();
        if (c.respondTo === "window") {
            g = k
        } else {
            if (c.respondTo === "slider") {
                g = h
            } else {
                if (c.respondTo === "min") {
                    g = Math.min(k, h)
                }
            }
        }
        if (c.options.responsive && c.options.responsive.length && c.options.responsive !== null) {
            i = null;
            for (d in c.breakpoints) {
                if (c.breakpoints.hasOwnProperty(d)) {
                    if (c.originalSettings.mobileFirst === false) {
                        if (g < c.breakpoints[d]) {
                            i = c.breakpoints[d]
                        }
                    } else {
                        if (g > c.breakpoints[d]) {
                            i = c.breakpoints[d]
                        }
                    }
                }
            }
            if (i !== null) {
                if (c.activeBreakpoint !== null) {
                    if (i !== c.activeBreakpoint || e) {
                        c.activeBreakpoint = i;
                        if (c.breakpointSettings[i] === "unslick") {
                            c.unslick(i)
                        } else {
                            c.options = a.extend({}, c.originalSettings, c.breakpointSettings[i]);
                            if (f === true) {
                                c.currentSlide = c.options.initialSlide
                            }
                            c.refresh(f)
                        }
                        j = i
                    }
                } else {
                    c.activeBreakpoint = i;
                    if (c.breakpointSettings[i] === "unslick") {
                        c.unslick(i)
                    } else {
                        c.options = a.extend({}, c.originalSettings, c.breakpointSettings[i]);
                        if (f === true) {
                            c.currentSlide = c.options.initialSlide
                        }
                        c.refresh(f)
                    }
                    j = i
                }
            } else {
                if (c.activeBreakpoint !== null) {
                    c.activeBreakpoint = null;
                    c.options = c.originalSettings;
                    if (f === true) {
                        c.currentSlide = c.options.initialSlide
                    }
                    c.refresh(f);
                    j = i
                }
            }
            if (!f && j !== false) {
                c.$slider.trigger("breakpoint", [c, j])
            }
        }
    };
    b.prototype.changeSlide = function (f, e) {
        var d = this,
            c = a(f.currentTarget),
            h, i, j;
        if (c.is("a")) {
            f.preventDefault()
        }
        if (!c.is("li")) {
            c = c.closest("li")
        }
        j = (d.slideCount % d.options.slidesToScroll !== 0);
        h = j ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll;
        switch (f.data.message) {
            case "previous":
                i = h === 0 ? d.options.slidesToScroll : d.options.slidesToShow - h;
                if (d.slideCount > d.options.slidesToShow) {
                    d.slideHandler(d.currentSlide - i, false, e)
                }
                break;
            case "next":
                i = h === 0 ? d.options.slidesToScroll : h;
                if (d.slideCount > d.options.slidesToShow) {
                    d.slideHandler(d.currentSlide + i, false, e)
                }
                break;
            case "index":
                var g = f.data.index === 0 ? 0 : f.data.index || c.index() * d.options.slidesToScroll;
                d.slideHandler(d.checkNavigable(g), false, e);
                c.children().trigger("focus");
                break;
            default:
                return
        }
    };
    b.prototype.checkNavigable = function (d) {
        var c = this,
            f, g;
        f = c.getNavigableIndexes();
        g = 0;
        if (d > f[f.length - 1]) {
            d = f[f.length - 1]
        } else {
            for (var e in f) {
                if (d < f[e]) {
                    d = g;
                    break
                }
                g = f[e]
            }
        }
        return d
    };
    b.prototype.cleanUpEvents = function () {
        var c = this;
        if (c.options.dots && c.$dots !== null) {
            a("li", c.$dots).off("click.slick", c.changeSlide).off("mouseenter.slick", a.proxy(c.interrupt, c, true)).off("mouseleave.slick", a.proxy(c.interrupt, c, false))
        }
        c.$slider.off("focus.slick blur.slick");
        if (c.options.arrows === true && c.slideCount > c.options.slidesToShow) {
            c.$prevArrow && c.$prevArrow.off("click.slick", c.changeSlide);
            c.$nextArrow && c.$nextArrow.off("click.slick", c.changeSlide)
        }
        c.$list.off("touchstart.slick mousedown.slick", c.swipeHandler);
        c.$list.off("touchmove.slick mousemove.slick", c.swipeHandler);
        c.$list.off("touchend.slick mouseup.slick", c.swipeHandler);
        c.$list.off("touchcancel.slick mouseleave.slick", c.swipeHandler);
        c.$list.off("click.slick", c.clickHandler);
        a(document).off(c.visibilityChange, c.visibility);
        c.cleanUpSlideEvents();
        if (c.options.accessibility === true) {
            c.$list.off("keydown.slick", c.keyHandler)
        }
        if (c.options.focusOnSelect === true) {
            a(c.$slideTrack).children().off("click.slick", c.selectHandler)
        }
        a(window).off("orientationchange.slick.slick-" + c.instanceUid, c.orientationChange);
        a(window).off("resize.slick.slick-" + c.instanceUid, c.resize);
        a("[draggable!=true]", c.$slideTrack).off("dragstart", c.preventDefault);
        a(window).off("load.slick.slick-" + c.instanceUid, c.setPosition);
        a(document).off("ready.slick.slick-" + c.instanceUid, c.setPosition)
    };
    b.prototype.cleanUpSlideEvents = function () {
        var c = this;
        c.$list.off("mouseenter.slick", a.proxy(c.interrupt, c, true));
        c.$list.off("mouseleave.slick", a.proxy(c.interrupt, c, false))
    };
    b.prototype.cleanUpRows = function () {
        var c = this,
            d;
        if (c.options.rows > 1) {
            d = c.$slides.children().children();
            d.removeAttr("style");
            c.$slider.empty().append(d)
        }
    };
    b.prototype.clickHandler = function (d) {
        var c = this;
        if (c.shouldClick === false) {
            d.stopImmediatePropagation();
            d.stopPropagation();
            d.preventDefault()
        }
    };
    b.prototype.destroy = function (d) {
        var c = this;
        c.autoPlayClear();
        c.touchObject = {};
        c.cleanUpEvents();
        a(".slick-cloned", c.$slider).detach();
        if (c.$dots) {
            c.$dots.remove()
        }
        if (c.$prevArrow && c.$prevArrow.length) {
            c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", "");
            if (c.htmlExpr.test(c.options.prevArrow)) {
                c.$prevArrow.remove()
            }
        }
        if (c.$nextArrow && c.$nextArrow.length) {
            c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", "");
            if (c.htmlExpr.test(c.options.nextArrow)) {
                c.$nextArrow.remove()
            }
        }
        if (c.$slides) {
            c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
                a(this).attr("style", a(this).data("originalStyling"))
            });
            c.$slideTrack.children(this.options.slide).detach();
            c.$slideTrack.detach();
            c.$list.detach();
            c.$slider.append(c.$slides)
        }
        c.cleanUpRows();
        c.$slider.removeClass("slick-slider");
        c.$slider.removeClass("slick-initialized");
        c.$slider.removeClass("slick-dotted");
        c.unslicked = true;
        if (!d) {
            c.$slider.trigger("destroy", [c])
        }
    };
    b.prototype.disableTransition = function (d) {
        var c = this,
            e = {};
        e[c.transitionType] = "";
        if (c.options.fade === false) {
            c.$slideTrack.css(e)
        } else {
            c.$slides.eq(d).css(e)
        }
    };
    b.prototype.fadeSlide = function (e, d) {
        var c = this;
        if (c.cssTransitions === false) {
            c.$slides.eq(e).css({
                zIndex: c.options.zIndex
            });
            c.$slides.eq(e).animate({
                opacity: 1
            }, c.options.speed, c.options.easing, d)
        } else {
            c.applyTransition(e);
            c.$slides.eq(e).css({
                opacity: 1,
                zIndex: c.options.zIndex
            });
            if (d) {
                setTimeout(function () {
                    c.disableTransition(e);
                    d.call()
                }, c.options.speed)
            }
        }
    };
    b.prototype.fadeSlideOut = function (d) {
        var c = this;
        if (c.cssTransitions === false) {
            c.$slides.eq(d).animate({
                opacity: 0,
                zIndex: c.options.zIndex - 2
            }, c.options.speed, c.options.easing)
        } else {
            c.applyTransition(d);
            c.$slides.eq(d).css({
                opacity: 0,
                zIndex: c.options.zIndex - 2
            })
        }
    };
    b.prototype.filterSlides = b.prototype.slickFilter = function (d) {
        var c = this;
        if (d !== null) {
            c.$slidesCache = c.$slides;
            c.unload();
            c.$slideTrack.children(this.options.slide).detach();
            c.$slidesCache.filter(d).appendTo(c.$slideTrack);
            c.reinit()
        }
    };
    b.prototype.focusHandler = function () {
        var c = this;
        c.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (e) {
            e.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function () {
                if (c.options.pauseOnFocus) {
                    c.focussed = d.is(":focus");
                    c.autoPlay()
                }
            }, 0)
        })
    };
    b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
        var c = this;
        return c.currentSlide
    };
    b.prototype.getDotCount = function () {
        var c = this;
        var d = 0;
        var e = 0;
        var f = 0;
        if (c.options.infinite === true) {
            while (d < c.slideCount) {
                ++f;
                d = e + c.options.slidesToScroll;
                e += c.options.slidesToScroll <= c.options.slidesToShow ? c.options.slidesToScroll : c.options.slidesToShow
            }
        } else {
            if (c.options.centerMode === true) {
                f = c.slideCount
            } else {
                if (!c.options.asNavFor) {
                    f = 1 + Math.ceil((c.slideCount - c.options.slidesToShow) / c.options.slidesToScroll)
                } else {
                    while (d < c.slideCount) {
                        ++f;
                        d = e + c.options.slidesToScroll;
                        e += c.options.slidesToScroll <= c.options.slidesToShow ? c.options.slidesToScroll : c.options.slidesToShow
                    }
                }
            }
        }
        return f - 1
    };
    b.prototype.getLeft = function (d) {
        var c = this,
            e, g, h = 0,
            f;
        c.slideOffset = 0;
        g = c.$slides.first().outerHeight(true);
        if (c.options.infinite === true) {
            if (c.slideCount > c.options.slidesToShow) {
                c.slideOffset = (c.slideWidth * c.options.slidesToShow) * -1;
                h = (g * c.options.slidesToShow) * -1
            }
            if (c.slideCount % c.options.slidesToScroll !== 0) {
                if (d + c.options.slidesToScroll > c.slideCount && c.slideCount > c.options.slidesToShow) {
                    if (d > c.slideCount) {
                        c.slideOffset = ((c.options.slidesToShow - (d - c.slideCount)) * c.slideWidth) * -1;
                        h = ((c.options.slidesToShow - (d - c.slideCount)) * g) * -1
                    } else {
                        c.slideOffset = ((c.slideCount % c.options.slidesToScroll) * c.slideWidth) * -1;
                        h = ((c.slideCount % c.options.slidesToScroll) * g) * -1
                    }
                }
            }
        } else {
            if (d + c.options.slidesToShow > c.slideCount) {
                c.slideOffset = ((d + c.options.slidesToShow) - c.slideCount) * c.slideWidth;
                h = ((d + c.options.slidesToShow) - c.slideCount) * g
            }
        }
        if (c.slideCount <= c.options.slidesToShow) {
            c.slideOffset = 0;
            h = 0
        }
        if (c.options.centerMode === true && c.options.infinite === true) {
            c.slideOffset += c.slideWidth * Math.floor(c.options.slidesToShow / 2) - c.slideWidth
        } else {
            if (c.options.centerMode === true) {
                c.slideOffset = 0;
                c.slideOffset += c.slideWidth * Math.floor(c.options.slidesToShow / 2)
            }
        }
        if (c.options.vertical === false) {
            e = ((d * c.slideWidth) * -1) + c.slideOffset
        } else {
            e = ((d * g) * -1) + h
        }
        if (c.options.variableWidth === true) {
            if (c.slideCount <= c.options.slidesToShow || c.options.infinite === false) {
                f = c.$slideTrack.children(".slick-slide").eq(d)
            } else {
                f = c.$slideTrack.children(".slick-slide").eq(d + c.options.slidesToShow)
            }
            if (c.options.rtl === true) {
                if (f[0]) {
                    e = (c.$slideTrack.width() - f[0].offsetLeft - f.width()) * -1
                } else {
                    e = 0
                }
            } else {
                e = f[0] ? f[0].offsetLeft * -1 : 0
            }
            if (c.options.centerMode === true) {
                if (c.slideCount <= c.options.slidesToShow || c.options.infinite === false) {
                    f = c.$slideTrack.children(".slick-slide").eq(d)
                } else {
                    f = c.$slideTrack.children(".slick-slide").eq(d + c.options.slidesToShow + 1)
                }
                if (c.options.rtl === true) {
                    if (f[0]) {
                        e = (c.$slideTrack.width() - f[0].offsetLeft - f.width()) * -1
                    } else {
                        e = 0
                    }
                } else {
                    e = f[0] ? f[0].offsetLeft * -1 : 0
                }
                e += (c.$list.width() - f.outerWidth()) / 2
            }
        }
        return e
    };
    b.prototype.getOption = b.prototype.slickGetOption = function (d) {
        var c = this;
        return c.options[d]
    };
    b.prototype.getNavigableIndexes = function () {
        var c = this,
            d = 0,
            e = 0,
            f = [],
            g;
        if (c.options.infinite === false) {
            g = c.slideCount
        } else {
            d = c.options.slidesToScroll * -1;
            e = c.options.slidesToScroll * -1;
            g = c.slideCount * 2
        }
        while (d < g) {
            f.push(d);
            d = e + c.options.slidesToScroll;
            e += c.options.slidesToScroll <= c.options.slidesToShow ? c.options.slidesToScroll : c.options.slidesToShow
        }
        return f
    };
    b.prototype.getSlick = function () {
        return this
    };
    b.prototype.getSlideCount = function () {
        var c = this,
            e, f, d;
        d = c.options.centerMode === true ? c.slideWidth * Math.floor(c.options.slidesToShow / 2) : 0;
        if (c.options.swipeToSlide === true) {
            c.$slideTrack.find(".slick-slide").each(function (g, h) {
                if (h.offsetLeft - d + (a(h).outerWidth() / 2) > (c.swipeLeft * -1)) {
                    f = h;
                    return false
                }
            });
            e = Math.abs(a(f).attr("data-slick-index") - c.currentSlide) || 1;
            return e
        } else {
            return c.options.slidesToScroll
        }
    };
    b.prototype.goTo = b.prototype.slickGoTo = function (e, d) {
        var c = this;
        c.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, d)
    };
    b.prototype.init = function (d) {
        var c = this;
        if (!a(c.$slider).hasClass("slick-initialized")) {
            a(c.$slider).addClass("slick-initialized");
            c.buildRows();
            c.buildOut();
            c.setProps();
            c.startLoad();
            c.loadSlider();
            c.initializeEvents();
            c.updateArrows();
            c.updateDots();
            c.checkResponsive(true);
            c.focusHandler()
        }
        if (d) {
            c.$slider.trigger("init", [c])
        }
        if (c.options.accessibility === true) {
            c.initADA()
        }
        if (c.options.autoplay) {
            c.paused = false;
            c.autoPlay()
        }
    };
    b.prototype.initADA = function () {
        var c = this;
        c.$slides.add(c.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        });
        c.$slideTrack.attr("role", "listbox");
        c.$slides.not(c.$slideTrack.find(".slick-cloned")).each(function (d) {
            a(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + c.instanceUid + d + ""
            })
        });
        if (c.$dots !== null) {
            c.$dots.attr("role", "tablist").find("li").each(function (d) {
                a(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + c.instanceUid + d + "",
                    id: "slick-slide" + c.instanceUid + d + ""
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar")
        }
        c.activateADA()
    };
    b.prototype.initArrowEvents = function () {
        var c = this;
        if (c.options.arrows === true && c.slideCount > c.options.slidesToShow) {
            c.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, c.changeSlide);
            c.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, c.changeSlide)
        }
    };
    b.prototype.initDotEvents = function () {
        var c = this;
        if (c.options.dots === true && c.slideCount > c.options.slidesToShow) {
            a("li", c.$dots).on("click.slick", {
                message: "index"
            }, c.changeSlide)
        }
        if (c.options.dots === true && c.options.pauseOnDotsHover === true) {
            a("li", c.$dots).on("mouseenter.slick", a.proxy(c.interrupt, c, true)).on("mouseleave.slick", a.proxy(c.interrupt, c, false))
        }
    };
    b.prototype.initSlideEvents = function () {
        var c = this;
        if (c.options.pauseOnHover) {
            c.$list.on("mouseenter.slick", a.proxy(c.interrupt, c, true));
            c.$list.on("mouseleave.slick", a.proxy(c.interrupt, c, false))
        }
    };
    b.prototype.initializeEvents = function () {
        var c = this;
        c.initArrowEvents();
        c.initDotEvents();
        c.initSlideEvents();
        c.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, c.swipeHandler);
        c.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, c.swipeHandler);
        c.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, c.swipeHandler);
        c.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, c.swipeHandler);
        c.$list.on("click.slick", c.clickHandler);
        a(document).on(c.visibilityChange, a.proxy(c.visibility, c));
        if (c.options.accessibility === true) {
            c.$list.on("keydown.slick", c.keyHandler)
        }
        if (c.options.focusOnSelect === true) {
            a(c.$slideTrack).children().on("click.slick", c.selectHandler)
        }
        a(window).on("orientationchange.slick.slick-" + c.instanceUid, a.proxy(c.orientationChange, c));
        a(window).on("resize.slick.slick-" + c.instanceUid, a.proxy(c.resize, c));
        a("[draggable!=true]", c.$slideTrack).on("dragstart", c.preventDefault);
        a(window).on("load.slick.slick-" + c.instanceUid, c.setPosition);
        a(document).on("ready.slick.slick-" + c.instanceUid, c.setPosition)
    };
    b.prototype.initUI = function () {
        var c = this;
        if (c.options.arrows === true && c.slideCount > c.options.slidesToShow) {
            c.$prevArrow.show();
            c.$nextArrow.show()
        }
        if (c.options.dots === true && c.slideCount > c.options.slidesToShow) {
            c.$dots.show()
        }
    };
    b.prototype.keyHandler = function (d) {
        var c = this;
        if (!d.target.tagName.match("TEXTAREA|INPUT|SELECT")) {
            if (d.keyCode === 37 && c.options.accessibility === true) {
                c.changeSlide({
                    data: {
                        message: c.options.rtl === true ? "next" : "previous"
                    }
                })
            } else {
                if (d.keyCode === 39 && c.options.accessibility === true) {
                    c.changeSlide({
                        data: {
                            message: c.options.rtl === true ? "previous" : "next"
                        }
                    })
                }
            }
        }
    };
    b.prototype.lazyLoad = function () {
        var c = this,
            f, d, h, g;

        function e(i) {
            a("img[data-lazy]", i).each(function () {
                var j = a(this),
                    k = a(this).attr("data-lazy"),
                    l = document.createElement("img");
                l.onload = function () {
                    j.animate({
                        opacity: 0
                    }, 100, function () {
                        j.attr("src", k).animate({
                            opacity: 1
                        }, 200, function () {
                            j.removeAttr("data-lazy").removeClass("slick-loading")
                        });
                        c.$slider.trigger("lazyLoaded", [c, j, k])
                    })
                };
                l.onerror = function () {
                    j.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                    c.$slider.trigger("lazyLoadError", [c, j, k])
                };
                l.src = k
            })
        }
        if (c.options.centerMode === true) {
            if (c.options.infinite === true) {
                h = c.currentSlide + (c.options.slidesToShow / 2 + 1);
                g = h + c.options.slidesToShow + 2
            } else {
                h = Math.max(0, c.currentSlide - (c.options.slidesToShow / 2 + 1));
                g = 2 + (c.options.slidesToShow / 2 + 1) + c.currentSlide
            }
        } else {
            h = c.options.infinite ? c.options.slidesToShow + c.currentSlide : c.currentSlide;
            g = Math.ceil(h + c.options.slidesToShow);
            if (c.options.fade === true) {
                if (h > 0) {
                    h--
                }
                if (g <= c.slideCount) {
                    g++
                }
            }
        }
        f = c.$slider.find(".slick-slide").slice(h, g);
        e(f);
        if (c.slideCount <= c.options.slidesToShow) {
            d = c.$slider.find(".slick-slide");
            e(d)
        } else {
            if (c.currentSlide >= c.slideCount - c.options.slidesToShow) {
                d = c.$slider.find(".slick-cloned").slice(0, c.options.slidesToShow);
                e(d)
            } else {
                if (c.currentSlide === 0) {
                    d = c.$slider.find(".slick-cloned").slice(c.options.slidesToShow * -1);
                    e(d)
                }
            }
        }
    };
    b.prototype.loadSlider = function () {
        var c = this;
        c.setPosition();
        c.$slideTrack.css({
            opacity: 1
        });
        c.$slider.removeClass("slick-loading");
        c.initUI();
        if (c.options.lazyLoad === "progressive") {
            c.progressiveLazyLoad()
        }
    };
    b.prototype.next = b.prototype.slickNext = function () {
        var c = this;
        c.changeSlide({
            data: {
                message: "next"
            }
        })
    };
    b.prototype.orientationChange = function () {
        var c = this;
        c.checkResponsive();
        c.setPosition()
    };
    b.prototype.pause = b.prototype.slickPause = function () {
        var c = this;
        c.autoPlayClear();
        c.paused = true
    };
    b.prototype.play = b.prototype.slickPlay = function () {
        var c = this;
        c.autoPlay();
        c.options.autoplay = true;
        c.paused = false;
        c.focussed = false;
        c.interrupted = false
    };
    b.prototype.postSlide = function (d) {
        var c = this;
        if (!c.unslicked) {
            c.$slider.trigger("afterChange", [c, d]);
            c.animating = false;
            c.setPosition();
            c.swipeLeft = null;
            if (c.options.autoplay) {
                c.autoPlay()
            }
            if (c.options.accessibility === true) {
                c.initADA()
            }
        }
    };
    b.prototype.prev = b.prototype.slickPrev = function () {
        var c = this;
        c.changeSlide({
            data: {
                message: "previous"
            }
        })
    };
    b.prototype.preventDefault = function (c) {
        c.preventDefault()
    };
    b.prototype.progressiveLazyLoad = function (h) {
        h = h || 1;
        var d = this,
            c = a("img[data-lazy]", d.$slider),
            e, f, g;
        if (c.length) {
            e = c.first();
            f = e.attr("data-lazy");
            g = document.createElement("img");
            g.onload = function () {
                e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading");
                if (d.options.adaptiveHeight === true) {
                    d.setPosition()
                }
                d.$slider.trigger("lazyLoaded", [d, e, f]);
                d.progressiveLazyLoad()
            };
            g.onerror = function () {
                if (h < 3) {
                    setTimeout(function () {
                        d.progressiveLazyLoad(h + 1)
                    }, 500)
                } else {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                    d.$slider.trigger("lazyLoadError", [d, e, f]);
                    d.progressiveLazyLoad()
                }
            };
            g.src = f
        } else {
            d.$slider.trigger("allImagesLoaded", [d])
        }
    };
    b.prototype.refresh = function (e) {
        var c = this,
            d, f;
        f = c.slideCount - c.options.slidesToShow;
        if (!c.options.infinite && (c.currentSlide > f)) {
            c.currentSlide = f
        }
        if (c.slideCount <= c.options.slidesToShow) {
            c.currentSlide = 0
        }
        d = c.currentSlide;
        c.destroy(true);
        a.extend(c, c.initials, {
            currentSlide: d
        });
        c.init();
        if (!e) {
            c.changeSlide({
                data: {
                    message: "index",
                    index: d
                }
            }, false)
        }
    };
    b.prototype.registerBreakpoints = function () {
        var c = this,
            d, e, f, g = c.options.responsive || null;
        if (a.type(g) === "array" && g.length) {
            c.respondTo = c.options.respondTo || "window";
            for (d in g) {
                f = c.breakpoints.length - 1;
                e = g[d].breakpoint;
                if (g.hasOwnProperty(d)) {
                    while (f >= 0) {
                        if (c.breakpoints[f] && c.breakpoints[f] === e) {
                            c.breakpoints.splice(f, 1)
                        }
                        f--
                    }
                    c.breakpoints.push(e);
                    c.breakpointSettings[e] = g[d].settings
                }
            }
            c.breakpoints.sort(function (h, i) {
                return (c.options.mobileFirst) ? h - i : i - h
            })
        }
    };
    b.prototype.reinit = function () {
        var c = this;
        c.$slides = c.$slideTrack.children(c.options.slide).addClass("slick-slide");
        c.slideCount = c.$slides.length;
        if (c.currentSlide >= c.slideCount && c.currentSlide !== 0) {
            c.currentSlide = c.currentSlide - c.options.slidesToScroll
        }
        if (c.slideCount <= c.options.slidesToShow) {
            c.currentSlide = 0
        }
        c.registerBreakpoints();
        c.setProps();
        c.setupInfinite();
        c.buildArrows();
        c.updateArrows();
        c.initArrowEvents();
        c.buildDots();
        c.updateDots();
        c.initDotEvents();
        c.cleanUpSlideEvents();
        c.initSlideEvents();
        c.checkResponsive(false, true);
        if (c.options.focusOnSelect === true) {
            a(c.$slideTrack).children().on("click.slick", c.selectHandler)
        }
        c.setSlideClasses(typeof c.currentSlide === "number" ? c.currentSlide : 0);
        c.setPosition();
        c.focusHandler();
        c.paused = !c.options.autoplay;
        c.autoPlay();
        c.$slider.trigger("reInit", [c])
    };
    b.prototype.resize = function () {
        var c = this;
        if (a(window).width() !== c.windowWidth) {
            clearTimeout(c.windowDelay);
            c.windowDelay = window.setTimeout(function () {
                c.windowWidth = a(window).width();
                c.checkResponsive();
                if (!c.unslicked) {
                    c.setPosition()
                }
            }, 50)
        }
    };
    b.prototype.removeSlide = b.prototype.slickRemove = function (d, f, e) {
        var c = this;
        if (typeof (d) === "boolean") {
            f = d;
            d = f === true ? 0 : c.slideCount - 1
        } else {
            d = f === true ? --d : d
        }
        if (c.slideCount < 1 || d < 0 || d > c.slideCount - 1) {
            return false
        }
        c.unload();
        if (e === true) {
            c.$slideTrack.children().remove()
        } else {
            c.$slideTrack.children(this.options.slide).eq(d).remove()
        }
        c.$slides = c.$slideTrack.children(this.options.slide);
        c.$slideTrack.children(this.options.slide).detach();
        c.$slideTrack.append(c.$slides);
        c.$slidesCache = c.$slides;
        c.reinit()
    };
    b.prototype.setCSS = function (d) {
        var c = this,
            e = {},
            f, g;
        if (c.options.rtl === true) {
            d = -d
        }
        f = c.positionProp == "left" ? Math.ceil(d) + "px" : "0px";
        g = c.positionProp == "top" ? Math.ceil(d) + "px" : "0px";
        e[c.positionProp] = d;
        if (c.transformsEnabled === false) {
            c.$slideTrack.css(e)
        } else {
            e = {};
            if (c.cssTransitions === false) {
                e[c.animType] = "translate(" + f + ", " + g + ")";
                c.$slideTrack.css(e)
            } else {
                e[c.animType] = "translate3d(" + f + ", " + g + ", 0px)";
                c.$slideTrack.css(e)
            }
        }
    };
    b.prototype.setDimensions = function () {
        var c = this;
        if (c.options.vertical === false) {
            if (c.options.centerMode === true) {
                c.$list.css({
                    padding: ("0px " + c.options.centerPadding)
                })
            }
        } else {
            c.$list.height(c.$slides.first().outerHeight(true) * c.options.slidesToShow);
            if (c.options.centerMode === true) {
                c.$list.css({
                    padding: (c.options.centerPadding + " 0px")
                })
            }
        }
        c.listWidth = c.$list.width();
        c.listHeight = c.$list.height();
        if (c.options.vertical === false && c.options.variableWidth === false) {
            c.slideWidth = Math.ceil(c.listWidth / c.options.slidesToShow);
            c.$slideTrack.width(Math.ceil((c.slideWidth * c.$slideTrack.children(".slick-slide").length)))
        } else {
            if (c.options.variableWidth === true) {
                c.$slideTrack.width(5000 * c.slideCount)
            } else {
                c.slideWidth = Math.ceil(c.listWidth);
                c.$slideTrack.height(Math.ceil((c.$slides.first().outerHeight(true) * c.$slideTrack.children(".slick-slide").length)))
            }
        }
        var d = c.$slides.first().outerWidth(true) - c.$slides.first().width();
        if (c.options.variableWidth === false) {
            c.$slideTrack.children(".slick-slide").width(c.slideWidth - d)
        }
    };
    b.prototype.setFade = function () {
        var c = this,
            d;
        c.$slides.each(function (f, e) {
            d = (c.slideWidth * f) * -1;
            if (c.options.rtl === true) {
                a(e).css({
                    position: "relative",
                    right: d,
                    top: 0,
                    zIndex: c.options.zIndex - 2,
                    opacity: 0
                })
            } else {
                a(e).css({
                    position: "relative",
                    left: d,
                    top: 0,
                    zIndex: c.options.zIndex - 2,
                    opacity: 0
                })
            }
        });
        c.$slides.eq(c.currentSlide).css({
            zIndex: c.options.zIndex - 1,
            opacity: 1
        })
    };
    b.prototype.setHeight = function () {
        var c = this;
        if (c.options.slidesToShow === 1 && c.options.adaptiveHeight === true && c.options.vertical === false) {
            var d = c.$slides.eq(c.currentSlide).outerHeight(true);
            c.$list.css("height", d)
        }
    };
    b.prototype.setOption = b.prototype.slickSetOption = function () {
        var c = this,
            e, d, f, i, g = false,
            h;
        if (a.type(arguments[0]) === "object") {
            f = arguments[0];
            g = arguments[1];
            h = "multiple"
        } else {
            if (a.type(arguments[0]) === "string") {
                f = arguments[0];
                i = arguments[1];
                g = arguments[2];
                if (arguments[0] === "responsive" && a.type(arguments[1]) === "array") {
                    h = "responsive"
                } else {
                    if (typeof arguments[1] !== "undefined") {
                        h = "single"
                    }
                }
            }
        }
        if (h === "single") {
            c.options[f] = i
        } else {
            if (h === "multiple") {
                a.each(f, function (j, k) {
                    c.options[j] = k
                })
            } else {
                if (h === "responsive") {
                    for (d in i) {
                        if (a.type(c.options.responsive) !== "array") {
                            c.options.responsive = [i[d]]
                        } else {
                            e = c.options.responsive.length - 1;
                            while (e >= 0) {
                                if (c.options.responsive[e].breakpoint === i[d].breakpoint) {
                                    c.options.responsive.splice(e, 1)
                                }
                                e--
                            }
                            c.options.responsive.push(i[d])
                        }
                    }
                }
            }
        }
        if (g) {
            c.unload();
            c.reinit()
        }
    };
    b.prototype.setPosition = function () {
        var c = this;
        c.setDimensions();
        c.setHeight();
        if (c.options.fade === false) {
            c.setCSS(c.getLeft(c.currentSlide))
        } else {
            c.setFade()
        }
        c.$slider.trigger("setPosition", [c])
    };
    b.prototype.setProps = function () {
        var c = this,
            d = document.body.style;
        c.positionProp = c.options.vertical === true ? "top" : "left";
        if (c.positionProp === "top") {
            c.$slider.addClass("slick-vertical")
        } else {
            c.$slider.removeClass("slick-vertical")
        }
        if (d.WebkitTransition !== undefined || d.MozTransition !== undefined || d.msTransition !== undefined) {
            if (c.options.useCSS === true) {
                c.cssTransitions = true
            }
        }
        if (c.options.fade) {
            if (typeof c.options.zIndex === "number") {
                if (c.options.zIndex < 3) {
                    c.options.zIndex = 3
                }
            } else {
                c.options.zIndex = c.defaults.zIndex
            }
        }
        if (d.OTransform !== undefined) {
            c.animType = "OTransform";
            c.transformType = "-o-transform";
            c.transitionType = "OTransition";
            if (d.perspectiveProperty === undefined && d.webkitPerspective === undefined) {
                c.animType = false
            }
        }
        if (d.MozTransform !== undefined) {
            c.animType = "MozTransform";
            c.transformType = "-moz-transform";
            c.transitionType = "MozTransition";
            if (d.perspectiveProperty === undefined && d.MozPerspective === undefined) {
                c.animType = false
            }
        }
        if (d.webkitTransform !== undefined) {
            c.animType = "webkitTransform";
            c.transformType = "-webkit-transform";
            c.transitionType = "webkitTransition";
            if (d.perspectiveProperty === undefined && d.webkitPerspective === undefined) {
                c.animType = false
            }
        }
        if (d.msTransform !== undefined) {
            c.animType = "msTransform";
            c.transformType = "-ms-transform";
            c.transitionType = "msTransition";
            if (d.msTransform === undefined) {
                c.animType = false
            }
        }
        if (d.transform !== undefined && c.animType !== false) {
            c.animType = "transform";
            c.transformType = "transform";
            c.transitionType = "transition"
        }
        c.transformsEnabled = c.options.useTransform && (c.animType !== null && c.animType !== false)
    };
    b.prototype.setSlideClasses = function (f) {
        var c = this,
            e, d, g, h;
        d = c.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
        c.$slides.eq(f).addClass("slick-current");
        if (c.options.centerMode === true) {
            e = Math.floor(c.options.slidesToShow / 2);
            if (c.options.infinite === true) {
                if (f >= e && f <= (c.slideCount - 1) - e) {
                    c.$slides.slice(f - e, f + e + 1).addClass("slick-active").attr("aria-hidden", "false")
                } else {
                    g = c.options.slidesToShow + f;
                    d.slice(g - e + 1, g + e + 2).addClass("slick-active").attr("aria-hidden", "false")
                }
                if (f === 0) {
                    d.eq(d.length - 1 - c.options.slidesToShow).addClass("slick-center")
                } else {
                    if (f === c.slideCount - 1) {
                        d.eq(c.options.slidesToShow).addClass("slick-center")
                    }
                }
            }
            c.$slides.eq(f).addClass("slick-center")
        } else {
            if (f >= 0 && f <= (c.slideCount - c.options.slidesToShow)) {
                c.$slides.slice(f, f + c.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")
            } else {
                if (d.length <= c.options.slidesToShow) {
                    d.addClass("slick-active").attr("aria-hidden", "false")
                } else {
                    h = c.slideCount % c.options.slidesToShow;
                    g = c.options.infinite === true ? c.options.slidesToShow + f : f;
                    if (c.options.slidesToShow == c.options.slidesToScroll && (c.slideCount - f) < c.options.slidesToShow) {
                        d.slice(g - (c.options.slidesToShow - h), g + h).addClass("slick-active").attr("aria-hidden", "false")
                    } else {
                        d.slice(g, g + c.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")
                    }
                }
            }
        }
        if (c.options.lazyLoad === "ondemand") {
            c.lazyLoad()
        }
    };
    b.prototype.setupInfinite = function () {
        var c = this,
            d, f, e;
        if (c.options.fade === true) {
            c.options.centerMode = false
        }
        if (c.options.infinite === true && c.options.fade === false) {
            f = null;
            if (c.slideCount > c.options.slidesToShow) {
                if (c.options.centerMode === true) {
                    e = c.options.slidesToShow + 1
                } else {
                    e = c.options.slidesToShow
                }
                for (d = c.slideCount; d > (c.slideCount - e); d -= 1) {
                    f = d - 1;
                    a(c.$slides[f]).clone(true).attr("id", "").attr("data-slick-index", f - c.slideCount).prependTo(c.$slideTrack).addClass("slick-cloned")
                }
                for (d = 0; d < e; d += 1) {
                    f = d;
                    a(c.$slides[f]).clone(true).attr("id", "").attr("data-slick-index", f + c.slideCount).appendTo(c.$slideTrack).addClass("slick-cloned")
                }
                c.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                    a(this).attr("id", "")
                })
            }
        }
    };
    b.prototype.interrupt = function (d) {
        var c = this;
        if (!d) {
            c.autoPlay()
        }
        c.interrupted = d
    };
    b.prototype.selectHandler = function (d) {
        var c = this;
        var f = a(d.target).is(".slick-slide") ? a(d.target) : a(d.target).parents(".slick-slide");
        var e = parseInt(f.attr("data-slick-index"));
        if (!e) {
            e = 0
        }
        if (c.slideCount <= c.options.slidesToShow) {
            c.setSlideClasses(e);
            c.asNavFor(e);
            return
        }
        c.slideHandler(e)
    };
    b.prototype.slideHandler = function (f, j, e) {
        var l, d, h, i, k = null,
            c = this,
            g;
        j = j || false;
        if (c.animating === true && c.options.waitForAnimate === true) {
            return
        }
        if (c.options.fade === true && c.currentSlide === f) {
            return
        }
        if (c.slideCount <= c.options.slidesToShow) {
            return
        }
        if (j === false) {
            c.asNavFor(f)
        }
        l = f;
        k = c.getLeft(l);
        i = c.getLeft(c.currentSlide);
        c.currentLeft = c.swipeLeft === null ? i : c.swipeLeft;
        if (c.options.infinite === false && c.options.centerMode === false && (f < 0 || f > c.getDotCount() * c.options.slidesToScroll)) {
            if (c.options.fade === false) {
                l = c.currentSlide;
                if (e !== true) {
                    c.animateSlide(i, function () {
                        c.postSlide(l)
                    })
                } else {
                    c.postSlide(l)
                }
            }
            return
        } else {
            if (c.options.infinite === false && c.options.centerMode === true && (f < 0 || f > (c.slideCount - c.options.slidesToScroll))) {
                if (c.options.fade === false) {
                    l = c.currentSlide;
                    if (e !== true) {
                        c.animateSlide(i, function () {
                            c.postSlide(l)
                        })
                    } else {
                        c.postSlide(l)
                    }
                }
                return
            }
        }
        if (c.options.autoplay) {
            clearInterval(c.autoPlayTimer)
        }
        if (l < 0) {
            if (c.slideCount % c.options.slidesToScroll !== 0) {
                d = c.slideCount - (c.slideCount % c.options.slidesToScroll)
            } else {
                d = c.slideCount + l
            }
        } else {
            if (l >= c.slideCount) {
                if (c.slideCount % c.options.slidesToScroll !== 0) {
                    d = 0
                } else {
                    d = l - c.slideCount
                }
            } else {
                d = l
            }
        }
        c.animating = true;
        c.$slider.trigger("beforeChange", [c, c.currentSlide, d]);
        h = c.currentSlide;
        c.currentSlide = d;
        c.setSlideClasses(c.currentSlide);
        if (c.options.asNavFor) {
            g = c.getNavTarget();
            g = g.slick("getSlick");
            if (g.slideCount <= g.options.slidesToShow) {
                g.setSlideClasses(c.currentSlide)
            }
        }
        c.updateDots();
        c.updateArrows();
        if (c.options.fade === true) {
            if (e !== true) {
                c.fadeSlideOut(h);
                c.fadeSlide(d, function () {
                    c.postSlide(d)
                })
            } else {
                c.postSlide(d)
            }
            c.animateHeight();
            return
        }
        if (e !== true) {
            c.animateSlide(k, function () {
                c.postSlide(d)
            })
        } else {
            c.postSlide(d)
        }
    };
    b.prototype.startLoad = function () {
        var c = this;
        if (c.options.arrows === true && c.slideCount > c.options.slidesToShow) {
            c.$prevArrow.hide();
            c.$nextArrow.hide()
        }
        if (c.options.dots === true && c.slideCount > c.options.slidesToShow) {
            c.$dots.hide()
        }
        c.$slider.addClass("slick-loading")
    };
    b.prototype.swipeDirection = function () {
        var f, g, d, e, c = this;
        f = c.touchObject.startX - c.touchObject.curX;
        g = c.touchObject.startY - c.touchObject.curY;
        d = Math.atan2(g, f);
        e = Math.round(d * 180 / Math.PI);
        if (e < 0) {
            e = 360 - Math.abs(e)
        }
        if ((e <= 45) && (e >= 0)) {
            return (c.options.rtl === false ? "left" : "right")
        }
        if ((e <= 360) && (e >= 315)) {
            return (c.options.rtl === false ? "left" : "right")
        }
        if ((e >= 135) && (e <= 225)) {
            return (c.options.rtl === false ? "right" : "left")
        }
        if (c.options.verticalSwiping === true) {
            if ((e >= 35) && (e <= 135)) {
                return "down"
            } else {
                return "up"
            }
        }
        return "vertical"
    };
    b.prototype.swipeEnd = function (e) {
        var c = this,
            f, d;
        c.dragging = false;
        c.interrupted = false;
        c.shouldClick = (c.touchObject.swipeLength > 10) ? false : true;
        if (c.touchObject.curX === undefined) {
            return false
        }
        if (c.touchObject.edgeHit === true) {
            c.$slider.trigger("edge", [c, c.swipeDirection()])
        }
        if (c.touchObject.swipeLength >= c.touchObject.minSwipe) {
            d = c.swipeDirection();
            switch (d) {
                case "left":
                case "down":
                    f = c.options.swipeToSlide ? c.checkNavigable(c.currentSlide + c.getSlideCount()) : c.currentSlide + c.getSlideCount();
                    c.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    f = c.options.swipeToSlide ? c.checkNavigable(c.currentSlide - c.getSlideCount()) : c.currentSlide - c.getSlideCount();
                    c.currentDirection = 1;
                    break;
                default:
            }
            if (d != "vertical") {
                c.slideHandler(f);
                c.touchObject = {};
                c.$slider.trigger("swipe", [c, d])
            }
        } else {
            if (c.touchObject.startX !== c.touchObject.curX) {
                c.slideHandler(c.currentSlide);
                c.touchObject = {}
            }
        }
    };
    b.prototype.swipeHandler = function (d) {
        var c = this;
        if ((c.options.swipe === false) || ("ontouchend" in document && c.options.swipe === false)) {
            return
        } else {
            if (c.options.draggable === false && d.type.indexOf("mouse") !== -1) {
                return
            }
        }
        c.touchObject.fingerCount = d.originalEvent && d.originalEvent.touches !== undefined ? d.originalEvent.touches.length : 1;
        c.touchObject.minSwipe = c.listWidth / c.options.touchThreshold;
        if (c.options.verticalSwiping === true) {
            c.touchObject.minSwipe = c.listHeight / c.options.touchThreshold
        }
        switch (d.data.action) {
            case "start":
                c.swipeStart(d);
                break;
            case "move":
                c.swipeMove(d);
                break;
            case "end":
                c.swipeEnd(d);
                break
        }
    };
    b.prototype.swipeMove = function (f) {
        var c = this,
            e = false,
            d, h, i, g, j;
        j = f.originalEvent !== undefined ? f.originalEvent.touches : null;
        if (!c.dragging || j && j.length !== 1) {
            return false
        }
        d = c.getLeft(c.currentSlide);
        c.touchObject.curX = j !== undefined ? j[0].pageX : f.clientX;
        c.touchObject.curY = j !== undefined ? j[0].pageY : f.clientY;
        c.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(c.touchObject.curX - c.touchObject.startX, 2)));
        if (c.options.verticalSwiping === true) {
            c.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(c.touchObject.curY - c.touchObject.startY, 2)))
        }
        h = c.swipeDirection();
        if (h === "vertical") {
            return
        }
        if (f.originalEvent !== undefined && c.touchObject.swipeLength > 4) {
            f.preventDefault()
        }
        g = (c.options.rtl === false ? 1 : -1) * (c.touchObject.curX > c.touchObject.startX ? 1 : -1);
        if (c.options.verticalSwiping === true) {
            g = c.touchObject.curY > c.touchObject.startY ? 1 : -1
        }
        i = c.touchObject.swipeLength;
        c.touchObject.edgeHit = false;
        if (c.options.infinite === false) {
            if ((c.currentSlide === 0 && h === "right") || (c.currentSlide >= c.getDotCount() && h === "left")) {
                i = c.touchObject.swipeLength * c.options.edgeFriction;
                c.touchObject.edgeHit = true
            }
        }
        if (c.options.vertical === false) {
            c.swipeLeft = d + i * g
        } else {
            c.swipeLeft = d + (i * (c.$list.height() / c.listWidth)) * g
        }
        if (c.options.verticalSwiping === true) {
            c.swipeLeft = d + i * g
        }
        if (c.options.fade === true || c.options.touchMove === false) {
            return false
        }
        if (c.animating === true) {
            c.swipeLeft = null;
            return false
        }
        c.setCSS(c.swipeLeft)
    };
    b.prototype.swipeStart = function (d) {
        var c = this,
            e;
        c.interrupted = true;
        if (c.touchObject.fingerCount !== 1 || c.slideCount <= c.options.slidesToShow) {
            c.touchObject = {};
            return false
        }
        if (d.originalEvent !== undefined && d.originalEvent.touches !== undefined) {
            e = d.originalEvent.touches[0]
        }
        c.touchObject.startX = c.touchObject.curX = e !== undefined ? e.pageX : d.clientX;
        c.touchObject.startY = c.touchObject.curY = e !== undefined ? e.pageY : d.clientY;
        c.dragging = true
    };
    b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
        var c = this;
        if (c.$slidesCache !== null) {
            c.unload();
            c.$slideTrack.children(this.options.slide).detach();
            c.$slidesCache.appendTo(c.$slideTrack);
            c.reinit()
        }
    };
    b.prototype.unload = function () {
        var c = this;
        a(".slick-cloned", c.$slider).remove();
        if (c.$dots) {
            c.$dots.remove()
        }
        if (c.$prevArrow && c.htmlExpr.test(c.options.prevArrow)) {
            c.$prevArrow.remove()
        }
        if (c.$nextArrow && c.htmlExpr.test(c.options.nextArrow)) {
            c.$nextArrow.remove()
        }
        c.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    };
    b.prototype.unslick = function (d) {
        var c = this;
        c.$slider.trigger("unslick", [c, d]);
        c.destroy()
    };
    b.prototype.updateArrows = function () {
        var c = this,
            d;
        d = Math.floor(c.options.slidesToShow / 2);
        if (c.options.arrows === true && c.slideCount > c.options.slidesToShow && !c.options.infinite) {
            c.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
            c.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
            if (c.currentSlide === 0) {
                c.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                c.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
            } else {
                if (c.currentSlide >= c.slideCount - c.options.slidesToShow && c.options.centerMode === false) {
                    c.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                    c.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
                } else {
                    if (c.currentSlide >= c.slideCount - 1 && c.options.centerMode === true) {
                        c.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                        c.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
                    }
                }
            }
        }
    };
    b.prototype.updateDots = function () {
        var c = this;
        if (c.$dots !== null) {
            c.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true");
            c.$dots.find("li").eq(Math.floor(c.currentSlide / c.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false")
        }
    };
    b.prototype.visibility = function () {
        var c = this;
        if (c.options.autoplay) {
            if (document[c.hidden]) {
                c.interrupted = true
            } else {
                c.interrupted = false
            }
        }
    };
    a.fn.slick = function () {
        var c = this,
            g = arguments[0],
            d = Array.prototype.slice.call(arguments, 1),
            f = c.length,
            e, h;
        for (e = 0; e < f; e++) {
            if (typeof g == "object" || typeof g == "undefined") {
                c[e].slick = new b(c[e], g)
            } else {
                h = c[e].slick[g].apply(c[e].slick, d)
            }
            if (typeof h != "undefined") {
                return h
            }
        }
        return c
    }
}));