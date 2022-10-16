/* jQuery UI - v1.10.3 - 2013-10-20
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.menu.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js
 * Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function (c, h) {
    function d(m, a) {
        var l, e, k, j = m.nodeName.toLowerCase();
        return "area" === j ? (l = m.parentNode, e = l.name, m.href && e && "map" === l.nodeName.toLowerCase() ? (k = c("img[usemap=#" + e + "]")[0], !!k && b(k)) : !1) : (/input|select|textarea|button|object/.test(j) ? !m.disabled : "a" === j ? m.href || a : a) && b(m)
    }

    function b(a) {
        return c.expr.filters.visible(a) && !c(a).parents().addBack().filter(function () {
            return "hidden" === c.css(this, "visibility")
        }).length
    }
    var g = 0,
        f = /^ui-id-\d+$/;
    c.ui = c.ui || {}, c.extend(c.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), c.fn.extend({
        focus: function (a) {
            return function (j, e) {
                return "number" == typeof j ? this.each(function () {
                    var i = this;
                    setTimeout(function () {
                        c(i).focus(), e && e.call(i)
                    }, j)
                }) : a.apply(this, arguments)
            }
        }(c.fn.focus),
        scrollParent: function () {
            var a;
            return a = c.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                return /(relative|absolute|fixed)/.test(c.css(this, "position")) && /(auto|scroll)/.test(c.css(this, "overflow") + c.css(this, "overflow-y") + c.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function () {
                return /(auto|scroll)/.test(c.css(this, "overflow") + c.css(this, "overflow-y") + c.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !a.length ? c(document) : a
        },
        zIndex: function (j) {
            if (j !== h) {
                return this.css("zIndex", j)
            }
            if (this.length) {
                for (var e, l, k = c(this[0]); k.length && k[0] !== document;) {
                    if (e = k.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (l = parseInt(k.css("zIndex"), 10), !isNaN(l) && 0 !== l)) {
                        return l
                    }
                    k = k.parent()
                }
            }
            return 0
        },
        uniqueId: function () {
            return this.each(function () {
                this.id || (this.id = "ui-id-" + ++g)
            })
        },
        removeUniqueId: function () {
            return this.each(function () {
                f.test(this.id) && c(this).removeAttr("id")
            })
        }
    }), c.extend(c.expr[":"], {
        data: c.expr.createPseudo ? c.expr.createPseudo(function (a) {
            return function (e) {
                return !!c.data(e, a)
            }
        }) : function (k, j, e) {
            return !!c.data(k, e[3])
        },
        focusable: function (a) {
            return d(a, !isNaN(c.attr(a, "tabindex")))
        },
        tabbable: function (j) {
            var e = c.attr(j, "tabindex"),
                i = isNaN(e);
            return (i || e >= 0) && d(j, !i)
        }
    }), c("<a>").outerWidth(1).jquery || c.each(["Width", "Height"], function (j, e) {
        function p(r, o, n, q) {
            return c.each(k, function () {
                o -= parseFloat(c.css(r, "padding" + this)) || 0, n && (o -= parseFloat(c.css(r, "border" + this + "Width")) || 0), q && (o -= parseFloat(c.css(r, "margin" + this)) || 0)
            }), o
        }
        var k = "Width" === e ? ["Left", "Right"] : ["Top", "Bottom"],
            m = e.toLowerCase(),
            l = {
                innerWidth: c.fn.innerWidth,
                innerHeight: c.fn.innerHeight,
                outerWidth: c.fn.outerWidth,
                outerHeight: c.fn.outerHeight
            };
        c.fn["inner" + e] = function (a) {
            return a === h ? l["inner" + e].call(this) : this.each(function () {
                c(this).css(m, p(this, a) + "px")
            })
        }, c.fn["outer" + e] = function (n, a) {
            return "number" != typeof n ? l["outer" + e].call(this, n) : this.each(function () {
                c(this).css(m, p(this, n, !0, a) + "px")
            })
        }
    }), c.fn.addBack || (c.fn.addBack = function (a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }), c("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (c.fn.removeData = function (a) {
        return function (e) {
            return arguments.length ? a.call(this, c.camelCase(e)) : a.call(this)
        }
    }(c.fn.removeData)), c.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), c.support.selectstart = "onselectstart" in document.createElement("div"), c.fn.extend({
        disableSelection: function () {
            return this.bind((c.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
                a.preventDefault()
            })
        },
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }
    }), c.extend(c.ui, {
        plugin: {
            add: function (m, j, e) {
                var l, k = c.ui[m].prototype;
                for (l in e) {
                    k.plugins[l] = k.plugins[l] || [], k.plugins[l].push([j, e[l]])
                }
            },
            call: function (k, n, l) {
                var j, m = k.plugins[n];
                if (m && k.element[0].parentNode && 11 !== k.element[0].parentNode.nodeType) {
                    for (j = 0; m.length > j; j++) {
                        k.options[m[j][0]] && m[j][1].apply(k.element, l)
                    }
                }
            }
        },
        hasScroll: function (l, j) {
            if ("hidden" === c(l).css("overflow")) {
                return !1
            }
            var e = j && "left" === j ? "scrollLeft" : "scrollTop",
                k = !1;
            return l[e] > 0 ? !0 : (l[e] = 1, k = l[e] > 0, l[e] = 0, k)
        }
    })
})(jQuery);
(function (c, g) {
    var d = 0,
        f = Array.prototype.slice,
        b = c.cleanData;
    c.cleanData = function (j) {
        for (var a, h = 0; null != (a = j[h]); h++) {
            try {
                c(a).triggerHandler("remove")
            } catch (e) {}
        }
        b(j)
    }, c.widget = function (k, v, e) {
        var p, t, q, j, m = {},
            w = k.split(".")[0];
        k = k.split(".")[1], p = w + "-" + k, e || (e = v, v = c.Widget), c.expr[":"][p.toLowerCase()] = function (a) {
            return !!c.data(a, p)
        }, c[w] = c[w] || {}, t = c[w][k], q = c[w][k] = function (a, h) {
            return this._createWidget ? (arguments.length && this._createWidget(a, h), g) : new q(a, h)
        }, c.extend(q, t, {
            version: e.version,
            _proto: c.extend({}, e),
            _childConstructors: []
        }), j = new v, j.options = c.widget.extend({}, j.options), c.each(e, function (l, h) {
            return c.isFunction(h) ? (m[l] = function () {
                var a = function () {
                        return v.prototype[l].apply(this, arguments)
                    },
                    i = function (n) {
                        return v.prototype[l].apply(this, n)
                    };
                return function () {
                    var o, u = this._super,
                        r = this._superApply;
                    return this._super = a, this._superApply = i, o = h.apply(this, arguments), this._super = u, this._superApply = r, o
                }
            }(), g) : (m[l] = h, g)
        }), q.prototype = c.widget.extend(j, {
            widgetEventPrefix: t ? j.widgetEventPrefix : k
        }, m, {
            constructor: q,
            namespace: w,
            widgetName: k,
            widgetFullName: p
        }), t ? (c.each(t._childConstructors, function (l, a) {
            var h = a.prototype;
            c.widget(h.namespace + "." + h.widgetName, q, a._proto)
        }), delete t._childConstructors) : v._childConstructors.push(q), c.widget.bridge(k, q)
    }, c.widget.extend = function (k) {
        for (var e, l, p = f.call(arguments, 1), m = 0, j = p.length; j > m; m++) {
            for (e in p[m]) {
                l = p[m][e], p[m].hasOwnProperty(e) && l !== g && (k[e] = c.isPlainObject(l) ? c.isPlainObject(k[e]) ? c.widget.extend({}, k[e], l) : c.widget.extend({}, l) : l)
            }
        }
        return k
    }, c.widget.bridge = function (h, e) {
        var j = e.prototype.widgetFullName || h;
        c.fn[h] = function (m) {
            var k = "string" == typeof m,
                a = f.call(arguments, 1),
                i = this;
            return m = !k && a.length ? c.widget.extend.apply(null, [m].concat(a)) : m, k ? this.each(function () {
                var n, l = c.data(this, j);
                return l ? c.isFunction(l[m]) && "_" !== m.charAt(0) ? (n = l[m].apply(l, a), n !== l && n !== g ? (i = n && n.jquery ? i.pushStack(n.get()) : n, !1) : g) : c.error("no such method '" + m + "' for " + h + " widget instance") : c.error("cannot call methods on " + h + " prior to initialization; attempted to call method '" + m + "'")
            }) : this.each(function () {
                var l = c.data(this, j);
                l ? l.option(m || {})._init() : c.data(this, j, new e(m, this))
            }), i
        }
    }, c.Widget = function () {}, c.Widget._childConstructors = [], c.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function (e, a) {
            a = c(a || this.defaultElement || this)[0], this.element = c(a), this.uuid = d++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = c.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = c(), this.hoverable = c(), this.focusable = c(), a !== this && (c.data(a, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (h) {
                    h.target === a && this.destroy()
                }
            }), this.document = c(a.style ? a.ownerDocument : a.document || a), this.window = c(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: c.noop,
        _getCreateEventData: c.noop,
        _create: c.noop,
        _init: c.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(c.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: c.noop,
        widget: function () {
            return this.element
        },
        option: function (h, m) {
            var e, j, l, k = h;
            if (0 === arguments.length) {
                return c.widget.extend({}, this.options)
            }
            if ("string" == typeof h) {
                if (k = {}, e = h.split("."), h = e.shift(), e.length) {
                    for (j = k[h] = c.widget.extend({}, this.options[h]), l = 0; e.length - 1 > l; l++) {
                        j[e[l]] = j[e[l]] || {}, j = j[e[l]]
                    }
                    if (h = e.pop(), m === g) {
                        return j[h] === g ? null : j[h]
                    }
                    j[h] = m
                } else {
                    if (m === g) {
                        return this.options[h] === g ? null : this.options[h]
                    }
                    k[h] = m
                }
            }
            return this._setOptions(k), this
        },
        _setOptions: function (a) {
            var h;
            for (h in a) {
                this._setOption(h, a[h])
            }
            return this
        },
        _setOption: function (a, h) {
            return this.options[a] = h, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!h).attr("aria-disabled", h), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function () {
            return this._setOption("disabled", !1)
        },
        disable: function () {
            return this._setOption("disabled", !0)
        },
        _on: function (h, l, e) {
            var j, k = this;
            "boolean" != typeof h && (e = l, l = h, h = !1), e ? (l = j = c(l), this.bindings = this.bindings.add(l)) : (e = l, l = this.element, j = this.widget()), c.each(e, function (i, q) {
                function n() {
                    return h || k.options.disabled !== !0 && !c(this).hasClass("ui-state-disabled") ? ("string" == typeof q ? k[q] : q).apply(k, arguments) : g
                }
                "string" != typeof q && (n.guid = q.guid = q.guid || n.guid || c.guid++);
                var p = i.match(/^(\w+)\s*(.*)$/),
                    r = p[1] + k.eventNamespace,
                    m = p[2];
                m ? j.delegate(m, r, n) : l.bind(r, n)
            })
        },
        _off: function (a, h) {
            h = (h || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, a.unbind(h).undelegate(h)
        },
        _delay: function (a, k) {
            function h() {
                return ("string" == typeof a ? j[a] : a).apply(j, arguments)
            }
            var j = this;
            return setTimeout(h, k || 0)
        },
        _hoverable: function (a) {
            this.hoverable = this.hoverable.add(a), this._on(a, {
                mouseenter: function (e) {
                    c(e.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function (e) {
                    c(e.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (a) {
            this.focusable = this.focusable.add(a), this._on(a, {
                focusin: function (e) {
                    c(e.currentTarget).addClass("ui-state-focus")
                },
                focusout: function (e) {
                    c(e.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (m, h, l) {
            var e, j, k = this.options[m];
            if (l = l || {}, h = c.Event(h), h.type = (m === this.widgetEventPrefix ? m : this.widgetEventPrefix + m).toLowerCase(), h.target = this.element[0], j = h.originalEvent) {
                for (e in j) {
                    e in h || (h[e] = j[e])
                }
            }
            return this.element.trigger(h, l), !(c.isFunction(k) && k.apply(this.element[0], [h].concat(l)) === !1 || h.isDefaultPrevented())
        }
    }, c.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (e, a) {
        c.Widget.prototype["_" + e] = function (l, h, i) {
            "string" == typeof h && (h = {
                effect: h
            });
            var k, j = h ? h === !0 || "number" == typeof h ? a : h.effect || a : e;
            h = h || {}, "number" == typeof h && (h = {
                duration: h
            }), k = !c.isEmptyObject(h), h.complete = i, h.delay && l.delay(h.delay), k && c.effects && c.effects.effect[j] ? l[e](h) : j !== e && l[j] ? l[j](h.duration, h.easing, i) : l.queue(function (m) {
                c(this)[e](), i && i.call(l[0]), m()
            })
        }
    })
})(jQuery);
(function (a) {
    var b = !1;
    a(document).mouseup(function () {
        b = !1
    }), a.widget("ui.mouse", {
        version: "1.10.3",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var c = this;
            this.element.bind("mousedown." + this.widgetName, function (d) {
                return c._mouseDown(d)
            }).bind("click." + this.widgetName, function (d) {
                return !0 === a.data(d.target, c.widgetName + ".preventClickEvent") ? (a.removeData(d.target, c.widgetName + ".preventClickEvent"), d.stopImmediatePropagation(), !1) : undefined
            }), this.started = !1
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (d) {
            if (!b) {
                this._mouseStarted && this._mouseUp(d), this._mouseDownEvent = d;
                var f = this,
                    c = 1 === d.which,
                    e = "string" == typeof this.options.cancel && d.target.nodeName ? a(d.target).closest(this.options.cancel).length : !1;
                return c && !e && this._mouseCapture(d) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    f.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(d) && this._mouseDelayMet(d) && (this._mouseStarted = this._mouseStart(d) !== !1, !this._mouseStarted) ? (d.preventDefault(), !0) : (!0 === a.data(d.target, this.widgetName + ".preventClickEvent") && a.removeData(d.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (g) {
                    return f._mouseMove(g)
                }, this._mouseUpDelegate = function (g) {
                    return f._mouseUp(g)
                }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), d.preventDefault(), b = !0, !0)) : !0
            }
        },
        _mouseMove: function (c) {
            return a.ui.ie && (!document.documentMode || 9 > document.documentMode) && !c.button ? this._mouseUp(c) : this._mouseStarted ? (this._mouseDrag(c), c.preventDefault()) : (this._mouseDistanceMet(c) && this._mouseDelayMet(c) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, c) !== !1, this._mouseStarted ? this._mouseDrag(c) : this._mouseUp(c)), !this._mouseStarted)
        },
        _mouseUp: function (c) {
            return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, c.target === this._mouseDownEvent.target && a.data(c.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(c)), !1
        },
        _mouseDistanceMet: function (c) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - c.pageX), Math.abs(this._mouseDownEvent.pageY - c.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return !0
        }
    })
})(jQuery);
(function (k, C) {
    function v(a, d, c) {
        return [parseFloat(a[0]) * (z.test(a[0]) ? d / 100 : 1), parseFloat(a[1]) * (z.test(a[1]) ? c / 100 : 1)]
    }

    function B(c, a) {
        return parseInt(k.css(c, a), 10) || 0
    }

    function b(c) {
        var a = c[0];
        return 9 === a.nodeType ? {
            width: c.width(),
            height: c.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : k.isWindow(a) ? {
            width: c.width(),
            height: c.height(),
            offset: {
                top: c.scrollTop(),
                left: c.scrollLeft()
            }
        } : a.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: a.pageY,
                left: a.pageX
            }
        } : {
            width: c.outerWidth(),
            height: c.outerHeight(),
            offset: c.offset()
        }
    }
    k.ui = k.ui || {};
    var x, A = Math.max,
        y = Math.abs,
        q = Math.round,
        w = /left|center|right/,
        D = /top|center|bottom/,
        g = /[\+\-]\d+(\.[\d]+)?%?/,
        j = /^\w+/,
        z = /%$/,
        m = k.fn.position;
    k.position = {
            scrollbarWidth: function () {
                if (x !== C) {
                    return x
                }
                var d, f, c = k("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    e = c.children()[0];
                return k("body").append(c), d = e.offsetWidth, c.css("overflow", "scroll"), f = e.offsetWidth, d === f && (f = c[0].clientWidth), c.remove(), x = d - f
            },
            getScrollInfo: function (h) {
                var d = h.isWindow ? "" : h.element.css("overflow-x"),
                    f = h.isWindow ? "" : h.element.css("overflow-y"),
                    c = "scroll" === d || "auto" === d && h.width < h.element[0].scrollWidth,
                    e = "scroll" === f || "auto" === f && h.height < h.element[0].scrollHeight;
                return {
                    width: e ? k.position.scrollbarWidth() : 0,
                    height: c ? k.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function (d) {
                var a = k(d || window),
                    c = k.isWindow(a[0]);
                return {
                    element: a,
                    isWindow: c,
                    offset: a.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: a.scrollLeft(),
                    scrollTop: a.scrollTop(),
                    width: c ? a.width() : a.outerWidth(),
                    height: c ? a.height() : a.outerHeight()
                }
            }
        }, k.fn.position = function (l) {
            if (!l || !l.of) {
                return m.apply(this, arguments)
            }
            l = k.extend({}, l);
            var h, i, f, d, o, u, c = k(l.of),
                a = k.position.getWithinInfo(l.within),
                s = k.position.getScrollInfo(a),
                e = (l.collision || "flip").split(" "),
                r = {};
            return u = b(c), c[0].preventDefault && (l.at = "left top"), i = u.width, f = u.height, d = u.offset, o = k.extend({}, d), k.each(["my", "at"], function () {
                var n, p, t = (l[this] || "").split(" ");
                1 === t.length && (t = w.test(t[0]) ? t.concat(["center"]) : D.test(t[0]) ? ["center"].concat(t) : ["center", "center"]), t[0] = w.test(t[0]) ? t[0] : "center", t[1] = D.test(t[1]) ? t[1] : "center", n = g.exec(t[0]), p = g.exec(t[1]), r[this] = [n ? n[0] : 0, p ? p[0] : 0], l[this] = [j.exec(t[0])[0], j.exec(t[1])[0]]
            }), 1 === e.length && (e[1] = e[0]), "right" === l.at[0] ? o.left += i : "center" === l.at[0] && (o.left += i / 2), "bottom" === l.at[1] ? o.top += f : "center" === l.at[1] && (o.top += f / 2), h = v(r.at, i, f), o.left += h[0], o.top += h[1], this.each(function () {
                var n, G, K = k(this),
                    p = K.outerWidth(),
                    t = K.outerHeight(),
                    F = B(this, "marginLeft"),
                    L = B(this, "marginTop"),
                    E = p + F + B(this, "marginRight") + s.width,
                    J = t + L + B(this, "marginBottom") + s.height,
                    H = k.extend({}, o),
                    I = v(r.my, K.outerWidth(), K.outerHeight());
                "right" === l.my[0] ? H.left -= p : "center" === l.my[0] && (H.left -= p / 2), "bottom" === l.my[1] ? H.top -= t : "center" === l.my[1] && (H.top -= t / 2), H.left += I[0], H.top += I[1], k.support.offsetFractions || (H.left = q(H.left), H.top = q(H.top)), n = {
                    marginLeft: F,
                    marginTop: L
                }, k.each(["left", "top"], function (M, N) {
                    k.ui.position[e[M]] && k.ui.position[e[M]][N](H, {
                        targetWidth: i,
                        targetHeight: f,
                        elemWidth: p,
                        elemHeight: t,
                        collisionPosition: n,
                        collisionWidth: E,
                        collisionHeight: J,
                        offset: [h[0] + I[0], h[1] + I[1]],
                        my: l.my,
                        at: l.at,
                        within: a,
                        elem: K
                    })
                }), l.using && (G = function (N) {
                    var P = d.left - H.left,
                        R = P + i - p,
                        M = d.top - H.top,
                        Q = M + f - t,
                        O = {
                            target: {
                                element: c,
                                left: d.left,
                                top: d.top,
                                width: i,
                                height: f
                            },
                            element: {
                                element: K,
                                left: H.left,
                                top: H.top,
                                width: p,
                                height: t
                            },
                            horizontal: 0 > R ? "left" : P > 0 ? "right" : "center",
                            vertical: 0 > Q ? "top" : M > 0 ? "bottom" : "middle"
                        };
                    p > i && i > y(P + R) && (O.horizontal = "center"), t > f && f > y(M + Q) && (O.vertical = "middle"), O.important = A(y(P), y(R)) > A(y(M), y(Q)) ? "horizontal" : "vertical", l.using.call(this, N, O)
                }), K.offset(k.extend(H, {
                    using: G
                }))
            })
        }, k.ui.position = {
            fit: {
                left: function (d, G) {
                    var p, F = G.within,
                        c = F.isWindow ? F.scrollLeft : F.offset.left,
                        u = F.width,
                        E = d.left - G.collisionPosition.marginLeft,
                        f = c - E,
                        r = E + G.collisionWidth - u - c;
                    G.collisionWidth > u ? f > 0 && 0 >= r ? (p = d.left + f + G.collisionWidth - u - c, d.left += f - p) : d.left = r > 0 && 0 >= f ? c : f > r ? c + u - G.collisionWidth : c : f > 0 ? d.left += f : r > 0 ? d.left -= r : d.left = A(d.left - E, d.left)
                },
                top: function (d, G) {
                    var p, F = G.within,
                        c = F.isWindow ? F.scrollTop : F.offset.top,
                        u = G.within.height,
                        E = d.top - G.collisionPosition.marginTop,
                        f = c - E,
                        r = E + G.collisionHeight - u - c;
                    G.collisionHeight > u ? f > 0 && 0 >= r ? (p = d.top + f + G.collisionHeight - u - c, d.top += f - p) : d.top = r > 0 && 0 >= f ? c : f > r ? c + u - G.collisionHeight : c : f > 0 ? d.top += f : r > 0 ? d.top -= r : d.top = A(d.top - E, d.top)
                }
            },
            flip: {
                left: function (G, P) {
                    var J, O, o = P.within,
                        L = o.offset.left + o.scrollLeft,
                        N = o.width,
                        I = o.isWindow ? o.scrollLeft : o.offset.left,
                        K = G.left - P.collisionPosition.marginLeft,
                        Q = K - I,
                        E = K + P.collisionWidth - N - I,
                        F = "left" === P.my[0] ? -P.elemWidth : "right" === P.my[0] ? P.elemWidth : 0,
                        M = "left" === P.at[0] ? P.targetWidth : "right" === P.at[0] ? -P.targetWidth : 0,
                        H = -2 * P.offset[0];
                    0 > Q ? (J = G.left + F + M + H + P.collisionWidth - N - L, (0 > J || y(Q) > J) && (G.left += F + M + H)) : E > 0 && (O = G.left - P.collisionPosition.marginLeft + F + M + H - I, (O > 0 || E > y(O)) && (G.left += F + M + H))
                },
                top: function (G, Q) {
                    var J, P, o = Q.within,
                        M = o.offset.top + o.scrollTop,
                        O = o.height,
                        I = o.isWindow ? o.scrollTop : o.offset.top,
                        K = G.top - Q.collisionPosition.marginTop,
                        R = K - I,
                        E = K + Q.collisionHeight - O - I,
                        F = "top" === Q.my[1],
                        N = F ? -Q.elemHeight : "bottom" === Q.my[1] ? Q.elemHeight : 0,
                        H = "top" === Q.at[1] ? Q.targetHeight : "bottom" === Q.at[1] ? -Q.targetHeight : 0,
                        L = -2 * Q.offset[1];
                    0 > R ? (P = G.top + N + H + L + Q.collisionHeight - O - M, G.top + N + H + L > R && (0 > P || y(R) > P) && (G.top += N + H + L)) : E > 0 && (J = G.top - Q.collisionPosition.marginTop + N + H + L - I, G.top + N + H + L > E && (J > 0 || E > y(J)) && (G.top += N + H + L))
                }
            },
            flipfit: {
                left: function () {
                    k.ui.position.flip.left.apply(this, arguments), k.ui.position.fit.left.apply(this, arguments)
                },
                top: function () {
                    k.ui.position.flip.top.apply(this, arguments), k.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
        function () {
            var p, d, l, c, e, h = document.getElementsByTagName("body")[0],
                f = document.createElement("div");
            p = document.createElement(h ? "div" : "body"), l = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            }, h && k.extend(l, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (e in l) {
                p.style[e] = l[e]
            }
            p.appendChild(f), d = h || document.documentElement, d.insertBefore(p, d.firstChild), f.style.cssText = "position: absolute; left: 10.7432222px;", c = k(f).offset().left, k.support.offsetFractions = c > 10 && 11 > c, p.innerHTML = "", d.removeChild(p)
        }()
})(jQuery);
(function (a) {
    a.widget("ui.draggable", a.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function () {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        _destroy: function () {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
        },
        _mouseCapture: function (c) {
            var b = this.options;
            return this.helper || b.disabled || a(c.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(c), this.handle ? (a(b.iframeFix === !0 ? "iframe" : b.iframeFix).each(function () {
                a("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css(a(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function (c) {
            var b = this.options;
            return this.helper = this._createHelper(c), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, this.offset.scroll = !1, a.extend(this.offset, {
                click: {
                    left: c.pageX - this.offset.left,
                    top: c.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(c), this.originalPageX = c.pageX, this.originalPageY = c.pageY, b.cursorAt && this._adjustOffsetFromHelper(b.cursorAt), this._setContainment(), this._trigger("start", c) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !b.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, c), this._mouseDrag(c, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, c), !0)
        },
        _mouseDrag: function (d, c) {
            if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(d), this.positionAbs = this._convertPositionTo("absolute"), !c) {
                var b = this._uiHash();
                if (this._trigger("drag", d, b) === !1) {
                    return this._mouseUp({}), !1
                }
                this.position = b.position
            }
            return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), a.ui.ddmanager && a.ui.ddmanager.drag(this, d), !1
        },
        _mouseStop: function (d) {
            var c = this,
                b = !1;
            return a.ui.ddmanager && !this.options.dropBehaviour && (b = a.ui.ddmanager.drop(this, d)), this.dropped && (b = this.dropped, this.dropped = !1), "original" !== this.options.helper || a.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !b || "valid" === this.options.revert && b || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, b) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                c._trigger("stop", d) !== !1 && c._clear()
            }) : this._trigger("stop", d) !== !1 && this._clear(), !1) : !1
        },
        _mouseUp: function (b) {
            return a("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b)
        },
        cancel: function () {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function (b) {
            return this.options.handle ? !!a(b.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _createHelper: function (d) {
            var c = this.options,
                b = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [d])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element;
            return b.parents("body").length || b.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), b[0] === this.element[0] || /(fixed|absolute)/.test(b.css("position")) || b.css("position", "absolute"), b
        },
        _adjustOffsetFromHelper: function (b) {
            "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] || 0
            }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            var b = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
                top: 0,
                left: 0
            }), {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" === this.cssPosition) {
                var b = this.element.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var e, c, b, d = this.options;
            return d.containment ? "window" === d.containment ? (this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : "document" === d.containment ? (this.containment = [0, 0, a(document).width() - this.helperProportions.width - this.margins.left, (a(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : d.containment.constructor === Array ? (this.containment = d.containment, undefined) : ("parent" === d.containment && (d.containment = this.helper[0].parentNode), c = a(d.containment), b = c[0], b && (e = "hidden" !== c.css("overflow"), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (e ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c), undefined) : (this.containment = null, undefined)
        },
        _convertPositionTo: function (e, c) {
            c || (c = this.position);
            var b = "absolute" === e ? 1 : -1,
                d = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {
                top: d.scrollTop(),
                left: d.scrollLeft()
            }), {
                top: c.top + this.offset.relative.top * b + this.offset.parent.top * b - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * b,
                left: c.left + this.offset.relative.left * b + this.offset.parent.left * b - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * b
            }
        },
        _generatePosition: function (m) {
            var d, b, k, f, j = this.options,
                g = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                e = m.pageX,
                c = m.pageY;
            return this.offset.scroll || (this.offset.scroll = {
                top: g.scrollTop(),
                left: g.scrollLeft()
            }), this.originalPosition && (this.containment && (this.relative_container ? (b = this.relative_container.offset(), d = [this.containment[0] + b.left, this.containment[1] + b.top, this.containment[2] + b.left, this.containment[3] + b.top]) : d = this.containment, m.pageX - this.offset.click.left < d[0] && (e = d[0] + this.offset.click.left), m.pageY - this.offset.click.top < d[1] && (c = d[1] + this.offset.click.top), m.pageX - this.offset.click.left > d[2] && (e = d[2] + this.offset.click.left), m.pageY - this.offset.click.top > d[3] && (c = d[3] + this.offset.click.top)), j.grid && (k = j.grid[1] ? this.originalPageY + Math.round((c - this.originalPageY) / j.grid[1]) * j.grid[1] : this.originalPageY, c = d ? k - this.offset.click.top >= d[1] || k - this.offset.click.top > d[3] ? k : k - this.offset.click.top >= d[1] ? k - j.grid[1] : k + j.grid[1] : k, f = j.grid[0] ? this.originalPageX + Math.round((e - this.originalPageX) / j.grid[0]) * j.grid[0] : this.originalPageX, e = d ? f - this.offset.click.left >= d[0] || f - this.offset.click.left > d[2] ? f : f - this.offset.click.left >= d[0] ? f - j.grid[0] : f + j.grid[0] : f)), {
                top: c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                left: e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function (d, c, b) {
            return b = b || this._uiHash(), a.ui.plugin.call(this, d, [c, b]), "drag" === d && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, d, c, b)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), a.ui.plugin.add("draggable", "connectToSortable", {
        start: function (f, c) {
            var b = a(this).data("ui-draggable"),
                e = b.options,
                d = a.extend({}, c, {
                    item: b.element
                });
            b.sortables = [], a(e.connectToSortable).each(function () {
                var g = a.data(this, "ui-sortable");
                g && !g.options.disabled && (b.sortables.push({
                    instance: g,
                    shouldRevert: g.options.revert
                }), g.refreshPositions(), g._trigger("activate", f, d))
            })
        },
        stop: function (e, c) {
            var b = a(this).data("ui-draggable"),
                d = a.extend({}, c, {
                    item: b.element
                });
            a.each(b.sortables, function () {
                this.instance.isOver ? (this.instance.isOver = 0, b.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" === b.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, d))
            })
        },
        drag: function (e, c) {
            var b = a(this).data("ui-draggable"),
                d = this;
            a.each(b.sortables, function () {
                var f = !1,
                    g = this;
                this.instance.positionAbs = b.positionAbs, this.instance.helperProportions = b.helperProportions, this.instance.offset.click = b.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (f = !0, a.each(b.sortables, function () {
                    return this.instance.positionAbs = b.positionAbs, this.instance.helperProportions = b.helperProportions, this.instance.offset.click = b.offset.click, this !== g && this.instance._intersectsWith(this.instance.containerCache) && a.contains(g.instance.element[0], this.instance.element[0]) && (f = !1), f
                })), f ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(d).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                    return c.helper[0]
                }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = b.offset.click.top, this.instance.offset.click.left = b.offset.click.left, this.instance.offset.parent.left -= b.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= b.offset.parent.top - this.instance.offset.parent.top, b._trigger("toSortable", e), b.dropped = this.instance.element, b.currentItem = b.element, this.instance.fromOutside = b), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), b._trigger("fromSortable", e), b.dropped = !1)
            })
        }
    }), a.ui.plugin.add("draggable", "cursor", {
        start: function () {
            var c = a("body"),
                b = a(this).data("ui-draggable").options;
            c.css("cursor") && (b._cursor = c.css("cursor")), c.css("cursor", b.cursor)
        },
        stop: function () {
            var b = a(this).data("ui-draggable").options;
            b._cursor && a("body").css("cursor", b._cursor)
        }
    }), a.ui.plugin.add("draggable", "opacity", {
        start: function (e, c) {
            var b = a(c.helper),
                d = a(this).data("ui-draggable").options;
            b.css("opacity") && (d._opacity = b.css("opacity")), b.css("opacity", d.opacity)
        },
        stop: function (d, c) {
            var b = a(this).data("ui-draggable").options;
            b._opacity && a(c.helper).css("opacity", b._opacity)
        }
    }), a.ui.plugin.add("draggable", "scroll", {
        start: function () {
            var b = a(this).data("ui-draggable");
            b.scrollParent[0] !== document && "HTML" !== b.scrollParent[0].tagName && (b.overflowOffset = b.scrollParent.offset())
        },
        drag: function (e) {
            var c = a(this).data("ui-draggable"),
                b = c.options,
                d = !1;
            c.scrollParent[0] !== document && "HTML" !== c.scrollParent[0].tagName ? (b.axis && "x" === b.axis || (c.overflowOffset.top + c.scrollParent[0].offsetHeight - e.pageY < b.scrollSensitivity ? c.scrollParent[0].scrollTop = d = c.scrollParent[0].scrollTop + b.scrollSpeed : e.pageY - c.overflowOffset.top < b.scrollSensitivity && (c.scrollParent[0].scrollTop = d = c.scrollParent[0].scrollTop - b.scrollSpeed)), b.axis && "y" === b.axis || (c.overflowOffset.left + c.scrollParent[0].offsetWidth - e.pageX < b.scrollSensitivity ? c.scrollParent[0].scrollLeft = d = c.scrollParent[0].scrollLeft + b.scrollSpeed : e.pageX - c.overflowOffset.left < b.scrollSensitivity && (c.scrollParent[0].scrollLeft = d = c.scrollParent[0].scrollLeft - b.scrollSpeed))) : (b.axis && "x" === b.axis || (e.pageY - a(document).scrollTop() < b.scrollSensitivity ? d = a(document).scrollTop(a(document).scrollTop() - b.scrollSpeed) : a(window).height() - (e.pageY - a(document).scrollTop()) < b.scrollSensitivity && (d = a(document).scrollTop(a(document).scrollTop() + b.scrollSpeed))), b.axis && "y" === b.axis || (e.pageX - a(document).scrollLeft() < b.scrollSensitivity ? d = a(document).scrollLeft(a(document).scrollLeft() - b.scrollSpeed) : a(window).width() - (e.pageX - a(document).scrollLeft()) < b.scrollSensitivity && (d = a(document).scrollLeft(a(document).scrollLeft() + b.scrollSpeed)))), d !== !1 && a.ui.ddmanager && !b.dropBehaviour && a.ui.ddmanager.prepareOffsets(c, e)
        }
    }), a.ui.plugin.add("draggable", "snap", {
        start: function () {
            var c = a(this).data("ui-draggable"),
                b = c.options;
            c.snapElements = [], a(b.snap.constructor !== String ? b.snap.items || ":data(ui-draggable)" : b.snap).each(function () {
                var e = a(this),
                    d = e.offset();
                this !== c.element[0] && c.snapElements.push({
                    item: this,
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: d.top,
                    left: d.left
                })
            })
        },
        drag: function (I, A) {
            var e, H, D, G, E, B, z, J, q, k, F = a(this).data("ui-draggable"),
                w = F.options,
                C = w.snapTolerance,
                x = A.offset.left,
                K = x + F.helperProportions.width,
                L = A.offset.top,
                j = L + F.helperProportions.height;
            for (q = F.snapElements.length - 1; q >= 0; q--) {
                E = F.snapElements[q].left, B = E + F.snapElements[q].width, z = F.snapElements[q].top, J = z + F.snapElements[q].height, E - C > K || x > B + C || z - C > j || L > J + C || !a.contains(F.snapElements[q].item.ownerDocument, F.snapElements[q].item) ? (F.snapElements[q].snapping && F.options.snap.release && F.options.snap.release.call(F.element, I, a.extend(F._uiHash(), {
                    snapItem: F.snapElements[q].item
                })), F.snapElements[q].snapping = !1) : ("inner" !== w.snapMode && (e = C >= Math.abs(z - j), H = C >= Math.abs(J - L), D = C >= Math.abs(E - K), G = C >= Math.abs(B - x), e && (A.position.top = F._convertPositionTo("relative", {
                    top: z - F.helperProportions.height,
                    left: 0
                }).top - F.margins.top), H && (A.position.top = F._convertPositionTo("relative", {
                    top: J,
                    left: 0
                }).top - F.margins.top), D && (A.position.left = F._convertPositionTo("relative", {
                    top: 0,
                    left: E - F.helperProportions.width
                }).left - F.margins.left), G && (A.position.left = F._convertPositionTo("relative", {
                    top: 0,
                    left: B
                }).left - F.margins.left)), k = e || H || D || G, "outer" !== w.snapMode && (e = C >= Math.abs(z - L), H = C >= Math.abs(J - j), D = C >= Math.abs(E - x), G = C >= Math.abs(B - K), e && (A.position.top = F._convertPositionTo("relative", {
                    top: z,
                    left: 0
                }).top - F.margins.top), H && (A.position.top = F._convertPositionTo("relative", {
                    top: J - F.helperProportions.height,
                    left: 0
                }).top - F.margins.top), D && (A.position.left = F._convertPositionTo("relative", {
                    top: 0,
                    left: E
                }).left - F.margins.left), G && (A.position.left = F._convertPositionTo("relative", {
                    top: 0,
                    left: B - F.helperProportions.width
                }).left - F.margins.left)), !F.snapElements[q].snapping && (e || H || D || G || k) && F.options.snap.snap && F.options.snap.snap.call(F.element, I, a.extend(F._uiHash(), {
                    snapItem: F.snapElements[q].item
                })), F.snapElements[q].snapping = e || H || D || G || k)
            }
        }
    }), a.ui.plugin.add("draggable", "stack", {
        start: function () {
            var d, c = this.data("ui-draggable").options,
                b = a.makeArray(a(c.stack)).sort(function (f, e) {
                    return (parseInt(a(f).css("zIndex"), 10) || 0) - (parseInt(a(e).css("zIndex"), 10) || 0)
                });
            b.length && (d = parseInt(a(b[0]).css("zIndex"), 10) || 0, a(b).each(function (e) {
                a(this).css("zIndex", d + e)
            }), this.css("zIndex", d + b.length))
        }
    }), a.ui.plugin.add("draggable", "zIndex", {
        start: function (e, c) {
            var b = a(c.helper),
                d = a(this).data("ui-draggable").options;
            b.css("zIndex") && (d._zIndex = b.css("zIndex")), b.css("zIndex", d.zIndex)
        },
        stop: function (d, c) {
            var b = a(this).data("ui-draggable").options;
            b._zIndex && a(c.helper).css("zIndex", b._zIndex)
        }
    })
})(jQuery);
(function (a) {
    function b(c, f, d) {
        return c > f && f + d > c
    }
    a.widget("ui.droppable", {
        version: "1.10.3",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function () {
            var d = this.options,
                c = d.accept;
            this.isover = !1, this.isout = !0, this.accept = a.isFunction(c) ? c : function (f) {
                return f.is(c)
            }, this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            }, a.ui.ddmanager.droppables[d.scope] = a.ui.ddmanager.droppables[d.scope] || [], a.ui.ddmanager.droppables[d.scope].push(this), d.addClasses && this.element.addClass("ui-droppable")
        },
        _destroy: function () {
            for (var d = 0, c = a.ui.ddmanager.droppables[this.options.scope]; c.length > d; d++) {
                c[d] === this && c.splice(d, 1)
            }
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function (d, c) {
            "accept" === d && (this.accept = a.isFunction(c) ? c : function (f) {
                return f.is(c)
            }), a.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function (d) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", d, this.ui(c))
        },
        _deactivate: function (d) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", d, this.ui(c))
        },
        _over: function (d) {
            var c = a.ui.ddmanager.current;
            c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", d, this.ui(c)))
        },
        _out: function (d) {
            var c = a.ui.ddmanager.current;
            c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", d, this.ui(c)))
        },
        _drop: function (f, d) {
            var c = d || a.ui.ddmanager.current,
                e = !1;
            return c && (c.currentItem || c.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
                var g = a.data(this, "ui-droppable");
                return g.options.greedy && !g.options.disabled && g.options.scope === c.options.scope && g.accept.call(g.element[0], c.currentItem || c.element) && a.ui.intersect(c, a.extend(g, {
                    offset: g.element.offset()
                }), g.options.tolerance) ? (e = !0, !1) : undefined
            }), e ? !1 : this.accept.call(this.element[0], c.currentItem || c.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", f, this.ui(c)), this.element) : !1) : !1
        },
        ui: function (c) {
            return {
                draggable: c.currentItem || c.element,
                helper: c.helper,
                position: c.position,
                offset: c.positionAbs
            }
        }
    }), a.ui.intersect = function (k, q, f) {
        if (!q.offset) {
            return !1
        }
        var z, v, y = (k.positionAbs || k.position.absolute).left,
            w = y + k.helperProportions.width,
            t = (k.positionAbs || k.position.absolute).top,
            m = t + k.helperProportions.height,
            A = q.offset.left,
            j = A + q.proportions.width,
            g = q.offset.top,
            x = g + q.proportions.height;
        switch (f) {
            case "fit":
                return y >= A && j >= w && t >= g && x >= m;
            case "intersect":
                return y + k.helperProportions.width / 2 > A && j > w - k.helperProportions.width / 2 && t + k.helperProportions.height / 2 > g && x > m - k.helperProportions.height / 2;
            case "pointer":
                return z = (k.positionAbs || k.position.absolute).left + (k.clickOffset || k.offset.click).left, v = (k.positionAbs || k.position.absolute).top + (k.clickOffset || k.offset.click).top, b(v, g, q.proportions.height) && b(z, A, q.proportions.width);
            case "touch":
                return (t >= g && x >= t || m >= g && x >= m || g > t && m > x) && (y >= A && j >= y || w >= A && j >= w || A > y && w > j);
            default:
                return !1
        }
    }, a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function (j, d) {
            var c, h, e = a.ui.ddmanager.droppables[j.options.scope] || [],
                g = d ? d.type : null,
                f = (j.currentItem || j.element).find(":data(ui-droppable)").addBack();
            a: for (c = 0; e.length > c; c++) {
                if (!(e[c].options.disabled || j && !e[c].accept.call(e[c].element[0], j.currentItem || j.element))) {
                    for (h = 0; f.length > h; h++) {
                        if (f[h] === e[c].element[0]) {
                            e[c].proportions.height = 0;
                            continue a
                        }
                    }
                    e[c].visible = "none" !== e[c].element.css("display"), e[c].visible && ("mousedown" === g && e[c]._activate.call(e[c], d), e[c].offset = e[c].element.offset(), e[c].proportions = {
                        width: e[c].element[0].offsetWidth,
                        height: e[c].element[0].offsetHeight
                    })
                }
            }
        },
        drop: function (e, d) {
            var c = !1;
            return a.each((a.ui.ddmanager.droppables[e.options.scope] || []).slice(), function () {
                this.options && (!this.options.disabled && this.visible && a.ui.intersect(e, this, this.options.tolerance) && (c = this._drop.call(this, d) || c), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, d)))
            }), c
        },
        dragStart: function (d, c) {
            d.element.parentsUntil("body").bind("scroll.droppable", function () {
                d.options.refreshPositions || a.ui.ddmanager.prepareOffsets(d, c)
            })
        },
        drag: function (d, c) {
            d.options.refreshPositions && a.ui.ddmanager.prepareOffsets(d, c), a.each(a.ui.ddmanager.droppables[d.options.scope] || [], function () {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var e, i, f, h = a.ui.intersect(d, this, this.options.tolerance),
                        g = !h && this.isover ? "isout" : h && !this.isover ? "isover" : null;
                    g && (this.options.greedy && (i = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function () {
                        return a.data(this, "ui-droppable").options.scope === i
                    }), f.length && (e = a.data(f[0], "ui-droppable"), e.greedyChild = "isover" === g)), e && "isover" === g && (e.isover = !1, e.isout = !0, e._out.call(e, c)), this[g] = !0, this["isout" === g ? "isover" : "isout"] = !1, this["isover" === g ? "_over" : "_out"].call(this, c), e && "isout" === g && (e.isout = !1, e.isover = !0, e._over.call(e, c)))
                }
            })
        },
        dragStop: function (d, c) {
            d.element.parentsUntil("body").unbind("scroll.droppable"), d.options.refreshPositions || a.ui.ddmanager.prepareOffsets(d, c)
        }
    }
})(jQuery);
(function (a) {
    function c(d) {
        return parseInt(d, 10) || 0
    }

    function b(d) {
        return !isNaN(parseInt(d, 10))
    }
    a.widget("ui.resizable", a.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function () {
            var k, e, j, d, f, h = this,
                g = this.options;
            if (this.element.addClass("ui-resizable"), a.extend(this, {
                    _aspectRatio: !!g.aspectRatio,
                    aspectRatio: g.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: g.helper || g.ghost || g.animate ? g.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({
                    margin: this.originalElement.css("margin")
                }), this._proportionallyResize()), this.handles = g.handles || (a(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this.handles.constructor === String) {
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), k = this.handles.split(","), this.handles = {}, e = 0; k.length > e; e++) {
                    j = a.trim(k[e]), f = "ui-resizable-" + j, d = a("<div class='ui-resizable-handle " + f + "'></div>"), d.css({
                        zIndex: g.zIndex
                    }), "se" === j && d.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[j] = ".ui-resizable-" + j, this.element.append(d)
                }
            }
            this._renderAxis = function (q) {
                var m, p, l, o;
                q = q || this.element;
                for (m in this.handles) {
                    this.handles[m].constructor === String && (this.handles[m] = a(this.handles[m], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (p = a(this.handles[m], this.element), o = /sw|ne|nw|se|n|s/.test(m) ? p.outerHeight() : p.outerWidth(), l = ["padding", /ne|nw|n/.test(m) ? "Top" : /se|sw|s/.test(m) ? "Bottom" : /^e$/.test(m) ? "Right" : "Left"].join(""), q.css(l, o), this._proportionallyResize()), a(this.handles[m]).length
                }
            }, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
                h.resizing || (this.className && (d = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), h.axis = d && d[1] ? d[1] : "se")
            }), g.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
                g.disabled || (a(this).removeClass("ui-resizable-autohide"), h._handles.show())
            }).mouseleave(function () {
                g.disabled || h.resizing || (a(this).addClass("ui-resizable-autohide"), h._handles.hide())
            })), this._mouseInit()
        },
        _destroy: function () {
            this._mouseDestroy();
            var e, d = function (f) {
                a(f).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (d(this.element), e = this.element, this.originalElement.css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left")
            }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), d(this.originalElement), this
        },
        _mouseCapture: function (g) {
            var e, f, d = !1;
            for (e in this.handles) {
                f = a(this.handles[e])[0], (f === g.target || a.contains(f, g.target)) && (d = !0)
            }
            return !this.options.disabled && d
        },
        _mouseStart: function (f) {
            var l, d, g, k = this.options,
                j = this.element.position(),
                e = this.element;
            return this.resizing = !0, /absolute/.test(e.css("position")) ? e.css({
                position: "absolute",
                top: e.css("top"),
                left: e.css("left")
            }) : e.is(".ui-draggable") && e.css({
                position: "absolute",
                top: j.top,
                left: j.left
            }), this._renderProxy(), l = c(this.helper.css("left")), d = c(this.helper.css("top")), k.containment && (l += a(k.containment).scrollLeft() || 0, d += a(k.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: l,
                top: d
            }, this.size = this._helper ? {
                width: e.outerWidth(),
                height: e.outerHeight()
            } : {
                width: e.width(),
                height: e.height()
            }, this.originalSize = this._helper ? {
                width: e.outerWidth(),
                height: e.outerHeight()
            } : {
                width: e.width(),
                height: e.height()
            }, this.originalPosition = {
                left: l,
                top: d
            }, this.sizeDiff = {
                width: e.outerWidth() - e.width(),
                height: e.outerHeight() - e.height()
            }, this.originalMousePosition = {
                left: f.pageX,
                top: f.pageY
            }, this.aspectRatio = "number" == typeof k.aspectRatio ? k.aspectRatio : this.originalSize.width / this.originalSize.height || 1, g = a(".ui-resizable-" + this.axis).css("cursor"), a("body").css("cursor", "auto" === g ? this.axis + "-resize" : g), e.addClass("ui-resizable-resizing"), this._propagate("start", f), !0
        },
        _mouseDrag: function (z) {
            var k, y = this.helper,
                e = {},
                q = this.originalMousePosition,
                x = this.axis,
                v = this.position.top,
                j = this.position.left,
                m = this.size.width,
                A = this.size.height,
                f = z.pageX - q.left || 0,
                g = z.pageY - q.top || 0,
                w = this._change[x];
            return w ? (k = w.apply(this, [z, f, g]), this._updateVirtualBoundaries(z.shiftKey), (this._aspectRatio || z.shiftKey) && (k = this._updateRatio(k, z)), k = this._respectSize(k, z), this._updateCache(k), this._propagate("resize", z), this.position.top !== v && (e.top = this.position.top + "px"), this.position.left !== j && (e.left = this.position.left + "px"), this.size.width !== m && (e.width = this.size.width + "px"), this.size.height !== A && (e.height = this.size.height + "px"), y.css(e), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), a.isEmptyObject(e) || this._trigger("resize", z, this.ui()), !1) : !1
        },
        _mouseStop: function (q) {
            this.resizing = !1;
            var f, p, d, j, m, k, e, g = this.options,
                v = this;
            return this._helper && (f = this._proportionallyResizeElements, p = f.length && /textarea/i.test(f[0].nodeName), d = p && a.ui.hasScroll(f[0], "left") ? 0 : v.sizeDiff.height, j = p ? 0 : v.sizeDiff.width, m = {
                width: v.helper.width() - j,
                height: v.helper.height() - d
            }, k = parseInt(v.element.css("left"), 10) + (v.position.left - v.originalPosition.left) || null, e = parseInt(v.element.css("top"), 10) + (v.position.top - v.originalPosition.top) || null, g.animate || this.element.css(a.extend(m, {
                top: e,
                left: k
            })), v.helper.height(v.size.height), v.helper.width(v.size.width), this._helper && !g.animate && this._proportionallyResize()), a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", q), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function (f) {
            var k, j, d, g, i, h = this.options;
            i = {
                minWidth: b(h.minWidth) ? h.minWidth : 0,
                maxWidth: b(h.maxWidth) ? h.maxWidth : 1 / 0,
                minHeight: b(h.minHeight) ? h.minHeight : 0,
                maxHeight: b(h.maxHeight) ? h.maxHeight : 1 / 0
            }, (this._aspectRatio || f) && (k = i.minHeight * this.aspectRatio, d = i.minWidth / this.aspectRatio, j = i.maxHeight * this.aspectRatio, g = i.maxWidth / this.aspectRatio, k > i.minWidth && (i.minWidth = k), d > i.minHeight && (i.minHeight = d), i.maxWidth > j && (i.maxWidth = j), i.maxHeight > g && (i.maxHeight = g)), this._vBoundaries = i
        },
        _updateCache: function (d) {
            this.offset = this.helper.offset(), b(d.left) && (this.position.left = d.left), b(d.top) && (this.position.top = d.top), b(d.height) && (this.size.height = d.height), b(d.width) && (this.size.width = d.width)
        },
        _updateRatio: function (f) {
            var h = this.position,
                g = this.size,
                d = this.axis;
            return b(f.height) ? f.width = f.height * this.aspectRatio : b(f.width) && (f.height = f.width / this.aspectRatio), "sw" === d && (f.left = h.left + (g.width - f.width), f.top = null), "nw" === d && (f.top = h.top + (g.height - f.height), f.left = h.left + (g.width - f.width)), f
        },
        _respectSize: function (g) {
            var v = this._vBoundaries,
                q = this.axis,
                d = b(g.width) && v.maxWidth && v.maxWidth < g.width,
                k = b(g.height) && v.maxHeight && v.maxHeight < g.height,
                p = b(g.width) && v.minWidth && v.minWidth > g.width,
                m = b(g.height) && v.minHeight && v.minHeight > g.height,
                i = this.originalPosition.left + this.originalSize.width,
                j = this.position.top + this.size.height,
                w = /sw|nw|w/.test(q),
                f = /nw|ne|n/.test(q);
            return p && (g.width = v.minWidth), m && (g.height = v.minHeight), d && (g.width = v.maxWidth), k && (g.height = v.maxHeight), p && w && (g.left = i - v.minWidth), d && w && (g.left = i - v.maxWidth), m && f && (g.top = j - v.minHeight), k && f && (g.top = j - v.maxHeight), g.width || g.height || g.left || !g.top ? g.width || g.height || g.top || !g.left || (g.left = null) : g.top = null, g
        },
        _proportionallyResize: function () {
            if (this._proportionallyResizeElements.length) {
                var f, k, g, j, d, h = this.helper || this.element;
                for (f = 0; this._proportionallyResizeElements.length > f; f++) {
                    if (d = this._proportionallyResizeElements[f], !this.borderDif) {
                        for (this.borderDif = [], g = [d.css("borderTopWidth"), d.css("borderRightWidth"), d.css("borderBottomWidth"), d.css("borderLeftWidth")], j = [d.css("paddingTop"), d.css("paddingRight"), d.css("paddingBottom"), d.css("paddingLeft")], k = 0; g.length > k; k++) {
                            this.borderDif[k] = (parseInt(g[k], 10) || 0) + (parseInt(j[k], 10) || 0)
                        }
                    }
                    d.css({
                        height: h.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: h.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
            }
        },
        _renderProxy: function () {
            var e = this.element,
                d = this.options;
            this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || a("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++d.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function (d, f) {
                return {
                    width: this.originalSize.width + f
                }
            },
            w: function (d, h) {
                var f = this.originalSize,
                    g = this.originalPosition;
                return {
                    left: g.left + h,
                    width: f.width - h
                }
            },
            n: function (f, j, g) {
                var h = this.originalSize,
                    d = this.originalPosition;
                return {
                    top: d.top + g,
                    height: h.height - g
                }
            },
            s: function (d, g, f) {
                return {
                    height: this.originalSize.height + f
                }
            },
            se: function (f, d, e) {
                return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [f, d, e]))
            },
            sw: function (f, d, e) {
                return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [f, d, e]))
            },
            ne: function (f, d, e) {
                return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [f, d, e]))
            },
            nw: function (f, d, e) {
                return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [f, d, e]))
            }
        },
        _propagate: function (e, d) {
            a.ui.plugin.call(this, e, [d, this.ui()]), "resize" !== e && this._trigger(e, d, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), a.ui.plugin.add("resizable", "animate", {
        stop: function (q) {
            var f = a(this).data("ui-resizable"),
                p = f.options,
                d = f._proportionallyResizeElements,
                j = d.length && /textarea/i.test(d[0].nodeName),
                m = j && a.ui.hasScroll(d[0], "left") ? 0 : f.sizeDiff.height,
                k = j ? 0 : f.sizeDiff.width,
                e = {
                    width: f.size.width - k,
                    height: f.size.height - m
                },
                g = parseInt(f.element.css("left"), 10) + (f.position.left - f.originalPosition.left) || null,
                v = parseInt(f.element.css("top"), 10) + (f.position.top - f.originalPosition.top) || null;
            f.element.animate(a.extend(e, v && g ? {
                top: v,
                left: g
            } : {}), {
                duration: p.animateDuration,
                easing: p.animateEasing,
                step: function () {
                    var h = {
                        width: parseInt(f.element.css("width"), 10),
                        height: parseInt(f.element.css("height"), 10),
                        top: parseInt(f.element.css("top"), 10),
                        left: parseInt(f.element.css("left"), 10)
                    };
                    d && d.length && a(d[0]).css({
                        width: h.width,
                        height: h.height
                    }), f._updateCache(h), f._propagate("resize", q)
                }
            })
        }
    }), a.ui.plugin.add("resizable", "containment", {
        start: function () {
            var k, x, e, q, w, t, j, m = a(this).data("ui-resizable"),
                y = m.options,
                f = m.element,
                g = y.containment,
                v = g instanceof a ? g.get(0) : /parent/.test(g) ? f.parent().get(0) : g;
            v && (m.containerElement = a(v), /document/.test(g) || g === document ? (m.containerOffset = {
                left: 0,
                top: 0
            }, m.containerPosition = {
                left: 0,
                top: 0
            }, m.parentData = {
                element: a(document),
                left: 0,
                top: 0,
                width: a(document).width(),
                height: a(document).height() || document.body.parentNode.scrollHeight
            }) : (k = a(v), x = [], a(["Top", "Right", "Left", "Bottom"]).each(function (h, d) {
                x[h] = c(k.css("padding" + d))
            }), m.containerOffset = k.offset(), m.containerPosition = k.position(), m.containerSize = {
                height: k.innerHeight() - x[3],
                width: k.innerWidth() - x[1]
            }, e = m.containerOffset, q = m.containerSize.height, w = m.containerSize.width, t = a.ui.hasScroll(v, "left") ? v.scrollWidth : w, j = a.ui.hasScroll(v) ? v.scrollHeight : q, m.parentData = {
                element: v,
                left: e.left,
                top: e.top,
                width: t,
                height: j
            }))
        },
        resize: function (x) {
            var k, w, e, p, v = a(this).data("ui-resizable"),
                q = v.options,
                j = v.containerOffset,
                m = v.position,
                y = v._aspectRatio || x.shiftKey,
                f = {
                    top: 0,
                    left: 0
                },
                g = v.containerElement;
            g[0] !== document && /static/.test(g.css("position")) && (f = j), m.left < (v._helper ? j.left : 0) && (v.size.width = v.size.width + (v._helper ? v.position.left - j.left : v.position.left - f.left), y && (v.size.height = v.size.width / v.aspectRatio), v.position.left = q.helper ? j.left : 0), m.top < (v._helper ? j.top : 0) && (v.size.height = v.size.height + (v._helper ? v.position.top - j.top : v.position.top), y && (v.size.width = v.size.height * v.aspectRatio), v.position.top = v._helper ? j.top : 0), v.offset.left = v.parentData.left + v.position.left, v.offset.top = v.parentData.top + v.position.top, k = Math.abs((v._helper ? v.offset.left - f.left : v.offset.left - f.left) + v.sizeDiff.width), w = Math.abs((v._helper ? v.offset.top - f.top : v.offset.top - j.top) + v.sizeDiff.height), e = v.containerElement.get(0) === v.element.parent().get(0), p = /relative|absolute/.test(v.containerElement.css("position")), e && p && (k -= v.parentData.left), k + v.size.width >= v.parentData.width && (v.size.width = v.parentData.width - k, y && (v.size.height = v.size.width / v.aspectRatio)), w + v.size.height >= v.parentData.height && (v.size.height = v.parentData.height - w, y && (v.size.width = v.size.height * v.aspectRatio))
        },
        stop: function () {
            var q = a(this).data("ui-resizable"),
                f = q.options,
                p = q.containerOffset,
                d = q.containerPosition,
                j = q.containerElement,
                m = a(q.helper),
                k = m.offset(),
                e = m.outerWidth() - q.sizeDiff.width,
                g = m.outerHeight() - q.sizeDiff.height;
            q._helper && !f.animate && /relative/.test(j.css("position")) && a(this).css({
                left: k.left - d.left - p.left,
                width: e,
                height: g
            }), q._helper && !f.animate && /static/.test(j.css("position")) && a(this).css({
                left: k.left - d.left - p.left,
                width: e,
                height: g
            })
        }
    }), a.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var f = a(this).data("ui-resizable"),
                d = f.options,
                e = function (g) {
                    a(g).each(function () {
                        var h = a(this);
                        h.data("ui-resizable-alsoresize", {
                            width: parseInt(h.width(), 10),
                            height: parseInt(h.height(), 10),
                            left: parseInt(h.css("left"), 10),
                            top: parseInt(h.css("top"), 10)
                        })
                    })
                };
            "object" != typeof d.alsoResize || d.alsoResize.parentNode ? e(d.alsoResize) : d.alsoResize.length ? (d.alsoResize = d.alsoResize[0], e(d.alsoResize)) : a.each(d.alsoResize, function (g) {
                e(g)
            })
        },
        resize: function (m, f) {
            var l = a(this).data("ui-resizable"),
                d = l.options,
                g = l.originalSize,
                k = l.originalPosition,
                j = {
                    height: l.size.height - g.height || 0,
                    width: l.size.width - g.width || 0,
                    top: l.position.top - k.top || 0,
                    left: l.position.left - k.left || 0
                },
                e = function (i, h) {
                    a(i).each(function () {
                        var s = a(this),
                            o = a(this).data("ui-resizable-alsoresize"),
                            p = {},
                            q = h && h.length ? h : s.parents(f.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        a.each(q, function (n, u) {
                            var r = (o[u] || 0) + (j[u] || 0);
                            r && r >= 0 && (p[u] = r || null)
                        }), s.css(p)
                    })
                };
            "object" != typeof d.alsoResize || d.alsoResize.nodeType ? e(d.alsoResize) : a.each(d.alsoResize, function (h, i) {
                e(h, i)
            })
        },
        stop: function () {
            a(this).removeData("resizable-alsoresize")
        }
    }), a.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var f = a(this).data("ui-resizable"),
                d = f.options,
                e = f.size;
            f.ghost = f.originalElement.clone(), f.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: e.height,
                width: e.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof d.ghost ? d.ghost : ""), f.ghost.appendTo(f.helper)
        },
        resize: function () {
            var d = a(this).data("ui-resizable");
            d.ghost && d.ghost.css({
                position: "relative",
                height: d.size.height,
                width: d.size.width
            })
        },
        stop: function () {
            var d = a(this).data("ui-resizable");
            d.ghost && d.helper && d.helper.get(0).removeChild(d.ghost.get(0))
        }
    }), a.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var G = a(this).data("ui-resizable"),
                y = G.options,
                F = G.size,
                e = G.originalSize,
                B = G.originalPosition,
                E = G.axis,
                C = "number" == typeof y.grid ? [y.grid, y.grid] : y.grid,
                x = C[0] || 1,
                z = C[1] || 1,
                H = Math.round((F.width - e.width) / x) * x,
                j = Math.round((F.height - e.height) / z) * z,
                k = e.width + H,
                D = e.height + j,
                q = y.maxWidth && k > y.maxWidth,
                A = y.maxHeight && D > y.maxHeight,
                w = y.minWidth && y.minWidth > k,
                I = y.minHeight && y.minHeight > D;
            y.grid = C, w && (k += x), I && (D += z), q && (k -= x), A && (D -= z), /^(se|s|e)$/.test(E) ? (G.size.width = k, G.size.height = D) : /^(ne)$/.test(E) ? (G.size.width = k, G.size.height = D, G.position.top = B.top - j) : /^(sw)$/.test(E) ? (G.size.width = k, G.size.height = D, G.position.left = B.left - H) : (G.size.width = k, G.size.height = D, G.position.top = B.top - j, G.position.left = B.left - H)
        }
    })
})(jQuery);
(function (a) {
    a.widget("ui.selectable", a.ui.mouse, {
        version: "1.10.3",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function () {
            var c, b = this;
            this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
                c = a(b.options.filter, b.element[0]), c.addClass("ui-selectee"), c.each(function () {
                    var e = a(this),
                        d = e.offset();
                    a.data(this, "selectable-item", {
                        element: this,
                        $element: e,
                        left: d.left,
                        top: d.top,
                        right: d.left + e.outerWidth(),
                        bottom: d.top + e.outerHeight(),
                        startselected: !1,
                        selected: e.hasClass("ui-selected"),
                        selecting: e.hasClass("ui-selecting"),
                        unselecting: e.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = c.addClass("ui-selectee"), this._mouseInit(), this.helper = a("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
        },
        _mouseStart: function (d) {
            var b = this,
                c = this.options;
            this.opos = [d.pageX, d.pageY], this.options.disabled || (this.selectees = a(c.filter, this.element[0]), this._trigger("start", d), a(c.appendTo).append(this.helper), this.helper.css({
                left: d.pageX,
                top: d.pageY,
                width: 0,
                height: 0
            }), c.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
                var e = a.data(this, "selectable-item");
                e.startselected = !0, d.metaKey || d.ctrlKey || (e.$element.removeClass("ui-selected"), e.selected = !1, e.$element.addClass("ui-unselecting"), e.unselecting = !0, b._trigger("unselecting", d, {
                    unselecting: e.element
                }))
            }), a(d.target).parents().addBack().each(function () {
                var f, e = a.data(this, "selectable-item");
                return e ? (f = !d.metaKey && !d.ctrlKey || !e.$element.hasClass("ui-selected"), e.$element.removeClass(f ? "ui-unselecting" : "ui-selected").addClass(f ? "ui-selecting" : "ui-unselecting"), e.unselecting = !f, e.selecting = f, e.selected = f, f ? b._trigger("selecting", d, {
                    selecting: e.element
                }) : b._trigger("unselecting", d, {
                    unselecting: e.element
                }), !1) : undefined
            }))
        },
        _mouseDrag: function (k) {
            if (this.dragged = !0, !this.options.disabled) {
                var d, j = this,
                    b = this.options,
                    e = this.opos[0],
                    g = this.opos[1],
                    f = k.pageX,
                    c = k.pageY;
                return e > f && (d = f, f = e, e = d), g > c && (d = c, c = g, g = d), this.helper.css({
                    left: e,
                    top: g,
                    width: f - e,
                    height: c - g
                }), this.selectees.each(function () {
                    var h = a.data(this, "selectable-item"),
                        m = !1;
                    h && h.element !== j.element[0] && ("touch" === b.tolerance ? m = !(h.left > f || e > h.right || h.top > c || g > h.bottom) : "fit" === b.tolerance && (m = h.left > e && f > h.right && h.top > g && c > h.bottom), m ? (h.selected && (h.$element.removeClass("ui-selected"), h.selected = !1), h.unselecting && (h.$element.removeClass("ui-unselecting"), h.unselecting = !1), h.selecting || (h.$element.addClass("ui-selecting"), h.selecting = !0, j._trigger("selecting", k, {
                        selecting: h.element
                    }))) : (h.selecting && ((k.metaKey || k.ctrlKey) && h.startselected ? (h.$element.removeClass("ui-selecting"), h.selecting = !1, h.$element.addClass("ui-selected"), h.selected = !0) : (h.$element.removeClass("ui-selecting"), h.selecting = !1, h.startselected && (h.$element.addClass("ui-unselecting"), h.unselecting = !0), j._trigger("unselecting", k, {
                        unselecting: h.element
                    }))), h.selected && (k.metaKey || k.ctrlKey || h.startselected || (h.$element.removeClass("ui-selected"), h.selected = !1, h.$element.addClass("ui-unselecting"), h.unselecting = !0, j._trigger("unselecting", k, {
                        unselecting: h.element
                    })))))
                }), !1
            }
        },
        _mouseStop: function (c) {
            var b = this;
            return this.dragged = !1, a(".ui-unselecting", this.element[0]).each(function () {
                var d = a.data(this, "selectable-item");
                d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, b._trigger("unselected", c, {
                    unselected: d.element
                })
            }), a(".ui-selecting", this.element[0]).each(function () {
                var d = a.data(this, "selectable-item");
                d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, b._trigger("selected", c, {
                    selected: d.element
                })
            }), this._trigger("stop", c), this.helper.remove(), !1
        }
    })
})(jQuery);
(function (a) {
    function c(d, g, f) {
        return d > g && g + f > d
    }

    function b(d) {
        return /left|right/.test(d.css("float")) || /inline|table-cell/.test(d.css("display"))
    }
    a.widget("ui.sortable", a.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function () {
            var d = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === d.axis || b(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        },
        _destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var d = this.items.length - 1; d >= 0; d--) {
                this.items[d].item.removeData(this.widgetName + "-item")
            }
            return this
        },
        _setOption: function (e, d) {
            "disabled" === e ? (this.options[e] = d, this.widget().toggleClass("ui-sortable-disabled", !!d)) : a.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function (h, e) {
            var g = null,
                d = !1,
                f = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(h), a(h.target).parents().each(function () {
                return a.data(this, f.widgetName + "-item") === f ? (g = a(this), !1) : undefined
            }), a.data(h.target, f.widgetName + "-item") === f && (g = a(h.target)), g ? !this.options.handle || e || (a(this.options.handle, g).find("*").addBack().each(function () {
                this === h.target && (d = !0)
            }), d) ? (this.currentItem = g, this._removeCurrentsFromItems(), !0) : !1 : !1)
        },
        _mouseStart: function (j, e, h) {
            var d, f, g = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(j), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, a.extend(this.offset, {
                    click: {
                        left: j.pageX - this.offset.left,
                        top: j.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(j), this.originalPageX = j.pageX, this.originalPageY = j.pageY, g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), g.containment && this._setContainment(), g.cursor && "auto" !== g.cursor && (f = this.document.find("body"), this.storedCursor = f.css("cursor"), f.css("cursor", g.cursor), this.storedStylesheet = a("<style>*{ cursor: " + g.cursor + " !important; }</style>").appendTo(f)), g.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", g.opacity)), g.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", g.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", j, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !h) {
                for (d = this.containers.length - 1; d >= 0; d--) {
                    this.containers[d]._trigger("activate", j, this._uiHash(this))
                }
            }
            return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, j), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(j), !0
        },
        _mouseDrag: function (k) {
            var e, j, d, f, h = this.options,
                g = !1;
            for (this.position = this._generatePosition(k), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - k.pageY < h.scrollSensitivity ? this.scrollParent[0].scrollTop = g = this.scrollParent[0].scrollTop + h.scrollSpeed : k.pageY - this.overflowOffset.top < h.scrollSensitivity && (this.scrollParent[0].scrollTop = g = this.scrollParent[0].scrollTop - h.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - k.pageX < h.scrollSensitivity ? this.scrollParent[0].scrollLeft = g = this.scrollParent[0].scrollLeft + h.scrollSpeed : k.pageX - this.overflowOffset.left < h.scrollSensitivity && (this.scrollParent[0].scrollLeft = g = this.scrollParent[0].scrollLeft - h.scrollSpeed)) : (k.pageY - a(document).scrollTop() < h.scrollSensitivity ? g = a(document).scrollTop(a(document).scrollTop() - h.scrollSpeed) : a(window).height() - (k.pageY - a(document).scrollTop()) < h.scrollSensitivity && (g = a(document).scrollTop(a(document).scrollTop() + h.scrollSpeed)), k.pageX - a(document).scrollLeft() < h.scrollSensitivity ? g = a(document).scrollLeft(a(document).scrollLeft() - h.scrollSpeed) : a(window).width() - (k.pageX - a(document).scrollLeft()) < h.scrollSensitivity && (g = a(document).scrollLeft(a(document).scrollLeft() + h.scrollSpeed))), g !== !1 && a.ui.ddmanager && !h.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, k)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), e = this.items.length - 1; e >= 0; e--) {
                if (j = this.items[e], d = j.item[0], f = this._intersectsWithPointer(j), f && j.instance === this.currentContainer && d !== this.currentItem[0] && this.placeholder[1 === f ? "next" : "prev"]()[0] !== d && !a.contains(this.placeholder[0], d) && ("semi-dynamic" === this.options.type ? !a.contains(this.element[0], d) : !0)) {
                    if (this.direction = 1 === f ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(j)) {
                        break
                    }
                    this._rearrange(k, j), this._trigger("change", k, this._uiHash());
                    break
                }
            }
            return this._contactContainers(k), a.ui.ddmanager && a.ui.ddmanager.drag(this, k), this._trigger("sort", k, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function (j, e) {
            if (j) {
                if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, j), this.options.revert) {
                    var h = this,
                        d = this.placeholder.offset(),
                        f = this.options.axis,
                        g = {};
                    f && "x" !== f || (g.left = d.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), f && "y" !== f || (g.top = d.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, a(this.helper).animate(g, parseInt(this.options.revert, 10) || 500, function () {
                        h._clear(j)
                    })
                } else {
                    this._clear(j, e)
                }
                return !1
            }
        },
        cancel: function () {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    this.containers[d]._trigger("deactivate", null, this._uiHash(this)), this.containers[d].containerCache.over && (this.containers[d]._trigger("out", null, this._uiHash(this)), this.containers[d].containerCache.over = 0)
                }
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function (f) {
            var d = this._getItemsAsjQuery(f && f.connected),
                e = [];
            return f = f || {}, a(d).each(function () {
                var g = (a(f.item || this).attr(f.attribute || "id") || "").match(f.expression || /(.+)[\-=_](.+)/);
                g && e.push((f.key || g[1] + "[]") + "=" + (f.key && f.expression ? g[1] : g[2]))
            }), !e.length && f.key && e.push(f.key + "="), e.join("&")
        },
        toArray: function (f) {
            var d = this._getItemsAsjQuery(f && f.connected),
                e = [];
            return f = f || {}, d.each(function () {
                e.push(a(f.item || this).attr(f.attribute || "id") || "")
            }), e
        },
        _intersectsWith: function (k) {
            var B = this.positionAbs.left,
                q = B + this.helperProportions.width,
                A = this.positionAbs.top,
                f = A + this.helperProportions.height,
                w = k.left,
                z = w + k.width,
                x = k.top,
                m = x + k.height,
                v = this.offset.click.top,
                C = this.offset.click.left,
                g = "x" === this.options.axis || A + v > x && m > A + v,
                j = "y" === this.options.axis || B + C > w && z > B + C,
                y = g && j;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > k[this.floating ? "width" : "height"] ? y : B + this.helperProportions.width / 2 > w && z > q - this.helperProportions.width / 2 && A + this.helperProportions.height / 2 > x && m > f - this.helperProportions.height / 2
        },
        _intersectsWithPointer: function (f) {
            var g = "x" === this.options.axis || c(this.positionAbs.top + this.offset.click.top, f.top, f.height),
                k = "y" === this.options.axis || c(this.positionAbs.left + this.offset.click.left, f.left, f.width),
                d = g && k,
                h = this._getDragVerticalDirection(),
                j = this._getDragHorizontalDirection();
            return d ? this.floating ? j && "right" === j || "down" === h ? 2 : 1 : h && ("down" === h ? 2 : 1) : !1
        },
        _intersectsWithSides: function (f) {
            var g = c(this.positionAbs.top + this.offset.click.top, f.top + f.height / 2, f.height),
                j = c(this.positionAbs.left + this.offset.click.left, f.left + f.width / 2, f.width),
                d = this._getDragVerticalDirection(),
                h = this._getDragHorizontalDirection();
            return this.floating && h ? "right" === h && j || "left" === h && !j : d && ("down" === d && g || "up" === d && !g)
        },
        _getDragVerticalDirection: function () {
            var d = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== d && (d > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var d = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== d && (d > 0 ? "right" : "left")
        },
        refresh: function (d) {
            return this._refreshItems(d), this.refreshPositions(), this
        },
        _connectWith: function () {
            var d = this.options;
            return d.connectWith.constructor === String ? [d.connectWith] : d.connectWith
        },
        _getItemsAsjQuery: function (m) {
            var f, l, d, g, k = [],
                j = [],
                e = this._connectWith();
            if (e && m) {
                for (f = e.length - 1; f >= 0; f--) {
                    for (d = a(e[f]), l = d.length - 1; l >= 0; l--) {
                        g = a.data(d[l], this.widgetFullName), g && g !== this && !g.options.disabled && j.push([a.isFunction(g.options.items) ? g.options.items.call(g.element) : a(g.options.items, g.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), g])
                    }
                }
            }
            for (j.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), f = j.length - 1; f >= 0; f--) {
                j[f][0].each(function () {
                    k.push(this)
                })
            }
            return a(k)
        },
        _removeCurrentsFromItems: function () {
            var d = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = a.grep(this.items, function (f) {
                for (var g = 0; d.length > g; g++) {
                    if (d[g] === f.item[0]) {
                        return !1
                    }
                }
                return !0
            })
        },
        _refreshItems: function (x) {
            this.items = [], this.containers = [this];
            var k, w, e, p, v, q, j, m, y = this.items,
                f = [
                    [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], x, {
                        item: this.currentItem
                    }) : a(this.options.items, this.element), this]
                ],
                g = this._connectWith();
            if (g && this.ready) {
                for (k = g.length - 1; k >= 0; k--) {
                    for (e = a(g[k]), w = e.length - 1; w >= 0; w--) {
                        p = a.data(e[w], this.widgetFullName), p && p !== this && !p.options.disabled && (f.push([a.isFunction(p.options.items) ? p.options.items.call(p.element[0], x, {
                            item: this.currentItem
                        }) : a(p.options.items, p.element), p]), this.containers.push(p))
                    }
                }
            }
            for (k = f.length - 1; k >= 0; k--) {
                for (v = f[k][1], q = f[k][0], w = 0, m = q.length; m > w; w++) {
                    j = a(q[w]), j.data(this.widgetName + "-item", v), y.push({
                        item: j,
                        instance: v,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function (h) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var e, g, d, f;
            for (e = this.items.length - 1; e >= 0; e--) {
                g = this.items[e], g.instance !== this.currentContainer && this.currentContainer && g.item[0] !== this.currentItem[0] || (d = this.options.toleranceElement ? a(this.options.toleranceElement, g.item) : g.item, h || (g.width = d.outerWidth(), g.height = d.outerHeight()), f = d.offset(), g.left = f.left, g.top = f.top)
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (e = this.containers.length - 1; e >= 0; e--) {
                    f = this.containers[e].element.offset(), this.containers[e].containerCache.left = f.left, this.containers[e].containerCache.top = f.top, this.containers[e].containerCache.width = this.containers[e].element.outerWidth(), this.containers[e].containerCache.height = this.containers[e].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function (f) {
            f = f || this;
            var d, e = f.options;
            e.placeholder && e.placeholder.constructor !== String || (d = e.placeholder, e.placeholder = {
                element: function () {
                    var h = f.currentItem[0].nodeName.toLowerCase(),
                        g = a("<" + h + ">", f.document[0]).addClass(d || f.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tr" === h ? f.currentItem.children().each(function () {
                        a("<td>&#160;</td>", f.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(g)
                    }) : "img" === h && g.attr("src", f.currentItem.attr("src")), d || g.css("visibility", "hidden"), g
                },
                update: function (h, g) {
                    (!d || e.forcePlaceholderSize) && (g.height() || g.height(f.currentItem.innerHeight() - parseInt(f.currentItem.css("paddingTop") || 0, 10) - parseInt(f.currentItem.css("paddingBottom") || 0, 10)), g.width() || g.width(f.currentItem.innerWidth() - parseInt(f.currentItem.css("paddingLeft") || 0, 10) - parseInt(f.currentItem.css("paddingRight") || 0, 10)))
                }
            }), f.placeholder = a(e.placeholder.element.call(f.element, f.currentItem)), f.currentItem.after(f.placeholder), e.placeholder.update(f, f.placeholder)
        },
        _contactContainers: function (z) {
            var e, v, y, w, k, q, A, g, i, x, j = null,
                t = null;
            for (e = this.containers.length - 1; e >= 0; e--) {
                if (!a.contains(this.currentItem[0], this.containers[e].element[0])) {
                    if (this._intersectsWith(this.containers[e].containerCache)) {
                        if (j && a.contains(this.containers[e].element[0], j.element[0])) {
                            continue
                        }
                        j = this.containers[e], t = e
                    } else {
                        this.containers[e].containerCache.over && (this.containers[e]._trigger("out", z, this._uiHash(this)), this.containers[e].containerCache.over = 0)
                    }
                }
            }
            if (j) {
                if (1 === this.containers.length) {
                    this.containers[t].containerCache.over || (this.containers[t]._trigger("over", z, this._uiHash(this)), this.containers[t].containerCache.over = 1)
                } else {
                    for (y = 10000, w = null, x = j.floating || b(this.currentItem), k = x ? "left" : "top", q = x ? "width" : "height", A = this.positionAbs[k] + this.offset.click[k], v = this.items.length - 1; v >= 0; v--) {
                        a.contains(this.containers[t].element[0], this.items[v].item[0]) && this.items[v].item[0] !== this.currentItem[0] && (!x || c(this.positionAbs.top + this.offset.click.top, this.items[v].top, this.items[v].height)) && (g = this.items[v].item.offset()[k], i = !1, Math.abs(g - A) > Math.abs(g + this.items[v][q] - A) && (i = !0, g += this.items[v][q]), y > Math.abs(g - A) && (y = Math.abs(g - A), w = this.items[v], this.direction = i ? "up" : "down"))
                    }
                    if (!w && !this.options.dropOnEmpty) {
                        return
                    }
                    if (this.currentContainer === this.containers[t]) {
                        return
                    }
                    w ? this._rearrange(z, w, null, !0) : this._rearrange(z, null, this.containers[t].element, !0), this._trigger("change", z, this._uiHash()), this.containers[t]._trigger("change", z, this._uiHash(this)), this.currentContainer = this.containers[t], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[t]._trigger("over", z, this._uiHash(this)), this.containers[t].containerCache.over = 1
                }
            }
        },
        _createHelper: function (f) {
            var d = this.options,
                e = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [f, this.currentItem])) : "clone" === d.helper ? this.currentItem.clone() : this.currentItem;
            return e.parents("body").length || a("parent" !== d.appendTo ? d.appendTo : this.currentItem[0].parentNode)[0].appendChild(e[0]), e[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!e[0].style.width || d.forceHelperSize) && e.width(this.currentItem.width()), (!e[0].style.height || d.forceHelperSize) && e.height(this.currentItem.height()), e
        },
        _adjustOffsetFromHelper: function (d) {
            "string" == typeof d && (d = d.split(" ")), a.isArray(d) && (d = {
                left: +d[0],
                top: +d[1] || 0
            }), "left" in d && (this.offset.click.left = d.left + this.margins.left), "right" in d && (this.offset.click.left = this.helperProportions.width - d.right + this.margins.left), "top" in d && (this.offset.click.top = d.top + this.margins.top), "bottom" in d && (this.offset.click.top = this.helperProportions.height - d.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var d = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (d.left += this.scrollParent.scrollLeft(), d.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (d = {
                top: 0,
                left: 0
            }), {
                top: d.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: d.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" === this.cssPosition) {
                var d = this.currentItem.position();
                return {
                    top: d.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: d.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var g, e, f, d = this.options;
            "parent" === d.containment && (d.containment = this.helper[0].parentNode), ("document" === d.containment || "window" === d.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a("document" === d.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (a("document" === d.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(d.containment) || (g = a(d.containment)[0], e = a(d.containment).offset(), f = "hidden" !== a(g).css("overflow"), this.containment = [e.left + (parseInt(a(g).css("borderLeftWidth"), 10) || 0) + (parseInt(a(g).css("paddingLeft"), 10) || 0) - this.margins.left, e.top + (parseInt(a(g).css("borderTopWidth"), 10) || 0) + (parseInt(a(g).css("paddingTop"), 10) || 0) - this.margins.top, e.left + (f ? Math.max(g.scrollWidth, g.offsetWidth) : g.offsetWidth) - (parseInt(a(g).css("borderLeftWidth"), 10) || 0) - (parseInt(a(g).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, e.top + (f ? Math.max(g.scrollHeight, g.offsetHeight) : g.offsetHeight) - (parseInt(a(g).css("borderTopWidth"), 10) || 0) - (parseInt(a(g).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function (h, e) {
            e || (e = this.position);
            var g = "absolute" === h ? 1 : -1,
                d = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                f = /(html|body)/i.test(d[0].tagName);
            return {
                top: e.top + this.offset.relative.top * g + this.offset.parent.top * g - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : d.scrollTop()) * g,
                left: e.left + this.offset.relative.left * g + this.offset.parent.left * g - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : d.scrollLeft()) * g
            }
        },
        _generatePosition: function (m) {
            var f, l, d = this.options,
                g = m.pageX,
                k = m.pageY,
                j = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                e = /(html|body)/i.test(j[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (m.pageX - this.offset.click.left < this.containment[0] && (g = this.containment[0] + this.offset.click.left), m.pageY - this.offset.click.top < this.containment[1] && (k = this.containment[1] + this.offset.click.top), m.pageX - this.offset.click.left > this.containment[2] && (g = this.containment[2] + this.offset.click.left), m.pageY - this.offset.click.top > this.containment[3] && (k = this.containment[3] + this.offset.click.top)), d.grid && (f = this.originalPageY + Math.round((k - this.originalPageY) / d.grid[1]) * d.grid[1], k = this.containment ? f - this.offset.click.top >= this.containment[1] && f - this.offset.click.top <= this.containment[3] ? f : f - this.offset.click.top >= this.containment[1] ? f - d.grid[1] : f + d.grid[1] : f, l = this.originalPageX + Math.round((g - this.originalPageX) / d.grid[0]) * d.grid[0], g = this.containment ? l - this.offset.click.left >= this.containment[0] && l - this.offset.click.left <= this.containment[2] ? l : l - this.offset.click.left >= this.containment[0] ? l - d.grid[0] : l + d.grid[0] : l)), {
                top: k - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : e ? 0 : j.scrollTop()),
                left: g - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : e ? 0 : j.scrollLeft())
            }
        },
        _rearrange: function (f, j, g, h) {
            g ? g[0].appendChild(this.placeholder[0]) : j.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? j.item[0] : j.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var d = this.counter;
            this._delay(function () {
                d === this.counter && this.refreshPositions(!h)
            })
        },
        _clear: function (d, h) {
            this.reverting = !1;
            var f, g = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (f in this._storedCSS) {
                    ("auto" === this._storedCSS[f] || "static" === this._storedCSS[f]) && (this._storedCSS[f] = "")
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            for (this.fromOutside && !h && g.push(function (i) {
                    this._trigger("receive", i, this._uiHash(this.fromOutside))
                }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || h || g.push(function (i) {
                    this._trigger("update", i, this._uiHash())
                }), this !== this.currentContainer && (h || (g.push(function (i) {
                    this._trigger("remove", i, this._uiHash())
                }), g.push(function (i) {
                    return function (e) {
                        i._trigger("receive", e, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)), g.push(function (i) {
                    return function (e) {
                        i._trigger("update", e, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)))), f = this.containers.length - 1; f >= 0; f--) {
                h || g.push(function (i) {
                    return function (e) {
                        i._trigger("deactivate", e, this._uiHash(this))
                    }
                }.call(this, this.containers[f])), this.containers[f].containerCache.over && (g.push(function (i) {
                    return function (e) {
                        i._trigger("out", e, this._uiHash(this))
                    }
                }.call(this, this.containers[f])), this.containers[f].containerCache.over = 0)
            }
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                if (!h) {
                    for (this._trigger("beforeStop", d, this._uiHash()), f = 0; g.length > f; f++) {
                        g[f].call(this, d)
                    }
                    this._trigger("stop", d, this._uiHash())
                }
                return this.fromOutside = !1, !1
            }
            if (h || this._trigger("beforeStop", d, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !h) {
                for (f = 0; g.length > f; f++) {
                    g[f].call(this, d)
                }
                this._trigger("stop", d, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },
        _trigger: function () {
            a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function (e) {
            var d = e || this;
            return {
                helper: d.helper,
                placeholder: d.placeholder || a([]),
                position: d.position,
                originalPosition: d.originalPosition,
                offset: d.positionAbs,
                item: d.currentItem,
                sender: e ? e.element : null
            }
        }
    })
})(jQuery);
(function (c) {
    var f = 0,
        d = {},
        b = {};
    d.height = d.paddingTop = d.paddingBottom = d.borderTopWidth = d.borderBottomWidth = "hide", b.height = b.paddingTop = b.paddingBottom = b.borderTopWidth = b.borderBottomWidth = "show", c.widget("ui.accordion", {
        version: "1.10.3",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        _create: function () {
            var a = this.options;
            this.prevShow = this.prevHide = c(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), a.collapsible || a.active !== !1 && null != a.active || (a.active = 0), this._processPanels(), 0 > a.active && (a.active += this.headers.length), this._refresh()
        },
        _getCreateEventData: function () {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : c(),
                content: this.active.length ? this.active.next() : c()
            }
        },
        _createIcons: function () {
            var a = this.options.icons;
            a && (c("<span>").addClass("ui-accordion-header-icon ui-icon " + a.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(a.header).addClass(a.activeHeader), this.headers.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function () {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function () {
            var a;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function () {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            }), this._destroyIcons(), a = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function () {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            }), "content" !== this.options.heightStyle && a.css("height", "")
        },
        _setOption: function (a, g) {
            return "active" === a ? (this._activate(g), undefined) : ("event" === a && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(g)), this._super(a, g), "collapsible" !== a || g || this.options.active !== !1 || this._activate(0), "icons" === a && (this._destroyIcons(), g && this._createIcons()), "disabled" === a && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!g), undefined)
        },
        _keydown: function (k) {
            if (!k.altKey && !k.ctrlKey) {
                var g = c.ui.keyCode,
                    e = this.headers.length,
                    j = this.headers.index(k.target),
                    h = !1;
                switch (k.keyCode) {
                    case g.RIGHT:
                    case g.DOWN:
                        h = this.headers[(j + 1) % e];
                        break;
                    case g.LEFT:
                    case g.UP:
                        h = this.headers[(j - 1 + e) % e];
                        break;
                    case g.SPACE:
                    case g.ENTER:
                        this._eventHandler(k);
                        break;
                    case g.HOME:
                        h = this.headers[0];
                        break;
                    case g.END:
                        h = this.headers[e - 1]
                }
                h && (c(k.target).attr("tabIndex", -1), c(h).attr("tabIndex", 0), h.focus(), k.preventDefault())
            }
        },
        _panelKeyDown: function (a) {
            a.keyCode === c.ui.keyCode.UP && a.ctrlKey && c(a.currentTarget).prev().focus()
        },
        refresh: function () {
            var a = this.options;
            this._processPanels(), a.active === !1 && a.collapsible === !0 || !this.headers.length ? (a.active = !1, this.active = c()) : a.active === !1 ? this._activate(0) : this.active.length && !c.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (a.active = !1, this.active = c()) : this._activate(Math.max(0, a.active - 1)) : a.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
        },
        _processPanels: function () {
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
        },
        _refresh: function () {
            var g, e = this.options,
                k = e.heightStyle,
                h = this.element.parent(),
                j = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++f);
            this.active = this._findActive(e.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function (q) {
                var m = c(this),
                    l = m.attr("id"),
                    p = m.next(),
                    o = p.attr("id");
                l || (l = j + "-header-" + q, m.attr("id", l)), o || (o = j + "-panel-" + q, p.attr("id", o)), m.attr("aria-controls", o), p.attr("aria-labelledby", l)
            }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }).next().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }).hide(), this.active.length ? this.active.attr({
                "aria-selected": "true",
                tabIndex: 0
            }).next().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(e.event), "fill" === k ? (g = h.height(), this.element.siblings(":visible").each(function () {
                var l = c(this),
                    i = l.css("position");
                "absolute" !== i && "fixed" !== i && (g -= l.outerHeight(!0))
            }), this.headers.each(function () {
                g -= c(this).outerHeight(!0)
            }), this.headers.next().each(function () {
                c(this).height(Math.max(0, g - c(this).innerHeight() + c(this).height()))
            }).css("overflow", "auto")) : "auto" === k && (g = 0, this.headers.next().each(function () {
                g = Math.max(g, c(this).css("height", "").height())
            }).height(g))
        },
        _activate: function (e) {
            var a = this._findActive(e)[0];
            a !== this.active[0] && (a = a || this.active[0], this._eventHandler({
                target: a,
                currentTarget: a,
                preventDefault: c.noop
            }))
        },
        _findActive: function (a) {
            return "number" == typeof a ? this.headers.eq(a) : c()
        },
        _setupEvents: function (e) {
            var a = {
                keydown: "_keydown"
            };
            e && c.each(e.split(" "), function (g, h) {
                a[h] = "_eventHandler"
            }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, a), this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            }), this._hoverable(this.headers), this._focusable(this.headers)
        },
        _eventHandler: function (v) {
            var j = this.options,
                e = this.active,
                u = c(v.currentTarget),
                m = u[0] === e[0],
                q = m && j.collapsible,
                p = q ? c() : u.next(),
                g = e.next(),
                k = {
                    oldHeader: e,
                    oldPanel: g,
                    newHeader: q ? c() : u,
                    newPanel: p
                };
            v.preventDefault(), m && !j.collapsible || this._trigger("beforeActivate", v, k) === !1 || (j.active = q ? !1 : this.headers.index(u), this.active = m ? c() : u, this._toggle(k), e.removeClass("ui-accordion-header-active ui-state-active"), j.icons && e.children(".ui-accordion-header-icon").removeClass(j.icons.activeHeader).addClass(j.icons.header), m || (u.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), j.icons && u.children(".ui-accordion-header-icon").removeClass(j.icons.header).addClass(j.icons.activeHeader), u.next().addClass("ui-accordion-content-active")))
        },
        _toggle: function (h) {
            var g = h.newPanel,
                e = this.prevShow.length ? this.prevShow : h.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = g, this.prevHide = e, this.options.animate ? this._animate(g, e, h) : (e.hide(), g.show(), this._toggleComplete(h)), e.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), e.prev().attr("aria-selected", "false"), g.length && e.length ? e.prev().attr("tabIndex", -1) : g.length && this.headers.filter(function () {
                return 0 === c(this).attr("tabIndex")
            }).attr("tabIndex", -1), g.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }).prev().attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _animate: function (i, y, x) {
            var m, w, q, j = this,
                k = 0,
                z = i.length && (!y.length || i.index() < y.index()),
                g = this.options.animate || {},
                a = z && g.down || g,
                v = function () {
                    j._toggleComplete(x)
                };
            return "number" == typeof a && (q = a), "string" == typeof a && (w = a), w = w || a.easing || g.easing, q = q || a.duration || g.duration, y.length ? i.length ? (m = i.show().outerHeight(), y.animate(d, {
                duration: q,
                easing: w,
                step: function (h, l) {
                    l.now = Math.round(h)
                }
            }), i.hide().animate(b, {
                duration: q,
                easing: w,
                complete: v,
                step: function (h, l) {
                    l.now = Math.round(h), "height" !== l.prop ? k += l.now : "content" !== j.options.heightStyle && (l.now = Math.round(m - y.outerHeight() - k), k = 0)
                }
            }), undefined) : y.animate(d, q, w, v) : i.animate(b, q, w, v)
        },
        _toggleComplete: function (a) {
            var g = a.oldPanel;
            g.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), g.length && (g.parent()[0].className = g.parent()[0].className), this._trigger("activate", null, a)
        }
    })
})(jQuery);
(function (a) {
    var b = 0;
    a.widget("ui.autocomplete", {
        version: "1.10.3",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function () {
            var h, d, c, g = this.element[0].nodeName.toLowerCase(),
                e = "textarea" === g,
                f = "input" === g;
            this.isMultiLine = e ? !0 : f ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[e || f ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                keydown: function (j) {
                    if (this.element.prop("readOnly")) {
                        return h = !0, c = !0, d = !0, undefined
                    }
                    h = !1, c = !1, d = !1;
                    var i = a.ui.keyCode;
                    switch (j.keyCode) {
                        case i.PAGE_UP:
                            h = !0, this._move("previousPage", j);
                            break;
                        case i.PAGE_DOWN:
                            h = !0, this._move("nextPage", j);
                            break;
                        case i.UP:
                            h = !0, this._keyEvent("previous", j);
                            break;
                        case i.DOWN:
                            h = !0, this._keyEvent("next", j);
                            break;
                        case i.ENTER:
                        case i.NUMPAD_ENTER:
                            this.menu.active && (h = !0, j.preventDefault(), this.menu.select(j));
                            break;
                        case i.TAB:
                            this.menu.active && this.menu.select(j);
                            break;
                        case i.ESCAPE:
                            this.menu.element.is(":visible") && (this._value(this.term), this.close(j), j.preventDefault());
                            break;
                        default:
                            d = !0, this._searchTimeout(j)
                    }
                },
                keypress: function (i) {
                    if (h) {
                        return h = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && i.preventDefault(), undefined
                    }
                    if (!d) {
                        var j = a.ui.keyCode;
                        switch (i.keyCode) {
                            case j.PAGE_UP:
                                this._move("previousPage", i);
                                break;
                            case j.PAGE_DOWN:
                                this._move("nextPage", i);
                                break;
                            case j.UP:
                                this._keyEvent("previous", i);
                                break;
                            case j.DOWN:
                                this._keyEvent("next", i)
                        }
                    }
                },
                input: function (i) {
                    return c ? (c = !1, i.preventDefault(), undefined) : (this._searchTimeout(i), undefined)
                },
                focus: function () {
                    this.selectedItem = null, this.previous = this._value()
                },
                blur: function (i) {
                    return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(i), this._change(i), undefined)
                }
            }), this._initSource(), this.menu = a("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().data("ui-menu"), this._on(this.menu.element, {
                mousedown: function (k) {
                    k.preventDefault(), this.cancelBlur = !0, this._delay(function () {
                        delete this.cancelBlur
                    });
                    var j = this.menu.element[0];
                    a(k.target).closest(".ui-menu-item").length || this._delay(function () {
                        var i = this;
                        this.document.one("mousedown", function (l) {
                            l.target === i.element[0] || l.target === j || a.contains(j, l.target) || i.close()
                        })
                    })
                },
                menufocus: function (l, k) {
                    if (this.isNewMenu && (this.isNewMenu = !1, l.originalEvent && /^mouse/.test(l.originalEvent.type))) {
                        return this.menu.blur(), this.document.one("mousemove", function () {
                            a(l.target).trigger(l.originalEvent)
                        }), undefined
                    }
                    var j = k.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", l, {
                        item: j
                    }) ? l.originalEvent && /^key/.test(l.originalEvent.type) && this._value(j.value) : this.liveRegion.text(j.value)
                },
                menuselect: function (k, m) {
                    var l = m.item.data("ui-autocomplete-item"),
                        j = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = j, this._delay(function () {
                        this.previous = j, this.selectedItem = l
                    })), !1 !== this._trigger("select", k, {
                        item: l
                    }) && this._value(l.value), this.term = this._value(), this.close(k), this.selectedItem = l
                }
            }), this.liveRegion = a("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function () {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
        },
        _setOption: function (c, d) {
            this._super(c, d), "source" === c && this._initSource(), "appendTo" === c && this.menu.element.appendTo(this._appendTo()), "disabled" === c && d && this.xhr && this.xhr.abort()
        },
        _appendTo: function () {
            var c = this.options.appendTo;
            return c && (c = c.jquery || c.nodeType ? a(c) : this.document.find(c).eq(0)), c || (c = this.element.closest(".ui-front")), c.length || (c = this.document[0].body), c
        },
        _initSource: function () {
            var e, d, c = this;
            a.isArray(this.options.source) ? (e = this.options.source, this.source = function (g, f) {
                f(a.ui.autocomplete.filter(e, g.term))
            }) : "string" == typeof this.options.source ? (d = this.options.source, this.source = function (g, f) {
                c.xhr && c.xhr.abort(), c.xhr = a.ajax({
                    url: d,
                    data: g,
                    dataType: "json",
                    success: function (h) {
                        f(h)
                    },
                    error: function () {
                        f([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function (c) {
            clearTimeout(this.searching), this.searching = this._delay(function () {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, c))
            }, this.options.delay)
        },
        search: function (c, d) {
            return c = null != c ? c : this._value(), this.term = this._value(), c.length < this.options.minLength ? this.close(d) : this._trigger("search", d) !== !1 ? this._search(c) : undefined
        },
        _search: function (c) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                term: c
            }, this._response())
        },
        _response: function () {
            var c = this,
                d = ++b;
            return function (e) {
                d === b && c.__response(e), c.pending--, c.pending || c.element.removeClass("ui-autocomplete-loading")
            }
        },
        __response: function (c) {
            c && (c = this._normalize(c)), this._trigger("response", null, {
                content: c
            }), !this.options.disabled && c && c.length && !this.cancelSearch ? (this._suggest(c), this._trigger("open")) : this._close()
        },
        close: function (c) {
            this.cancelSearch = !0, this._close(c)
        },
        _close: function (c) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", c))
        },
        _change: function (c) {
            this.previous !== this._value() && this._trigger("change", c, {
                item: this.selectedItem
            })
        },
        _normalize: function (c) {
            return c.length && c[0].label && c[0].value ? c : a.map(c, function (d) {
                return "string" == typeof d ? {
                    label: d,
                    value: d
                } : a.extend({
                    label: d.label || d.value,
                    value: d.value || d.label
                }, d)
            })
        },
        _suggest: function (d) {
            var c = this.menu.element.empty();
            this._renderMenu(c, d), this.isNewMenu = !0, this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({
                of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function () {
            var c = this.menu.element;
            c.outerWidth(Math.max(c.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function (e, d) {
            var c = this;
            a.each(d, function (f, g) {
                c._renderItemData(e, g)
            })
        },
        _renderItemData: function (c, d) {
            return this._renderItem(c, d).data("ui-autocomplete-item", d)
        },
        _renderItem: function (d, c) {
            return a("<li>").append(a("<a>").text(c.label)).appendTo(d)
        },
        _move: function (c, d) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(c) || this.menu.isLastItem() && /^next/.test(c) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[c](d), undefined) : (this.search(null, d), undefined)
        },
        widget: function () {
            return this.menu.element
        },
        _value: function () {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function (c, d) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(c, d), d.preventDefault())
        }
    }), a.extend(a.ui.autocomplete, {
        escapeRegex: function (c) {
            return c.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function (e, d) {
            var c = RegExp(a.ui.autocomplete.escapeRegex(d), "i");
            return a.grep(e, function (f) {
                return c.test(f.label || f.value || f)
            })
        }
    }), a.widget("ui.autocomplete", a.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function (c) {
                    return c + (c > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function (c) {
            var d;
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (d = c && c.length ? this.options.messages.results(c.length) : this.options.messages.noResults, this.liveRegion.text(d))
        }
    })
})(jQuery);
(function (c) {
    var q, f, b, p, j = "ui-button ui-widget ui-state-default ui-corner-all",
        m = "ui-state-hover ui-state-active ",
        k = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        d = function () {
            var a = c(this);
            setTimeout(function () {
                a.find(":ui-button").button("refresh")
            }, 1)
        },
        g = function (n) {
            var h = n.name,
                e = n.form,
                l = c([]);
            return h && (h = h.replace(/'/g, "\\'"), l = e ? c(e).find("[name='" + h + "']") : c("[name='" + h + "']", n.ownerDocument).filter(function () {
                return !this.form
            })), l
        };
    c.widget("ui.button", {
        version: "1.10.3",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function () {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, d), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var i = this,
                h = this.options,
                l = "checkbox" === this.type || "radio" === this.type,
                e = l ? "" : "ui-state-active",
                a = "ui-state-focus";
            null === h.label && (h.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(j).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
                h.disabled || this === q && c(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function () {
                h.disabled || c(this).removeClass(e)
            }).bind("click" + this.eventNamespace, function (n) {
                h.disabled && (n.preventDefault(), n.stopImmediatePropagation())
            }), this.element.bind("focus" + this.eventNamespace, function () {
                i.buttonElement.addClass(a)
            }).bind("blur" + this.eventNamespace, function () {
                i.buttonElement.removeClass(a)
            }), l && (this.element.bind("change" + this.eventNamespace, function () {
                p || i.refresh()
            }), this.buttonElement.bind("mousedown" + this.eventNamespace, function (n) {
                h.disabled || (p = !1, f = n.pageX, b = n.pageY)
            }).bind("mouseup" + this.eventNamespace, function (n) {
                h.disabled || (f !== n.pageX || b !== n.pageY) && (p = !0)
            })), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                return h.disabled || p ? !1 : undefined
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                if (h.disabled || p) {
                    return !1
                }
                c(this).addClass("ui-state-active"), i.buttonElement.attr("aria-pressed", "true");
                var n = i.element[0];
                g(n).not(n).map(function () {
                    return c(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
                return h.disabled ? !1 : (c(this).addClass("ui-state-active"), q = this, i.document.one("mouseup", function () {
                    q = null
                }), undefined)
            }).bind("mouseup" + this.eventNamespace, function () {
                return h.disabled ? !1 : (c(this).removeClass("ui-state-active"), undefined)
            }).bind("keydown" + this.eventNamespace, function (n) {
                return h.disabled ? !1 : ((n.keyCode === c.ui.keyCode.SPACE || n.keyCode === c.ui.keyCode.ENTER) && c(this).addClass("ui-state-active"), undefined)
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () {
                c(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function (n) {
                n.keyCode === c.ui.keyCode.SPACE && c(this).click()
            })), this._setOption("disabled", h.disabled), this._resetButton()
        },
        _determineButtonType: function () {
            var a, l, h;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (a = this.element.parents().last(), l = "label[for='" + this.element.attr("id") + "']", this.buttonElement = a.find(l), this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), this.buttonElement = a.filter(l), this.buttonElement.length || (this.buttonElement = a.find(l))), this.element.addClass("ui-helper-hidden-accessible"), h = this.element.is(":checked"), h && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", h)) : this.buttonElement = this.element
        },
        widget: function () {
            return this.buttonElement
        },
        _destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(j + " " + m + " " + k).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function (a, h) {
            return this._super(a, h), "disabled" === a ? (h ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1), undefined) : (this._resetButton(), undefined)
        },
        refresh: function () {
            var a = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            a !== this.options.disabled && this._setOption("disabled", a), "radio" === this.type ? g(this.element[0]).each(function () {
                c(this).is(":checked") ? c(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : c(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function () {
            if ("input" === this.type) {
                return this.options.label && this.element.val(this.options.label), undefined
            }
            var r = this.buttonElement.removeClass(k),
                h = c("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(r.empty()).text(),
                e = this.options.icons,
                o = e.primary && e.secondary,
                l = [];
            e.primary || e.secondary ? (this.options.text && l.push("ui-button-text-icon" + (o ? "s" : e.primary ? "-primary" : "-secondary")), e.primary && r.prepend("<span class='ui-button-icon-primary ui-icon " + e.primary + "'></span>"), e.secondary && r.append("<span class='ui-button-icon-secondary ui-icon " + e.secondary + "'></span>"), this.options.text || (l.push(o ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || r.attr("title", c.trim(h)))) : l.push("ui-button-text-only"), r.addClass(l.join(" "))
        }
    }), c.widget("ui.buttonset", {
        version: "1.10.3",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (a, h) {
            "disabled" === a && this.buttons.button("option", a, h), this._super(a, h)
        },
        refresh: function () {
            var a = "rtl" === this.element.css("direction");
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                return c(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(a ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(a ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function () {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
                return c(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    })
})(jQuery);
(function (c, j) {
    function d() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, c.extend(this._defaults, this.regional[""]), this.dpDiv = b(c("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function b(e) {
        var a = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.delegate(a, "mouseout", function () {
            c(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && c(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && c(this).removeClass("ui-datepicker-next-hover")
        }).delegate(a, "mouseover", function () {
            c.datepicker._isDisabledDatepicker(f.inline ? e.parent()[0] : f.input[0]) || (c(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), c(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && c(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && c(this).addClass("ui-datepicker-next-hover"))
        })
    }

    function h(l, k) {
        c.extend(l, k);
        for (var e in k) {
            null == k[e] && (l[e] = k[e])
        }
        return l
    }
    c.extend(c.ui, {
        datepicker: {
            version: "1.10.3"
        }
    });
    var f, g = "datepicker";
    c.extend(d.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (a) {
            return h(this._defaults, a || {}), this
        },
        _attachDatepicker: function (o, k) {
            var e, m, l;
            e = o.nodeName.toLowerCase(), m = "div" === e || "span" === e, o.id || (this.uuid += 1, o.id = "dp" + this.uuid), l = this._newInst(c(o), m), l.settings = c.extend({}, k || {}), "input" === e ? this._connectDatepicker(o, l) : m && this._inlineDatepicker(o, l)
        },
        _newInst: function (k, a) {
            var e = k[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: e,
                input: k,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: a,
                dpDiv: a ? b(c("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function (l, k) {
            var e = c(l);
            k.append = c([]), k.trigger = c([]), e.hasClass(this.markerClassName) || (this._attachments(e, k), e.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(k), c.data(l, g, k), k.settings.disabled && this._disableDatepicker(l))
        },
        _attachments: function (u, k) {
            var e, q, l, p = this._get(k, "appendText"),
                m = this._get(k, "isRTL");
            k.append && k.append.remove(), p && (k.append = c("<span class='" + this._appendClass + "'>" + p + "</span>"), u[m ? "before" : "after"](k.append)), u.unbind("focus", this._showDatepicker), k.trigger && k.trigger.remove(), e = this._get(k, "showOn"), ("focus" === e || "both" === e) && u.focus(this._showDatepicker), ("button" === e || "both" === e) && (q = this._get(k, "buttonText"), l = this._get(k, "buttonImage"), k.trigger = c(this._get(k, "buttonImageOnly") ? c("<img/>").addClass(this._triggerClass).attr({
                src: l,
                alt: q,
                title: q
            }) : c("<button type='button'></button>").addClass(this._triggerClass).html(l ? c("<img/>").attr({
                src: l,
                alt: q,
                title: q
            }) : q)), u[m ? "before" : "after"](k.trigger), k.trigger.click(function () {
                return c.datepicker._datepickerShowing && c.datepicker._lastInput === u[0] ? c.datepicker._hideDatepicker() : c.datepicker._datepickerShowing && c.datepicker._lastInput !== u[0] ? (c.datepicker._hideDatepicker(), c.datepicker._showDatepicker(u[0])) : c.datepicker._showDatepicker(u[0]), !1
            }))
        },
        _autoSize: function (l) {
            if (this._get(l, "autoSize") && !l.inline) {
                var u, m, k, q, o = new Date(2009, 11, 20),
                    p = this._get(l, "dateFormat");
                p.match(/[DM]/) && (u = function (a) {
                    for (m = 0, k = 0, q = 0; a.length > q; q++) {
                        a[q].length > m && (m = a[q].length, k = q)
                    }
                    return k
                }, o.setMonth(u(this._get(l, p.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(u(this._get(l, p.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), l.input.attr("size", this._formatDate(l, o).length)
            }
        },
        _inlineDatepicker: function (l, k) {
            var e = c(l);
            e.hasClass(this.markerClassName) || (e.addClass(this.markerClassName).append(k.dpDiv), c.data(l, g, k), this._setDate(k, this._getDefaultDate(k), !0), this._updateDatepicker(k), this._updateAlternate(k), k.settings.disabled && this._disableDatepicker(l), k.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function (y, r, e, v, w) {
            var q, s, z, m, k, x = this._dialogInst;
            return x || (this.uuid += 1, q = "dp" + this.uuid, this._dialogInput = c("<input type='text' id='" + q + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), c("body").append(this._dialogInput), x = this._dialogInst = this._newInst(this._dialogInput, !1), x.settings = {}, c.data(this._dialogInput[0], g, x)), h(x.settings, v || {}), r = r && r.constructor === Date ? this._formatDate(x, r) : r, this._dialogInput.val(r), this._pos = w ? w.length ? w : [w.pageX, w.pageY] : null, this._pos || (s = document.documentElement.clientWidth, z = document.documentElement.clientHeight, m = document.documentElement.scrollLeft || document.body.scrollLeft, k = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [s / 2 - 100 + m, z / 2 - 150 + k]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), x.settings.onSelect = e, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), c.blockUI && c.blockUI(this.dpDiv), c.data(this._dialogInput[0], g, x), this
        },
        _destroyDatepicker: function (m) {
            var k, e = c(m),
                l = c.data(m, g);
            e.hasClass(this.markerClassName) && (k = m.nodeName.toLowerCase(), c.removeData(m, g), "input" === k ? (l.append.remove(), l.trigger.remove(), e.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === k || "span" === k) && e.removeClass(this.markerClassName).empty())
        },
        _enableDatepicker: function (o) {
            var k, e, m = c(o),
                l = c.data(o, g);
            m.hasClass(this.markerClassName) && (k = o.nodeName.toLowerCase(), "input" === k ? (o.disabled = !1, l.trigger.filter("button").each(function () {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === k || "span" === k) && (e = m.children("." + this._inlineClass), e.children().removeClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = c.map(this._disabledInputs, function (a) {
                return a === o ? null : a
            }))
        },
        _disableDatepicker: function (o) {
            var k, e, m = c(o),
                l = c.data(o, g);
            m.hasClass(this.markerClassName) && (k = o.nodeName.toLowerCase(), "input" === k ? (o.disabled = !0, l.trigger.filter("button").each(function () {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === k || "span" === k) && (e = m.children("." + this._inlineClass), e.children().addClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = c.map(this._disabledInputs, function (a) {
                return a === o ? null : a
            }), this._disabledInputs[this._disabledInputs.length] = o)
        },
        _isDisabledDatepicker: function (a) {
            if (!a) {
                return !1
            }
            for (var i = 0; this._disabledInputs.length > i; i++) {
                if (this._disabledInputs[i] === a) {
                    return !0
                }
            }
            return !1
        },
        _getInst: function (e) {
            try {
                return c.data(e, g)
            } catch (a) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (m, e, q) {
            var t, s, k, p, v = this._getInst(m);
            return 2 === arguments.length && "string" == typeof e ? "defaults" === e ? c.extend({}, c.datepicker._defaults) : v ? "all" === e ? c.extend({}, v.settings) : this._get(v, e) : null : (t = e || {}, "string" == typeof e && (t = {}, t[e] = q), v && (this._curInst === v && this._hideDatepicker(), s = this._getDateDatepicker(m, !0), k = this._getMinMaxDate(v, "min"), p = this._getMinMaxDate(v, "max"), h(v.settings, t), null !== k && t.dateFormat !== j && t.minDate === j && (v.settings.minDate = this._formatDate(v, k)), null !== p && t.dateFormat !== j && t.maxDate === j && (v.settings.maxDate = this._formatDate(v, p)), "disabled" in t && (t.disabled ? this._disableDatepicker(m) : this._enableDatepicker(m)), this._attachments(c(m), v), this._autoSize(v), this._setDate(v, s), this._updateAlternate(v), this._updateDatepicker(v)), j)
        },
        _changeDatepicker: function (a, l, k) {
            this._optionDatepicker(a, l, k)
        },
        _refreshDatepicker: function (a) {
            var i = this._getInst(a);
            i && this._updateDatepicker(i)
        },
        _setDateDatepicker: function (a, l) {
            var k = this._getInst(a);
            k && (this._setDate(k, l), this._updateDatepicker(k), this._updateAlternate(k))
        },
        _getDateDatepicker: function (a, l) {
            var k = this._getInst(a);
            return k && !k.inline && this._setDateFromField(k, l), k ? this._getDate(k) : null
        },
        _doKeyDown: function (u) {
            var k, e, q, l = c.datepicker._getInst(u.target),
                p = !0,
                m = l.dpDiv.is(".ui-datepicker-rtl");
            if (l._keyEvent = !0, c.datepicker._datepickerShowing) {
                switch (u.keyCode) {
                    case 9:
                        c.datepicker._hideDatepicker(), p = !1;
                        break;
                    case 13:
                        return q = c("td." + c.datepicker._dayOverClass + ":not(." + c.datepicker._currentClass + ")", l.dpDiv), q[0] && c.datepicker._selectDay(u.target, l.selectedMonth, l.selectedYear, q[0]), k = c.datepicker._get(l, "onSelect"), k ? (e = c.datepicker._formatDate(l), k.apply(l.input ? l.input[0] : null, [e, l])) : c.datepicker._hideDatepicker(), !1;
                    case 27:
                        c.datepicker._hideDatepicker();
                        break;
                    case 33:
                        c.datepicker._adjustDate(u.target, u.ctrlKey ? -c.datepicker._get(l, "stepBigMonths") : -c.datepicker._get(l, "stepMonths"), "M");
                        break;
                    case 34:
                        c.datepicker._adjustDate(u.target, u.ctrlKey ? +c.datepicker._get(l, "stepBigMonths") : +c.datepicker._get(l, "stepMonths"), "M");
                        break;
                    case 35:
                        (u.ctrlKey || u.metaKey) && c.datepicker._clearDate(u.target), p = u.ctrlKey || u.metaKey;
                        break;
                    case 36:
                        (u.ctrlKey || u.metaKey) && c.datepicker._gotoToday(u.target), p = u.ctrlKey || u.metaKey;
                        break;
                    case 37:
                        (u.ctrlKey || u.metaKey) && c.datepicker._adjustDate(u.target, m ? 1 : -1, "D"), p = u.ctrlKey || u.metaKey, u.originalEvent.altKey && c.datepicker._adjustDate(u.target, u.ctrlKey ? -c.datepicker._get(l, "stepBigMonths") : -c.datepicker._get(l, "stepMonths"), "M");
                        break;
                    case 38:
                        (u.ctrlKey || u.metaKey) && c.datepicker._adjustDate(u.target, -7, "D"), p = u.ctrlKey || u.metaKey;
                        break;
                    case 39:
                        (u.ctrlKey || u.metaKey) && c.datepicker._adjustDate(u.target, m ? -1 : 1, "D"), p = u.ctrlKey || u.metaKey, u.originalEvent.altKey && c.datepicker._adjustDate(u.target, u.ctrlKey ? +c.datepicker._get(l, "stepBigMonths") : +c.datepicker._get(l, "stepMonths"), "M");
                        break;
                    case 40:
                        (u.ctrlKey || u.metaKey) && c.datepicker._adjustDate(u.target, 7, "D"), p = u.ctrlKey || u.metaKey;
                        break;
                    default:
                        p = !1
                }
            } else {
                36 === u.keyCode && u.ctrlKey ? c.datepicker._showDatepicker(this) : p = !1
            }
            p && (u.preventDefault(), u.stopPropagation())
        },
        _doKeyPress: function (k) {
            var e, m, l = c.datepicker._getInst(k.target);
            return c.datepicker._get(l, "constrainInput") ? (e = c.datepicker._possibleChars(c.datepicker._get(l, "dateFormat")), m = String.fromCharCode(null == k.charCode ? k.keyCode : k.charCode), k.ctrlKey || k.metaKey || " " > m || !e || e.indexOf(m) > -1) : j
        },
        _doKeyUp: function (m) {
            var k, e = c.datepicker._getInst(m.target);
            if (e.input.val() !== e.lastVal) {
                try {
                    k = c.datepicker.parseDate(c.datepicker._get(e, "dateFormat"), e.input ? e.input.val() : null, c.datepicker._getFormatConfig(e)), k && (c.datepicker._setDateFromField(e), c.datepicker._updateAlternate(e), c.datepicker._updateDatepicker(e))
                } catch (l) {}
            }
            return !0
        },
        _showDatepicker: function (v) {
            if (v = v.target || v, "input" !== v.nodeName.toLowerCase() && (v = c("input", v.parentNode)[0]), !c.datepicker._isDisabledDatepicker(v) && c.datepicker._lastInput !== v) {
                var m, e, q, u, s, k, p;
                m = c.datepicker._getInst(v), c.datepicker._curInst && c.datepicker._curInst !== m && (c.datepicker._curInst.dpDiv.stop(!0, !0), m && c.datepicker._datepickerShowing && c.datepicker._hideDatepicker(c.datepicker._curInst.input[0])), e = c.datepicker._get(m, "beforeShow"), q = e ? e.apply(v, [v, m]) : {}, q !== !1 && (h(m.settings, q), m.lastVal = null, c.datepicker._lastInput = v, c.datepicker._setDateFromField(m), c.datepicker._inDialog && (v.value = ""), c.datepicker._pos || (c.datepicker._pos = c.datepicker._findPos(v), c.datepicker._pos[1] += v.offsetHeight), u = !1, c(v).parents().each(function () {
                    return u |= "fixed" === c(this).css("position"), !u
                }), s = {
                    left: c.datepicker._pos[0],
                    top: c.datepicker._pos[1]
                }, c.datepicker._pos = null, m.dpDiv.empty(), m.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), c.datepicker._updateDatepicker(m), s = c.datepicker._checkOffset(m, s, u), m.dpDiv.css({
                    position: c.datepicker._inDialog && c.blockUI ? "static" : u ? "fixed" : "absolute",
                    display: "none",
                    left: s.left + "px",
                    top: s.top + "px"
                }), m.inline || (k = c.datepicker._get(m, "showAnim"), p = c.datepicker._get(m, "duration"), m.dpDiv.zIndex(c(v).zIndex() + 1), c.datepicker._datepickerShowing = !0, c.effects && c.effects.effect[k] ? m.dpDiv.show(k, c.datepicker._get(m, "showOptions"), p) : m.dpDiv[k || "show"](k ? p : null), c.datepicker._shouldFocusInput(m) && m.input.focus(), c.datepicker._curInst = m))
            }
        },
        _updateDatepicker: function (n) {
            this.maxRows = 4, f = n, n.dpDiv.empty().append(this._generateHTML(n)), this._attachHandlers(n), n.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var k, e = this._getNumberOfMonths(n),
                m = e[1],
                l = 17;
            n.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), m > 1 && n.dpDiv.addClass("ui-datepicker-multi-" + m).css("width", l * m + "em"), n.dpDiv[(1 !== e[0] || 1 !== e[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), n.dpDiv[(this._get(n, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), n === c.datepicker._curInst && c.datepicker._datepickerShowing && c.datepicker._shouldFocusInput(n) && n.input.focus(), n.yearshtml && (k = n.yearshtml, setTimeout(function () {
                k === n.yearshtml && n.yearshtml && n.dpDiv.find("select.ui-datepicker-year:first").replaceWith(n.yearshtml), k = n.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function (a) {
            return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus")
        },
        _checkOffset: function (x, m, e) {
            var w = x.dpDiv.outerWidth(),
                q = x.dpDiv.outerHeight(),
                v = x.input ? x.input.outerWidth() : 0,
                u = x.input ? x.input.outerHeight() : 0,
                k = document.documentElement.clientWidth + (e ? 0 : c(document).scrollLeft()),
                p = document.documentElement.clientHeight + (e ? 0 : c(document).scrollTop());
            return m.left -= this._get(x, "isRTL") ? w - v : 0, m.left -= e && m.left === x.input.offset().left ? c(document).scrollLeft() : 0, m.top -= e && m.top === x.input.offset().top + u ? c(document).scrollTop() : 0, m.left -= Math.min(m.left, m.left + w > k && k > w ? Math.abs(m.left + w - k) : 0), m.top -= Math.min(m.top, m.top + q > p && p > q ? Math.abs(q + u) : 0), m
        },
        _findPos: function (m) {
            for (var k, e = this._getInst(m), l = this._get(e, "isRTL"); m && ("hidden" === m.type || 1 !== m.nodeType || c.expr.filters.hidden(m));) {
                m = m[l ? "previousSibling" : "nextSibling"]
            }
            return k = c(m).offset(), [k.left, k.top]
        },
        _hideDatepicker: function (q) {
            var k, e, p, l, m = this._curInst;
            !m || q && m !== c.data(q, g) || this._datepickerShowing && (k = this._get(m, "showAnim"), e = this._get(m, "duration"), p = function () {
                c.datepicker._tidyDialog(m)
            }, c.effects && (c.effects.effect[k] || c.effects[k]) ? m.dpDiv.hide(k, c.datepicker._get(m, "showOptions"), e, p) : m.dpDiv["slideDown" === k ? "slideUp" : "fadeIn" === k ? "fadeOut" : "hide"](k ? e : null, p), k || p(), this._datepickerShowing = !1, l = this._get(m, "onClose"), l && l.apply(m.input ? m.input[0] : null, [m.input ? m.input.val() : "", m]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), c.blockUI && (c.unblockUI(), c("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function (a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (l) {
            if (c.datepicker._curInst) {
                var k = c(l.target),
                    e = c.datepicker._getInst(k[0]);
                (k[0].id !== c.datepicker._mainDivId && 0 === k.parents("#" + c.datepicker._mainDivId).length && !k.hasClass(c.datepicker.markerClassName) && !k.closest("." + c.datepicker._triggerClass).length && c.datepicker._datepickerShowing && (!c.datepicker._inDialog || !c.blockUI) || k.hasClass(c.datepicker.markerClassName) && c.datepicker._curInst !== e) && c.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (o, k, e) {
            var m = c(o),
                l = this._getInst(m[0]);
            this._isDisabledDatepicker(m[0]) || (this._adjustInstDate(l, k + ("M" === e ? this._get(l, "showCurrentAtPos") : 0), e), this._updateDatepicker(l))
        },
        _gotoToday: function (m) {
            var k, e = c(m),
                l = this._getInst(e[0]);
            this._get(l, "gotoCurrent") && l.currentDay ? (l.selectedDay = l.currentDay, l.drawMonth = l.selectedMonth = l.currentMonth, l.drawYear = l.selectedYear = l.currentYear) : (k = new Date, l.selectedDay = k.getDate(), l.drawMonth = l.selectedMonth = k.getMonth(), l.drawYear = l.selectedYear = k.getFullYear()), this._notifyChange(l), this._adjustDate(e)
        },
        _selectMonthYear: function (o, k, e) {
            var m = c(o),
                l = this._getInst(m[0]);
            l["selected" + ("M" === e ? "Month" : "Year")] = l["draw" + ("M" === e ? "Month" : "Year")] = parseInt(k.options[k.selectedIndex].value, 10), this._notifyChange(l), this._adjustDate(m)
        },
        _selectDay: function (p, k, e, o) {
            var l, m = c(p);
            c(o).hasClass(this._unselectableClass) || this._isDisabledDatepicker(m[0]) || (l = this._getInst(m[0]), l.selectedDay = l.currentDay = c("a", o).html(), l.selectedMonth = l.currentMonth = k, l.selectedYear = l.currentYear = e, this._selectDate(p, this._formatDate(l, l.currentDay, l.currentMonth, l.currentYear)))
        },
        _clearDate: function (e) {
            var a = c(e);
            this._selectDate(a, "")
        },
        _selectDate: function (o, k) {
            var e, m = c(o),
                l = this._getInst(m[0]);
            k = null != k ? k : this._formatDate(l), l.input && l.input.val(k), this._updateAlternate(l), e = this._get(l, "onSelect"), e ? e.apply(l.input ? l.input[0] : null, [k, l]) : l.input && l.input.trigger("change"), l.inline ? this._updateDatepicker(l) : (this._hideDatepicker(), this._lastInput = l.input[0], "object" != typeof l.input[0] && l.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function (o) {
            var k, e, m, l = this._get(o, "altField");
            l && (k = this._get(o, "altFormat") || this._get(o, "dateFormat"), e = this._getDate(o), m = this.formatDate(k, e, this._getFormatConfig(o)), c(l).each(function () {
                c(this).val(m)
            }))
        },
        noWeekends: function (a) {
            var i = a.getDay();
            return [i > 0 && 6 > i, ""]
        },
        iso8601Week: function (a) {
            var l, k = new Date(a.getTime());
            return k.setDate(k.getDate() + 4 - (k.getDay() || 7)), l = k.getTime(), k.setMonth(0), k.setDate(1), Math.floor(Math.round((l - k) / 86400000) / 7) + 1
        },
        parseDate: function (G, q, O) {
            if (null == G || null == q) {
                throw "Invalid arguments"
            }
            if (q = "object" == typeof q ? "" + q : q + "", "" === q) {
                return null
            }
            var K, N, L, F, I = 0,
                P = (O ? O.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                A = "string" != typeof P ? P : (new Date).getFullYear() % 100 + parseInt(P, 10),
                z = (O ? O.dayNamesShort : null) || this._defaults.dayNamesShort,
                M = (O ? O.dayNames : null) || this._defaults.dayNames,
                J = (O ? O.monthNamesShort : null) || this._defaults.monthNamesShort,
                C = (O ? O.monthNames : null) || this._defaults.monthNames,
                E = -1,
                Q = -1,
                T = -1,
                t = -1,
                e = !1,
                H = function (a) {
                    var i = G.length > K + 1 && G.charAt(K + 1) === a;
                    return i && K++, i
                },
                S = function (a) {
                    var o = H(a),
                        k = "@" === a ? 14 : "!" === a ? 20 : "y" === a && o ? 4 : "o" === a ? 3 : 2,
                        m = RegExp("^\\d{1," + k + "}"),
                        l = q.substring(I).match(m);
                    if (!l) {
                        throw "Missing number at position " + I
                    }
                    return I += l[0].length, parseInt(l[0], 10)
                },
                B = function (a, p, k) {
                    var m = -1,
                        l = c.map(H(a) ? k : p, function (i, n) {
                            return [
                                [n, i]
                            ]
                        }).sort(function (i, n) {
                            return -(i[1].length - n[1].length)
                        });
                    if (c.each(l, function (n, o) {
                            var r = o[1];
                            return q.substr(I, r.length).toLowerCase() === r.toLowerCase() ? (m = o[0], I += r.length, !1) : j
                        }), -1 !== m) {
                        return m + 1
                    }
                    throw "Unknown name at position " + I
                },
                R = function () {
                    if (q.charAt(I) !== G.charAt(K)) {
                        throw "Unexpected literal at position " + I
                    }
                    I++
                };
            for (K = 0; G.length > K; K++) {
                if (e) {
                    "'" !== G.charAt(K) || H("'") ? R() : e = !1
                } else {
                    switch (G.charAt(K)) {
                        case "d":
                            T = S("d");
                            break;
                        case "D":
                            B("D", z, M);
                            break;
                        case "o":
                            t = S("o");
                            break;
                        case "m":
                            Q = S("m");
                            break;
                        case "M":
                            Q = B("M", J, C);
                            break;
                        case "y":
                            E = S("y");
                            break;
                        case "@":
                            F = new Date(S("@")), E = F.getFullYear(), Q = F.getMonth() + 1, T = F.getDate();
                            break;
                        case "!":
                            F = new Date((S("!") - this._ticksTo1970) / 10000), E = F.getFullYear(), Q = F.getMonth() + 1, T = F.getDate();
                            break;
                        case "'":
                            H("'") ? R() : e = !0;
                            break;
                        default:
                            R()
                    }
                }
            }
            if (q.length > I && (L = q.substr(I), !/^\s+/.test(L))) {
                throw "Extra/unparsed characters found in date: " + L
            }
            if (-1 === E ? E = (new Date).getFullYear() : 100 > E && (E += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (A >= E ? 0 : -100)), t > -1) {
                for (Q = 1, T = t;;) {
                    if (N = this._getDaysInMonth(E, Q - 1), N >= T) {
                        break
                    }
                    Q++, T -= N
                }
            }
            if (F = this._daylightSavingAdjust(new Date(E, Q - 1, T)), F.getFullYear() !== E || F.getMonth() + 1 !== Q || F.getDate() !== T) {
                throw "Invalid date"
            }
            return F
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 10000000 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function (q, C, w) {
            if (!C) {
                return ""
            }
            var k, B = (w ? w.dayNamesShort : null) || this._defaults.dayNamesShort,
                y = (w ? w.dayNames : null) || this._defaults.dayNames,
                A = (w ? w.monthNamesShort : null) || this._defaults.monthNamesShort,
                z = (w ? w.monthNames : null) || this._defaults.monthNames,
                v = function (e) {
                    var a = q.length > k + 1 && q.charAt(k + 1) === e;
                    return a && k++, a
                },
                x = function (n, r, o) {
                    var l = "" + r;
                    if (v(n)) {
                        for (; o > l.length;) {
                            l = "0" + l
                        }
                    }
                    return l
                },
                D = function (n, r, o, l) {
                    return v(n) ? l[r] : o[r]
                },
                p = "",
                m = !1;
            if (C) {
                for (k = 0; q.length > k; k++) {
                    if (m) {
                        "'" !== q.charAt(k) || v("'") ? p += q.charAt(k) : m = !1
                    } else {
                        switch (q.charAt(k)) {
                            case "d":
                                p += x("d", C.getDate(), 2);
                                break;
                            case "D":
                                p += D("D", C.getDay(), B, y);
                                break;
                            case "o":
                                p += x("o", Math.round((new Date(C.getFullYear(), C.getMonth(), C.getDate()).getTime() - new Date(C.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                break;
                            case "m":
                                p += x("m", C.getMonth() + 1, 2);
                                break;
                            case "M":
                                p += D("M", C.getMonth(), A, z);
                                break;
                            case "y":
                                p += v("y") ? C.getFullYear() : (10 > C.getYear() % 100 ? "0" : "") + C.getYear() % 100;
                                break;
                            case "@":
                                p += C.getTime();
                                break;
                            case "!":
                                p += 10000 * C.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                v("'") ? p += "'" : m = !0;
                                break;
                            default:
                                p += q.charAt(k)
                        }
                    }
                }
            }
            return p
        },
        _possibleChars: function (l) {
            var o, m = "",
                k = !1,
                n = function (p) {
                    var e = l.length > o + 1 && l.charAt(o + 1) === p;
                    return e && o++, e
                };
            for (o = 0; l.length > o; o++) {
                if (k) {
                    "'" !== l.charAt(o) || n("'") ? m += l.charAt(o) : k = !1
                } else {
                    switch (l.charAt(o)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            m += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            n("'") ? m += "'" : k = !0;
                            break;
                        default:
                            m += l.charAt(o)
                    }
                }
            }
            return m
        },
        _get: function (a, k) {
            return a.settings[k] !== j ? a.settings[k] : this._defaults[k]
        },
        _setDateFromField: function (l, w) {
            if (l.input.val() !== l.lastVal) {
                var m = this._get(l, "dateFormat"),
                    k = l.lastVal = l.input ? l.input.val() : null,
                    v = this._getDefaultDate(l),
                    p = v,
                    u = this._getFormatConfig(l);
                try {
                    p = this.parseDate(m, k, u) || v
                } catch (q) {
                    k = w ? "" : k
                }
                l.selectedDay = p.getDate(), l.drawMonth = l.selectedMonth = p.getMonth(), l.drawYear = l.selectedYear = p.getFullYear(), l.currentDay = k ? p.getDate() : 0, l.currentMonth = k ? p.getMonth() : 0, l.currentYear = k ? p.getFullYear() : 0, this._adjustInstDate(l)
            }
        },
        _getDefaultDate: function (a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
        },
        _determineDate: function (p, k, e) {
            var o = function (a) {
                    var i = new Date;
                    return i.setDate(i.getDate() + a), i
                },
                l = function (u) {
                    try {
                        return c.datepicker.parseDate(c.datepicker._get(p, "dateFormat"), u, c.datepicker._getFormatConfig(p))
                    } catch (q) {}
                    for (var z = (u.toLowerCase().match(/^c/) ? c.datepicker._getDate(p) : null) || new Date, w = z.getFullYear(), y = z.getMonth(), x = z.getDate(), t = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, v = t.exec(u); v;) {
                        switch (v[2] || "d") {
                            case "d":
                            case "D":
                                x += parseInt(v[1], 10);
                                break;
                            case "w":
                            case "W":
                                x += 7 * parseInt(v[1], 10);
                                break;
                            case "m":
                            case "M":
                                y += parseInt(v[1], 10), x = Math.min(x, c.datepicker._getDaysInMonth(w, y));
                                break;
                            case "y":
                            case "Y":
                                w += parseInt(v[1], 10), x = Math.min(x, c.datepicker._getDaysInMonth(w, y))
                        }
                        v = t.exec(u)
                    }
                    return new Date(w, y, x)
                },
                m = null == k || "" === k ? e : "string" == typeof k ? l(k) : "number" == typeof k ? isNaN(k) ? e : o(k) : new Date(k.getTime());
            return m = m && "Invalid Date" == "" + m ? e : m, m && (m.setHours(0), m.setMinutes(0), m.setSeconds(0), m.setMilliseconds(0)), this._daylightSavingAdjust(m)
        },
        _daylightSavingAdjust: function (a) {
            return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null
        },
        _setDate: function (l, u, m) {
            var k = !u,
                q = l.selectedMonth,
                o = l.selectedYear,
                p = this._restrictMinMax(l, this._determineDate(l, u, new Date));
            l.selectedDay = l.currentDay = p.getDate(), l.drawMonth = l.selectedMonth = l.currentMonth = p.getMonth(), l.drawYear = l.selectedYear = l.currentYear = p.getFullYear(), q === l.selectedMonth && o === l.selectedYear || m || this._notifyChange(l), this._adjustInstDate(l), l.input && l.input.val(k ? "" : this._formatDate(l))
        },
        _getDate: function (a) {
            var i = !a.currentYear || a.input && "" === a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return i
        },
        _attachHandlers: function (l) {
            var k = this._get(l, "stepMonths"),
                e = "#" + l.id.replace(/\\\\/g, "\\");
            l.dpDiv.find("[data-handler]").map(function () {
                var a = {
                    prev: function () {
                        c.datepicker._adjustDate(e, -k, "M")
                    },
                    next: function () {
                        c.datepicker._adjustDate(e, +k, "M")
                    },
                    hide: function () {
                        c.datepicker._hideDatepicker()
                    },
                    today: function () {
                        c.datepicker._gotoToday(e)
                    },
                    selectDay: function () {
                        return c.datepicker._selectDay(e, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function () {
                        return c.datepicker._selectMonthYear(e, this, "M"), !1
                    },
                    selectYear: function () {
                        return c.datepicker._selectMonthYear(e, this, "Y"), !1
                    }
                };
                c(this).bind(this.getAttribute("data-event"), a[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (ak) {
            var aQ, au, ac, aO, aE, aM, aG, ar, aA, aS, ai, ag, aI, aC, an, ap, aU, a0, ae, ab, ay, aY, aj, aW, aR, aD, aP, aF, ah, ad, aJ, av, ao, aw, at, al, a2, aB, aH, aN = new Date,
                aX = this._daylightSavingAdjust(new Date(aN.getFullYear(), aN.getMonth(), aN.getDate())),
                a1 = this._get(ak, "isRTL"),
                ax = this._get(ak, "showButtonPanel"),
                aa = this._get(ak, "hideIfNoPrevNext"),
                aL = this._get(ak, "navigationAsDateFormat"),
                af = this._getNumberOfMonths(ak),
                az = this._get(ak, "showCurrentAtPos"),
                aV = this._get(ak, "stepMonths"),
                aT = 1 !== af[0] || 1 !== af[1],
                aq = this._daylightSavingAdjust(ak.currentDay ? new Date(ak.currentYear, ak.currentMonth, ak.currentDay) : new Date(9999, 9, 9)),
                aK = this._getMinMaxDate(ak, "min"),
                aZ = this._getMinMaxDate(ak, "max"),
                a3 = ak.drawMonth - az,
                am = ak.drawYear;
            if (0 > a3 && (a3 += 12, am--), aZ) {
                for (aQ = this._daylightSavingAdjust(new Date(aZ.getFullYear(), aZ.getMonth() - af[0] * af[1] + 1, aZ.getDate())), aQ = aK && aK > aQ ? aK : aQ; this._daylightSavingAdjust(new Date(am, a3, 1)) > aQ;) {
                    a3--, 0 > a3 && (a3 = 11, am--)
                }
            }
            for (ak.drawMonth = a3, ak.drawYear = am, au = this._get(ak, "prevText"), au = aL ? this.formatDate(au, this._daylightSavingAdjust(new Date(am, a3 - aV, 1)), this._getFormatConfig(ak)) : au, ac = this._canAdjustMonth(ak, -1, am, a3) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + au + "'><span class='ui-icon ui-icon-circle-triangle-" + (a1 ? "e" : "w") + "'>" + au + "</span></a>" : aa ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + au + "'><span class='ui-icon ui-icon-circle-triangle-" + (a1 ? "e" : "w") + "'>" + au + "</span></a>", aO = this._get(ak, "nextText"), aO = aL ? this.formatDate(aO, this._daylightSavingAdjust(new Date(am, a3 + aV, 1)), this._getFormatConfig(ak)) : aO, aE = this._canAdjustMonth(ak, 1, am, a3) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + aO + "'><span class='ui-icon ui-icon-circle-triangle-" + (a1 ? "w" : "e") + "'>" + aO + "</span></a>" : aa ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + aO + "'><span class='ui-icon ui-icon-circle-triangle-" + (a1 ? "w" : "e") + "'>" + aO + "</span></a>", aM = this._get(ak, "currentText"), aG = this._get(ak, "gotoCurrent") && ak.currentDay ? aq : aX, aM = aL ? this.formatDate(aM, aG, this._getFormatConfig(ak)) : aM, ar = ak.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(ak, "closeText") + "</button>", aA = ax ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (a1 ? ar : "") + (this._isInRange(ak, aG) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + aM + "</button>" : "") + (a1 ? "" : ar) + "</div>" : "", aS = parseInt(this._get(ak, "firstDay"), 10), aS = isNaN(aS) ? 0 : aS, ai = this._get(ak, "showWeek"), ag = this._get(ak, "dayNames"), aI = this._get(ak, "dayNamesMin"), aC = this._get(ak, "monthNames"), an = this._get(ak, "monthNamesShort"), ap = this._get(ak, "beforeShowDay"), aU = this._get(ak, "showOtherMonths"), a0 = this._get(ak, "selectOtherMonths"), ae = this._getDefaultDate(ak), ab = "", aY = 0; af[0] > aY; aY++) {
                for (aj = "", this.maxRows = 4, aW = 0; af[1] > aW; aW++) {
                    if (aR = this._daylightSavingAdjust(new Date(am, a3, ak.selectedDay)), aD = " ui-corner-all", aP = "", aT) {
                        if (aP += "<div class='ui-datepicker-group", af[1] > 1) {
                            switch (aW) {
                                case 0:
                                    aP += " ui-datepicker-group-first", aD = " ui-corner-" + (a1 ? "right" : "left");
                                    break;
                                case af[1] - 1:
                                    aP += " ui-datepicker-group-last", aD = " ui-corner-" + (a1 ? "left" : "right");
                                    break;
                                default:
                                    aP += " ui-datepicker-group-middle", aD = ""
                            }
                        }
                        aP += "'>"
                    }
                    for (aP += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + aD + "'>" + (/all|left/.test(aD) && 0 === aY ? a1 ? aE : ac : "") + (/all|right/.test(aD) && 0 === aY ? a1 ? ac : aE : "") + this._generateMonthYearHeader(ak, a3, am, aK, aZ, aY > 0 || aW > 0, aC, an) + "</div><table class='ui-datepicker-calendar'><thead><tr>", aF = ai ? "<th class='ui-datepicker-week-col'>" + this._get(ak, "weekHeader") + "</th>" : "", ay = 0; 7 > ay; ay++) {
                        ah = (ay + aS) % 7, aF += "<th" + ((ay + aS + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + ag[ah] + "'>" + aI[ah] + "</span></th>"
                    }
                    for (aP += aF + "</tr></thead><tbody>", ad = this._getDaysInMonth(am, a3), am === ak.selectedYear && a3 === ak.selectedMonth && (ak.selectedDay = Math.min(ak.selectedDay, ad)), aJ = (this._getFirstDayOfMonth(am, a3) - aS + 7) % 7, av = Math.ceil((aJ + ad) / 7), ao = aT ? this.maxRows > av ? this.maxRows : av : av, this.maxRows = ao, aw = this._daylightSavingAdjust(new Date(am, a3, 1 - aJ)), at = 0; ao > at; at++) {
                        for (aP += "<tr>", al = ai ? "<td class='ui-datepicker-week-col'>" + this._get(ak, "calculateWeek")(aw) + "</td>" : "", ay = 0; 7 > ay; ay++) {
                            a2 = ap ? ap.apply(ak.input ? ak.input[0] : null, [aw]) : [!0, ""], aB = aw.getMonth() !== a3, aH = aB && !a0 || !a2[0] || aK && aK > aw || aZ && aw > aZ, al += "<td class='" + ((ay + aS + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (aB ? " ui-datepicker-other-month" : "") + (aw.getTime() === aR.getTime() && a3 === ak.selectedMonth && ak._keyEvent || ae.getTime() === aw.getTime() && ae.getTime() === aR.getTime() ? " " + this._dayOverClass : "") + (aH ? " " + this._unselectableClass + " ui-state-disabled" : "") + (aB && !aU ? "" : " " + a2[1] + (aw.getTime() === aq.getTime() ? " " + this._currentClass : "") + (aw.getTime() === aX.getTime() ? " ui-datepicker-today" : "")) + "'" + (aB && !aU || !a2[2] ? "" : " title='" + a2[2].replace(/'/g, "&#39;") + "'") + (aH ? "" : " data-handler='selectDay' data-event='click' data-month='" + aw.getMonth() + "' data-year='" + aw.getFullYear() + "'") + ">" + (aB && !aU ? "&#xa0;" : aH ? "<span class='ui-state-default'>" + aw.getDate() + "</span>" : "<a class='ui-state-default" + (aw.getTime() === aX.getTime() ? " ui-state-highlight" : "") + (aw.getTime() === aq.getTime() ? " ui-state-active" : "") + (aB ? " ui-priority-secondary" : "") + "' href='#'>" + aw.getDate() + "</a>") + "</td>", aw.setDate(aw.getDate() + 1), aw = this._daylightSavingAdjust(aw)
                        }
                        aP += al + "</tr>"
                    }
                    a3++, a3 > 11 && (a3 = 0, am++), aP += "</tbody></table>" + (aT ? "</div>" + (af[0] > 0 && aW === af[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), aj += aP
                }
                ab += aj
            }
            return ab += aA, ak._keyEvent = !1, ab
        },
        _generateMonthYearHeader: function (A, M, E, q, L, H, K, I) {
            var D, F, N, z, x, J, G, B, C = this._get(A, "changeMonth"),
                O = this._get(A, "changeYear"),
                P = this._get(A, "showMonthAfterYear"),
                w = "<div class='ui-datepicker-title'>",
                k = "";
            if (H || !C) {
                k += "<span class='ui-datepicker-month'>" + K[M] + "</span>"
            } else {
                for (D = q && q.getFullYear() === E, F = L && L.getFullYear() === E, k += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", N = 0; 12 > N; N++) {
                    (!D || N >= q.getMonth()) && (!F || L.getMonth() >= N) && (k += "<option value='" + N + "'" + (N === M ? " selected='selected'" : "") + ">" + I[N] + "</option>")
                }
                k += "</select>"
            }
            if (P || (w += k + (!H && C && O ? "" : "&#xa0;")), !A.yearshtml) {
                if (A.yearshtml = "", H || !O) {
                    w += "<span class='ui-datepicker-year'>" + E + "</span>"
                } else {
                    for (z = this._get(A, "yearRange").split(":"), x = (new Date).getFullYear(), J = function (a) {
                            var i = a.match(/c[+\-].*/) ? E + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? x + parseInt(a, 10) : parseInt(a, 10);
                            return isNaN(i) ? x : i
                        }, G = J(z[0]), B = Math.max(G, J(z[1] || "")), G = q ? Math.max(G, q.getFullYear()) : G, B = L ? Math.min(B, L.getFullYear()) : B, A.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; B >= G; G++) {
                        A.yearshtml += "<option value='" + G + "'" + (G === E ? " selected='selected'" : "") + ">" + G + "</option>"
                    }
                    A.yearshtml += "</select>", w += A.yearshtml, A.yearshtml = null
                }
            }
            return w += this._get(A, "yearSuffix"), P && (w += (!H && C && O ? "" : "&#xa0;") + k), w += "</div>"
        },
        _adjustInstDate: function (l, u, m) {
            var k = l.drawYear + ("Y" === m ? u : 0),
                q = l.drawMonth + ("M" === m ? u : 0),
                o = Math.min(l.selectedDay, this._getDaysInMonth(k, q)) + ("D" === m ? u : 0),
                p = this._restrictMinMax(l, this._daylightSavingAdjust(new Date(k, q, o)));
            l.selectedDay = p.getDate(), l.drawMonth = l.selectedMonth = p.getMonth(), l.drawYear = l.selectedYear = p.getFullYear(), ("M" === m || "Y" === m) && this._notifyChange(l)
        },
        _restrictMinMax: function (l, o) {
            var m = this._getMinMaxDate(l, "min"),
                k = this._getMinMaxDate(l, "max"),
                n = m && m > o ? m : o;
            return k && n > k ? k : n
        },
        _notifyChange: function (a) {
            var i = this._get(a, "onChangeMonthYear");
            i && i.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
        },
        _getNumberOfMonths: function (a) {
            var i = this._get(a, "numberOfMonths");
            return null == i ? [1, 1] : "number" == typeof i ? [1, i] : i
        },
        _getMinMaxDate: function (a, i) {
            return this._determineDate(a, this._get(a, i + "Date"), null)
        },
        _getDaysInMonth: function (a, i) {
            return 32 - this._daylightSavingAdjust(new Date(a, i, 32)).getDate()
        },
        _getFirstDayOfMonth: function (a, i) {
            return new Date(a, i, 1).getDay()
        },
        _canAdjustMonth: function (l, q, m, k) {
            var p = this._getNumberOfMonths(l),
                o = this._daylightSavingAdjust(new Date(m, k + (0 > q ? q : p[0] * p[1]), 1));
            return 0 > q && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(l, o)
        },
        _isInRange: function (l, x) {
            var p, k, w = this._getMinMaxDate(l, "min"),
                q = this._getMinMaxDate(l, "max"),
                v = null,
                u = null,
                m = this._get(l, "yearRange");
            return m && (p = m.split(":"), k = (new Date).getFullYear(), v = parseInt(p[0], 10), u = parseInt(p[1], 10), p[0].match(/[+\-].*/) && (v += k), p[1].match(/[+\-].*/) && (u += k)), (!w || x.getTime() >= w.getTime()) && (!q || x.getTime() <= q.getTime()) && (!v || x.getFullYear() >= v) && (!u || u >= x.getFullYear())
        },
        _getFormatConfig: function (a) {
            var i = this._get(a, "shortYearCutoff");
            return i = "string" != typeof i ? i : (new Date).getFullYear() % 100 + parseInt(i, 10), {
                shortYearCutoff: i,
                dayNamesShort: this._get(a, "dayNamesShort"),
                dayNames: this._get(a, "dayNames"),
                monthNamesShort: this._get(a, "monthNamesShort"),
                monthNames: this._get(a, "monthNames")
            }
        },
        _formatDate: function (l, o, m, k) {
            o || (l.currentDay = l.selectedDay, l.currentMonth = l.selectedMonth, l.currentYear = l.selectedYear);
            var n = o ? "object" == typeof o ? o : this._daylightSavingAdjust(new Date(k, m, o)) : this._daylightSavingAdjust(new Date(l.currentYear, l.currentMonth, l.currentDay));
            return this.formatDate(this._get(l, "dateFormat"), n, this._getFormatConfig(l))
        }
    }), c.fn.datepicker = function (e) {
        if (!this.length) {
            return this
        }
        c.datepicker.initialized || (c(document).mousedown(c.datepicker._checkExternalClick), c.datepicker.initialized = !0), 0 === c("#" + c.datepicker._mainDivId).length && c("body").append(c.datepicker.dpDiv);
        var a = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? c.datepicker["_" + e + "Datepicker"].apply(c.datepicker, [this[0]].concat(a)) : this.each(function () {
            "string" == typeof e ? c.datepicker["_" + e + "Datepicker"].apply(c.datepicker, [this].concat(a)) : c.datepicker._attachDatepicker(this, e)
        }) : c.datepicker["_" + e + "Datepicker"].apply(c.datepicker, [this[0]].concat(a))
    }, c.datepicker = new d, c.datepicker.initialized = !1, c.datepicker.uuid = (new Date).getTime(), c.datepicker.version = "1.10.3"
})(jQuery);
(function (a) {
    var c = {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        b = {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        };
    a.widget("ui.dialog", {
        version: "1.10.3",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function (e) {
                    var d = a(this).css(e).offset().top;
                    0 > d && a(this).css("top", e.top - d)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        _create: function () {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            }, this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && a.fn.draggable && this._makeDraggable(), this.options.resizable && a.fn.resizable && this._makeResizable(), this._isOpen = !1
        },
        _init: function () {
            this.options.autoOpen && this.open()
        },
        _appendTo: function () {
            var d = this.options.appendTo;
            return d && (d.jquery || d.nodeType) ? a(d) : this.document.find(d || "body").eq(0)
        },
        _destroy: function () {
            var d, f = this.originalPosition;
            this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), d = f.parent.children().eq(f.index), d.length && d[0] !== this.element[0] ? d.before(this.element) : f.parent.append(this.element)
        },
        widget: function () {
            return this.uiDialog
        },
        disable: a.noop,
        enable: a.noop,
        close: function (e) {
            var d = this;
            this._isOpen && this._trigger("beforeClose", e) !== !1 && (this._isOpen = !1, this._destroyOverlay(), this.opener.filter(":focusable").focus().length || a(this.document[0].activeElement).blur(), this._hide(this.uiDialog, this.options.hide, function () {
                d._trigger("close", e)
            }))
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function () {
            this._moveToTop()
        },
        _moveToTop: function (d, g) {
            var f = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
            return f && !g && this._trigger("focus", d), f
        },
        open: function () {
            var d = this;
            return this._isOpen ? (this._moveToTop() && this._focusTabbable(), undefined) : (this._isOpen = !0, this.opener = a(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function () {
                d._focusTabbable(), d._trigger("focus")
            }), this._trigger("open"), undefined)
        },
        _focusTabbable: function () {
            var d = this.element.find("[autofocus]");
            d.length || (d = this.element.find(":tabbable")), d.length || (d = this.uiDialogButtonPane.find(":tabbable")), d.length || (d = this.uiDialogTitlebarClose.filter(":tabbable")), d.length || (d = this.uiDialog), d.eq(0).focus()
        },
        _keepFocus: function (e) {
            function d() {
                var g = this.document[0].activeElement,
                    f = this.uiDialog[0] === g || a.contains(this.uiDialog[0], g);
                f || this._focusTabbable()
            }
            e.preventDefault(), d.call(this), this._delay(d)
        },
        _createWrapper: function () {
            this.uiDialog = a("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                keydown: function (g) {
                    if (this.options.closeOnEscape && !g.isDefaultPrevented() && g.keyCode && g.keyCode === a.ui.keyCode.ESCAPE) {
                        return g.preventDefault(), this.close(g), undefined
                    }
                    if (g.keyCode === a.ui.keyCode.TAB) {
                        var e = this.uiDialog.find(":tabbable"),
                            d = e.filter(":first"),
                            f = e.filter(":last");
                        g.target !== f[0] && g.target !== this.uiDialog[0] || g.shiftKey ? g.target !== d[0] && g.target !== this.uiDialog[0] || !g.shiftKey || (f.focus(1), g.preventDefault()) : (d.focus(1), g.preventDefault())
                    }
                },
                mousedown: function (d) {
                    this._moveToTop(d) && this._focusTabbable()
                }
            }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function () {
            var d;
            this.uiDialogTitlebar = a("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
                mousedown: function (e) {
                    a(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                }
            }), this.uiDialogTitlebarClose = a("<button></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                click: function (f) {
                    f.preventDefault(), this.close(f)
                }
            }), d = a("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(d), this.uiDialog.attr({
                "aria-labelledby": d.attr("id")
            })
        },
        _title: function (d) {
            this.options.title || d.html("&#160;"), d.text(this.options.title)
        },
        _createButtonPane: function () {
            this.uiDialogButtonPane = a("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = a("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
        },
        _createButtons: function () {
            var e = this,
                d = this.options.buttons;
            return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), a.isEmptyObject(d) || a.isArray(d) && !d.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), undefined) : (a.each(d, function (g, f) {
                var j, h;
                f = a.isFunction(f) ? {
                    click: f,
                    text: g
                } : f, f = a.extend({
                    type: "button"
                }, f), j = f.click, f.click = function () {
                    j.apply(e.element[0], arguments)
                }, h = {
                    icons: f.icons,
                    text: f.showText
                }, delete f.icons, delete f.showText, a("<button></button>", f).button(h).appendTo(e.uiButtonSet)
            }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), undefined)
        },
        _makeDraggable: function () {
            function f(g) {
                return {
                    position: g.position,
                    offset: g.offset
                }
            }
            var e = this,
                d = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (g, h) {
                    a(this).addClass("ui-dialog-dragging"), e._blockFrames(), e._trigger("dragStart", g, f(h))
                },
                drag: function (h, g) {
                    e._trigger("drag", h, f(g))
                },
                stop: function (h, g) {
                    d.position = [g.position.left - e.document.scrollLeft(), g.position.top - e.document.scrollTop()], a(this).removeClass("ui-dialog-dragging"), e._unblockFrames(), e._trigger("dragStop", h, f(g))
                }
            })
        },
        _makeResizable: function () {
            function j(i) {
                return {
                    originalPosition: i.originalPosition,
                    originalSize: i.originalSize,
                    position: i.position,
                    size: i.size
                }
            }
            var e = this,
                d = this.options,
                h = d.resizable,
                f = this.uiDialog.css("position"),
                g = "string" == typeof h ? h : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: d.maxWidth,
                maxHeight: d.maxHeight,
                minWidth: d.minWidth,
                minHeight: this._minHeight(),
                handles: g,
                start: function (i, k) {
                    a(this).addClass("ui-dialog-resizing"), e._blockFrames(), e._trigger("resizeStart", i, j(k))
                },
                resize: function (k, i) {
                    e._trigger("resize", k, j(i))
                },
                stop: function (k, i) {
                    d.height = a(this).height(), d.width = a(this).width(), a(this).removeClass("ui-dialog-resizing"), e._unblockFrames(), e._trigger("resizeStop", k, j(i))
                }
            }).css("position", f)
        },
        _minHeight: function () {
            var d = this.options;
            return "auto" === d.height ? d.minHeight : Math.min(d.minHeight, d.height)
        },
        _position: function () {
            var d = this.uiDialog.is(":visible");
            d || this.uiDialog.show(), this.uiDialog.position(this.options.position), d || this.uiDialog.hide()
        },
        _setOptions: function (d) {
            var g = this,
                e = !1,
                f = {};
            a.each(d, function (i, h) {
                g._setOption(i, h), i in c && (e = !0), i in b && (f[i] = h)
            }), e && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", f)
        },
        _setOption: function (f, j) {
            var g, d, h = this.uiDialog;
            "dialogClass" === f && h.removeClass(this.options.dialogClass).addClass(j), "disabled" !== f && (this._super(f, j), "appendTo" === f && this.uiDialog.appendTo(this._appendTo()), "buttons" === f && this._createButtons(), "closeText" === f && this.uiDialogTitlebarClose.button({
                label: "" + j
            }), "draggable" === f && (g = h.is(":data(ui-draggable)"), g && !j && h.draggable("destroy"), !g && j && this._makeDraggable()), "position" === f && this._position(), "resizable" === f && (d = h.is(":data(ui-resizable)"), d && !j && h.resizable("destroy"), d && "string" == typeof j && h.resizable("option", "handles", j), d || j === !1 || this._makeResizable()), "title" === f && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function () {
            var f, h, g, d = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }), d.minWidth > d.width && (d.width = d.minWidth), f = this.uiDialog.css({
                height: "auto",
                width: d.width
            }).outerHeight(), h = Math.max(0, d.minHeight - f), g = "number" == typeof d.maxHeight ? Math.max(0, d.maxHeight - f) : "none", "auto" === d.height ? this.element.css({
                minHeight: h,
                maxHeight: g,
                height: "auto"
            }) : this.element.height(Math.max(0, d.height - f)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function () {
            this.iframeBlocks = this.document.find("iframe").map(function () {
                var d = a(this);
                return a("<div>").css({
                    position: "absolute",
                    width: d.outerWidth(),
                    height: d.outerHeight()
                }).appendTo(d.parent()).offset(d.offset())[0]
            })
        },
        _unblockFrames: function () {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _allowInteraction: function (d) {
            return a(d.target).closest(".ui-dialog").length ? !0 : !!a(d.target).closest(".ui-datepicker").length
        },
        _createOverlay: function () {
            if (this.options.modal) {
                var e = this,
                    d = this.widgetFullName;
                a.ui.dialog.overlayInstances || this._delay(function () {
                    a.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function (f) {
                        e._allowInteraction(f) || (f.preventDefault(), a(".ui-dialog:visible:last .ui-dialog-content").data(d)._focusTabbable())
                    })
                }), this.overlay = a("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
                    mousedown: "_keepFocus"
                }), a.ui.dialog.overlayInstances++
            }
        },
        _destroyOverlay: function () {
            this.options.modal && this.overlay && (a.ui.dialog.overlayInstances--, a.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null)
        }
    }), a.ui.dialog.overlayInstances = 0, a.uiBackCompat !== !1 && a.widget("ui.dialog", a.ui.dialog, {
        _position: function () {
            var g, e = this.options.position,
                d = [],
                f = [0, 0];
            e ? (("string" == typeof e || "object" == typeof e && "0" in e) && (d = e.split ? e.split(" ") : [e[0], e[1]], 1 === d.length && (d[1] = d[0]), a.each(["left", "top"], function (h, i) {
                +d[h] === d[h] && (f[h] = d[h], d[h] = i)
            }), e = {
                my: d[0] + (0 > f[0] ? f[0] : "+" + f[0]) + " " + d[1] + (0 > f[1] ? f[1] : "+" + f[1]),
                at: d.join(" ")
            }), e = a.extend({}, a.ui.dialog.prototype.options.position, e)) : e = a.ui.dialog.prototype.options.position, g = this.uiDialog.is(":visible"), g || this.uiDialog.show(), this.uiDialog.position(e), g || this.uiDialog.hide()
        }
    })
})(jQuery);
(function (a) {
    a.widget("ui.menu", {
        version: "1.10.3",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, a.proxy(function (b) {
                this.options.disabled && b.preventDefault()
            }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                "mousedown .ui-menu-item > a": function (b) {
                    b.preventDefault()
                },
                "click .ui-state-disabled > a": function (b) {
                    b.preventDefault()
                },
                "click .ui-menu-item:has(a)": function (c) {
                    var b = a(c.target).closest(".ui-menu-item");
                    !this.mouseHandled && b.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(c), b.has(".ui-menu").length ? this.expand(c) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function (c) {
                    var b = a(c.currentTarget);
                    b.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(c, b)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function (b, d) {
                    var c = this.active || this.element.children(".ui-menu-item").eq(0);
                    d || this.focus(b, c)
                },
                blur: function (b) {
                    this._delay(function () {
                        a.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(b)
                    })
                },
                keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function (b) {
                    a(b.target).closest(".ui-menu").length || this.collapseAll(b), this.mouseHandled = !1
                }
            })
        },
        _destroy: function () {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                var b = a(this);
                b.data("ui-menu-submenu-carat") && b.remove()
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function (k) {
            function d(h) {
                return h.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var j, b, e, g, f, c = !0;
            switch (k.keyCode) {
                case a.ui.keyCode.PAGE_UP:
                    this.previousPage(k);
                    break;
                case a.ui.keyCode.PAGE_DOWN:
                    this.nextPage(k);
                    break;
                case a.ui.keyCode.HOME:
                    this._move("first", "first", k);
                    break;
                case a.ui.keyCode.END:
                    this._move("last", "last", k);
                    break;
                case a.ui.keyCode.UP:
                    this.previous(k);
                    break;
                case a.ui.keyCode.DOWN:
                    this.next(k);
                    break;
                case a.ui.keyCode.LEFT:
                    this.collapse(k);
                    break;
                case a.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(k);
                    break;
                case a.ui.keyCode.ENTER:
                case a.ui.keyCode.SPACE:
                    this._activate(k);
                    break;
                case a.ui.keyCode.ESCAPE:
                    this.collapse(k);
                    break;
                default:
                    c = !1, b = this.previousFilter || "", e = String.fromCharCode(k.keyCode), g = !1, clearTimeout(this.filterTimer), e === b ? g = !0 : e = b + e, f = RegExp("^" + d(e), "i"), j = this.activeMenu.children(".ui-menu-item").filter(function () {
                        return f.test(a(this).children("a").text())
                    }), j = g && -1 !== j.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : j, j.length || (e = String.fromCharCode(k.keyCode), f = RegExp("^" + d(e), "i"), j = this.activeMenu.children(".ui-menu-item").filter(function () {
                        return f.test(a(this).children("a").text())
                    })), j.length ? (this.focus(k, j), j.length > 1 ? (this.previousFilter = e, this.filterTimer = this._delay(function () {
                        delete this.previousFilter
                    }, 1000)) : delete this.previousFilter) : delete this.previousFilter
            }
            c && k.preventDefault()
        },
        _activate: function (b) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(b) : this.select(b))
        },
        refresh: function () {
            var d, b = this.options.icons.submenu,
                c = this.element.find(this.options.menus);
            c.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function () {
                var g = a(this),
                    f = g.prev("a"),
                    e = a("<span>").addClass("ui-menu-icon ui-icon " + b).data("ui-menu-submenu-carat", !0);
                f.attr("aria-haspopup", "true").prepend(e), g.attr("aria-labelledby", f.attr("id"))
            }), d = c.add(this.element), d.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }), d.children(":not(.ui-menu-item)").each(function () {
                var e = a(this);
                /[^\-\u2014\u2013\s]/.test(e.text()) || e.addClass("ui-widget-content ui-menu-divider")
            }), d.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !a.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function () {
            return {
                menu: "menuitem",
                listbox: "option"
            } [this.options.role]
        },
        _setOption: function (b, c) {
            "icons" === b && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(c.submenu), this._super(b, c)
        },
        focus: function (b, f) {
            var c, d;
            this.blur(b, b && "focus" === b.type), this._scrollIntoView(f), this.active = f.first(), d = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", d.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), b && "keydown" === b.type ? this._close() : this.timer = this._delay(function () {
                this._close()
            }, this.delay), c = f.children(".ui-menu"), c.length && /^mouse/.test(b.type) && this._startOpening(c), this.activeMenu = f.parent(), this._trigger("focus", b, {
                item: f
            })
        },
        _scrollIntoView: function (h) {
            var c, g, b, d, f, e;
            this._hasScroll() && (c = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, g = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, b = h.offset().top - this.activeMenu.offset().top - c - g, d = this.activeMenu.scrollTop(), f = this.activeMenu.height(), e = h.height(), 0 > b ? this.activeMenu.scrollTop(d + b) : b + e > f && this.activeMenu.scrollTop(d + b - f + e))
        },
        blur: function (b, c) {
            c || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", b, {
                item: this.active
            }))
        },
        _startOpening: function (b) {
            clearTimeout(this.timer), "true" === b.attr("aria-hidden") && (this.timer = this._delay(function () {
                this._close(), this._open(b)
            }, this.delay))
        },
        _open: function (c) {
            var b = a.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(c.parents(".ui-menu")).hide().attr("aria-hidden", "true"), c.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(b)
        },
        collapseAll: function (c, b) {
            clearTimeout(this.timer), this.timer = this._delay(function () {
                var d = b ? this.element : a(c && c.target).closest(this.element.find(".ui-menu"));
                d.length || (d = this.element), this._close(d), this.blur(c), this.activeMenu = d
            }, this.delay)
        },
        _close: function (b) {
            b || (b = this.active ? this.active.parent() : this.element), b.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function (b) {
            var c = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            c && c.length && (this._close(), this.focus(b, c))
        },
        expand: function (b) {
            var c = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            c && c.length && (this._open(c.parent()), this._delay(function () {
                this.focus(b, c)
            }))
        },
        next: function (b) {
            this._move("next", "first", b)
        },
        previous: function (b) {
            this._move("prev", "last", b)
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function (b, f, c) {
            var d;
            this.active && (d = "first" === b || "last" === b ? this.active["first" === b ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[b + "All"](".ui-menu-item").eq(0)), d && d.length && this.active || (d = this.activeMenu.children(".ui-menu-item")[f]()), this.focus(c, d)
        },
        nextPage: function (e) {
            var c, d, b;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (d = this.active.offset().top, b = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
                return c = a(this), 0 > c.offset().top - d - b
            }), this.focus(e, c)) : this.focus(e, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(e), undefined)
        },
        previousPage: function (e) {
            var c, d, b;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (d = this.active.offset().top, b = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
                return c = a(this), c.offset().top - d + b > 0
            }), this.focus(e, c)) : this.focus(e, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(e), undefined)
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function (c) {
            this.active = this.active || a(c.target).closest(".ui-menu-item");
            var b = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(c, !0), this._trigger("select", c, b)
        }
    })
})(jQuery);
(function (a, b) {
    a.widget("ui.progressbar", {
        version: "1.10.3",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function () {
            this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            }), this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
        },
        _destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
        },
        value: function (c) {
            return c === b ? this.options.value : (this.options.value = this._constrainedValue(c), this._refreshValue(), b)
        },
        _constrainedValue: function (c) {
            return c === b && (c = this.options.value), this.indeterminate = c === !1, "number" != typeof c && (c = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, c))
        },
        _setOptions: function (c) {
            var d = c.value;
            delete c.value, this._super(c), this.options.value = this._constrainedValue(d), this._refreshValue()
        },
        _setOption: function (c, d) {
            "max" === c && (d = Math.max(this.min, d)), this._super(c, d)
        },
        _percentage: function () {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function () {
            var d = this.options.value,
                c = this._percentage();
            this.valueDiv.toggle(this.indeterminate || d > this.min).toggleClass("ui-corner-right", d === this.options.max).width(c.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = a("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": d
            }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== d && (this.oldValue = d, this._trigger("change")), d === this.options.max && this._trigger("complete")
        }
    })
})(jQuery);
(function (a) {
    var b = 5;
    a.widget("ui.slider", a.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        _create: function () {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
        },
        _refresh: function () {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function () {
            var h, d, g = this.options,
                c = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                e = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                f = [];
            for (d = g.values && g.values.length || 1, c.length > d && (c.slice(d).remove(), c = c.slice(0, d)), h = c.length; d > h; h++) {
                f.push(e)
            }
            this.handles = c.add(a(f.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (i) {
                a(this).data("ui-slider-handle-index", i)
            })
        },
        _createRange: function () {
            var d = this.options,
                c = "";
            d.range ? (d.range === !0 && (d.values ? d.values.length && 2 !== d.values.length ? d.values = [d.values[0], d.values[0]] : a.isArray(d.values) && (d.values = d.values.slice(0)) : d.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = a("<div></div>").appendTo(this.element), c = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(c + ("min" === d.range || "max" === d.range ? " ui-slider-range-" + d.range : ""))) : this.range = a([])
        },
        _setupEvents: function () {
            var c = this.handles.add(this.range).filter("a");
            this._off(c), this._on(c, this._handleEvents), this._hoverable(c), this._focusable(c)
        },
        _destroy: function () {
            this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        },
        _mouseCapture: function (v) {
            var g, q, d, k, p, m, f, j, w = this,
                e = this.options;
            return e.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), g = {
                x: v.pageX,
                y: v.pageY
            }, q = this._normValueFromMouse(g), d = this._valueMax() - this._valueMin() + 1, this.handles.each(function (h) {
                var c = Math.abs(q - w.values(h));
                (d > c || d === c && (h === w._lastChangedValue || w.values(h) === e.min)) && (d = c, k = a(this), p = h)
            }), m = this._start(v, p), m === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = p, k.addClass("ui-state-active").focus(), f = k.offset(), j = !a(v.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = j ? {
                left: 0,
                top: 0
            } : {
                left: v.pageX - f.left - k.width() / 2,
                top: v.pageY - f.top - k.height() / 2 - (parseInt(k.css("borderTopWidth"), 10) || 0) - (parseInt(k.css("borderBottomWidth"), 10) || 0) + (parseInt(k.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(v, p, q), this._animateOff = !0, !0))
        },
        _mouseStart: function () {
            return !0
        },
        _mouseDrag: function (c) {
            var f = {
                    x: c.pageX,
                    y: c.pageY
                },
                d = this._normValueFromMouse(f);
            return this._slide(c, this._handleIndex, d), !1
        },
        _mouseStop: function (c) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(c, this._handleIndex), this._change(c, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function () {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (d) {
            var j, f, h, c, g;
            return "horizontal" === this.orientation ? (j = this.elementSize.width, f = d.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (j = this.elementSize.height, f = d.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), h = f / j, h > 1 && (h = 1), 0 > h && (h = 0), "vertical" === this.orientation && (h = 1 - h), c = this._valueMax() - this._valueMin(), g = this._valueMin() + h * c, this._trimAlignValue(g)
        },
        _start: function (c, f) {
            var d = {
                handle: this.handles[f],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (d.value = this.values(f), d.values = this.values()), this._trigger("start", c, d)
        },
        _slide: function (d, j, f) {
            var h, c, g;
            this.options.values && this.options.values.length ? (h = this.values(j ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === j && f > h || 1 === j && h > f) && (f = h), f !== this.values(j) && (c = this.values(), c[j] = f, g = this._trigger("slide", d, {
                handle: this.handles[j],
                value: f,
                values: c
            }), h = this.values(j ? 0 : 1), g !== !1 && this.values(j, f, !0))) : f !== this.value() && (g = this._trigger("slide", d, {
                handle: this.handles[j],
                value: f
            }), g !== !1 && this.value(f))
        },
        _stop: function (c, f) {
            var d = {
                handle: this.handles[f],
                value: this.value()
            };
            this.options.values && this.options.values.length && (d.value = this.values(f), d.values = this.values()), this._trigger("stop", c, d)
        },
        _change: function (c, f) {
            if (!this._keySliding && !this._mouseSliding) {
                var d = {
                    handle: this.handles[f],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (d.value = this.values(f), d.values = this.values()), this._lastChangedValue = f, this._trigger("change", c, d)
            }
        },
        value: function (c) {
            return arguments.length ? (this.options.value = this._trimAlignValue(c), this._refreshValue(), this._change(null, 0), undefined) : this._value()
        },
        values: function (g, d) {
            var f, c, e;
            if (arguments.length > 1) {
                return this.options.values[g] = this._trimAlignValue(d), this._refreshValue(), this._change(null, g), undefined
            }
            if (!arguments.length) {
                return this._values()
            }
            if (!a.isArray(arguments[0])) {
                return this.options.values && this.options.values.length ? this._values(g) : this.value()
            }
            for (f = this.options.values, c = arguments[0], e = 0; f.length > e; e += 1) {
                f[e] = this._trimAlignValue(c[e]), this._change(null, e)
            }
            this._refreshValue()
        },
        _setOption: function (f, d) {
            var e, c = 0;
            switch ("range" === f && this.options.range === !0 && ("min" === d ? (this.options.value = this._values(0), this.options.values = null) : "max" === d && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), a.isArray(this.options.values) && (c = this.options.values.length), a.Widget.prototype._setOption.apply(this, arguments), f) {
                case "orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), e = 0; c > e; e += 1) {
                        this._change(null, e)
                    }
                    this._animateOff = !1;
                    break;
                case "min":
                case "max":
                    this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function () {
            var c = this.options.value;
            return c = this._trimAlignValue(c)
        },
        _values: function (c) {
            var g, d, f;
            if (arguments.length) {
                return g = this.options.values[c], g = this._trimAlignValue(g)
            }
            if (this.options.values && this.options.values.length) {
                for (d = this.options.values.slice(), f = 0; d.length > f; f += 1) {
                    d[f] = this._trimAlignValue(d[f])
                }
                return d
            }
            return []
        },
        _trimAlignValue: function (c) {
            if (this._valueMin() >= c) {
                return this._valueMin()
            }
            if (c >= this._valueMax()) {
                return this._valueMax()
            }
            var g = this.options.step > 0 ? this.options.step : 1,
                d = (c - this._valueMin()) % g,
                f = c - d;
            return 2 * Math.abs(d) >= g && (f += d > 0 ? g : -g), parseFloat(f.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var p, e, m, c, g, k = this.options.range,
                j = this.options,
                d = this,
                f = this._animateOff ? !1 : j.animate,
                q = {};
            this.options.values && this.options.values.length ? this.handles.each(function (h) {
                e = 100 * ((d.values(h) - d._valueMin()) / (d._valueMax() - d._valueMin())), q["horizontal" === d.orientation ? "left" : "bottom"] = e + "%", a(this).stop(1, 1)[f ? "animate" : "css"](q, j.animate), d.options.range === !0 && ("horizontal" === d.orientation ? (0 === h && d.range.stop(1, 1)[f ? "animate" : "css"]({
                    left: e + "%"
                }, j.animate), 1 === h && d.range[f ? "animate" : "css"]({
                    width: e - p + "%"
                }, {
                    queue: !1,
                    duration: j.animate
                })) : (0 === h && d.range.stop(1, 1)[f ? "animate" : "css"]({
                    bottom: e + "%"
                }, j.animate), 1 === h && d.range[f ? "animate" : "css"]({
                    height: e - p + "%"
                }, {
                    queue: !1,
                    duration: j.animate
                }))), p = e
            }) : (m = this.value(), c = this._valueMin(), g = this._valueMax(), e = g !== c ? 100 * ((m - c) / (g - c)) : 0, q["horizontal" === this.orientation ? "left" : "bottom"] = e + "%", this.handle.stop(1, 1)[f ? "animate" : "css"](q, j.animate), "min" === k && "horizontal" === this.orientation && this.range.stop(1, 1)[f ? "animate" : "css"]({
                width: e + "%"
            }, j.animate), "max" === k && "horizontal" === this.orientation && this.range[f ? "animate" : "css"]({
                width: 100 - e + "%"
            }, {
                queue: !1,
                duration: j.animate
            }), "min" === k && "vertical" === this.orientation && this.range.stop(1, 1)[f ? "animate" : "css"]({
                height: e + "%"
            }, j.animate), "max" === k && "vertical" === this.orientation && this.range[f ? "animate" : "css"]({
                height: 100 - e + "%"
            }, {
                queue: !1,
                duration: j.animate
            }))
        },
        _handleEvents: {
            keydown: function (d) {
                var h, c, e, g, f = a(d.target).data("ui-slider-handle-index");
                switch (d.keyCode) {
                    case a.ui.keyCode.HOME:
                    case a.ui.keyCode.END:
                    case a.ui.keyCode.PAGE_UP:
                    case a.ui.keyCode.PAGE_DOWN:
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (d.preventDefault(), !this._keySliding && (this._keySliding = !0, a(d.target).addClass("ui-state-active"), h = this._start(d, f), h === !1)) {
                            return
                        }
                }
                switch (g = this.options.step, c = e = this.options.values && this.options.values.length ? this.values(f) : this.value(), d.keyCode) {
                    case a.ui.keyCode.HOME:
                        e = this._valueMin();
                        break;
                    case a.ui.keyCode.END:
                        e = this._valueMax();
                        break;
                    case a.ui.keyCode.PAGE_UP:
                        e = this._trimAlignValue(c + (this._valueMax() - this._valueMin()) / b);
                        break;
                    case a.ui.keyCode.PAGE_DOWN:
                        e = this._trimAlignValue(c - (this._valueMax() - this._valueMin()) / b);
                        break;
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                        if (c === this._valueMax()) {
                            return
                        }
                        e = this._trimAlignValue(c + g);
                        break;
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (c === this._valueMin()) {
                            return
                        }
                        e = this._trimAlignValue(c - g)
                }
                this._slide(d, f, e)
            },
            click: function (c) {
                c.preventDefault()
            },
            keyup: function (d) {
                var c = a(d.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(d, c), this._change(d, c), a(d.target).removeClass("ui-state-active"))
            }
        }
    })
})(jQuery);
(function (a) {
    function b(c) {
        return function () {
            var d = this.element.val();
            c.apply(this, arguments), this._refresh(), d !== this.element.val() && this._trigger("change")
        }
    }
    a.widget("ui.spinner", {
        version: "1.10.3",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function () {
            this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function () {
            var d = {},
                c = this.element;
            return a.each(["min", "max", "step"], function (g, h) {
                var f = c.attr(h);
                void 0 !== f && f.length && (d[h] = f)
            }), d
        },
        _events: {
            keydown: function (c) {
                this._start(c) && this._keydown(c) && c.preventDefault()
            },
            keyup: "_stop",
            focus: function () {
                this.previous = this.element.val()
            },
            blur: function (c) {
                return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", c), void 0)
            },
            mousewheel: function (c, d) {
                if (d) {
                    if (!this.spinning && !this._start(c)) {
                        return !1
                    }
                    this._spin((d > 0 ? 1 : -1) * this.options.step, c), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function () {
                        this.spinning && this._stop(c)
                    }, 100), c.preventDefault()
                }
            },
            "mousedown .ui-spinner-button": function (e) {
                function c() {
                    var f = this.element[0] === this.document[0].activeElement;
                    f || (this.element.focus(), this.previous = d, this._delay(function () {
                        this.previous = d
                    }))
                }
                var d;
                d = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), e.preventDefault(), c.call(this), this.cancelBlur = !0, this._delay(function () {
                    delete this.cancelBlur, c.call(this)
                }), this._start(e) !== !1 && this._repeat(null, a(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function (c) {
                return a(c.currentTarget).hasClass("ui-state-active") ? this._start(c) === !1 ? !1 : (this._repeat(null, a(c.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, c), void 0) : void 0
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function () {
            var c = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"), this.buttons = c.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(0.5 * c.height()) && c.height() > 0 && c.height(c.height()), this.options.disabled && this.disable()
        },
        _keydown: function (e) {
            var c = this.options,
                d = a.ui.keyCode;
            switch (e.keyCode) {
                case d.UP:
                    return this._repeat(null, 1, e), !0;
                case d.DOWN:
                    return this._repeat(null, -1, e), !0;
                case d.PAGE_UP:
                    return this._repeat(null, c.page, e), !0;
                case d.PAGE_DOWN:
                    return this._repeat(null, -c.page, e), !0
            }
            return !1
        },
        _uiSpinnerHtml: function () {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
        },
        _buttonHtml: function () {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
        },
        _start: function (c) {
            return this.spinning || this._trigger("start", c) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
        },
        _repeat: function (c, f, d) {
            c = c || 500, clearTimeout(this.timer), this.timer = this._delay(function () {
                this._repeat(40, f, d)
            }, c), this._spin(f * this.options.step, d)
        },
        _spin: function (c, f) {
            var d = this.value() || 0;
            this.counter || (this.counter = 1), d = this._adjustValue(d + c * this._increment(this.counter)), this.spinning && this._trigger("spin", f, {
                value: d
            }) === !1 || (this._value(d), this.counter++)
        },
        _increment: function (d) {
            var c = this.options.incremental;
            return c ? a.isFunction(c) ? c(d) : Math.floor(d * d * d / 50000 - d * d / 500 + 17 * d / 200 + 1) : 1
        },
        _precision: function () {
            var c = this._precisionOf(this.options.step);
            return null !== this.options.min && (c = Math.max(c, this._precisionOf(this.options.min))), c
        },
        _precisionOf: function (c) {
            var f = "" + c,
                d = f.indexOf(".");
            return -1 === d ? 0 : f.length - d - 1
        },
        _adjustValue: function (c) {
            var g, d, f = this.options;
            return g = null !== f.min ? f.min : 0, d = c - g, d = Math.round(d / f.step) * f.step, c = g + d, c = parseFloat(c.toFixed(this._precision())), null !== f.max && c > f.max ? f.max : null !== f.min && f.min > c ? f.min : c
        },
        _stop: function (c) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", c))
        },
        _setOption: function (c, f) {
            if ("culture" === c || "numberFormat" === c) {
                var d = this._parse(this.element.val());
                return this.options[c] = f, this.element.val(this._format(d)), void 0
            }("max" === c || "min" === c || "step" === c) && "string" == typeof f && (f = this._parse(f)), "icons" === c && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(f.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(f.down)), this._super(c, f), "disabled" === c && (f ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
        },
        _setOptions: b(function (c) {
            this._super(c), this._value(this.element.val())
        }),
        _parse: function (c) {
            return "string" == typeof c && "" !== c && (c = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(c, 10, this.options.culture) : +c), "" === c || isNaN(c) ? null : c
        },
        _format: function (c) {
            return "" === c ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(c, this.options.numberFormat, this.options.culture) : c
        },
        _refresh: function () {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        _value: function (c, f) {
            var d;
            "" !== c && (d = this._parse(c), null !== d && (f || (d = this._adjustValue(d)), c = this._format(d))), this.element.val(c), this._refresh()
        },
        _destroy: function () {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
        },
        stepUp: b(function (c) {
            this._stepUp(c)
        }),
        _stepUp: function (c) {
            this._start() && (this._spin((c || 1) * this.options.step), this._stop())
        },
        stepDown: b(function (c) {
            this._stepDown(c)
        }),
        _stepDown: function (c) {
            this._start() && (this._spin((c || 1) * -this.options.step), this._stop())
        },
        pageUp: b(function (c) {
            this._stepUp((c || 1) * this.options.page)
        }),
        pageDown: b(function (c) {
            this._stepDown((c || 1) * this.options.page)
        }),
        value: function (c) {
            return arguments.length ? (b(this._value).call(this, c), void 0) : this._parse(this.element.val())
        },
        widget: function () {
            return this.uiSpinner
        }
    })
})(jQuery);
(function (c, h) {
    function d() {
        return ++b
    }

    function g(a) {
        return a.hash.length > 1 && decodeURIComponent(a.href.replace(f, "")) === decodeURIComponent(location.href.replace(f, ""))
    }
    var b = 0,
        f = /#.*$/;
    c.widget("ui.tabs", {
        version: "1.10.3",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function () {
            var e = this,
                a = this.options;
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", a.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function (i) {
                c(this).is(".ui-state-disabled") && i.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                c(this).closest("li").is(".ui-state-disabled") && this.blur()
            }), this._processTabs(), a.active = this._initialActive(), c.isArray(a.disabled) && (a.disabled = c.unique(a.disabled.concat(c.map(this.tabs.filter(".ui-state-disabled"), function (i) {
                return e.tabs.index(i)
            }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(a.active) : c(), this._refresh(), this.active.length && this.load(a.active)
        },
        _initialActive: function () {
            var j = this.options.active,
                k = this.options.collapsible,
                e = location.hash.substring(1);
            return null === j && (e && this.tabs.each(function (i, a) {
                return c(a).attr("aria-controls") === e ? (j = i, !1) : h
            }), null === j && (j = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === j || -1 === j) && (j = this.tabs.length ? 0 : !1)), j !== !1 && (j = this.tabs.index(this.tabs.eq(j)), -1 === j && (j = k ? !1 : 0)), !k && j === !1 && this.anchors.length && (j = 0), j
        },
        _getCreateEventData: function () {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : c()
            }
        },
        _tabKeydown: function (j) {
            var l = c(this.document[0].activeElement).closest("li"),
                e = this.tabs.index(l),
                k = !0;
            if (!this._handlePageNav(j)) {
                switch (j.keyCode) {
                    case c.ui.keyCode.RIGHT:
                    case c.ui.keyCode.DOWN:
                        e++;
                        break;
                    case c.ui.keyCode.UP:
                    case c.ui.keyCode.LEFT:
                        k = !1, e--;
                        break;
                    case c.ui.keyCode.END:
                        e = this.anchors.length - 1;
                        break;
                    case c.ui.keyCode.HOME:
                        e = 0;
                        break;
                    case c.ui.keyCode.SPACE:
                        return j.preventDefault(), clearTimeout(this.activating), this._activate(e), h;
                    case c.ui.keyCode.ENTER:
                        return j.preventDefault(), clearTimeout(this.activating), this._activate(e === this.options.active ? !1 : e), h;
                    default:
                        return
                }
                j.preventDefault(), clearTimeout(this.activating), e = this._focusNextTab(e, k), j.ctrlKey || (l.attr("aria-selected", "false"), this.tabs.eq(e).attr("aria-selected", "true"), this.activating = this._delay(function () {
                    this.option("active", e)
                }, this.delay))
            }
        },
        _panelKeydown: function (a) {
            this._handlePageNav(a) || a.ctrlKey && a.keyCode === c.ui.keyCode.UP && (a.preventDefault(), this.active.focus())
        },
        _handlePageNav: function (a) {
            return a.altKey && a.keyCode === c.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : a.altKey && a.keyCode === c.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : h
        },
        _findNextTab: function (l, j) {
            function k() {
                return l > e && (l = 0), 0 > l && (l = e), l
            }
            for (var e = this.tabs.length - 1; - 1 !== c.inArray(k(), this.options.disabled);) {
                l = j ? l + 1 : l - 1
            }
            return l
        },
        _focusNextTab: function (a, i) {
            return a = this._findNextTab(a, i), this.tabs.eq(a).focus(), a
        },
        _setOption: function (a, j) {
            return "active" === a ? (this._activate(j), h) : "disabled" === a ? (this._setupDisabled(j), h) : (this._super(a, j), "collapsible" === a && (this.element.toggleClass("ui-tabs-collapsible", j), j || this.options.active !== !1 || this._activate(0)), "event" === a && this._setupEvents(j), "heightStyle" === a && this._setupHeightStyle(j), h)
        },
        _tabId: function (a) {
            return a.attr("aria-controls") || "ui-tabs-" + d()
        },
        _sanitizeSelector: function (a) {
            return a ? a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function () {
            var e = this.options,
                a = this.tablist.children(":has(a[href])");
            e.disabled = c.map(a.filter(".ui-state-disabled"), function (i) {
                return a.index(i)
            }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !c.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = c()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = c()), this._refresh()
        },
        _refresh: function () {
            this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function () {
            var a = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }), this.anchors = this.tabs.map(function () {
                return c("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }), this.panels = c(), this.anchors.each(function (k, e) {
                var p, s, q, j = c(e).uniqueId().attr("id"),
                    m = c(e).closest("li"),
                    t = m.attr("aria-controls");
                g(e) ? (p = e.hash, s = a.element.find(a._sanitizeSelector(p))) : (q = a._tabId(m), p = "#" + q, s = a.element.find(p), s.length || (s = a._createPanel(q), s.insertAfter(a.panels[k - 1] || a.tablist)), s.attr("aria-live", "polite")), s.length && (a.panels = a.panels.add(s)), t && m.data("ui-tabs-aria-controls", t), m.attr({
                    "aria-controls": p.substring(1),
                    "aria-labelledby": j
                }), s.attr("aria-labelledby", j)
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
        },
        _getList: function () {
            return this.element.find("ol,ul").eq(0)
        },
        _createPanel: function (a) {
            return c("<div>").attr("id", a).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function (j) {
            c.isArray(j) && (j.length ? j.length === this.anchors.length && (j = !0) : j = !1);
            for (var a, e = 0; a = this.tabs[e]; e++) {
                j === !0 || -1 !== c.inArray(e, j) ? c(a).addClass("ui-state-disabled").attr("aria-disabled", "true") : c(a).removeClass("ui-state-disabled").removeAttr("aria-disabled")
            }
            this.options.disabled = j
        },
        _setupEvents: function (e) {
            var a = {
                click: function (i) {
                    i.preventDefault()
                }
            };
            e && c.each(e.split(" "), function (i, j) {
                a[j] = "_eventHandler"
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, a), this._on(this.tabs, {
                keydown: "_tabKeydown"
            }), this._on(this.panels, {
                keydown: "_panelKeydown"
            }), this._focusable(this.tabs), this._hoverable(this.tabs)
        },
        _setupHeightStyle: function (j) {
            var a, e = this.element.parent();
            "fill" === j ? (a = e.height(), a -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function () {
                var k = c(this),
                    i = k.css("position");
                "absolute" !== i && "fixed" !== i && (a -= k.outerHeight(!0))
            }), this.element.children().not(this.panels).each(function () {
                a -= c(this).outerHeight(!0)
            }), this.panels.each(function () {
                c(this).height(Math.max(0, a - c(this).innerHeight() + c(this).height()))
            }).css("overflow", "auto")) : "auto" === j && (a = 0, this.panels.each(function () {
                a = Math.max(a, c(this).height("").height())
            }).height(a))
        },
        _eventHandler: function (x) {
            var k = this.options,
                w = this.active,
                e = c(x.currentTarget),
                p = e.closest("li"),
                v = p[0] === w[0],
                q = v && k.collapsible,
                j = q ? c() : this._getPanelForTab(p),
                m = w.length ? this._getPanelForTab(w) : c(),
                y = {
                    oldTab: w,
                    oldPanel: m,
                    newTab: q ? c() : p,
                    newPanel: j
                };
            x.preventDefault(), p.hasClass("ui-state-disabled") || p.hasClass("ui-tabs-loading") || this.running || v && !k.collapsible || this._trigger("beforeActivate", x, y) === !1 || (k.active = q ? !1 : this.tabs.index(p), this.active = v ? c() : p, this.xhr && this.xhr.abort(), m.length || j.length || c.error("jQuery UI Tabs: Mismatching fragment identifier."), j.length && this.load(this.tabs.index(p), x), this._toggle(x, y))
        },
        _toggle: function (q, j) {
            function p() {
                k.running = !1, k._trigger("activate", q, j)
            }

            function e() {
                j.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), m.length && k.options.show ? k._show(m, k.options.show, p) : (m.show(), p())
            }
            var k = this,
                m = j.newPanel,
                l = j.oldPanel;
            this.running = !0, l.length && this.options.hide ? this._hide(l, this.options.hide, function () {
                j.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), e()
            }) : (j.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), l.hide(), e()), l.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), j.oldTab.attr("aria-selected", "false"), m.length && l.length ? j.oldTab.attr("tabIndex", -1) : m.length && this.tabs.filter(function () {
                return 0 === c(this).attr("tabIndex")
            }).attr("tabIndex", -1), m.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }), j.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _activate: function (j) {
            var a, e = this._findActive(j);
            e[0] !== this.active[0] && (e.length || (e = this.active), a = e.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: a,
                currentTarget: a,
                preventDefault: c.noop
            }))
        },
        _findActive: function (a) {
            return a === !1 ? c() : this.tabs.eq(a)
        },
        _getIndex: function (a) {
            return "string" == typeof a && (a = this.anchors.index(this.anchors.filter("[href$='" + a + "']"))), a
        },
        _destroy: function () {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function () {
                c.data(this, "ui-tabs-destroy") ? c(this).remove() : c(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }), this.tabs.each(function () {
                var e = c(this),
                    a = e.data("ui-tabs-aria-controls");
                a ? e.attr("aria-controls", a).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function (a) {
            var e = this.options.disabled;
            e !== !1 && (a === h ? e = !1 : (a = this._getIndex(a), e = c.isArray(e) ? c.map(e, function (i) {
                return i !== a ? i : null
            }) : c.map(this.tabs, function (i, j) {
                return j !== a ? j : null
            })), this._setupDisabled(e))
        },
        disable: function (a) {
            var e = this.options.disabled;
            if (e !== !0) {
                if (a === h) {
                    e = !0
                } else {
                    if (a = this._getIndex(a), -1 !== c.inArray(a, e)) {
                        return
                    }
                    e = c.isArray(e) ? c.merge([a], e).sort() : [a]
                }
                this._setupDisabled(e)
            }
        },
        load: function (q, k) {
            q = this._getIndex(q);
            var e = this,
                l = this.tabs.eq(q),
                p = l.find(".ui-tabs-anchor"),
                m = this._getPanelForTab(l),
                j = {
                    tab: l,
                    panel: m
                };
            g(p[0]) || (this.xhr = c.ajax(this._ajaxSettings(p, k, j)), this.xhr && "canceled" !== this.xhr.statusText && (l.addClass("ui-tabs-loading"), m.attr("aria-busy", "true"), this.xhr.success(function (a) {
                setTimeout(function () {
                    m.html(a), e._trigger("load", k, j)
                }, 1)
            }).complete(function (a, i) {
                setTimeout(function () {
                    "abort" === i && e.panels.stop(!1, !0), l.removeClass("ui-tabs-loading"), m.removeAttr("aria-busy"), a === e.xhr && delete e.xhr
                }, 1)
            })))
        },
        _ajaxSettings: function (l, j, k) {
            var e = this;
            return {
                url: l.attr("href"),
                beforeSend: function (i, a) {
                    return e._trigger("beforeLoad", j, c.extend({
                        jqXHR: i,
                        ajaxSettings: a
                    }, k))
                }
            }
        },
        _getPanelForTab: function (e) {
            var a = c(e).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + a))
        }
    })
})(jQuery);
(function (a) {
    function d(g, e) {
        var f = (g.attr("aria-describedby") || "").split(/\s+/);
        f.push(e), g.data("ui-tooltip-id", e).attr("aria-describedby", a.trim(f.join(" ")))
    }

    function b(h) {
        var f = h.data("ui-tooltip-id"),
            g = (h.attr("aria-describedby") || "").split(/\s+/),
            e = a.inArray(f, g); - 1 !== e && g.splice(e, 1), h.removeData("ui-tooltip-id"), g = a.trim(g.join(" ")), g ? h.attr("aria-describedby", g) : h.removeAttr("aria-describedby")
    }
    var c = 0;
    a.widget("ui.tooltip", {
        version: "1.10.3",
        options: {
            content: function () {
                var e = a(this).attr("title") || "";
                return a("<a>").text(e).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        },
        _create: function () {
            this._on({
                mouseover: "open",
                focusin: "open"
            }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable()
        },
        _setOption: function (g, e) {
            var f = this;
            return "disabled" === g ? (this[e ? "_disable" : "_enable"](), this.options[g] = e, void 0) : (this._super(g, e), "content" === g && a.each(this.tooltips, function (h, i) {
                f._updateContent(i)
            }), void 0)
        },
        _disable: function () {
            var e = this;
            a.each(this.tooltips, function (g, h) {
                var f = a.Event("blur");
                f.target = f.currentTarget = h[0], e.close(f, !0)
            }), this.element.find(this.options.items).addBack().each(function () {
                var f = a(this);
                f.is("[title]") && f.data("ui-tooltip-title", f.attr("title")).attr("title", "")
            })
        },
        _enable: function () {
            this.element.find(this.options.items).addBack().each(function () {
                var e = a(this);
                e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
            })
        },
        open: function (g) {
            var e = this,
                f = a(g ? g.target : this.element).closest(this.options.items);
            f.length && !f.data("ui-tooltip-id") && (f.attr("title") && f.data("ui-tooltip-title", f.attr("title")), f.data("ui-tooltip-open", !0), g && "mouseover" === g.type && f.parents().each(function () {
                var i, h = a(this);
                h.data("ui-tooltip-open") && (i = a.Event("blur"), i.target = i.currentTarget = this, e.close(i, !0)), h.attr("title") && (h.uniqueId(), e.parents[this.id] = {
                    element: this,
                    title: h.attr("title")
                }, h.attr("title", ""))
            }), this._updateContent(f, g))
        },
        _updateContent: function (g, l) {
            var h, k = this.options.content,
                f = this,
                j = l ? l.type : null;
            return "string" == typeof k ? this._open(l, g, k) : (h = k.call(g[0], function (e) {
                g.data("ui-tooltip-open") && f._delay(function () {
                    l && (l.type = j), this._open(l, g, e)
                })
            }), h && this._open(l, g, h), void 0)
        },
        _open: function (g, q, e) {
            function k(h) {
                j.of = h, p.is(":hidden") || p.position(j)
            }
            var p, m, f, j = a.extend({}, this.options.position);
            if (e) {
                if (p = this._find(q), p.length) {
                    return p.find(".ui-tooltip-content").html(e), void 0
                }
                q.is("[title]") && (g && "mouseover" === g.type ? q.attr("title", "") : q.removeAttr("title")), p = this._tooltip(q), d(q, p.attr("id")), p.find(".ui-tooltip-content").html(e), this.options.track && g && /^mouse/.test(g.type) ? (this._on(this.document, {
                    mousemove: k
                }), k(g)) : p.position(a.extend({
                    of: q
                }, this.options.position)), p.hide(), this._show(p, this.options.show), this.options.show && this.options.show.delay && (f = this.delayedShow = setInterval(function () {
                    p.is(":visible") && (k(j.of), clearInterval(f))
                }, a.fx.interval)), this._trigger("open", g, {
                    tooltip: p
                }), m = {
                    keyup: function (l) {
                        if (l.keyCode === a.ui.keyCode.ESCAPE) {
                            var h = a.Event(l);
                            h.currentTarget = q[0], this.close(h, !0)
                        }
                    },
                    remove: function () {
                        this._removeTooltip(p)
                    }
                }, g && "mouseover" !== g.type || (m.mouseleave = "close"), g && "focusin" !== g.type || (m.focusout = "close"), this._on(!0, q, m)
            }
        },
        close: function (h) {
            var g = this,
                e = a(h ? h.currentTarget : this.element),
                f = this._find(e);
            this.closing || (clearInterval(this.delayedShow), e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title")), b(e), f.stop(!0), this._hide(f, this.options.hide, function () {
                g._removeTooltip(a(this))
            }), e.removeData("ui-tooltip-open"), this._off(e, "mouseleave focusout keyup"), e[0] !== this.element[0] && this._off(e, "remove"), this._off(this.document, "mousemove"), h && "mouseleave" === h.type && a.each(this.parents, function (k, j) {
                a(j.element).attr("title", j.title), delete g.parents[k]
            }), this.closing = !0, this._trigger("close", h, {
                tooltip: f
            }), this.closing = !1)
        },
        _tooltip: function (g) {
            var f = "ui-tooltip-" + c++,
                e = a("<div>").attr({
                    id: f,
                    role: "tooltip"
                }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            return a("<div>").addClass("ui-tooltip-content").appendTo(e), e.appendTo(this.document[0].body), this.tooltips[f] = g, e
        },
        _find: function (f) {
            var e = f.data("ui-tooltip-id");
            return e ? a("#" + e) : a()
        },
        _removeTooltip: function (f) {
            f.remove(), delete this.tooltips[f.attr("id")]
        },
        _destroy: function () {
            var e = this;
            a.each(this.tooltips, function (g, h) {
                var f = a.Event("blur");
                f.target = f.currentTarget = h[0], e.close(f, !0), a("#" + g).remove(), h.data("ui-tooltip-title") && (h.attr("title", h.data("ui-tooltip-title")), h.removeData("ui-tooltip-title"))
            })
        }
    })
})(jQuery);
(function (a, c) {
    var b = "ui-effects-";
    a.effects = {
            effect: {}
        },
        function (m, D) {
            function w(d, l, f) {
                var h = j[l.type] || {};
                return null == d ? f || !l.def ? null : l.def : (d = h.floor ? ~~d : parseFloat(d), isNaN(d) ? l.def : h.mod ? (d + h.mod) % h.mod : 0 > d ? 0 : d > h.max ? h.max : d)
            }

            function C(e) {
                var f = x(),
                    d = f._rgba = [];
                return e = e.toLowerCase(), q(v, function (i, t) {
                    var F, u = t.re.exec(e),
                        p = u && t.parse(u),
                        s = t.space || "rgba";
                    return p ? (F = f[s](p), f[E[s].cache] = F[E[s].cache], d = f._rgba = F._rgba, !1) : D
                }), d.length ? ("0,0,0,0" === d.join() && m.extend(d, y.transparent), f) : y[e]
            }

            function g(d, h, f) {
                return f = (f + 1) % 1, 1 > 6 * f ? d + 6 * (h - d) * f : 1 > 2 * f ? h : 2 > 3 * f ? d + 6 * (h - d) * (2 / 3 - f) : d
            }
            var y, B = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                z = /^([\-+])=\s*(\d+\.?\d*)/,
                v = [{
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function (d) {
                        return [d[1], d[2], d[3], d[4]]
                    }
                }, {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function (d) {
                        return [2.55 * d[1], 2.55 * d[2], 2.55 * d[3], d[4]]
                    }
                }, {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                    parse: function (d) {
                        return [parseInt(d[1], 16), parseInt(d[2], 16), parseInt(d[3], 16)]
                    }
                }, {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                    parse: function (d) {
                        return [parseInt(d[1] + d[1], 16), parseInt(d[2] + d[2], 16), parseInt(d[3] + d[3], 16)]
                    }
                }, {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: "hsla",
                    parse: function (d) {
                        return [d[1], d[2] / 100, d[3] / 100, d[4]]
                    }
                }],
                x = m.Color = function (h, e, f, d) {
                    return new m.Color.fn.parse(h, e, f, d)
                },
                E = {
                    rgba: {
                        props: {
                            red: {
                                idx: 0,
                                type: "byte"
                            },
                            green: {
                                idx: 1,
                                type: "byte"
                            },
                            blue: {
                                idx: 2,
                                type: "byte"
                            }
                        }
                    },
                    hsla: {
                        props: {
                            hue: {
                                idx: 0,
                                type: "degrees"
                            },
                            saturation: {
                                idx: 1,
                                type: "percent"
                            },
                            lightness: {
                                idx: 2,
                                type: "percent"
                            }
                        }
                    }
                },
                j = {
                    "byte": {
                        floor: !0,
                        max: 255
                    },
                    percent: {
                        max: 1
                    },
                    degrees: {
                        mod: 360,
                        floor: !0
                    }
                },
                k = x.support = {},
                A = m("<p>")[0],
                q = m.each;
            A.style.cssText = "background-color:rgba(1,1,1,.5)", k.rgba = A.style.backgroundColor.indexOf("rgba") > -1, q(E, function (d, f) {
                f.cache = "_" + d, f.props.alpha = {
                    idx: 3,
                    type: "percent",
                    def: 1
                }
            }), x.fn = m.extend(x.prototype, {
                parse: function (e, t, n, l) {
                    if (e === D) {
                        return this._rgba = [null, null, null, null], this
                    }(e.jquery || e.nodeType) && (e = m(e).css(t), t = D);
                    var f = this,
                        i = m.type(e),
                        s = this._rgba = [];
                    return t !== D && (e = [e, t, n, l], i = "array"), "string" === i ? this.parse(C(e) || y._default) : "array" === i ? (q(E.rgba.props, function (d, h) {
                        s[h.idx] = w(e[h.idx], h)
                    }), this) : "object" === i ? (e instanceof x ? q(E, function (d, h) {
                        e[h.cache] && (f[h.cache] = e[h.cache].slice())
                    }) : q(E, function (o, h) {
                        var d = h.cache;
                        q(h.props, function (p, r) {
                            if (!f[d] && h.to) {
                                if ("alpha" === p || null == e[p]) {
                                    return
                                }
                                f[d] = h.to(f._rgba)
                            }
                            f[d][r.idx] = w(e[p], r, !0)
                        }), f[d] && 0 > m.inArray(null, f[d].slice(0, 3)) && (f[d][3] = 1, h.from && (f._rgba = h.from(f[d])))
                    }), this) : D
                },
                is: function (f) {
                    var h = x(f),
                        l = !0,
                        d = this;
                    return q(E, function (i, p) {
                        var t, s = h[p.cache];
                        return s && (t = d[p.cache] || p.to && p.to(d._rgba) || [], q(p.props, function (n, o) {
                            return null != s[o.idx] ? l = s[o.idx] === t[o.idx] : D
                        })), l
                    }), l
                },
                _space: function () {
                    var d = [],
                        f = this;
                    return q(E, function (e, h) {
                        f[h.cache] && d.push(e)
                    }), d.pop()
                },
                transition: function (f, G) {
                    var F = x(f),
                        d = F._space(),
                        l = E[d],
                        u = 0 === this.alpha() ? x("transparent") : this,
                        p = u[l.cache] || l.to(u._rgba),
                        i = p.slice();
                    return F = F[l.cache], q(l.props, function (o, h) {
                        var t = h.idx,
                            H = p[t],
                            s = F[t],
                            I = j[h.type] || {};
                        null !== s && (null === H ? i[t] = s : (I.mod && (s - H > I.mod / 2 ? H += I.mod : H - s > I.mod / 2 && (H -= I.mod)), i[t] = w((s - H) * G + H, h)))
                    }), this[d](i)
                },
                blend: function (h) {
                    if (1 === this._rgba[3]) {
                        return this
                    }
                    var e = this._rgba.slice(),
                        f = e.pop(),
                        d = x(h)._rgba;
                    return x(m.map(e, function (i, l) {
                        return (1 - f) * d[l] + f * i
                    }))
                },
                toRgbaString: function () {
                    var e = "rgba(",
                        d = m.map(this._rgba, function (f, h) {
                            return null == f ? h > 2 ? 1 : 0 : f
                        });
                    return 1 === d[3] && (d.pop(), e = "rgb("), e + d.join() + ")"
                },
                toHslaString: function () {
                    var e = "hsla(",
                        d = m.map(this.hsla(), function (f, h) {
                            return null == f && (f = h > 2 ? 1 : 0), h && 3 > h && (f = Math.round(100 * f) + "%"), f
                        });
                    return 1 === d[3] && (d.pop(), e = "hsl("), e + d.join() + ")"
                },
                toHexString: function (f) {
                    var d = this._rgba.slice(),
                        e = d.pop();
                    return f && d.push(~~(255 * e)), "#" + m.map(d, function (h) {
                        return h = (h || 0).toString(16), 1 === h.length ? "0" + h : h
                    }).join("")
                },
                toString: function () {
                    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                }
            }), x.fn.parse.prototype = x.fn, E.hsla.to = function (p) {
                if (null == p[0] || null == p[1] || null == p[2]) {
                    return [null, null, null, p[3]]
                }
                var M, G, L = p[0] / 255,
                    d = p[1] / 255,
                    I = p[2] / 255,
                    K = p[3],
                    J = Math.max(L, d, I),
                    F = Math.min(L, d, I),
                    H = J - F,
                    N = J + F,
                    f = 0.5 * N;
                return M = F === J ? 0 : L === J ? 60 * (d - I) / H + 360 : d === J ? 60 * (I - L) / H + 120 : 60 * (L - d) / H + 240, G = 0 === H ? 0 : 0.5 >= f ? H / N : H / (2 - N), [Math.round(M) % 360, G, f, null == K ? 1 : K]
            }, E.hsla.from = function (d) {
                if (null == d[0] || null == d[1] || null == d[2]) {
                    return [null, null, null, d[3]]
                }
                var F = d[0] / 360,
                    f = d[1],
                    u = d[2],
                    h = d[3],
                    p = 0.5 >= u ? u * (1 + f) : u + f - u * f,
                    l = 2 * u - p;
                return [Math.round(255 * g(l, p, F + 1 / 3)), Math.round(255 * g(l, p, F)), Math.round(255 * g(l, p, F - 1 / 3)), h]
            }, q(E, function (l, d) {
                var f = d.props,
                    i = d.cache,
                    e = d.to,
                    o = d.from;
                x.fn[l] = function (t) {
                    if (e && !this[i] && (this[i] = e(this._rgba)), t === D) {
                        return this[i].slice()
                    }
                    var h, r = m.type(t),
                        n = "array" === r || "object" === r ? t : arguments,
                        p = this[i].slice();
                    return q(f, function (u, G) {
                        var F = n["object" === r ? u : G.idx];
                        null == F && (F = p[G.idx]), p[G.idx] = w(F, G)
                    }), o ? (h = x(o(p)), h[i] = p, h) : x(p)
                }, q(f, function (n, h) {
                    x.fn[n] || (x.fn[n] = function (p) {
                        var F, G = m.type(p),
                            s = "alpha" === n ? this._hsla ? "hsla" : "rgba" : l,
                            t = this[s](),
                            H = t[h.idx];
                        return "undefined" === G ? H : ("function" === G && (p = p.call(this, H), G = m.type(p)), null == p && h.empty ? this : ("string" === G && (F = z.exec(p), F && (p = H + parseFloat(F[2]) * ("+" === F[1] ? 1 : -1))), t[h.idx] = p, this[s](t)))
                    })
                })
            }), x.hook = function (e) {
                var d = e.split(" ");
                q(d, function (h, f) {
                    m.cssHooks[f] = {
                        set: function (F, i) {
                            var p, u, s = "";
                            if ("transparent" !== i && ("string" !== m.type(i) || (p = C(i)))) {
                                if (i = x(p || i), !k.rgba && 1 !== i._rgba[3]) {
                                    for (u = "backgroundColor" === f ? F.parentNode : F;
                                        ("" === s || "transparent" === s) && u && u.style;) {
                                        try {
                                            s = m.css(u, "backgroundColor"), u = u.parentNode
                                        } catch (l) {}
                                    }
                                    i = i.blend(s && "transparent" !== s ? s : "_default")
                                }
                                i = i.toRgbaString()
                            }
                            try {
                                F.style[f] = i
                            } catch (l) {}
                        }
                    }, m.fx.step[f] = function (i) {
                        i.colorInit || (i.start = x(i.elem, f), i.end = x(i.end), i.colorInit = !0), m.cssHooks[f].set(i.elem, i.start.transition(i.end, i.pos))
                    }
                })
            }, x.hook(B), m.cssHooks.borderColor = {
                expand: function (d) {
                    var f = {};
                    return q(["Top", "Right", "Bottom", "Left"], function (e, h) {
                        f["border" + h + "Color"] = d
                    }), f
                }
            }, y = m.Color.names = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#008000",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
                transparent: [null, null, null, 0],
                _default: "#ffffff"
            }
        }(jQuery),
        function () {
            function e(m) {
                var j, l, h = m.ownerDocument.defaultView ? m.ownerDocument.defaultView.getComputedStyle(m, null) : m.currentStyle,
                    k = {};
                if (h && h.length && h[0] && h[h[0]]) {
                    for (l = h.length; l--;) {
                        j = h[l], "string" == typeof h[j] && (k[a.camelCase(j)] = h[j])
                    }
                } else {
                    for (j in h) {
                        "string" == typeof h[j] && (k[j] = h[j])
                    }
                }
                return k
            }

            function g(m, j) {
                var l, h, k = {};
                for (l in j) {
                    h = j[l], m[l] !== h && (f[l] || (a.fx.step[l] || !isNaN(parseFloat(h))) && (k[l] = h))
                }
                return k
            }
            var d = ["add", "remove", "toggle"],
                f = {
                    border: 1,
                    borderBottom: 1,
                    borderColor: 1,
                    borderLeft: 1,
                    borderRight: 1,
                    borderTop: 1,
                    borderWidth: 1,
                    margin: 1,
                    padding: 1
                };
            a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (j, h) {
                a.fx.step[h] = function (i) {
                    ("none" !== i.end && !i.setAttr || 1 === i.pos && !i.setAttr) && (jQuery.style(i.elem, h, i.end), i.setAttr = !0)
                }
            }), a.fn.addBack || (a.fn.addBack = function (h) {
                return this.add(null == h ? this.prevObject : this.prevObject.filter(h))
            }), a.effects.animateClass = function (m, j, l, k) {
                var i = a.speed(j, l, k);
                return this.queue(function () {
                    var p, s = a(this),
                        q = s.attr("class") || "",
                        h = i.children ? s.find("*").addBack() : s;
                    h = h.map(function () {
                        var n = a(this);
                        return {
                            el: n,
                            start: e(this)
                        }
                    }), p = function () {
                        a.each(d, function (n, o) {
                            m[o] && s[o + "Class"](m[o])
                        })
                    }, p(), h = h.map(function () {
                        return this.end = e(this.el[0]), this.diff = g(this.start, this.end), this
                    }), s.attr("class", q), h = h.map(function () {
                        var r = this,
                            n = a.Deferred(),
                            o = a.extend({}, i, {
                                queue: !1,
                                complete: function () {
                                    n.resolve(r)
                                }
                            });
                        return this.el.animate(this.diff, o), n.promise()
                    }), a.when.apply(a, h.get()).done(function () {
                        p(), a.each(arguments, function () {
                            var n = this.el;
                            a.each(this.diff, function (o) {
                                n.css(o, "")
                            })
                        }), i.complete.call(s[0])
                    })
                })
            }, a.fn.extend({
                addClass: function (h) {
                    return function (k, m, j, l) {
                        return m ? a.effects.animateClass.call(this, {
                            add: k
                        }, m, j, l) : h.apply(this, arguments)
                    }
                }(a.fn.addClass),
                removeClass: function (h) {
                    return function (k, m, j, l) {
                        return arguments.length > 1 ? a.effects.animateClass.call(this, {
                            remove: k
                        }, m, j, l) : h.apply(this, arguments)
                    }
                }(a.fn.removeClass),
                toggleClass: function (h) {
                    return function (m, i, j, l, k) {
                        return "boolean" == typeof i || i === c ? j ? a.effects.animateClass.call(this, i ? {
                            add: m
                        } : {
                            remove: m
                        }, j, l, k) : h.apply(this, arguments) : a.effects.animateClass.call(this, {
                            toggle: m
                        }, i, j, l)
                    }
                }(a.fn.toggleClass),
                switchClass: function (m, j, l, h, k) {
                    return a.effects.animateClass.call(this, {
                        add: j,
                        remove: m
                    }, l, h, k)
                }
            })
        }(),
        function () {
            function e(j, g, h, f) {
                return a.isPlainObject(j) && (g = j, j = j.effect), j = {
                    effect: j
                }, null == g && (g = {}), a.isFunction(g) && (f = g, h = null, g = {}), ("number" == typeof g || a.fx.speeds[g]) && (f = h, h = g, g = {}), a.isFunction(h) && (f = h, h = null), g && a.extend(j, g), h = h || g.duration, j.duration = a.fx.off ? 0 : "number" == typeof h ? h : h in a.fx.speeds ? a.fx.speeds[h] : a.fx.speeds._default, j.complete = f || g.complete, j
            }

            function d(f) {
                return !f || "number" == typeof f || a.fx.speeds[f] ? !0 : "string" != typeof f || a.effects.effect[f] ? a.isFunction(f) ? !0 : "object" != typeof f || f.effect ? !1 : !0 : !0
            }
            a.extend(a.effects, {
                version: "1.10.3",
                save: function (f, h) {
                    for (var g = 0; h.length > g; g++) {
                        null !== h[g] && f.data(b + h[g], f[0].style[h[g]])
                    }
                },
                restore: function (g, i) {
                    var f, h;
                    for (h = 0; i.length > h; h++) {
                        null !== i[h] && (f = g.data(b + i[h]), f === c && (f = ""), g.css(i[h], f))
                    }
                },
                setMode: function (f, g) {
                    return "toggle" === g && (g = f.is(":hidden") ? "show" : "hide"), g
                },
                getBaseline: function (f, j) {
                    var g, h;
                    switch (f[0]) {
                        case "top":
                            g = 0;
                            break;
                        case "middle":
                            g = 0.5;
                            break;
                        case "bottom":
                            g = 1;
                            break;
                        default:
                            g = f[0] / j.height
                    }
                    switch (f[1]) {
                        case "left":
                            h = 0;
                            break;
                        case "center":
                            h = 0.5;
                            break;
                        case "right":
                            h = 1;
                            break;
                        default:
                            h = f[1] / j.width
                    }
                    return {
                        x: h,
                        y: g
                    }
                },
                createWrapper: function (l) {
                    if (l.parent().is(".ui-effects-wrapper")) {
                        return l.parent()
                    }
                    var g = {
                            width: l.outerWidth(!0),
                            height: l.outerHeight(!0),
                            "float": l.css("float")
                        },
                        k = a("<div></div>").addClass("ui-effects-wrapper").css({
                            fontSize: "100%",
                            background: "transparent",
                            border: "none",
                            margin: 0,
                            padding: 0
                        }),
                        f = {
                            width: l.width(),
                            height: l.height()
                        },
                        h = document.activeElement;
                    try {
                        h.id
                    } catch (j) {
                        h = document.body
                    }
                    return l.wrap(k), (l[0] === h || a.contains(l[0], h)) && a(h).focus(), k = l.parent(), "static" === l.css("position") ? (k.css({
                        position: "relative"
                    }), l.css({
                        position: "relative"
                    })) : (a.extend(g, {
                        position: l.css("position"),
                        zIndex: l.css("z-index")
                    }), a.each(["top", "left", "bottom", "right"], function (i, m) {
                        g[m] = l.css(m), isNaN(parseInt(g[m], 10)) && (g[m] = "auto")
                    }), l.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })), l.css(f), k.css(g).show()
                },
                removeWrapper: function (g) {
                    var f = document.activeElement;
                    return g.parent().is(".ui-effects-wrapper") && (g.parent().replaceWith(g), (g[0] === f || a.contains(g[0], f)) && a(f).focus()), g
                },
                setTransition: function (j, g, h, f) {
                    return f = f || {}, a.each(g, function (k, l) {
                        var m = j.cssUnit(l);
                        m[0] > 0 && (f[l] = m[0] * h + m[1])
                    }), f
                }
            }), a.fn.extend({
                effect: function () {
                    function k(q) {
                        function p() {
                            a.isFunction(l) && l.call(i[0]), a.isFunction(q) && q()
                        }
                        var i = a(this),
                            l = g.complete,
                            m = g.mode;
                        (i.is(":hidden") ? "hide" === m : "show" === m) ? (i[m](), p()) : j.call(i[0], g, p)
                    }
                    var g = e.apply(this, arguments),
                        f = g.mode,
                        h = g.queue,
                        j = a.effects.effect[g.effect];
                    return a.fx.off || !j ? f ? this[f](g.duration, g.complete) : this.each(function () {
                        g.complete && g.complete.call(this)
                    }) : h === !1 ? this.each(k) : this.queue(h || "fx", k)
                },
                show: function (f) {
                    return function (h) {
                        if (d(h)) {
                            return f.apply(this, arguments)
                        }
                        var g = e.apply(this, arguments);
                        return g.mode = "show", this.effect.call(this, g)
                    }
                }(a.fn.show),
                hide: function (f) {
                    return function (h) {
                        if (d(h)) {
                            return f.apply(this, arguments)
                        }
                        var g = e.apply(this, arguments);
                        return g.mode = "hide", this.effect.call(this, g)
                    }
                }(a.fn.hide),
                toggle: function (f) {
                    return function (h) {
                        if (d(h) || "boolean" == typeof h) {
                            return f.apply(this, arguments)
                        }
                        var g = e.apply(this, arguments);
                        return g.mode = "toggle", this.effect.call(this, g)
                    }
                }(a.fn.toggle),
                cssUnit: function (h) {
                    var f = this.css(h),
                        g = [];
                    return a.each(["em", "px", "%", "pt"], function (i, j) {
                        f.indexOf(j) > 0 && (g = [parseFloat(f), j])
                    }), g
                }
            })
        }(),
        function () {
            var d = {};
            a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (f, g) {
                d[g] = function (e) {
                    return Math.pow(e, f + 2)
                }
            }), a.extend(d, {
                Sine: function (f) {
                    return 1 - Math.cos(f * Math.PI / 2)
                },
                Circ: function (f) {
                    return 1 - Math.sqrt(1 - f * f)
                },
                Elastic: function (f) {
                    return 0 === f || 1 === f ? f : -Math.pow(2, 8 * (f - 1)) * Math.sin((80 * (f - 1) - 7.5) * Math.PI / 15)
                },
                Back: function (f) {
                    return f * f * (3 * f - 2)
                },
                Bounce: function (f) {
                    for (var h, g = 4;
                        ((h = Math.pow(2, --g)) - 1) / 11 > f;) {}
                    return 1 / Math.pow(4, 3 - g) - 7.5625 * Math.pow((3 * h - 2) / 22 - f, 2)
                }
            }), a.each(d, function (f, e) {
                a.easing["easeIn" + f] = e, a.easing["easeOut" + f] = function (g) {
                    return 1 - e(1 - g)
                }, a.easing["easeInOut" + f] = function (g) {
                    return 0.5 > g ? e(2 * g) / 2 : 1 - e(-2 * g + 2) / 2
                }
            })
        }()
})(jQuery);
(function (a) {
    var c = /up|down|vertical/,
        b = /up|left|vertical|horizontal/;
    a.effects.effect.blind = function (e, C) {
        var y, B, z, w = a(this),
            t = ["position", "top", "bottom", "left", "right", "height", "width"],
            D = a.effects.setMode(w, e.mode || "hide"),
            j = e.direction || "up",
            i = c.test(j),
            A = i ? "height" : "width",
            k = i ? "top" : "left",
            x = b.test(j),
            q = {},
            E = "show" === D;
        w.parent().is(".ui-effects-wrapper") ? a.effects.save(w.parent(), t) : a.effects.save(w, t), w.show(), y = a.effects.createWrapper(w).css({
            overflow: "hidden"
        }), B = y[A](), z = parseFloat(y.css(k)) || 0, q[A] = E ? B : 0, x || (w.css(i ? "bottom" : "right", 0).css(i ? "top" : "left", "auto").css({
            position: "absolute"
        }), q[k] = E ? z : B + z), E && (y.css(A, 0), x || y.css(k, z + B)), y.animate(q, {
            duration: e.duration,
            easing: e.easing,
            queue: !1,
            complete: function () {
                "hide" === D && w.hide(), a.effects.restore(w, t), a.effects.removeWrapper(w), C()
            }
        })
    }
})(jQuery);
(function (a) {
    a.effects.effect.bounce = function (J, B) {
        var j, I, E, H = a(this),
            F = ["position", "top", "bottom", "left", "right", "height", "width"],
            C = a.effects.setMode(H, J.mode || "effect"),
            A = "hide" === C,
            K = "show" === C,
            w = J.direction || "up",
            q = J.distance,
            G = J.times || 5,
            x = 2 * G + (K || A ? 1 : 0),
            D = J.duration / x,
            z = J.easing,
            L = "up" === w || "down" === w ? "top" : "left",
            M = "up" === w || "left" === w,
            k = H.queue(),
            e = k.length;
        for ((K || A) && F.push("opacity"), a.effects.save(H, F), H.show(), a.effects.createWrapper(H), q || (q = H["top" === L ? "outerHeight" : "outerWidth"]() / 3), K && (E = {
                opacity: 1
            }, E[L] = 0, H.css("opacity", 0).css(L, M ? 2 * -q : 2 * q).animate(E, D, z)), A && (q /= Math.pow(2, G - 1)), E = {}, E[L] = 0, j = 0; G > j; j++) {
            I = {}, I[L] = (M ? "-=" : "+=") + q, H.animate(I, D, z).animate(E, D, z), q = A ? 2 * q : q / 2
        }
        A && (I = {
            opacity: 0
        }, I[L] = (M ? "-=" : "+=") + q, H.animate(I, D, z)), H.queue(function () {
            A && H.hide(), a.effects.restore(H, F), a.effects.removeWrapper(H), B()
        }), e > 1 && k.splice.apply(k, [1, 0].concat(k.splice(e, x + 1))), H.dequeue()
    }
})(jQuery);
(function (a) {
    a.effects.effect.clip = function (A, m) {
        var b, z, v, y = a(this),
            w = ["position", "top", "bottom", "left", "right", "height", "width"],
            q = a.effects.setMode(y, A.mode || "hide"),
            k = "show" === q,
            B = A.direction || "vertical",
            g = "vertical" === B,
            e = g ? "height" : "width",
            x = g ? "top" : "left",
            j = {};
        a.effects.save(y, w), y.show(), b = a.effects.createWrapper(y).css({
            overflow: "hidden"
        }), z = "IMG" === y[0].tagName ? b : y, v = z[e](), k && (z.css(e, 0), z.css(x, v / 2)), j[e] = k ? v : 0, j[x] = k ? 0 : v / 2, z.animate(j, {
            queue: !1,
            duration: A.duration,
            easing: A.easing,
            complete: function () {
                k || y.hide(), a.effects.restore(y, w), a.effects.removeWrapper(y), m()
            }
        })
    }
})(jQuery);
(function (a) {
    a.effects.effect.drop = function (q, f) {
        var b, p = a(this),
            j = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
            m = a.effects.setMode(p, q.mode || "hide"),
            k = "show" === m,
            g = q.direction || "left",
            e = "up" === g || "down" === g ? "top" : "left",
            v = "up" === g || "left" === g ? "pos" : "neg",
            c = {
                opacity: k ? 1 : 0
            };
        a.effects.save(p, j), p.show(), a.effects.createWrapper(p), b = q.distance || p["top" === e ? "outerHeight" : "outerWidth"](!0) / 2, k && p.css("opacity", 0).css(e, "pos" === v ? -b : b), c[e] = (k ? "pos" === v ? "+=" : "-=" : "pos" === v ? "-=" : "+=") + b, p.animate(c, {
            queue: !1,
            duration: q.duration,
            easing: q.easing,
            complete: function () {
                "hide" === m && p.hide(), a.effects.restore(p, j), a.effects.removeWrapper(p), f()
            }
        })
    }
})(jQuery);
(function (a) {
    a.effects.effect.explode = function (I, A) {
        function H() {
            j.push(this), j.length === q * k && e()
        }

        function e() {
            F.css({
                visibility: "visible"
            }), a(j).remove(), C || F.hide(), A()
        }
        var D, G, E, B, z, J, q = I.pieces ? Math.round(Math.sqrt(I.pieces)) : 3,
            k = q,
            F = a(this),
            w = a.effects.setMode(F, I.mode || "hide"),
            C = "show" === w,
            x = F.show().css("visibility", "hidden").offset(),
            K = Math.ceil(F.outerWidth() / k),
            L = Math.ceil(F.outerHeight() / q),
            j = [];
        for (D = 0; q > D; D++) {
            for (B = x.top + D * L, J = D - (q - 1) / 2, G = 0; k > G; G++) {
                E = x.left + G * K, z = G - (k - 1) / 2, F.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -G * K,
                    top: -D * L
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: K,
                    height: L,
                    left: E + (C ? z * K : 0),
                    top: B + (C ? J * L : 0),
                    opacity: C ? 0 : 1
                }).animate({
                    left: E + (C ? 0 : z * K),
                    top: B + (C ? 0 : J * L),
                    opacity: C ? 1 : 0
                }, I.duration || 500, I.easing, H)
            }
        }
    }
})(jQuery);
(function (a) {
    a.effects.effect.fade = function (e, c) {
        var d = a(this),
            b = a.effects.setMode(d, e.mode || "toggle");
        d.animate({
            opacity: b
        }, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: c
        })
    }
})(jQuery);
(function (a) {
    a.effects.effect.fold = function (F, x) {
        var E, b, A = a(this),
            D = ["position", "top", "bottom", "left", "right", "height", "width"],
            B = a.effects.setMode(A, F.mode || "hide"),
            y = "show" === B,
            w = "hide" === B,
            G = F.size || 15,
            j = /([0-9]+)%/.exec(G),
            e = !!F.horizFirst,
            C = y !== e,
            k = C ? ["width", "height"] : ["height", "width"],
            z = F.duration / 2,
            q = {},
            H = {};
        a.effects.save(A, D), A.show(), E = a.effects.createWrapper(A).css({
            overflow: "hidden"
        }), b = C ? [E.width(), E.height()] : [E.height(), E.width()], j && (G = parseInt(j[1], 10) / 100 * b[w ? 0 : 1]), y && E.css(e ? {
            height: 0,
            width: G
        } : {
            height: G,
            width: 0
        }), q[k[0]] = y ? b[0] : G, H[k[1]] = y ? b[1] : 0, E.animate(q, z, F.easing).animate(H, z, F.easing, function () {
            w && A.hide(), a.effects.restore(A, D), a.effects.removeWrapper(A), x()
        })
    }
})(jQuery);
(function (a) {
    a.effects.effect.highlight = function (g, c) {
        var f = a(this),
            b = ["backgroundImage", "backgroundColor", "opacity"],
            d = a.effects.setMode(f, g.mode || "show"),
            e = {
                backgroundColor: f.css("backgroundColor")
            };
        "hide" === d && (e.opacity = 0), a.effects.save(f, b), f.show().css({
            backgroundImage: "none",
            backgroundColor: g.color || "#ffff99"
        }).animate(e, {
            queue: !1,
            duration: g.duration,
            easing: g.easing,
            complete: function () {
                "hide" === d && f.hide(), a.effects.restore(f, b), c()
            }
        })
    }
})(jQuery);
(function (a) {
    a.effects.effect.pulsate = function (y, j) {
        var x, b = a(this),
            m = a.effects.setMode(b, y.mode || "show"),
            w = "show" === m,
            q = "hide" === m,
            k = w || "hide" === m,
            g = 2 * (y.times || 5) + (k ? 1 : 0),
            z = y.duration / g,
            f = 0,
            e = b.queue(),
            v = e.length;
        for ((w || !b.is(":visible")) && (b.css("opacity", 0).show(), f = 1), x = 1; g > x; x++) {
            b.animate({
                opacity: f
            }, z, y.easing), f = 1 - f
        }
        b.animate({
            opacity: f
        }, z, y.easing), b.queue(function () {
            q && b.hide(), j()
        }), v > 1 && e.splice.apply(e, [1, 0].concat(e.splice(v, g + 1))), b.dequeue()
    }
})(jQuery);
(function (a) {
    a.effects.effect.puff = function (k, d) {
        var j = a(this),
            b = a.effects.setMode(j, k.mode || "hide"),
            e = "hide" === b,
            g = parseInt(k.percent, 10) || 150,
            f = g / 100,
            c = {
                height: j.height(),
                width: j.width(),
                outerHeight: j.outerHeight(),
                outerWidth: j.outerWidth()
            };
        a.extend(k, {
            effect: "scale",
            queue: !1,
            fade: !0,
            mode: b,
            complete: d,
            percent: e ? g : 100,
            from: e ? c : {
                height: c.height * f,
                width: c.width * f,
                outerHeight: c.outerHeight * f,
                outerWidth: c.outerWidth * f
            }
        }), j.effect(k)
    }, a.effects.effect.scale = function (m, d) {
        var k = a(this),
            b = a.extend(!0, {}, m),
            f = a.effects.setMode(k, m.mode || "effect"),
            j = parseInt(m.percent, 10) || (0 === parseInt(m.percent, 10) ? 0 : "hide" === f ? 0 : 100),
            g = m.direction || "both",
            c = m.origin,
            e = {
                height: k.height(),
                width: k.width(),
                outerHeight: k.outerHeight(),
                outerWidth: k.outerWidth()
            },
            p = {
                y: "horizontal" !== g ? j / 100 : 1,
                x: "vertical" !== g ? j / 100 : 1
            };
        b.effect = "size", b.queue = !1, b.complete = d, "effect" !== f && (b.origin = c || ["middle", "center"], b.restore = !0), b.from = m.from || ("show" === f ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        } : e), b.to = {
            height: e.height * p.y,
            width: e.width * p.x,
            outerHeight: e.outerHeight * p.y,
            outerWidth: e.outerWidth * p.x
        }, b.fade && ("show" === f && (b.from.opacity = 0, b.to.opacity = 1), "hide" === f && (b.from.opacity = 1, b.to.opacity = 0)), k.effect(b)
    }, a.effects.effect.size = function (I, A) {
        var H, e, D, G = a(this),
            E = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
            z = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
            B = ["width", "height", "overflow"],
            J = ["fontSize"],
            q = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            k = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            F = a.effects.setMode(G, I.mode || "effect"),
            w = I.restore || "effect" !== F,
            C = I.scale || "both",
            x = I.origin || ["middle", "center"],
            K = G.css("position"),
            L = w ? E : z,
            j = {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            };
        "show" === F && G.show(), H = {
            height: G.height(),
            width: G.width(),
            outerHeight: G.outerHeight(),
            outerWidth: G.outerWidth()
        }, "toggle" === I.mode && "show" === F ? (G.from = I.to || j, G.to = I.from || H) : (G.from = I.from || ("show" === F ? j : H), G.to = I.to || ("hide" === F ? j : H)), D = {
            from: {
                y: G.from.height / H.height,
                x: G.from.width / H.width
            },
            to: {
                y: G.to.height / H.height,
                x: G.to.width / H.width
            }
        }, ("box" === C || "both" === C) && (D.from.y !== D.to.y && (L = L.concat(q), G.from = a.effects.setTransition(G, q, D.from.y, G.from), G.to = a.effects.setTransition(G, q, D.to.y, G.to)), D.from.x !== D.to.x && (L = L.concat(k), G.from = a.effects.setTransition(G, k, D.from.x, G.from), G.to = a.effects.setTransition(G, k, D.to.x, G.to))), ("content" === C || "both" === C) && D.from.y !== D.to.y && (L = L.concat(J).concat(B), G.from = a.effects.setTransition(G, J, D.from.y, G.from), G.to = a.effects.setTransition(G, J, D.to.y, G.to)), a.effects.save(G, L), G.show(), a.effects.createWrapper(G), G.css("overflow", "hidden").css(G.from), x && (e = a.effects.getBaseline(x, H), G.from.top = (H.outerHeight - G.outerHeight()) * e.y, G.from.left = (H.outerWidth - G.outerWidth()) * e.x, G.to.top = (H.outerHeight - G.to.outerHeight) * e.y, G.to.left = (H.outerWidth - G.to.outerWidth) * e.x), G.css(G.from), ("content" === C || "both" === C) && (q = q.concat(["marginTop", "marginBottom"]).concat(J), k = k.concat(["marginLeft", "marginRight"]), B = E.concat(q).concat(k), G.find("*[width]").each(function () {
            var b = a(this),
                c = {
                    height: b.height(),
                    width: b.width(),
                    outerHeight: b.outerHeight(),
                    outerWidth: b.outerWidth()
                };
            w && a.effects.save(b, B), b.from = {
                height: c.height * D.from.y,
                width: c.width * D.from.x,
                outerHeight: c.outerHeight * D.from.y,
                outerWidth: c.outerWidth * D.from.x
            }, b.to = {
                height: c.height * D.to.y,
                width: c.width * D.to.x,
                outerHeight: c.height * D.to.y,
                outerWidth: c.width * D.to.x
            }, D.from.y !== D.to.y && (b.from = a.effects.setTransition(b, q, D.from.y, b.from), b.to = a.effects.setTransition(b, q, D.to.y, b.to)), D.from.x !== D.to.x && (b.from = a.effects.setTransition(b, k, D.from.x, b.from), b.to = a.effects.setTransition(b, k, D.to.x, b.to)), b.css(b.from), b.animate(b.to, I.duration, I.easing, function () {
                w && a.effects.restore(b, B)
            })
        })), G.animate(G.to, {
            queue: !1,
            duration: I.duration,
            easing: I.easing,
            complete: function () {
                0 === G.to.opacity && G.css("opacity", G.from.opacity), "hide" === F && G.hide(), a.effects.restore(G, L), w || ("static" === K ? G.css({
                    position: "relative",
                    top: G.to.top,
                    left: G.to.left
                }) : a.each(["top", "left"], function (b, c) {
                    G.css(c, function (h, f) {
                        var g = parseInt(f, 10),
                            d = b ? G.to.left : G.to.top;
                        return "auto" === f ? d + "px" : g + d + "px"
                    })
                })), a.effects.removeWrapper(G), A()
            }
        })
    }
})(jQuery);
(function (a) {
    a.effects.effect.shake = function (G, x) {
        var F, b = a(this),
            B = ["position", "top", "bottom", "left", "right", "height", "width"],
            E = a.effects.setMode(b, G.mode || "effect"),
            C = G.direction || "left",
            w = G.distance || 20,
            z = G.times || 3,
            H = 2 * z + 1,
            j = Math.round(G.duration / H),
            e = "up" === C || "down" === C ? "top" : "left",
            D = "up" === C || "left" === C,
            k = {},
            A = {},
            q = {},
            I = b.queue(),
            J = I.length;
        for (a.effects.save(b, B), b.show(), a.effects.createWrapper(b), k[e] = (D ? "-=" : "+=") + w, A[e] = (D ? "+=" : "-=") + 2 * w, q[e] = (D ? "-=" : "+=") + 2 * w, b.animate(k, j, G.easing), F = 1; z > F; F++) {
            b.animate(A, j, G.easing).animate(q, j, G.easing)
        }
        b.animate(A, j, G.easing).animate(k, j / 2, G.easing).queue(function () {
            "hide" === E && b.hide(), a.effects.restore(b, B), a.effects.removeWrapper(b), x()
        }), J > 1 && I.splice.apply(I, [1, 0].concat(I.splice(J, H + 1))), b.dequeue()
    }
})(jQuery);
(function (a) {
    a.effects.effect.slide = function (q, f) {
        var p, b = a(this),
            j = ["position", "top", "bottom", "left", "right", "width", "height"],
            m = a.effects.setMode(b, q.mode || "show"),
            k = "show" === m,
            e = q.direction || "left",
            g = "up" === e || "down" === e ? "top" : "left",
            v = "up" === e || "left" === e,
            c = {};
        a.effects.save(b, j), b.show(), p = q.distance || b["top" === g ? "outerHeight" : "outerWidth"](!0), a.effects.createWrapper(b).css({
            overflow: "hidden"
        }), k && b.css(g, v ? isNaN(p) ? "-" + p : -p : p), c[g] = (k ? v ? "+=" : "-=" : v ? "-=" : "+=") + p, b.animate(c, {
            queue: !1,
            duration: q.duration,
            easing: q.easing,
            complete: function () {
                "hide" === m && b.hide(), a.effects.restore(b, j), a.effects.removeWrapper(b), f()
            }
        })
    }
})(jQuery);
(function (a) {
    a.effects.effect.transfer = function (w, j) {
        var v = a(this),
            b = a(w.to),
            m = "fixed" === b.css("position"),
            q = a("body"),
            p = m ? q.scrollTop() : 0,
            g = m ? q.scrollLeft() : 0,
            k = b.offset(),
            x = {
                top: k.top - p,
                left: k.left - g,
                height: b.innerHeight(),
                width: b.innerWidth()
            },
            f = v.offset(),
            e = a("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(w.className).css({
                top: f.top - p,
                left: f.left - g,
                height: v.innerHeight(),
                width: v.innerWidth(),
                position: m ? "fixed" : "absolute"
            }).animate(x, w.duration, w.easing, function () {
                e.remove(), j()
            })
    }
})(jQuery);