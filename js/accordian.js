(function (a) {
    a.fn.accordion = function (l) {
        if (!this || this.length < 1) {
            return this
        }
        d(this, l)
    };

    function d(l, n) {
        var o = a.extend({}, a.fn.accordion.defaults, n);
        var m = "";
        l.each(function () {
            var p = a(this);
            h(p, o);
            if (o.bind == "mouseenter") {
                p.bind("mouseenter", function (q) {
                    q.preventDefault();
                    j(p, o)
                })
            }
            if (o.bind == "mouseover") {
                p.bind("mouseover", function (q) {
                    q.preventDefault();
                    j(p, o)
                })
            }
            if (o.bind == "click") {
                p.bind("click", function (q) {
                    q.preventDefault();
                    j(p, o)
                })
            }
            if (o.bind == "dblclick") {
                p.bind("dblclick", function (q) {
                    q.preventDefault();
                    j(p, o)
                })
            }
            id = p.attr("id");
            if (!k(o)) {
                if (id != o.defaultOpen) {
                    p.addClass(o.cssClose);
                    o.loadClose(p, o)
                } else {
                    p.addClass(o.cssOpen);
                    o.loadOpen(p, o);
                    m = id
                }
            } else {
                if (e(o)) {
                    if (c(id, o) === false) {
                        p.addClass(o.cssClose);
                        o.loadClose(p, o)
                    } else {
                        p.addClass(o.cssOpen);
                        o.loadOpen(p, o);
                        m = id
                    }
                } else {
                    if (id != o.defaultOpen) {
                        p.addClass(o.cssClose);
                        o.loadClose(p, o)
                    } else {
                        p.addClass(o.cssOpen);
                        o.loadOpen(p, o);
                        m = id
                    }
                }
            }
        });
        if (m.length > 0 && k(o)) {
            i(m, o)
        } else {
            i("", o)
        }
        return l
    }

    function f(l) {
        return l.data("accordion-opts")
    }

    function h(l, m) {
        return l.data("accordion-opts", m)
    }

    function b(l) {
        opened = a(document).find("." + l.cssOpen);
        a.each(opened, function () {
            a(this).addClass(l.cssClose).removeClass(l.cssOpen);
            l.animateClose(a(this), l)
        })
    }

    function g(l, m) {
        b(m);
        l.removeClass(m.cssClose).addClass(m.cssOpen);
        m.animateOpen(l, m);
        if (k(m)) {
            id = l.attr("id");
            i(id, m)
        }
    }

    function j(l, m) {
        if (l.hasClass(m.cssOpen)) {
            b(m);
            if (k(m)) {
                i("", m)
            }
            return false
        }
        b(m);
        g(l, m);
        return false
    }

    function k(l) {
        if (!a.cookie || l.cookieName == "") {
            return false
        }
        return true
    }

    function i(m, l) {
        if (!k(l)) {
            return false
        }
        a.cookie(l.cookieName, m, l.cookieOptions)
    }

    function c(m, l) {
        if (!k(l)) {
            return false
        }
        if (!e(l)) {
            return false
        }
        cookie = unescape(a.cookie(l.cookieName));
        if (cookie != m) {
            return false
        }
        return true
    }

    function e(l) {
        if (!k(l)) {
            return false
        }
        if (a.cookie(l.cookieName) == null) {
            return false
        }
        return true
    }
    a.fn.accordion.defaults = {
        cssClose: "accordion-close",
        cssOpen: "accordion-open",
        cookieName: "accordion",
        cookieOptions: {
            path: "/",
            expires: 7,
            domain: "",
            secure: ""
        },
        defaultOpen: "",
        speed: "slow",
        bind: "click",
        animateOpen: function (l, m) {
            l.next().stop(true, true).slideDown(m.speed)
        },
        animateClose: function (l, m) {
            l.next().stop(true, true).slideUp(m.speed)
        },
        loadOpen: function (l, m) {
            l.next().show()
        },
        loadClose: function (l, m) {
            l.next().hide()
        }
    }
})(jQuery);