(function (a, f, e) {
    var d = f.Modernizr,
        b = a("body");
    a.DLMenu = function (h, g) {
        this.$el = a(g);
        this._init(h)
    };
    a.DLMenu.defaults = {
        animationClasses: {
            classin: "dl-animate-in-1",
            classout: "dl-animate-out-1"
        },
        onLevelClick: function (g, h) {
            return false
        },
        onLinkClick: function (g, h) {
            return false
        }
    };
    a.DLMenu.prototype = {
        _init: function (h) {
            this.options = a.extend(true, {}, a.DLMenu.defaults, h);
            this._config();
            var g = {
                    WebkitAnimation: "webkitAnimationEnd",
                    OAnimation: "oAnimationEnd",
                    msAnimation: "MSAnimationEnd",
                    animation: "animationend"
                },
                i = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    msTransition: "MSTransitionEnd",
                    transition: "transitionend"
                };
            this.animEndEventName = g[d.prefixed("animation")] + ".dlmenu";
            this.transEndEventName = i[d.prefixed("transition")] + ".dlmenu", this.supportAnimations = d.cssanimations, this.supportTransitions = d.csstransitions;
            this._initEvents()
        },
        _config: function () {
            this.open = false;
            this.$trigger = this.$el.children(".dl-trigger");
            this.$menu = this.$el.children("ul.dl-menu");
            this.$menuitems = this.$menu.find("li:not(.dl-back)");
            this.$el.find("ul.dl-submenu").prepend('<li class="dl-back"><a href="#">back</a></li>');
            this.$back = this.$menu.find("li.dl-back")
        },
        _initEvents: function () {
            var g = this;
            this.$trigger.on("click.dlmenu", function () {
                if (g.open) {
                    g._closeMenu()
                } else {
                    g._openMenu()
                }
                return false
            });
            this.$menuitems.on("click.dlmenu", function (k) {
                k.stopPropagation();
                var i = a(this),
                    j = i.children("ul.dl-submenu");
                if (j.length > 0) {
                    var h = j.clone().css("opacity", 0).insertAfter(g.$menu),
                        l = function () {
                            g.$menu.off(g.animEndEventName).removeClass(g.options.animationClasses.classout).addClass("dl-subview");
                            i.addClass("dl-subviewopen").parents(".dl-subviewopen:first").removeClass("dl-subviewopen").addClass("dl-subview");
                            h.remove()
                        };
                    setTimeout(function () {
                        h.addClass(g.options.animationClasses.classin);
                        g.$menu.addClass(g.options.animationClasses.classout);
                        if (g.supportAnimations) {
                            g.$menu.on(g.animEndEventName, l)
                        } else {
                            l.call()
                        }
                        g.options.onLevelClick(i, i.children("a:first").text())
                    });
                    return false
                } else {
                    g.options.onLinkClick(i, k)
                }
            });
            this.$back.on("click.dlmenu", function (l) {
                var k = a(this),
                    j = k.parents("ul.dl-submenu:first"),
                    i = j.parent(),
                    h = j.clone().insertAfter(g.$menu);
                var m = function () {
                    g.$menu.off(g.animEndEventName).removeClass(g.options.animationClasses.classin);
                    h.remove()
                };
                setTimeout(function () {
                    h.addClass(g.options.animationClasses.classout);
                    g.$menu.addClass(g.options.animationClasses.classin);
                    if (g.supportAnimations) {
                        g.$menu.on(g.animEndEventName, m)
                    } else {
                        m.call()
                    }
                    i.removeClass("dl-subviewopen");
                    var n = k.parents(".dl-subview:first");
                    if (n.is("li")) {
                        n.addClass("dl-subviewopen")
                    }
                    n.removeClass("dl-subview")
                });
                return false
            })
        },
        closeMenu: function () {
            if (this.open) {
                this._closeMenu()
            }
        },
        _closeMenu: function () {
            var h = this,
                g = function () {
                    h.$menu.off(h.transEndEventName);
                    h._resetMenu()
                };
            this.$menu.removeClass("dl-menuopen");
            this.$menu.addClass("dl-menu-toggle");
            this.$trigger.removeClass("dl-active");
            if (this.supportTransitions) {
                this.$menu.on(this.transEndEventName, g)
            } else {
                g.call()
            }
            this.open = false
        },
        openMenu: function () {
            if (!this.open) {
                this._openMenu()
            }
        },
        _openMenu: function () {
            var g = this;
            b.off("click").on("click.dlmenu", function () {
                g._closeMenu()
            });
            this.$menu.addClass("dl-menuopen dl-menu-toggle").on(this.transEndEventName, function () {
                a(this).removeClass("dl-menu-toggle")
            });
            this.$trigger.addClass("dl-active");
            this.open = true
        },
        _resetMenu: function () {
            this.$menu.removeClass("dl-subview");
            this.$menuitems.removeClass("dl-subview dl-subviewopen")
        }
    };
    var c = function (g) {
        if (f.console) {
            f.console.error(g)
        }
    };
    a.fn.dlmenu = function (h) {
        if (typeof h === "string") {
            var g = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var i = a.data(this, "dlmenu");
                if (!i) {
                    c("cannot call methods on dlmenu prior to initialization; attempted to call method '" + h + "'");
                    return
                }
                if (!a.isFunction(i[h]) || h.charAt(0) === "_") {
                    c("no such method '" + h + "' for dlmenu instance");
                    return
                }
                i[h].apply(i, g)
            })
        } else {
            this.each(function () {
                var i = a.data(this, "dlmenu");
                if (i) {
                    i._init()
                } else {
                    i = a.data(this, "dlmenu", new a.DLMenu(h, this))
                }
            })
        }
        return this
    }
})(jQuery, window);