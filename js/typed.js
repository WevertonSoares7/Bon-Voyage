! function (a) {
    var b = function (c, d) {
        this.el = a(c);
        this.options = a.extend({}, a.fn.typed.defaults, d);
        this.isInput = this.el.is("input");
        this.attr = this.options.attr;
        this.showCursor = this.isInput ? false : this.options.showCursor;
        this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text();
        this.contentType = this.options.contentType;
        this.typeSpeed = this.options.typeSpeed;
        this.startDelay = this.options.startDelay;
        this.backSpeed = this.options.backSpeed;
        this.backDelay = this.options.backDelay;
        this.stringsElement = this.options.stringsElement;
        this.strings = this.options.strings;
        this.strPos = 0;
        this.arrayPos = 0;
        this.stopNum = 0;
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 0;
        this.stop = false;
        this.cursorChar = this.options.cursorChar;
        this.shuffle = this.options.shuffle;
        this.sequence = [];
        this.build()
    };
    b.prototype = {
        constructor: b,
        init: function () {
            var c = this;
            c.timeout = setTimeout(function () {
                for (var d = 0; d < c.strings.length; ++d) {
                    c.sequence[d] = d
                }
                if (c.shuffle) {
                    c.sequence = c.shuffleArray(c.sequence)
                }
                c.typewrite(c.strings[c.sequence[c.arrayPos]], c.strPos)
            }, c.startDelay)
        },
        build: function () {
            var c = this;
            if (this.showCursor === true) {
                this.cursor = a('<span class="typed-cursor">' + this.cursorChar + "</span>");
                this.el.after(this.cursor)
            }
            if (this.stringsElement) {
                this.strings = [];
                this.stringsElement.hide();
                console.log(this.stringsElement.children());
                var d = this.stringsElement.children();
                a.each(d, function (e, f) {
                    c.strings.push(a(f).html())
                })
            }
            this.init()
        },
        typewrite: function (c, d) {
            if (this.stop === true) {
                return
            }
            var e = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            var f = this;
            f.timeout = setTimeout(function () {
                var g = 0;
                var k = c.substr(d);
                if (k.charAt(0) === "^") {
                    var j = 1;
                    if (/^\^\d+/.test(k)) {
                        k = /\d+/.exec(k)[0];
                        j += k.length;
                        g = parseInt(k)
                    }
                    c = c.substring(0, d) + c.substring(d + j)
                }
                if (f.contentType === "html") {
                    var h = c.substr(d).charAt(0);
                    if (h === "<" || h === "&") {
                        var l = "";
                        var i = "";
                        if (h === "<") {
                            i = ">"
                        } else {
                            i = ";"
                        }
                        while (c.substr(d + 1).charAt(0) !== i) {
                            l += c.substr(d).charAt(0);
                            d++;
                            if (d + 1 > c.length) {
                                break
                            }
                        }
                        d++;
                        l += i
                    }
                }
                f.timeout = setTimeout(function () {
                    if (d === c.length) {
                        f.options.onStringTyped(f.arrayPos);
                        if (f.arrayPos === f.strings.length - 1) {
                            f.options.callback();
                            f.curLoop++;
                            if (f.loop === false || f.curLoop === f.loopCount) {
                                return
                            }
                        }
                        f.timeout = setTimeout(function () {
                            f.backspace(c, d)
                        }, f.backDelay)
                    } else {
                        if (d === 0) {
                            f.options.preStringTyped(f.arrayPos)
                        }
                        var m = c.substr(0, d + 1);
                        if (f.attr) {
                            f.el.attr(f.attr, m)
                        } else {
                            if (f.isInput) {
                                f.el.val(m)
                            } else {
                                if (f.contentType === "html") {
                                    f.el.html(m)
                                } else {
                                    f.el.text(m)
                                }
                            }
                        }
                        d++;
                        f.typewrite(c, d)
                    }
                }, g)
            }, e)
        },
        backspace: function (c, d) {
            if (this.stop === true) {
                return
            }
            var e = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
            var f = this;
            f.timeout = setTimeout(function () {
                if (f.contentType === "html") {
                    if (c.substr(d).charAt(0) === ">") {
                        var h = "";
                        while (c.substr(d - 1).charAt(0) !== "<") {
                            h -= c.substr(d).charAt(0);
                            d--;
                            if (d < 0) {
                                break
                            }
                        }
                        d--;
                        h += "<"
                    }
                }
                var g = c.substr(0, d);
                if (f.attr) {
                    f.el.attr(f.attr, g)
                } else {
                    if (f.isInput) {
                        f.el.val(g)
                    } else {
                        if (f.contentType === "html") {
                            f.el.html(g)
                        } else {
                            f.el.text(g)
                        }
                    }
                }
                if (d > f.stopNum) {
                    d--;
                    f.backspace(c, d)
                } else {
                    if (d <= f.stopNum) {
                        f.arrayPos++;
                        if (f.arrayPos === f.strings.length) {
                            f.arrayPos = 0;
                            if (f.shuffle) {
                                f.sequence = f.shuffleArray(f.sequence)
                            }
                            f.init()
                        } else {
                            f.typewrite(f.strings[f.sequence[f.arrayPos]], d)
                        }
                    }
                }
            }, e)
        },
        shuffleArray: function (c) {
            var e, d, f = c.length;
            if (f) {
                while (--f) {
                    d = Math.floor(Math.random() * (f + 1));
                    e = c[d];
                    c[d] = c[f];
                    c[f] = e
                }
            }
            return c
        },
        reset: function () {
            var d = this;
            clearInterval(d.timeout);
            var c = this.el.attr("id");
            this.el.empty();
            if (typeof this.cursor !== "undefined") {
                this.cursor.remove()
            }
            this.strPos = 0;
            this.arrayPos = 0;
            this.curLoop = 0;
            this.options.resetCallback()
        }
    };
    a.fn.typed = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("typed"),
                f = typeof c == "object" && c;
            if (e) {
                e.reset()
            }
            d.data("typed", (e = new b(this, f)));
            if (typeof c == "string") {
                e[c]()
            }
        })
    };
    a.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: false,
        backDelay: 500,
        loop: false,
        loopCount: false,
        showCursor: true,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function () {},
        preStringTyped: function () {},
        onStringTyped: function () {},
        resetCallback: function () {}
    }
}(window.jQuery);
! function (a) {
    var b = {
        position: "top",
        animationTime: 500,
        easing: "ease-in-out",
        offset: 0,
        hidePlaceholderOnFocus: true
    };
    a.fn.animateLabel = function (g, c) {
        var d = c.data("position") || g.position,
            e = 0,
            f = 0;
        a(this).css({
            left: "auto",
            right: "auto",
            position: "absolute",
            "-webkit-transition": "all " + g.animationTime + "ms " + g.easing,
            "-moz-transition": "all " + g.animationTime + "ms " + g.easing,
            "-ms-transition": "all " + g.animationTime + "ms " + g.easing,
            transition: "all " + g.animationTime + "ms " + g.easing
        });
        switch (d) {
            case "top":
                e = 0;
                f = (a(this).height() + g.offset) * -1;
                a(this).css({
                    top: "0",
                    opacity: "1",
                    "-webkit-transform": "translate3d(" + e + ", " + f + "px, 0)",
                    "-moz-transform": "translate3d(" + e + ", " + f + "px, 0)",
                    "-ms-transform": "translate3d(" + e + ", " + f + "px, 0)",
                    transform: "translate3d(" + e + ", " + f + "px, 0)"
                });
                break;
            case "bottom":
                e = 0;
                f = (a(this).height() + g.offset);
                a(this).css({
                    bottom: "0",
                    opacity: "1",
                    "-webkit-transform": "translate3d(" + e + ", " + f + "px, 0)",
                    "-moz-transform": "translate3d(" + e + ", " + f + "px, 0)",
                    "-ms-transform": "translate3d(" + e + ", " + f + "px, 0)",
                    transform: "translate3d(" + e + ", " + f + "px, 0)"
                });
                break;
            case "left":
                e = (a(this).width() + g.offset) * -1;
                f = 0;
                a(this).css({
                    left: 0,
                    top: 0,
                    opacity: "1",
                    "-webkit-transform": "translate3d(" + e + "px, " + f + "px, 0)",
                    "-moz-transform": "translate3d(" + e + "px, " + f + "px, 0)",
                    "-ms-transform": "translate3d(" + e + "px, " + f + "px, 0)",
                    transform: "translate3d(" + e + "px, " + f + "px, 0)"
                });
                break;
            case "right":
                e = a(this).width() + g.offset;
                f = 0;
                a(this).css({
                    right: 0,
                    top: 0,
                    opacity: "1",
                    "-webkit-transform": "translate3d(" + e + "px, " + f + "px, 0)",
                    "-moz-transform": "translate3d(" + e + "px, " + f + "px, 0)",
                    "-ms-transform": "translate3d(" + e + "px, " + f + "px, 0)",
                    transform: "translate3d(" + e + "px, " + f + "px, 0)"
                });
                break
        }
    };
    a.fn.removeAnimate = function (g, c) {
        var d = c.data("position") || g.position,
            e = 0,
            f = 0;
        a(this).css({
            top: "0",
            opacity: "0",
            "-webkit-transform": "translate3d(" + e + ", " + f + "px, 0)",
            "-moz-transform": "translate3d(" + e + ", " + f + "px, 0)",
            "-ms-transform": "translate3d(" + e + ", " + f + "px, 0)",
            transform: "translate3d(" + e + ", " + f + "px, 0)"
        })
    };
    a.fn.label_better = function (d) {
        var e = a.extend({}, b, d),
            c = a(this),
            f = "focus",
            g = "blur";
        if (e.easing == "bounce") {
            e.easing = "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
        }
        c.each(function (i, l) {
            var h = a(this),
                j = h.data("position") || e.position;
            h.wrapAll("<div class='lb_wrap' style='position:relative; display: inline;'></div>");
            if (h.val().length > 0) {
                var k = h.data("new-placeholder") || h.attr("placeholder");
                a("<div class='lb_label " + j + "'>" + k + "</div>").css("opacity", "0").insertAfter(h).animateLabel(e, h)
            }
            h.bind(f, function () {
                if (h.val().length < 1) {
                    var n = h.data("new-placeholder") || h.attr("placeholder"),
                        m = h.data("position") || e.position;
                    a("<div class='lb_label " + m + "'>" + n + "</div>").css("opacity", "0").insertAfter(h).animateLabel(e, h)
                }
                if (e.hidePlaceholderOnFocus == true) {
                    h.data("default-placeholder", h.attr("placeholder"));
                    h.attr("placeholder", "")
                }
                h.parent().find(".lb_label").addClass("active")
            }).bind(g, function () {
                if (h.val().length < 1) {
                    h.parent().find(".lb_label").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                        a(this).remove()
                    }).removeAnimate(e, h)
                }
                if (e.hidePlaceholderOnFocus == true) {
                    h.attr("placeholder", h.data("default-placeholder"));
                    h.data("default-placeholder", "")
                }
                h.parent().find(".lb_label").removeClass("active")
            })
        })
    }
}(window.jQuery);