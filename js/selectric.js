/* Selectric ϟ v1.9.3 (2015-04-23) - git.io/tjl9sQ - Copyright (c) 2015 Leonardo Santos - Dual licensed: MIT/GPL */ ! function (f) {
    var q = "selectric",
        p = "Input Items Open Disabled TempShow HideSelect Wrapper Hover Responsive Above Scroll Group GroupLabel",
        k = ".sl",
        g = {
            onChange: function (a) {
                f(a).change()
            },
            maxHeight: 300,
            keySearchTimeout: 500,
            arrowButtonMarkup: '<b class="button">&#x25be;</b>',
            disableOnMobile: !0,
            openOnHover: !1,
            hoverIntentTimeout: 500,
            expandToItemText: !1,
            responsive: !1,
            preventWindowScroll: !0,
            inheritOriginalWidth: !1,
            allowWrap: !0,
            customClass: {
                prefix: q,
                camelCase: !1,
                overwrite: !0
            },
            optionsItemBuilder: "{text}",
            labelBuilder: "{text}"
        },
        j = {
            add: function (a, i, c) {
                this[a] || (this[a] = {}), this[a][i] = c
            },
            remove: function (a, c) {
                delete this[a][c]
            }
        },
        h = {
            replaceDiacritics: function (a) {
                for (var i = "40-46 50-53 54-57 62-70 71-74 61 47 77".replace(/\d+/g, "\\3$&").split(" "), c = i.length; c--;) {
                    a = a.toLowerCase().replace(RegExp("[" + i[c] + "]", "g"), "aeiouncy".charAt(c))
                }
                return a
            },
            format: function (a) {
                var c = arguments;
                return ("" + a).replace(/{(\d+|(\w+))}/g, function (i, n, l) {
                    return l && c[1] ? c[1][l] : c[n]
                })
            },
            nextEnabledItem: function (a, c) {
                for (; a[c = (c + 1) % a.length].disabled;) {}
                return c
            },
            previousEnabledItem: function (a, c) {
                for (; a[c = (c > 0 ? c : a.length) - 1].disabled;) {}
                return c
            },
            toDash: function (a) {
                return a.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
            },
            triggerCallback: function (n, l) {
                var e = l.element,
                    c = l.options["on" + n];
                f.isFunction(c) && c.call(e, e, l), j[n] && f.each(j[n], function () {
                    this.call(e, e, l)
                }), f(e).trigger(q + "-" + h.toDash(n), l)
            }
        },
        b = f(document),
        m = f(window),
        d = function (ac, o) {
            function s(v) {
                if (V.options = f.extend(!0, {}, g, V.options, v), V.classes = {}, V.element = ac, h.triggerCallback("BeforeInit", V), V.options.disableOnMobile && ap) {
                    return void(V.disableOnMobile = !0)
                }
                r(!0);
                var n = V.options.customClass,
                    c = p.split(" "),
                    u = J.width();
                f.each(c, function (w, y) {
                    var x = n.prefix + y;
                    V.classes[y.toLowerCase()] = n.camelCase ? x : h.toDash(x)
                }), an = f("<input/>", {
                    "class": V.classes.input,
                    readonly: ap
                }), X = f("<div/>", {
                    "class": V.classes.items,
                    tabindex: -1
                }), ai = f("<div/>", {
                    "class": V.classes.scroll
                }), t = f("<div/>", {
                    "class": n.prefix,
                    html: V.options.arrowButtonMarkup
                }), U = f('<p class="label"/>'), ao = J.wrap("<div>").parent().append(t.prepend(U), X, an), e = {
                    open: aa,
                    close: K,
                    destroy: r,
                    refresh: aj,
                    init: s
                }, J.on(e).wrap('<div class="' + V.classes.hideselect + '">'), f.extend(V, e), a = V.options.labelBuilder, V.options.inheritOriginalWidth && u > 0 && ao.width(u), ae()
            }

            function ae() {
                V.items = [];
                var w = J.children(),
                    v = "<ul>",
                    c = w.filter(":selected").index(),
                    u = 0;
                l = ah = ~c ? c : 0, (z = w.length) && (w.each(function () {
                    function A() {
                        var E = f(this),
                            D = E.html(),
                            C = E.prop("disabled"),
                            B = V.options.optionsItemBuilder;
                        V.items[u] = {
                            element: E,
                            value: E.val(),
                            text: D,
                            slug: h.replaceDiacritics(D),
                            disabled: C
                        }, v += h.format('<li data-index="{1}" class="{2}">{3}</li>', u, f.trim([u == l ? "selected" : "", u == z - 1 ? "last" : "", C ? "disabled" : ""].join(" ")), f.isFunction(B) ? B(V.items[u], E, u) : h.format(B, V.items[u])), u++
                    }
                    var y = f(this);
                    if (y.is("optgroup")) {
                        var x = y.prop("disabled"),
                            n = y.children();
                        v += h.format('<ul class="{1}"><li class="{2}">{3}</li>', f.trim([V.classes.group, x ? "disabled" : "", y.prop("class")].join(" ")), V.classes.grouplabel, y.prop("label")), x && n.prop("disabled", !0), n.each(A), v += "</ul>"
                    } else {
                        A.call(y)
                    }
                }), X.append(ai.html(v + "</ul>")), U.html(f.isFunction(a) ? a(V.items[l]) : h.format(a, V.items[l]))), t.add(J).add(ao).add(an).off(k), ao.prop("class", [V.classes.wrapper, V.options.customClass.overwrite ? J.prop("class").replace(/\S+/g, V.options.customClass.prefix + "-$&") : J.prop("class"), V.options.responsive ? V.classes.responsive : ""].join(" ")), J.prop("disabled") ? (ao.addClass(V.classes.disabled), an.prop("disabled", !0)) : (ag = !0, ao.removeClass(V.classes.disabled).on("mouseenter" + k + " mouseleave" + k, function (n) {
                    f(this).toggleClass(V.classes.hover), V.options.openOnHover && (clearTimeout(V.closeTimer), "mouseleave" == n.type ? V.closeTimer = setTimeout(K, V.options.hoverIntentTimeout) : aa())
                }), t.on("click" + k, function (n) {
                    Z ? K() : aa(n)
                }), an.prop({
                    tabindex: af,
                    disabled: !1
                }).on("keypress" + k, N).on("keydown" + k, function (n) {
                    N(n), clearTimeout(V.resetStr), V.resetStr = setTimeout(function () {
                        an.val("")
                    }, V.options.keySearchTimeout);
                    var x = n.keyCode || n.which;
                    if (x > 36 && 41 > x) {
                        if (!V.options.allowWrap && (39 > x && 0 == ah || x > 38 && ah + 1 == V.items.length)) {
                            return
                        }
                        i(h[(39 > x ? "previous" : "next") + "EnabledItem"](V.items, ah))
                    }
                }).on("focusin" + k, function (n) {
                    an.one("blur", function () {
                        an.blur()
                    }), Z || aa(n)
                }).on("oninput" in an[0] ? "input" : "keyup", function () {
                    an.val().length && f.each(V.items, function (n, x) {
                        return RegExp("^" + an.val(), "i").test(x.slug) && !x.disabled ? (i(n), !1) : void 0
                    })
                }), J.prop("tabindex", !1), ad = f("li", X.removeAttr("style")).on({
                    mousedown: function (n) {
                        n.preventDefault(), n.stopPropagation()
                    },
                    click: function () {
                        return i(f(this).data("index"), !0), !1
                    }
                }).filter("[data-index]")), h.triggerCallback("Init", V)
            }

            function aj() {
                h.triggerCallback("Refresh", V), ae()
            }

            function N(c) {
                var n = c.keyCode || c.which;
                13 == n && c.preventDefault(), /^(9|13|27)$/.test(n) && (c.stopPropagation(), i(ah, !0))
            }

            function G() {
                var c = X.closest(":visible").children(":hidden").addClass(V.classes.tempshow),
                    v = V.options.maxHeight,
                    u = X.outerWidth(),
                    n = t.outerWidth() - (u - X.width());
                !V.options.expandToItemText || n > u ? ab = n : (X.css("overflow", "scroll"), ao.width(90000), ab = X.width(), X.css("overflow", ""), ao.width("")), X.width(ab).height() > v && X.height(v), c.removeClass(V.classes.tempshow)
            }

            function aa(c) {
                h.triggerCallback("BeforeOpen", V), c && (c.preventDefault(), c.stopPropagation()), ag && (G(), f("." + V.classes.hideselect, "." + V.classes.open).children()[q]("close"), Z = !0, Q = X.outerHeight(), am = X.height(), ao.addClass(V.classes.open), an.val("").is(":focus") || an.focus(), b.on("click" + k, K).on("scroll" + k, ak), ak(), V.options.preventWindowScroll && b.on("mousewheel" + k + " DOMMouseScroll" + k, "." + V.classes.scroll, function (w) {
                    var v = w.originalEvent,
                        u = f(this).scrollTop(),
                        n = 0;
                    "detail" in v && (n = -1 * v.detail), "wheelDelta" in v && (n = v.wheelDelta), "wheelDeltaY" in v && (n = v.wheelDeltaY), "deltaY" in v && (n = -1 * v.deltaY), (u == this.scrollHeight - am && 0 > n || 0 == u && n > 0) && w.preventDefault()
                }), al(ah), h.triggerCallback("Open", V))
            }

            function ak() {
                ao.toggleClass(V.classes.above, ao.offset().top + ao.outerHeight() + Q > m.scrollTop() + m.height())
            }

            function K() {
                if (h.triggerCallback("BeforeClose", V), l != ah) {
                    h.triggerCallback("BeforeChange", V);
                    var c = V.items[ah].text;
                    J.prop("selectedIndex", l = ah).data("value", c), U.html(f.isFunction(a) ? a(V.items[ah]) : h.format(a, V.items[ah])), h.triggerCallback("Change", V)
                }
                b.off(k), ao.removeClass(V.classes.open), Z = !1, h.triggerCallback("Close", V)
            }

            function i(c, n) {
                void 0 != c && (V.items[c].disabled || (ad.removeClass("selected").eq(ah = c).addClass("selected"), al(c), n && K()))
            }

            function al(c) {
                var w = ad.eq(c).outerHeight(),
                    v = ad[c].offsetTop,
                    u = ai.scrollTop(),
                    n = v + 2 * w;
                ai.scrollTop(n > u + Q ? n - Q : u > v - w ? v - w : u)
            }

            function r(c) {
                ag && (X.add(t).add(an).remove(), !c && J.removeData(q).removeData("value"), J.prop("tabindex", af).off(k).off(e).unwrap().unwrap(), ag = !1)
            }
            var an, X, ai, t, U, ao, ad, ah, l, Q, am, ab, z, e, a, V = this,
                J = f(ac),
                Z = !1,
                ag = !1,
                ap = /android|ip(hone|od|ad)/i.test(navigator.userAgent),
                af = J.prop("tabindex");
            s(o)
        };
    f.fn[q] = function (a) {
        return this.each(function () {
            var c = f.data(this, q);
            c && !c.disableOnMobile ? "" + a === a && c[a] ? c[a]() : c.init(a) : f.data(this, q, new d(this, a))
        })
    }, f.fn[q].hooks = j
}(jQuery);