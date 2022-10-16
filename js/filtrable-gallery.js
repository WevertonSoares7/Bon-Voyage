(function (a) {
    var b = a.event,
        c;
    b.special.smartresize = {
        setup: function () {
            a(this).bind("resize", b.special.smartresize.handler)
        },
        teardown: function () {
            a(this).unbind("resize", b.special.smartresize.handler)
        },
        handler: function (h, i) {
            var f = this,
                e = arguments;
            h.type = "smartresize";
            c && clearTimeout(c);
            c = setTimeout(function () {
                jQuery.event.handle.apply(f, e)
            }, i === "execAsap" ? 0 : 100)
        }
    };
    a.fn.smartresize = function (d) {
        return d ? this.bind("smartresize", d) : this.trigger("smartresize", ["execAsap"])
    };
    a.fn.masonry = function (e, f) {
        var d = {
            getBricks: function (j, h, g) {
                var i = g.itemSelector === undefined;
                h.$bricks = g.appendedContent === undefined ? i ? j.children() : j.find(g.itemSelector) : i ? g.appendedContent : g.appendedContent.filter(g.itemSelector)
            },
            placeBrick: function (n, j, g, l, p) {
                j = Math.min.apply(Math, g);
                for (var q = j + n.outerHeight(true), o = g.length, r = o, s = l.colCount + 1 - o; o--;) {
                    if (g[o] == j) {
                        r = o
                    }
                }
                n.applyStyle({
                    left: l.colW * r + l.posLeft,
                    top: j
                }, a.extend(true, {}, p.animationOptions));
                for (o = 0; o < s; o++) {
                    l.colY[r + o] = q
                }
            },
            setup: function (i, h, g) {
                d.getBricks(i, g, h);
                if (g.masoned) {
                    g.previousData = i.data("masonry")
                }
                g.colW = h.columnWidth === undefined ? g.masoned ? g.previousData.colW : g.$bricks.outerWidth(true) : h.columnWidth;
                g.colCount = Math.floor(i.width() / g.colW);
                g.colCount = Math.max(g.colCount, 1)
            },
            arrange: function (k, i, g) {
                var j;
                if (!g.masoned || i.appendedContent !== undefined) {
                    g.$bricks.css("position", "absolute")
                }
                if (g.masoned) {
                    g.posTop = g.previousData.posTop;
                    g.posLeft = g.previousData.posLeft
                } else {
                    k.css("position", "relative");
                    var l = a(document.createElement("div"));
                    k.prepend(l);
                    g.posTop = Math.round(l.position().top);
                    g.posLeft = Math.round(l.position().left);
                    l.remove()
                }
                if (g.masoned && i.appendedContent !== undefined) {
                    g.colY = g.previousData.colY;
                    for (j = g.previousData.colCount; j < g.colCount; j++) {
                        g.colY[j] = g.posTop
                    }
                } else {
                    g.colY = [];
                    for (j = g.colCount; j--;) {
                        g.colY.push(g.posTop)
                    }
                }
                a.fn.applyStyle = g.masoned && i.animate ? a.fn.animate : a.fn.css;
                i.singleMode ? g.$bricks.each(function () {
                    var h = a(this);
                    d.placeBrick(h, g.colCount, g.colY, g, i)
                }) : g.$bricks.each(function () {
                    var n = a(this),
                        h = Math.ceil(n.outerWidth(true) / g.colW);
                    h = Math.min(h, g.colCount);
                    if (h === 1) {
                        d.placeBrick(n, g.colCount, g.colY, g, i)
                    } else {
                        var o = g.colCount + 1 - h,
                            q = [];
                        for (j = 0; j < o; j++) {
                            var r = g.colY.slice(j, j + h);
                            q[j] = Math.max.apply(Math, r)
                        }
                        d.placeBrick(n, o, q, g, i)
                    }
                });
                g.wallH = Math.max.apply(Math, g.colY);
                k.applyStyle({
                    height: g.wallH - g.posTop
                }, a.extend(true, [], i.animationOptions));
                g.masoned || setTimeout(function () {
                    k.addClass("masoned")
                }, 1);
                f.call(g.$bricks);
                k.data("masonry", g)
            },
            resize: function (j, h, g) {
                g.masoned = !!j.data("masonry");
                var i = j.data("masonry").colCount;
                d.setup(j, h, g);
                g.colCount != i && d.arrange(j, h, g)
            }
        };
        return this.each(function () {
            var k = a(this),
                i = {};
            i.masoned = !!k.data("masonry");
            var g = i.masoned ? k.data("masonry").options : {},
                j = a.extend({}, a.fn.masonry.defaults, g, e),
                l = g.resizeable;
            i.options = j.saveOptions ? j : g;
            f = f || function () {};
            d.getBricks(k, i, j);
            if (!i.$bricks.length) {
                return this
            }
            d.setup(k, j, i);
            d.arrange(k, j, i);
            !l && j.resizeable && a(window).bind("smartresize.masonry", function () {
                d.resize(k, j, i)
            });
            l && !j.resizeable && a(window).unbind("smartresize.masonry")
        })
    };
    a.fn.masonry.defaults = {
        singleMode: false,
        columnWidth: undefined,
        itemSelector: undefined,
        appendedContent: undefined,
        saveOptions: true,
        resizeable: true,
        animate: false,
        animationOptions: {}
    }
})(jQuery);