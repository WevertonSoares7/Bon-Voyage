/* jQuery UI - v1.11.4 - 2015-03-11
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, position.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, draggable.js, droppable.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js, menu.js, progressbar.js, resizable.js, selectable.js, selectmenu.js, slider.js, sortable.js, spinner.js, tabs.js, tooltip.js
 * Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */
(function (a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
}(function (a) {
    /*
     * jQuery UI Core 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/category/ui-core/
     */
    a.ui = a.ui || {};
    a.extend(a.ui, {
        version: "1.11.4",
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
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    a.fn.extend({
        scrollParent: function (ae) {
            var ag = this.css("position"),
                ad = ag === "absolute",
                af = ae ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                ah = this.parents().filter(function () {
                    var ai = a(this);
                    if (ad && ai.css("position") === "static") {
                        return false
                    }
                    return af.test(ai.css("overflow") + ai.css("overflow-y") + ai.css("overflow-x"))
                }).eq(0);
            return ag === "fixed" || !ah.length ? a(this[0].ownerDocument || document) : ah
        },
        uniqueId: (function () {
            var ad = 0;
            return function () {
                return this.each(function () {
                    if (!this.id) {
                        this.id = "ui-id-" + (++ad)
                    }
                })
            }
        })(),
        removeUniqueId: function () {
            return this.each(function () {
                if (/^ui-id-\d+$/.test(this.id)) {
                    a(this).removeAttr("id")
                }
            })
        }
    });

    function F(ad, af) {
        var ag, ah, ae, ai = ad.nodeName.toLowerCase();
        if ("area" === ai) {
            ag = ad.parentNode;
            ah = ag.name;
            if (!ad.href || !ah || ag.nodeName.toLowerCase() !== "map") {
                return false
            }
            ae = a("img[usemap='#" + ah + "']")[0];
            return !!ae && Z(ae)
        }
        return (/^(input|select|textarea|button|object)$/.test(ai) ? !ad.disabled : "a" === ai ? ad.href || af : af) && Z(ad)
    }

    function Z(ad) {
        return a.expr.filters.visible(ad) && !a(ad).parents().addBack().filter(function () {
            return a.css(this, "visibility") === "hidden"
        }).length
    }
    a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function (ad) {
            return function (ae) {
                return !!a.data(ae, ad)
            }
        }) : function (ad, ae, af) {
            return !!a.data(ad, af[3])
        },
        focusable: function (ad) {
            return F(ad, !isNaN(a.attr(ad, "tabindex")))
        },
        tabbable: function (ad) {
            var af = a.attr(ad, "tabindex"),
                ae = isNaN(af);
            return (ae || af >= 0) && F(ad, !ae)
        }
    });
    if (!a("<a>").outerWidth(1).jquery) {
        a.each(["Width", "Height"], function (ad, ae) {
            var ah = ae === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                ai = ae.toLowerCase(),
                af = {
                    innerWidth: a.fn.innerWidth,
                    innerHeight: a.fn.innerHeight,
                    outerWidth: a.fn.outerWidth,
                    outerHeight: a.fn.outerHeight
                };

            function ag(ak, am, aj, al) {
                a.each(ah, function () {
                    am -= parseFloat(a.css(ak, "padding" + this)) || 0;
                    if (aj) {
                        am -= parseFloat(a.css(ak, "border" + this + "Width")) || 0
                    }
                    if (al) {
                        am -= parseFloat(a.css(ak, "margin" + this)) || 0
                    }
                });
                return am
            }
            a.fn["inner" + ae] = function (aj) {
                if (aj === undefined) {
                    return af["inner" + ae].call(this)
                }
                return this.each(function () {
                    a(this).css(ai, ag(this, aj) + "px")
                })
            };
            a.fn["outer" + ae] = function (ak, aj) {
                if (typeof ak !== "number") {
                    return af["outer" + ae].call(this, ak)
                }
                return this.each(function () {
                    a(this).css(ai, ag(this, ak, true, aj) + "px")
                })
            }
        })
    }
    if (!a.fn.addBack) {
        a.fn.addBack = function (ad) {
            return this.add(ad == null ? this.prevObject : this.prevObject.filter(ad))
        }
    }
    if (a("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        a.fn.removeData = (function (ad) {
            return function (ae) {
                if (arguments.length) {
                    return ad.call(this, a.camelCase(ae))
                } else {
                    return ad.call(this)
                }
            }
        })(a.fn.removeData)
    }
    a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    a.fn.extend({
        focus: (function (ad) {
            return function (ae, af) {
                return typeof ae === "number" ? this.each(function () {
                    var ag = this;
                    setTimeout(function () {
                        a(ag).focus();
                        if (af) {
                            af.call(ag)
                        }
                    }, ae)
                }) : ad.apply(this, arguments)
            }
        })(a.fn.focus),
        disableSelection: (function () {
            var ad = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function () {
                return this.bind(ad + ".ui-disableSelection", function (ae) {
                    ae.preventDefault()
                })
            }
        })(),
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function (ag) {
            if (ag !== undefined) {
                return this.css("zIndex", ag)
            }
            if (this.length) {
                var ad = a(this[0]),
                    ae, af;
                while (ad.length && ad[0] !== document) {
                    ae = ad.css("position");
                    if (ae === "absolute" || ae === "relative" || ae === "fixed") {
                        af = parseInt(ad.css("zIndex"), 10);
                        if (!isNaN(af) && af !== 0) {
                            return af
                        }
                    }
                    ad = ad.parent()
                }
            }
            return 0
        }
    });
    a.ui.plugin = {
        add: function (ae, af, ah) {
            var ad, ag = a.ui[ae].prototype;
            for (ad in ah) {
                ag.plugins[ad] = ag.plugins[ad] || [];
                ag.plugins[ad].push([af, ah[ad]])
            }
        },
        call: function (ag, ah, ae, ad) {
            var af, ai = ag.plugins[ah];
            if (!ai) {
                return
            }
            if (!ad && (!ag.element[0].parentNode || ag.element[0].parentNode.nodeType === 11)) {
                return
            }
            for (af = 0; af < ai.length; af++) {
                if (ag.options[ai[af][0]]) {
                    ai[af][1].apply(ag.element, ae)
                }
            }
        }
    };
    /*
     * jQuery UI Widget 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/jQuery.widget/
     */
    var ac = 0,
        ab = Array.prototype.slice;
    a.cleanData = (function (ad) {
        return function (ag) {
            var ah, af, ai;
            for (ai = 0;
                (af = ag[ai]) != null; ai++) {
                try {
                    ah = a._data(af, "events");
                    if (ah && ah.remove) {
                        a(af).triggerHandler("remove")
                    }
                } catch (ae) {}
            }
            ad(ag)
        }
    })(a.cleanData);
    a.widget = function (ai, ad, ak) {
        var ah, ag, af, ae, al = {},
            aj = ai.split(".")[0];
        ai = ai.split(".")[1];
        ah = aj + "-" + ai;
        if (!ak) {
            ak = ad;
            ad = a.Widget
        }
        a.expr[":"][ah.toLowerCase()] = function (am) {
            return !!a.data(am, ah)
        };
        a[aj] = a[aj] || {};
        ag = a[aj][ai];
        af = a[aj][ai] = function (an, am) {
            if (!this._createWidget) {
                return new af(an, am)
            }
            if (arguments.length) {
                this._createWidget(an, am)
            }
        };
        a.extend(af, ag, {
            version: ak.version,
            _proto: a.extend({}, ak),
            _childConstructors: []
        });
        ae = new ad();
        ae.options = a.widget.extend({}, ae.options);
        a.each(ak, function (am, an) {
            if (!a.isFunction(an)) {
                al[am] = an;
                return
            }
            al[am] = (function () {
                var ao = function () {
                        return ad.prototype[am].apply(this, arguments)
                    },
                    ap = function (aq) {
                        return ad.prototype[am].apply(this, aq)
                    };
                return function () {
                    var aq = this._super,
                        ar = this._superApply,
                        at;
                    this._super = ao;
                    this._superApply = ap;
                    at = an.apply(this, arguments);
                    this._super = aq;
                    this._superApply = ar;
                    return at
                }
            })()
        });
        af.prototype = a.widget.extend(ae, {
            widgetEventPrefix: ag ? (ae.widgetEventPrefix || ai) : ai
        }, al, {
            constructor: af,
            namespace: aj,
            widgetName: ai,
            widgetFullName: ah
        });
        if (ag) {
            a.each(ag._childConstructors, function (ao, am) {
                var an = am.prototype;
                a.widget(an.namespace + "." + an.widgetName, af, am._proto)
            });
            delete ag._childConstructors
        } else {
            ad._childConstructors.push(af)
        }
        a.widget.bridge(ai, af);
        return af
    };
    a.widget.extend = function (ah) {
        var ad = ab.call(arguments, 1),
            ae = 0,
            af = ad.length,
            ag, ai;
        for (; ae < af; ae++) {
            for (ag in ad[ae]) {
                ai = ad[ae][ag];
                if (ad[ae].hasOwnProperty(ag) && ai !== undefined) {
                    if (a.isPlainObject(ai)) {
                        ah[ag] = a.isPlainObject(ah[ag]) ? a.widget.extend({}, ah[ag], ai) : a.widget.extend({}, ai)
                    } else {
                        ah[ag] = ai
                    }
                }
            }
        }
        return ah
    };
    a.widget.bridge = function (ae, af) {
        var ad = af.prototype.widgetFullName || ae;
        a.fn[ae] = function (ai) {
            var ah = typeof ai === "string",
                ag = ab.call(arguments, 1),
                aj = this;
            if (ah) {
                this.each(function () {
                    var al, ak = a.data(this, ad);
                    if (ai === "instance") {
                        aj = ak;
                        return false
                    }
                    if (!ak) {
                        return a.error("cannot call methods on " + ae + " prior to initialization; attempted to call method '" + ai + "'")
                    }
                    if (!a.isFunction(ak[ai]) || ai.charAt(0) === "_") {
                        return a.error("no such method '" + ai + "' for " + ae + " widget instance")
                    }
                    al = ak[ai].apply(ak, ag);
                    if (al !== ak && al !== undefined) {
                        aj = al && al.jquery ? aj.pushStack(al.get()) : al;
                        return false
                    }
                })
            } else {
                if (ag.length) {
                    ai = a.widget.extend.apply(null, [ai].concat(ag))
                }
                this.each(function () {
                    var ak = a.data(this, ad);
                    if (ak) {
                        ak.option(ai || {});
                        if (ak._init) {
                            ak._init()
                        }
                    } else {
                        a.data(this, ad, new af(ai, this))
                    }
                })
            }
            return aj
        }
    };
    a.Widget = function () {};
    a.Widget._childConstructors = [];
    a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function (ae, ad) {
            ad = a(ad || this.defaultElement || this)[0];
            this.element = a(ad);
            this.uuid = ac++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.bindings = a();
            this.hoverable = a();
            this.focusable = a();
            if (ad !== this) {
                a.data(ad, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function (af) {
                        if (af.target === ad) {
                            this.destroy()
                        }
                    }
                });
                this.document = a(ad.style ? ad.ownerDocument : ad.document || ad);
                this.window = a(this.document[0].defaultView || this.document[0].parentWindow)
            }
            this.options = a.widget.extend({}, this.options, this._getCreateOptions(), ae);
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: a.noop,
        _getCreateEventData: a.noop,
        _create: a.noop,
        _init: a.noop,
        destroy: function () {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: a.noop,
        widget: function () {
            return this.element
        },
        option: function (af, ai) {
            var ag = af,
                ah, ad, ae;
            if (arguments.length === 0) {
                return a.widget.extend({}, this.options)
            }
            if (typeof af === "string") {
                ag = {};
                ah = af.split(".");
                af = ah.shift();
                if (ah.length) {
                    ad = ag[af] = a.widget.extend({}, this.options[af]);
                    for (ae = 0; ae < ah.length - 1; ae++) {
                        ad[ah[ae]] = ad[ah[ae]] || {};
                        ad = ad[ah[ae]]
                    }
                    af = ah.pop();
                    if (arguments.length === 1) {
                        return ad[af] === undefined ? null : ad[af]
                    }
                    ad[af] = ai
                } else {
                    if (arguments.length === 1) {
                        return this.options[af] === undefined ? null : this.options[af]
                    }
                    ag[af] = ai
                }
            }
            this._setOptions(ag);
            return this
        },
        _setOptions: function (ae) {
            var ad;
            for (ad in ae) {
                this._setOption(ad, ae[ad])
            }
            return this
        },
        _setOption: function (ad, ae) {
            this.options[ad] = ae;
            if (ad === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled", !!ae);
                if (ae) {
                    this.hoverable.removeClass("ui-state-hover");
                    this.focusable.removeClass("ui-state-focus")
                }
            }
            return this
        },
        enable: function () {
            return this._setOptions({
                disabled: false
            })
        },
        disable: function () {
            return this._setOptions({
                disabled: true
            })
        },
        _on: function (ah, ae, af) {
            var ad, ag = this;
            if (typeof ah !== "boolean") {
                af = ae;
                ae = ah;
                ah = false
            }
            if (!af) {
                af = ae;
                ae = this.element;
                ad = this.widget()
            } else {
                ae = ad = a(ae);
                this.bindings = this.bindings.add(ae)
            }
            a.each(af, function (ai, ak) {
                function al() {
                    if (!ah && (ag.options.disabled === true || a(this).hasClass("ui-state-disabled"))) {
                        return
                    }
                    return (typeof ak === "string" ? ag[ak] : ak).apply(ag, arguments)
                }
                if (typeof ak !== "string") {
                    al.guid = ak.guid = ak.guid || al.guid || a.guid++
                }
                var am = ai.match(/^([\w:-]*)\s*(.*)$/),
                    aj = am[1] + ag.eventNamespace,
                    an = am[2];
                if (an) {
                    ad.delegate(an, aj, al)
                } else {
                    ae.bind(aj, al)
                }
            })
        },
        _off: function (ad, ae) {
            ae = (ae || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            ad.unbind(ae).undelegate(ae);
            this.bindings = a(this.bindings.not(ad).get());
            this.focusable = a(this.focusable.not(ad).get());
            this.hoverable = a(this.hoverable.not(ad).get())
        },
        _delay: function (ae, ad) {
            function af() {
                return (typeof ae === "string" ? ag[ae] : ae).apply(ag, arguments)
            }
            var ag = this;
            return setTimeout(af, ad || 0)
        },
        _hoverable: function (ad) {
            this.hoverable = this.hoverable.add(ad);
            this._on(ad, {
                mouseenter: function (ae) {
                    a(ae.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function (ae) {
                    a(ae.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (ad) {
            this.focusable = this.focusable.add(ad);
            this._on(ad, {
                focusin: function (ae) {
                    a(ae.currentTarget).addClass("ui-state-focus")
                },
                focusout: function (ae) {
                    a(ae.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (ai, af, ae) {
            var ah, ag, ad = this.options[ai];
            ae = ae || {};
            af = a.Event(af);
            af.type = (ai === this.widgetEventPrefix ? ai : this.widgetEventPrefix + ai).toLowerCase();
            af.target = this.element[0];
            ag = af.originalEvent;
            if (ag) {
                for (ah in ag) {
                    if (!(ah in af)) {
                        af[ah] = ag[ah]
                    }
                }
            }
            this.element.trigger(af, ae);
            return !(a.isFunction(ad) && ad.apply(this.element[0], [af].concat(ae)) === false || af.isDefaultPrevented())
        }
    };
    a.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (ae, ad) {
        a.Widget.prototype["_" + ae] = function (ah, aj, af) {
            if (typeof aj === "string") {
                aj = {
                    effect: aj
                }
            }
            var ai, ag = !aj ? ae : aj === true || typeof aj === "number" ? ad : aj.effect || ad;
            aj = aj || {};
            if (typeof aj === "number") {
                aj = {
                    duration: aj
                }
            }
            ai = !a.isEmptyObject(aj);
            aj.complete = af;
            if (aj.delay) {
                ah.delay(aj.delay)
            }
            if (ai && a.effects && a.effects.effect[ag]) {
                ah[ae](aj)
            } else {
                if (ag !== ae && ah[ag]) {
                    ah[ag](aj.duration, aj.easing, af)
                } else {
                    ah.queue(function (ak) {
                        a(this)[ae]();
                        if (af) {
                            af.call(ah[0])
                        }
                        ak()
                    })
                }
            }
        }
    });
    var aa = a.widget;
    /*
     * jQuery UI Mouse 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/mouse/
     */
    var L = false;
    a(document).mouseup(function () {
        L = false
    });
    var K = a.widget("ui.mouse", {
        version: "1.11.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var ad = this;
            this.element.bind("mousedown." + this.widgetName, function (ae) {
                return ad._mouseDown(ae)
            }).bind("click." + this.widgetName, function (ae) {
                if (true === a.data(ae.target, ad.widgetName + ".preventClickEvent")) {
                    a.removeData(ae.target, ad.widgetName + ".preventClickEvent");
                    ae.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            }
        },
        _mouseDown: function (af) {
            if (L) {
                return
            }
            this._mouseMoved = false;
            (this._mouseStarted && this._mouseUp(af));
            this._mouseDownEvent = af;
            var ag = this,
                ad = (af.which === 1),
                ae = (typeof this.options.cancel === "string" && af.target.nodeName ? a(af.target).closest(this.options.cancel).length : false);
            if (!ad || ae || !this._mouseCapture(af)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function () {
                    ag.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(af) && this._mouseDelayMet(af)) {
                this._mouseStarted = (this._mouseStart(af) !== false);
                if (!this._mouseStarted) {
                    af.preventDefault();
                    return true
                }
            }
            if (true === a.data(af.target, this.widgetName + ".preventClickEvent")) {
                a.removeData(af.target, this.widgetName + ".preventClickEvent")
            }
            this._mouseMoveDelegate = function (ah) {
                return ag._mouseMove(ah)
            };
            this._mouseUpDelegate = function (ah) {
                return ag._mouseUp(ah)
            };
            this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            af.preventDefault();
            L = true;
            return true
        },
        _mouseMove: function (ad) {
            if (this._mouseMoved) {
                if (a.ui.ie && (!document.documentMode || document.documentMode < 9) && !ad.button) {
                    return this._mouseUp(ad)
                } else {
                    if (!ad.which) {
                        return this._mouseUp(ad)
                    }
                }
            }
            if (ad.which || ad.button) {
                this._mouseMoved = true
            }
            if (this._mouseStarted) {
                this._mouseDrag(ad);
                return ad.preventDefault()
            }
            if (this._mouseDistanceMet(ad) && this._mouseDelayMet(ad)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, ad) !== false);
                (this._mouseStarted ? this._mouseDrag(ad) : this._mouseUp(ad))
            }
            return !this._mouseStarted
        },
        _mouseUp: function (ad) {
            this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (ad.target === this._mouseDownEvent.target) {
                    a.data(ad.target, this.widgetName + ".preventClickEvent", true)
                }
                this._mouseStop(ad)
            }
            L = false;
            return false
        },
        _mouseDistanceMet: function (ad) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - ad.pageX), Math.abs(this._mouseDownEvent.pageY - ad.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return true
        }
    });
    /*
     * jQuery UI Position 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/position/
     */
    (function () {
        a.ui = a.ui || {};
        var af, aq, ai = Math.max,
            ae = Math.abs,
            am = Math.round,
            ak = /left|center|right/,
            ap = /top|center|bottom/,
            al = /[\+\-]\d+(\.[\d]+)?%?/,
            ao = /^\w+/,
            an = /%$/,
            ad = a.fn.position;

        function ah(at, au, ar) {
            return [parseFloat(at[0]) * (an.test(at[0]) ? au / 100 : 1), parseFloat(at[1]) * (an.test(at[1]) ? ar / 100 : 1)]
        }

        function aj(ar, at) {
            return parseInt(a.css(ar, at), 10) || 0
        }

        function ag(ar) {
            var at = ar[0];
            if (at.nodeType === 9) {
                return {
                    width: ar.width(),
                    height: ar.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                }
            }
            if (a.isWindow(at)) {
                return {
                    width: ar.width(),
                    height: ar.height(),
                    offset: {
                        top: ar.scrollTop(),
                        left: ar.scrollLeft()
                    }
                }
            }
            if (at.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: at.pageY,
                        left: at.pageX
                    }
                }
            }
            return {
                width: ar.outerWidth(),
                height: ar.outerHeight(),
                offset: ar.offset()
            }
        }
        a.position = {
            scrollbarWidth: function () {
                if (af !== undefined) {
                    return af
                }
                var au, av, ar = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    at = ar.children()[0];
                a("body").append(ar);
                au = at.offsetWidth;
                ar.css("overflow", "scroll");
                av = at.offsetWidth;
                if (au === av) {
                    av = ar[0].clientWidth
                }
                ar.remove();
                return (af = au - av)
            },
            getScrollInfo: function (aw) {
                var au = aw.isWindow || aw.isDocument ? "" : aw.element.css("overflow-x"),
                    av = aw.isWindow || aw.isDocument ? "" : aw.element.css("overflow-y"),
                    ar = au === "scroll" || (au === "auto" && aw.width < aw.element[0].scrollWidth),
                    at = av === "scroll" || (av === "auto" && aw.height < aw.element[0].scrollHeight);
                return {
                    width: at ? a.position.scrollbarWidth() : 0,
                    height: ar ? a.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function (ar) {
                var av = a(ar || window),
                    au = a.isWindow(av[0]),
                    at = !!av[0] && av[0].nodeType === 9;
                return {
                    element: av,
                    isWindow: au,
                    isDocument: at,
                    offset: av.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: av.scrollLeft(),
                    scrollTop: av.scrollTop(),
                    width: au || at ? av.width() : av.outerWidth(),
                    height: au || at ? av.height() : av.outerHeight()
                }
            }
        };
        a.fn.position = function (ax) {
            if (!ax || !ax.of) {
                return ad.apply(this, arguments)
            }
            ax = a.extend({}, ax);
            var ar, aC, aA, aB, at, av, az = a(ax.of),
                aD = a.position.getWithinInfo(ax.within),
                ay = a.position.getScrollInfo(aD),
                au = (ax.collision || "flip").split(" "),
                aw = {};
            av = ag(az);
            if (az[0].preventDefault) {
                ax.at = "left top"
            }
            aC = av.width;
            aA = av.height;
            aB = av.offset;
            at = a.extend({}, aB);
            a.each(["my", "at"], function () {
                var aF = (ax[this] || "").split(" "),
                    aE, aG;
                if (aF.length === 1) {
                    aF = ak.test(aF[0]) ? aF.concat(["center"]) : ap.test(aF[0]) ? ["center"].concat(aF) : ["center", "center"]
                }
                aF[0] = ak.test(aF[0]) ? aF[0] : "center";
                aF[1] = ap.test(aF[1]) ? aF[1] : "center";
                aE = al.exec(aF[0]);
                aG = al.exec(aF[1]);
                aw[this] = [aE ? aE[0] : 0, aG ? aG[0] : 0];
                ax[this] = [ao.exec(aF[0])[0], ao.exec(aF[1])[0]]
            });
            if (au.length === 1) {
                au[1] = au[0]
            }
            if (ax.at[0] === "right") {
                at.left += aC
            } else {
                if (ax.at[0] === "center") {
                    at.left += aC / 2
                }
            }
            if (ax.at[1] === "bottom") {
                at.top += aA
            } else {
                if (ax.at[1] === "center") {
                    at.top += aA / 2
                }
            }
            ar = ah(aw.at, aC, aA);
            at.left += ar[0];
            at.top += ar[1];
            return this.each(function () {
                var aF, aO, aH = a(this),
                    aJ = aH.outerWidth(),
                    aI = aH.outerHeight(),
                    aK = aj(this, "marginLeft"),
                    aL = aj(this, "marginTop"),
                    aG = aJ + aK + aj(this, "marginRight") + ay.width,
                    aE = aI + aL + aj(this, "marginBottom") + ay.height,
                    aN = a.extend({}, at),
                    aM = ah(aw.my, aH.outerWidth(), aH.outerHeight());
                if (ax.my[0] === "right") {
                    aN.left -= aJ
                } else {
                    if (ax.my[0] === "center") {
                        aN.left -= aJ / 2
                    }
                }
                if (ax.my[1] === "bottom") {
                    aN.top -= aI
                } else {
                    if (ax.my[1] === "center") {
                        aN.top -= aI / 2
                    }
                }
                aN.left += aM[0];
                aN.top += aM[1];
                if (!aq) {
                    aN.left = am(aN.left);
                    aN.top = am(aN.top)
                }
                aF = {
                    marginLeft: aK,
                    marginTop: aL
                };
                a.each(["left", "top"], function (aQ, aP) {
                    if (a.ui.position[au[aQ]]) {
                        a.ui.position[au[aQ]][aP](aN, {
                            targetWidth: aC,
                            targetHeight: aA,
                            elemWidth: aJ,
                            elemHeight: aI,
                            collisionPosition: aF,
                            collisionWidth: aG,
                            collisionHeight: aE,
                            offset: [ar[0] + aM[0], ar[1] + aM[1]],
                            my: ax.my,
                            at: ax.at,
                            within: aD,
                            elem: aH
                        })
                    }
                });
                if (ax.using) {
                    aO = function (aS) {
                        var aR = aB.left - aN.left,
                            aT = aR + aC - aJ,
                            aU = aB.top - aN.top,
                            aP = aU + aA - aI,
                            aQ = {
                                target: {
                                    element: az,
                                    left: aB.left,
                                    top: aB.top,
                                    width: aC,
                                    height: aA
                                },
                                element: {
                                    element: aH,
                                    left: aN.left,
                                    top: aN.top,
                                    width: aJ,
                                    height: aI
                                },
                                horizontal: aT < 0 ? "left" : aR > 0 ? "right" : "center",
                                vertical: aP < 0 ? "top" : aU > 0 ? "bottom" : "middle"
                            };
                        if (aC < aJ && ae(aR + aT) < aC) {
                            aQ.horizontal = "center"
                        }
                        if (aA < aI && ae(aU + aP) < aA) {
                            aQ.vertical = "middle"
                        }
                        if (ai(ae(aR), ae(aT)) > ai(ae(aU), ae(aP))) {
                            aQ.important = "horizontal"
                        } else {
                            aQ.important = "vertical"
                        }
                        ax.using.call(this, aS, aQ)
                    }
                }
                aH.offset(a.extend(aN, {
                    using: aO
                }))
            })
        };
        a.ui.position = {
            fit: {
                left: function (ay, at) {
                    var az = at.within,
                        aA = az.isWindow ? az.scrollLeft : az.offset.left,
                        av = az.width,
                        ar = ay.left - at.collisionPosition.marginLeft,
                        aw = aA - ar,
                        ax = ar + at.collisionWidth - av - aA,
                        au;
                    if (at.collisionWidth > av) {
                        if (aw > 0 && ax <= 0) {
                            au = ay.left + aw + at.collisionWidth - av - aA;
                            ay.left += aw - au
                        } else {
                            if (ax > 0 && aw <= 0) {
                                ay.left = aA
                            } else {
                                if (aw > ax) {
                                    ay.left = aA + av - at.collisionWidth
                                } else {
                                    ay.left = aA
                                }
                            }
                        }
                    } else {
                        if (aw > 0) {
                            ay.left += aw
                        } else {
                            if (ax > 0) {
                                ay.left -= ax
                            } else {
                                ay.left = ai(ay.left - ar, ay.left)
                            }
                        }
                    }
                },
                top: function (ay, at) {
                    var az = at.within,
                        aA = az.isWindow ? az.scrollTop : az.offset.top,
                        av = at.within.height,
                        ar = ay.top - at.collisionPosition.marginTop,
                        ax = aA - ar,
                        aw = ar + at.collisionHeight - av - aA,
                        au;
                    if (at.collisionHeight > av) {
                        if (ax > 0 && aw <= 0) {
                            au = ay.top + ax + at.collisionHeight - av - aA;
                            ay.top += ax - au
                        } else {
                            if (aw > 0 && ax <= 0) {
                                ay.top = aA
                            } else {
                                if (ax > aw) {
                                    ay.top = aA + av - at.collisionHeight
                                } else {
                                    ay.top = aA
                                }
                            }
                        }
                    } else {
                        if (ax > 0) {
                            ay.top += ax
                        } else {
                            if (aw > 0) {
                                ay.top -= aw
                            } else {
                                ay.top = ai(ay.top - ar, ay.top)
                            }
                        }
                    }
                }
            },
            flip: {
                left: function (aD, au) {
                    var aE = au.within,
                        aF = aE.offset.left + aE.scrollLeft,
                        aA = aE.width,
                        az = aE.isWindow ? aE.scrollLeft : aE.offset.left,
                        at = aD.left - au.collisionPosition.marginLeft,
                        aB = at - az,
                        aC = at + au.collisionWidth - aA - az,
                        av = au.my[0] === "left" ? -au.elemWidth : au.my[0] === "right" ? au.elemWidth : 0,
                        ar = au.at[0] === "left" ? au.targetWidth : au.at[0] === "right" ? -au.targetWidth : 0,
                        ay = -2 * au.offset[0],
                        ax, aw;
                    if (aB < 0) {
                        ax = aD.left + av + ar + ay + au.collisionWidth - aA - aF;
                        if (ax < 0 || ax < ae(aB)) {
                            aD.left += av + ar + ay
                        }
                    } else {
                        if (aC > 0) {
                            aw = aD.left - au.collisionPosition.marginLeft + av + ar + ay - az;
                            if (aw > 0 || ae(aw) < aC) {
                                aD.left += av + ar + ay
                            }
                        }
                    }
                },
                top: function (aD, au) {
                    var aF = au.within,
                        aG = aF.offset.top + aF.scrollTop,
                        aA = aF.height,
                        az = aF.isWindow ? aF.scrollTop : aF.offset.top,
                        at = aD.top - au.collisionPosition.marginTop,
                        aC = at - az,
                        aB = at + au.collisionHeight - aA - az,
                        aE = au.my[1] === "top",
                        av = aE ? -au.elemHeight : au.my[1] === "bottom" ? au.elemHeight : 0,
                        ar = au.at[1] === "top" ? au.targetHeight : au.at[1] === "bottom" ? -au.targetHeight : 0,
                        ay = -2 * au.offset[1],
                        ax, aw;
                    if (aC < 0) {
                        aw = aD.top + av + ar + ay + au.collisionHeight - aA - aG;
                        if (aw < 0 || aw < ae(aC)) {
                            aD.top += av + ar + ay
                        }
                    } else {
                        if (aB > 0) {
                            ax = aD.top - au.collisionPosition.marginTop + av + ar + ay - az;
                            if (ax > 0 || ae(ax) < aB) {
                                aD.top += av + ar + ay
                            }
                        }
                    }
                }
            },
            flipfit: {
                left: function () {
                    a.ui.position.flip.left.apply(this, arguments);
                    a.ui.position.fit.left.apply(this, arguments)
                },
                top: function () {
                    a.ui.position.flip.top.apply(this, arguments);
                    a.ui.position.fit.top.apply(this, arguments)
                }
            }
        };
        (function () {
            var aw, ax, ay, av, au, ar = document.getElementsByTagName("body")[0],
                at = document.createElement("div");
            aw = document.createElement(ar ? "div" : "body");
            ay = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (ar) {
                a.extend(ay, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                })
            }
            for (au in ay) {
                aw.style[au] = ay[au]
            }
            aw.appendChild(at);
            ax = ar || document.documentElement;
            ax.insertBefore(aw, ax.firstChild);
            at.style.cssText = "position: absolute; left: 10.7432222px;";
            av = a(at).offset().left;
            aq = av > 10 && av < 11;
            aw.innerHTML = "";
            ax.removeChild(aw)
        })()
    })();
    var M = a.ui.position;
    /*
     * jQuery UI Menu 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/menu/
     */
    var J = a.widget("ui.menu", {
        version: "1.11.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            items: "> *",
            menus: "ul",
            position: {
                my: "left-1 top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element;
            this.mouseHandled = false;
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            });
            if (this.options.disabled) {
                this.element.addClass("ui-state-disabled").attr("aria-disabled", "true")
            }
            this._on({
                "mousedown .ui-menu-item": function (ad) {
                    ad.preventDefault()
                },
                "click .ui-menu-item": function (ad) {
                    var ae = a(ad.target);
                    if (!this.mouseHandled && ae.not(".ui-state-disabled").length) {
                        this.select(ad);
                        if (!ad.isPropagationStopped()) {
                            this.mouseHandled = true
                        }
                        if (ae.has(".ui-menu").length) {
                            this.expand(ad)
                        } else {
                            if (!this.element.is(":focus") && a(this.document[0].activeElement).closest(".ui-menu").length) {
                                this.element.trigger("focus", [true]);
                                if (this.active && this.active.parents(".ui-menu").length === 1) {
                                    clearTimeout(this.timer)
                                }
                            }
                        }
                    }
                },
                "mouseenter .ui-menu-item": function (ad) {
                    if (this.previousFilter) {
                        return
                    }
                    var ae = a(ad.currentTarget);
                    ae.siblings(".ui-state-active").removeClass("ui-state-active");
                    this.focus(ad, ae)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function (ad, af) {
                    var ae = this.active || this.element.find(this.options.items).eq(0);
                    if (!af) {
                        this.focus(ad, ae)
                    }
                },
                blur: function (ad) {
                    this._delay(function () {
                        if (!a.contains(this.element[0], this.document[0].activeElement)) {
                            this.collapseAll(ad)
                        }
                    })
                },
                keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function (ad) {
                    if (this._closeOnDocumentClick(ad)) {
                        this.collapseAll(ad)
                    }
                    this.mouseHandled = false
                }
            })
        },
        _destroy: function () {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                var ad = a(this);
                if (ad.data("ui-menu-submenu-carat")) {
                    ad.remove()
                }
            });
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function (ae) {
            var af, ag, ad, ai, ah = true;
            switch (ae.keyCode) {
                case a.ui.keyCode.PAGE_UP:
                    this.previousPage(ae);
                    break;
                case a.ui.keyCode.PAGE_DOWN:
                    this.nextPage(ae);
                    break;
                case a.ui.keyCode.HOME:
                    this._move("first", "first", ae);
                    break;
                case a.ui.keyCode.END:
                    this._move("last", "last", ae);
                    break;
                case a.ui.keyCode.UP:
                    this.previous(ae);
                    break;
                case a.ui.keyCode.DOWN:
                    this.next(ae);
                    break;
                case a.ui.keyCode.LEFT:
                    this.collapse(ae);
                    break;
                case a.ui.keyCode.RIGHT:
                    if (this.active && !this.active.is(".ui-state-disabled")) {
                        this.expand(ae)
                    }
                    break;
                case a.ui.keyCode.ENTER:
                case a.ui.keyCode.SPACE:
                    this._activate(ae);
                    break;
                case a.ui.keyCode.ESCAPE:
                    this.collapse(ae);
                    break;
                default:
                    ah = false;
                    ag = this.previousFilter || "";
                    ad = String.fromCharCode(ae.keyCode);
                    ai = false;
                    clearTimeout(this.filterTimer);
                    if (ad === ag) {
                        ai = true
                    } else {
                        ad = ag + ad
                    }
                    af = this._filterMenuItems(ad);
                    af = ai && af.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : af;
                    if (!af.length) {
                        ad = String.fromCharCode(ae.keyCode);
                        af = this._filterMenuItems(ad)
                    }
                    if (af.length) {
                        this.focus(ae, af);
                        this.previousFilter = ad;
                        this.filterTimer = this._delay(function () {
                            delete this.previousFilter
                        }, 1000)
                    } else {
                        delete this.previousFilter
                    }
            }
            if (ah) {
                ae.preventDefault()
            }
        },
        _activate: function (ad) {
            if (!this.active.is(".ui-state-disabled")) {
                if (this.active.is("[aria-haspopup='true']")) {
                    this.expand(ad)
                } else {
                    this.select(ad)
                }
            }
        },
        refresh: function () {
            var af, ae, ah = this,
                ad = this.options.icons.submenu,
                ag = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length);
            ag.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function () {
                var aj = a(this),
                    ai = aj.parent(),
                    ak = a("<span>").addClass("ui-menu-icon ui-icon " + ad).data("ui-menu-submenu-carat", true);
                ai.attr("aria-haspopup", "true").prepend(ak);
                aj.attr("aria-labelledby", ai.attr("id"))
            });
            af = ag.add(this.element);
            ae = af.find(this.options.items);
            ae.not(".ui-menu-item").each(function () {
                var ai = a(this);
                if (ah._isDivider(ai)) {
                    ai.addClass("ui-widget-content ui-menu-divider")
                }
            });
            ae.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                tabIndex: -1,
                role: this._itemRole()
            });
            ae.filter(".ui-state-disabled").attr("aria-disabled", "true");
            if (this.active && !a.contains(this.element[0], this.active[0])) {
                this.blur()
            }
        },
        _itemRole: function () {
            return {
                menu: "menuitem",
                listbox: "option"
            } [this.options.role]
        },
        _setOption: function (ad, ae) {
            if (ad === "icons") {
                this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(ae.submenu)
            }
            if (ad === "disabled") {
                this.element.toggleClass("ui-state-disabled", !!ae).attr("aria-disabled", ae)
            }
            this._super(ad, ae)
        },
        focus: function (ad, af) {
            var ag, ae;
            this.blur(ad, ad && ad.type === "focus");
            this._scrollIntoView(af);
            this.active = af.first();
            ae = this.active.addClass("ui-state-focus").removeClass("ui-state-active");
            if (this.options.role) {
                this.element.attr("aria-activedescendant", ae.attr("id"))
            }
            this.active.parent().closest(".ui-menu-item").addClass("ui-state-active");
            if (ad && ad.type === "keydown") {
                this._close()
            } else {
                this.timer = this._delay(function () {
                    this._close()
                }, this.delay)
            }
            ag = af.children(".ui-menu");
            if (ag.length && ad && (/^mouse/.test(ad.type))) {
                this._startOpening(ag)
            }
            this.activeMenu = af.parent();
            this._trigger("focus", ad, {
                item: af
            })
        },
        _scrollIntoView: function (af) {
            var ad, ai, ah, aj, ae, ag;
            if (this._hasScroll()) {
                ad = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0;
                ai = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0;
                ah = af.offset().top - this.activeMenu.offset().top - ad - ai;
                aj = this.activeMenu.scrollTop();
                ae = this.activeMenu.height();
                ag = af.outerHeight();
                if (ah < 0) {
                    this.activeMenu.scrollTop(aj + ah)
                } else {
                    if (ah + ag > ae) {
                        this.activeMenu.scrollTop(aj + ah - ae + ag)
                    }
                }
            }
        },
        blur: function (ad, ae) {
            if (!ae) {
                clearTimeout(this.timer)
            }
            if (!this.active) {
                return
            }
            this.active.removeClass("ui-state-focus");
            this.active = null;
            this._trigger("blur", ad, {
                item: this.active
            })
        },
        _startOpening: function (ad) {
            clearTimeout(this.timer);
            if (ad.attr("aria-hidden") !== "true") {
                return
            }
            this.timer = this._delay(function () {
                this._close();
                this._open(ad)
            }, this.delay)
        },
        _open: function (ae) {
            var ad = a.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(ae.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            ae.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(ad)
        },
        collapseAll: function (ae, ad) {
            clearTimeout(this.timer);
            this.timer = this._delay(function () {
                var af = ad ? this.element : a(ae && ae.target).closest(this.element.find(".ui-menu"));
                if (!af.length) {
                    af = this.element
                }
                this._close(af);
                this.blur(ae);
                this.activeMenu = af
            }, this.delay)
        },
        _close: function (ad) {
            if (!ad) {
                ad = this.active ? this.active.parent() : this.element
            }
            ad.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
        },
        _closeOnDocumentClick: function (ad) {
            return !a(ad.target).closest(".ui-menu").length
        },
        _isDivider: function (ad) {
            return !/[^\-\u2014\u2013\s]/.test(ad.text())
        },
        collapse: function (ad) {
            var ae = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            if (ae && ae.length) {
                this._close();
                this.focus(ad, ae)
            }
        },
        expand: function (ad) {
            var ae = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
            if (ae && ae.length) {
                this._open(ae.parent());
                this._delay(function () {
                    this.focus(ad, ae)
                })
            }
        },
        next: function (ad) {
            this._move("next", "first", ad)
        },
        previous: function (ad) {
            this._move("prev", "last", ad)
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function (ad, af, ae) {
            var ag;
            if (this.active) {
                if (ad === "first" || ad === "last") {
                    ag = this.active[ad === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1)
                } else {
                    ag = this.active[ad + "All"](".ui-menu-item").eq(0)
                }
            }
            if (!ag || !ag.length || !this.active) {
                ag = this.activeMenu.find(this.options.items)[af]()
            }
            this.focus(ae, ag)
        },
        nextPage: function (ae) {
            var ag, ad, af;
            if (!this.active) {
                this.next(ae);
                return
            }
            if (this.isLastItem()) {
                return
            }
            if (this._hasScroll()) {
                ad = this.active.offset().top;
                af = this.element.height();
                this.active.nextAll(".ui-menu-item").each(function () {
                    ag = a(this);
                    return ag.offset().top - ad - af < 0
                });
                this.focus(ae, ag)
            } else {
                this.focus(ae, this.activeMenu.find(this.options.items)[!this.active ? "first" : "last"]())
            }
        },
        previousPage: function (ae) {
            var ag, ad, af;
            if (!this.active) {
                this.next(ae);
                return
            }
            if (this.isFirstItem()) {
                return
            }
            if (this._hasScroll()) {
                ad = this.active.offset().top;
                af = this.element.height();
                this.active.prevAll(".ui-menu-item").each(function () {
                    ag = a(this);
                    return ag.offset().top - ad + af > 0
                });
                this.focus(ae, ag)
            } else {
                this.focus(ae, this.activeMenu.find(this.options.items).first())
            }
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function (ad) {
            this.active = this.active || a(ad.target).closest(".ui-menu-item");
            var ae = {
                item: this.active
            };
            if (!this.active.has(".ui-menu").length) {
                this.collapseAll(ad, true)
            }
            this._trigger("select", ad, ae)
        },
        _filterMenuItems: function (ad) {
            var ae = ad.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                af = new RegExp("^" + ae, "i");
            return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function () {
                return af.test(a.trim(a(this).text()))
            })
        }
    });
    /*
     * jQuery UI Autocomplete 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/autocomplete/
     */
    a.widget("ui.autocomplete", {
        version: "1.11.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: false,
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
        requestIndex: 0,
        pending: 0,
        _create: function () {
            var ah, ai, ag, af = this.element[0].nodeName.toLowerCase(),
                ae = af === "textarea",
                ad = af === "input";
            this.isMultiLine = ae ? true : ad ? false : this.element.prop("isContentEditable");
            this.valueMethod = this.element[ae || ad ? "val" : "text"];
            this.isNewMenu = true;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function (aj) {
                    if (this.element.prop("readOnly")) {
                        ah = true;
                        ag = true;
                        ai = true;
                        return
                    }
                    ah = false;
                    ag = false;
                    ai = false;
                    var ak = a.ui.keyCode;
                    switch (aj.keyCode) {
                        case ak.PAGE_UP:
                            ah = true;
                            this._move("previousPage", aj);
                            break;
                        case ak.PAGE_DOWN:
                            ah = true;
                            this._move("nextPage", aj);
                            break;
                        case ak.UP:
                            ah = true;
                            this._keyEvent("previous", aj);
                            break;
                        case ak.DOWN:
                            ah = true;
                            this._keyEvent("next", aj);
                            break;
                        case ak.ENTER:
                            if (this.menu.active) {
                                ah = true;
                                aj.preventDefault();
                                this.menu.select(aj)
                            }
                            break;
                        case ak.TAB:
                            if (this.menu.active) {
                                this.menu.select(aj)
                            }
                            break;
                        case ak.ESCAPE:
                            if (this.menu.element.is(":visible")) {
                                if (!this.isMultiLine) {
                                    this._value(this.term)
                                }
                                this.close(aj);
                                aj.preventDefault()
                            }
                            break;
                        default:
                            ai = true;
                            this._searchTimeout(aj);
                            break
                    }
                },
                keypress: function (aj) {
                    if (ah) {
                        ah = false;
                        if (!this.isMultiLine || this.menu.element.is(":visible")) {
                            aj.preventDefault()
                        }
                        return
                    }
                    if (ai) {
                        return
                    }
                    var ak = a.ui.keyCode;
                    switch (aj.keyCode) {
                        case ak.PAGE_UP:
                            this._move("previousPage", aj);
                            break;
                        case ak.PAGE_DOWN:
                            this._move("nextPage", aj);
                            break;
                        case ak.UP:
                            this._keyEvent("previous", aj);
                            break;
                        case ak.DOWN:
                            this._keyEvent("next", aj);
                            break
                    }
                },
                input: function (aj) {
                    if (ag) {
                        ag = false;
                        aj.preventDefault();
                        return
                    }
                    this._searchTimeout(aj)
                },
                focus: function () {
                    this.selectedItem = null;
                    this.previous = this._value()
                },
                blur: function (aj) {
                    if (this.cancelBlur) {
                        delete this.cancelBlur;
                        return
                    }
                    clearTimeout(this.searching);
                    this.close(aj);
                    this._change(aj)
                }
            });
            this._initSource();
            this.menu = a("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().menu("instance");
            this._on(this.menu.element, {
                mousedown: function (aj) {
                    aj.preventDefault();
                    this.cancelBlur = true;
                    this._delay(function () {
                        delete this.cancelBlur
                    });
                    var ak = this.menu.element[0];
                    if (!a(aj.target).closest(".ui-menu-item").length) {
                        this._delay(function () {
                            var al = this;
                            this.document.one("mousedown", function (am) {
                                if (am.target !== al.element[0] && am.target !== ak && !a.contains(ak, am.target)) {
                                    al.close()
                                }
                            })
                        })
                    }
                },
                menufocus: function (aj, am) {
                    var al, ak;
                    if (this.isNewMenu) {
                        this.isNewMenu = false;
                        if (aj.originalEvent && /^mouse/.test(aj.originalEvent.type)) {
                            this.menu.blur();
                            this.document.one("mousemove", function () {
                                a(aj.target).trigger(aj.originalEvent)
                            });
                            return
                        }
                    }
                    ak = am.item.data("ui-autocomplete-item");
                    if (false !== this._trigger("focus", aj, {
                            item: ak
                        })) {
                        if (aj.originalEvent && /^key/.test(aj.originalEvent.type)) {
                            this._value(ak.value)
                        }
                    }
                    al = am.item.attr("aria-label") || ak.value;
                    if (al && a.trim(al).length) {
                        this.liveRegion.children().hide();
                        a("<div>").text(al).appendTo(this.liveRegion)
                    }
                },
                menuselect: function (aj, am) {
                    var ak = am.item.data("ui-autocomplete-item"),
                        al = this.previous;
                    if (this.element[0] !== this.document[0].activeElement) {
                        this.element.focus();
                        this.previous = al;
                        this._delay(function () {
                            this.previous = al;
                            this.selectedItem = ak
                        })
                    }
                    if (false !== this._trigger("select", aj, {
                            item: ak
                        })) {
                        this._value(ak.value)
                    }
                    this.term = this._value();
                    this.close(aj);
                    this.selectedItem = ak
                }
            });
            this.liveRegion = a("<span>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body);
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function () {
            clearTimeout(this.searching);
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove()
        },
        _setOption: function (ad, ae) {
            this._super(ad, ae);
            if (ad === "source") {
                this._initSource()
            }
            if (ad === "appendTo") {
                this.menu.element.appendTo(this._appendTo())
            }
            if (ad === "disabled" && ae && this.xhr) {
                this.xhr.abort()
            }
        },
        _appendTo: function () {
            var ad = this.options.appendTo;
            if (ad) {
                ad = ad.jquery || ad.nodeType ? a(ad) : this.document.find(ad).eq(0)
            }
            if (!ad || !ad[0]) {
                ad = this.element.closest(".ui-front")
            }
            if (!ad.length) {
                ad = this.document[0].body
            }
            return ad
        },
        _initSource: function () {
            var ad, af, ae = this;
            if (a.isArray(this.options.source)) {
                ad = this.options.source;
                this.source = function (ag, ah) {
                    ah(a.ui.autocomplete.filter(ad, ag.term))
                }
            } else {
                if (typeof this.options.source === "string") {
                    af = this.options.source;
                    this.source = function (ag, ah) {
                        if (ae.xhr) {
                            ae.xhr.abort()
                        }
                        ae.xhr = a.ajax({
                            url: af,
                            data: ag,
                            dataType: "json",
                            success: function (ai) {
                                ah(ai)
                            },
                            error: function () {
                                ah([])
                            }
                        })
                    }
                } else {
                    this.source = this.options.source
                }
            }
        },
        _searchTimeout: function (ad) {
            clearTimeout(this.searching);
            this.searching = this._delay(function () {
                var ae = this.term === this._value(),
                    af = this.menu.element.is(":visible"),
                    ag = ad.altKey || ad.ctrlKey || ad.metaKey || ad.shiftKey;
                if (!ae || (ae && !af && !ag)) {
                    this.selectedItem = null;
                    this.search(null, ad)
                }
            }, this.options.delay)
        },
        search: function (ae, ad) {
            ae = ae != null ? ae : this._value();
            this.term = this._value();
            if (ae.length < this.options.minLength) {
                return this.close(ad)
            }
            if (this._trigger("search", ad) === false) {
                return
            }
            return this._search(ae)
        },
        _search: function (ad) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.cancelSearch = false;
            this.source({
                term: ad
            }, this._response())
        },
        _response: function () {
            var ad = ++this.requestIndex;
            return a.proxy(function (ae) {
                if (ad === this.requestIndex) {
                    this.__response(ae)
                }
                this.pending--;
                if (!this.pending) {
                    this.element.removeClass("ui-autocomplete-loading")
                }
            }, this)
        },
        __response: function (ad) {
            if (ad) {
                ad = this._normalize(ad)
            }
            this._trigger("response", null, {
                content: ad
            });
            if (!this.options.disabled && ad && ad.length && !this.cancelSearch) {
                this._suggest(ad);
                this._trigger("open")
            } else {
                this._close()
            }
        },
        close: function (ad) {
            this.cancelSearch = true;
            this._close(ad)
        },
        _close: function (ad) {
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.blur();
                this.isNewMenu = true;
                this._trigger("close", ad)
            }
        },
        _change: function (ad) {
            if (this.previous !== this._value()) {
                this._trigger("change", ad, {
                    item: this.selectedItem
                })
            }
        },
        _normalize: function (ad) {
            if (ad.length && ad[0].label && ad[0].value) {
                return ad
            }
            return a.map(ad, function (ae) {
                if (typeof ae === "string") {
                    return {
                        label: ae,
                        value: ae
                    }
                }
                return a.extend({}, ae, {
                    label: ae.label || ae.value,
                    value: ae.value || ae.label
                })
            })
        },
        _suggest: function (ad) {
            var ae = this.menu.element.empty();
            this._renderMenu(ae, ad);
            this.isNewMenu = true;
            this.menu.refresh();
            ae.show();
            this._resizeMenu();
            ae.position(a.extend({
                of: this.element
            }, this.options.position));
            if (this.options.autoFocus) {
                this.menu.next()
            }
        },
        _resizeMenu: function () {
            var ad = this.menu.element;
            ad.outerWidth(Math.max(ad.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function (af, ad) {
            var ae = this;
            a.each(ad, function (ag, ah) {
                ae._renderItemData(af, ah)
            })
        },
        _renderItemData: function (ae, ad) {
            return this._renderItem(ae, ad).data("ui-autocomplete-item", ad)
        },
        _renderItem: function (ae, ad) {
            return a("<li>").text(ad.label).appendTo(ae)
        },
        _move: function (ad, ae) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, ae);
                return
            }
            if (this.menu.isFirstItem() && /^previous/.test(ad) || this.menu.isLastItem() && /^next/.test(ad)) {
                if (!this.isMultiLine) {
                    this._value(this.term)
                }
                this.menu.blur();
                return
            }
            this.menu[ad](ae)
        },
        widget: function () {
            return this.menu.element
        },
        _value: function () {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function (ae, ad) {
            if (!this.isMultiLine || this.menu.element.is(":visible")) {
                this._move(ae, ad);
                ad.preventDefault()
            }
        }
    });
    a.extend(a.ui.autocomplete, {
        escapeRegex: function (ad) {
            return ad.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function (ad, af) {
            var ae = new RegExp(a.ui.autocomplete.escapeRegex(af), "i");
            return a.grep(ad, function (ag) {
                return ae.test(ag.label || ag.value || ag)
            })
        }
    });
    a.widget("ui.autocomplete", a.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function (ad) {
                    return ad + (ad > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function (ad) {
            var ae;
            this._superApply(arguments);
            if (this.options.disabled || this.cancelSearch) {
                return
            }
            if (ad && ad.length) {
                ae = this.options.messages.results(ad.length)
            } else {
                ae = this.options.messages.noResults
            }
            this.liveRegion.children().hide();
            a("<div>").text(ae).appendTo(this.liveRegion)
        }
    });
    var b = a.ui.autocomplete;
    /*
     * jQuery UI Button 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/button/
     */
    var I, c = "ui-button ui-widget ui-state-default ui-corner-all",
        Y = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        G = function () {
            var ad = a(this);
            setTimeout(function () {
                ad.find(":ui-button").button("refresh")
            }, 1)
        },
        O = function (af) {
            var ae = af.name,
                ad = af.form,
                ag = a([]);
            if (ae) {
                ae = ae.replace(/'/g, "\\'");
                if (ad) {
                    ag = a(ad).find("[name='" + ae + "'][type=radio]")
                } else {
                    ag = a("[name='" + ae + "'][type=radio]", af.ownerDocument).filter(function () {
                        return !this.form
                    })
                }
            }
            return ag
        };
    a.widget("ui.button", {
        version: "1.11.4",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function () {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, G);
            if (typeof this.options.disabled !== "boolean") {
                this.options.disabled = !!this.element.prop("disabled")
            } else {
                this.element.prop("disabled", this.options.disabled)
            }
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var af = this,
                ae = this.options,
                ag = this.type === "checkbox" || this.type === "radio",
                ad = !ag ? "ui-state-active" : "";
            if (ae.label === null) {
                ae.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html())
            }
            this._hoverable(this.buttonElement);
            this.buttonElement.addClass(c).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
                if (ae.disabled) {
                    return
                }
                if (this === I) {
                    a(this).addClass("ui-state-active")
                }
            }).bind("mouseleave" + this.eventNamespace, function () {
                if (ae.disabled) {
                    return
                }
                a(this).removeClass(ad)
            }).bind("click" + this.eventNamespace, function (ah) {
                if (ae.disabled) {
                    ah.preventDefault();
                    ah.stopImmediatePropagation()
                }
            });
            this._on({
                focus: function () {
                    this.buttonElement.addClass("ui-state-focus")
                },
                blur: function () {
                    this.buttonElement.removeClass("ui-state-focus")
                }
            });
            if (ag) {
                this.element.bind("change" + this.eventNamespace, function () {
                    af.refresh()
                })
            }
            if (this.type === "checkbox") {
                this.buttonElement.bind("click" + this.eventNamespace, function () {
                    if (ae.disabled) {
                        return false
                    }
                })
            } else {
                if (this.type === "radio") {
                    this.buttonElement.bind("click" + this.eventNamespace, function () {
                        if (ae.disabled) {
                            return false
                        }
                        a(this).addClass("ui-state-active");
                        af.buttonElement.attr("aria-pressed", "true");
                        var ah = af.element[0];
                        O(ah).not(ah).map(function () {
                            return a(this).button("widget")[0]
                        }).removeClass("ui-state-active").attr("aria-pressed", "false")
                    })
                } else {
                    this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
                        if (ae.disabled) {
                            return false
                        }
                        a(this).addClass("ui-state-active");
                        I = this;
                        af.document.one("mouseup", function () {
                            I = null
                        })
                    }).bind("mouseup" + this.eventNamespace, function () {
                        if (ae.disabled) {
                            return false
                        }
                        a(this).removeClass("ui-state-active")
                    }).bind("keydown" + this.eventNamespace, function (ah) {
                        if (ae.disabled) {
                            return false
                        }
                        if (ah.keyCode === a.ui.keyCode.SPACE || ah.keyCode === a.ui.keyCode.ENTER) {
                            a(this).addClass("ui-state-active")
                        }
                    }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () {
                        a(this).removeClass("ui-state-active")
                    });
                    if (this.buttonElement.is("a")) {
                        this.buttonElement.keyup(function (ah) {
                            if (ah.keyCode === a.ui.keyCode.SPACE) {
                                a(this).click()
                            }
                        })
                    }
                }
            }
            this._setOption("disabled", ae.disabled);
            this._resetButton()
        },
        _determineButtonType: function () {
            var ad, af, ae;
            if (this.element.is("[type=checkbox]")) {
                this.type = "checkbox"
            } else {
                if (this.element.is("[type=radio]")) {
                    this.type = "radio"
                } else {
                    if (this.element.is("input")) {
                        this.type = "input"
                    } else {
                        this.type = "button"
                    }
                }
            }
            if (this.type === "checkbox" || this.type === "radio") {
                ad = this.element.parents().last();
                af = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = ad.find(af);
                if (!this.buttonElement.length) {
                    ad = ad.length ? ad.siblings() : this.element.siblings();
                    this.buttonElement = ad.filter(af);
                    if (!this.buttonElement.length) {
                        this.buttonElement = ad.find(af)
                    }
                }
                this.element.addClass("ui-helper-hidden-accessible");
                ae = this.element.is(":checked");
                if (ae) {
                    this.buttonElement.addClass("ui-state-active")
                }
                this.buttonElement.prop("aria-pressed", ae)
            } else {
                this.buttonElement = this.element
            }
        },
        widget: function () {
            return this.buttonElement
        },
        _destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass(c + " ui-state-active " + Y).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            if (!this.hasTitle) {
                this.buttonElement.removeAttr("title")
            }
        },
        _setOption: function (ad, ae) {
            this._super(ad, ae);
            if (ad === "disabled") {
                this.widget().toggleClass("ui-state-disabled", !!ae);
                this.element.prop("disabled", !!ae);
                if (ae) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        this.buttonElement.removeClass("ui-state-focus")
                    } else {
                        this.buttonElement.removeClass("ui-state-focus ui-state-active")
                    }
                }
                return
            }
            this._resetButton()
        },
        refresh: function () {
            var ad = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            if (ad !== this.options.disabled) {
                this._setOption("disabled", ad)
            }
            if (this.type === "radio") {
                O(this.element[0]).each(function () {
                    if (a(this).is(":checked")) {
                        a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true")
                    } else {
                        a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                    }
                })
            } else {
                if (this.type === "checkbox") {
                    if (this.element.is(":checked")) {
                        this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true")
                    } else {
                        this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false")
                    }
                }
            }
        },
        _resetButton: function () {
            if (this.type === "input") {
                if (this.options.label) {
                    this.element.val(this.options.label)
                }
                return
            }
            var ae = this.buttonElement.removeClass(Y),
                af = a("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(ae.empty()).text(),
                ag = this.options.icons,
                ah = ag.primary && ag.secondary,
                ad = [];
            if (ag.primary || ag.secondary) {
                if (this.options.text) {
                    ad.push("ui-button-text-icon" + (ah ? "s" : (ag.primary ? "-primary" : "-secondary")))
                }
                if (ag.primary) {
                    ae.prepend("<span class='ui-button-icon-primary ui-icon " + ag.primary + "'></span>")
                }
                if (ag.secondary) {
                    ae.append("<span class='ui-button-icon-secondary ui-icon " + ag.secondary + "'></span>")
                }
                if (!this.options.text) {
                    ad.push(ah ? "ui-button-icons-only" : "ui-button-icon-only");
                    if (!this.hasTitle) {
                        ae.attr("title", a.trim(af))
                    }
                }
            } else {
                ad.push("ui-button-text-only")
            }
            ae.addClass(ad.join(" "))
        }
    });
    a.widget("ui.buttonset", {
        version: "1.11.4",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (ad, ae) {
            if (ad === "disabled") {
                this.buttons.button("option", ad, ae)
            }
            this._super(ad, ae)
        },
        refresh: function () {
            var af = this.element.css("direction") === "rtl",
                ad = this.element.find(this.options.items),
                ae = ad.filter(":ui-button");
            ad.not(":ui-button").button();
            ae.button("refresh");
            this.buttons = ad.map(function () {
                return a(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(af ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(af ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function () {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function () {
                return a(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    });
    var d = a.ui.button;
    /*
     * jQuery UI Datepicker 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/datepicker/
     */
    a.extend(a.ui, {
        datepicker: {
            version: "1.11.4"
        }
    });
    var l;

    function j(ad) {
        var ae, af;
        while (ad.length && ad[0] !== document) {
            ae = ad.css("position");
            if (ae === "absolute" || ae === "relative" || ae === "fixed") {
                af = parseInt(ad.css("zIndex"), 10);
                if (!isNaN(af) && af !== 0) {
                    return af
                }
            }
            ad = ad.parent()
        }
        return 0
    }

    function g() {
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
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
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
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
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        a.extend(this._defaults, this.regional[""]);
        this.regional.en = a.extend(true, {}, this.regional[""]);
        this.regional["en-US"] = a.extend(true, {}, this.regional.en);
        this.dpDiv = h(a("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    a.extend(g.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (ad) {
            i(this._defaults, ad || {});
            return this
        },
        _attachDatepicker: function (ah, ag) {
            var af, ad, ae;
            af = ah.nodeName.toLowerCase();
            ad = (af === "div" || af === "span");
            if (!ah.id) {
                this.uuid += 1;
                ah.id = "dp" + this.uuid
            }
            ae = this._newInst(a(ah), ad);
            ae.settings = a.extend({}, ag || {});
            if (af === "input") {
                this._connectDatepicker(ah, ae)
            } else {
                if (ad) {
                    this._inlineDatepicker(ah, ae)
                }
            }
        },
        _newInst: function (af, ae) {
            var ad = af[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: ad,
                input: af,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: ae,
                dpDiv: (!ae ? this.dpDiv : h(a("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))
            }
        },
        _connectDatepicker: function (af, ae) {
            var ad = a(af);
            ae.append = a([]);
            ae.trigger = a([]);
            if (ad.hasClass(this.markerClassName)) {
                return
            }
            this._attachments(ad, ae);
            ad.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp);
            this._autoSize(ae);
            a.data(af, "datepicker", ae);
            if (ae.settings.disabled) {
                this._disableDatepicker(af)
            }
        },
        _attachments: function (ag, ah) {
            var aj, af, ae, ad = this._get(ah, "appendText"),
                ai = this._get(ah, "isRTL");
            if (ah.append) {
                ah.append.remove()
            }
            if (ad) {
                ah.append = a("<span class='" + this._appendClass + "'>" + ad + "</span>");
                ag[ai ? "before" : "after"](ah.append)
            }
            ag.unbind("focus", this._showDatepicker);
            if (ah.trigger) {
                ah.trigger.remove()
            }
            aj = this._get(ah, "showOn");
            if (aj === "focus" || aj === "both") {
                ag.focus(this._showDatepicker)
            }
            if (aj === "button" || aj === "both") {
                af = this._get(ah, "buttonText");
                ae = this._get(ah, "buttonImage");
                ah.trigger = a(this._get(ah, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
                    src: ae,
                    alt: af,
                    title: af
                }) : a("<button type='button'></button>").addClass(this._triggerClass).html(!ae ? af : a("<img/>").attr({
                    src: ae,
                    alt: af,
                    title: af
                })));
                ag[ai ? "before" : "after"](ah.trigger);
                ah.trigger.click(function () {
                    if (a.datepicker._datepickerShowing && a.datepicker._lastInput === ag[0]) {
                        a.datepicker._hideDatepicker()
                    } else {
                        if (a.datepicker._datepickerShowing && a.datepicker._lastInput !== ag[0]) {
                            a.datepicker._hideDatepicker();
                            a.datepicker._showDatepicker(ag[0])
                        } else {
                            a.datepicker._showDatepicker(ag[0])
                        }
                    }
                    return false
                })
            }
        },
        _autoSize: function (ah) {
            if (this._get(ah, "autoSize") && !ah.inline) {
                var af, ai, aj, ag, ad = new Date(2009, 12 - 1, 20),
                    ae = this._get(ah, "dateFormat");
                if (ae.match(/[DM]/)) {
                    af = function (ak) {
                        ai = 0;
                        aj = 0;
                        for (ag = 0; ag < ak.length; ag++) {
                            if (ak[ag].length > ai) {
                                ai = ak[ag].length;
                                aj = ag
                            }
                        }
                        return aj
                    };
                    ad.setMonth(af(this._get(ah, (ae.match(/MM/) ? "monthNames" : "monthNamesShort"))));
                    ad.setDate(af(this._get(ah, (ae.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - ad.getDay())
                }
                ah.input.attr("size", this._formatDate(ah, ad).length)
            }
        },
        _inlineDatepicker: function (af, ae) {
            var ad = a(af);
            if (ad.hasClass(this.markerClassName)) {
                return
            }
            ad.addClass(this.markerClassName).append(ae.dpDiv);
            a.data(af, "datepicker", ae);
            this._setDate(ae, this._getDefaultDate(ae), true);
            this._updateDatepicker(ae);
            this._updateAlternate(ae);
            if (ae.settings.disabled) {
                this._disableDatepicker(af)
            }
            ae.dpDiv.css("display", "block")
        },
        _dialogDatepicker: function (ah, af, aj, an, ak) {
            var ag, ae, ad, al, am, ai = this._dialogInst;
            if (!ai) {
                this.uuid += 1;
                ag = "dp" + this.uuid;
                this._dialogInput = a("<input type='text' id='" + ag + "' style='position: absolute; top: -100px; width: 0px;'/>");
                this._dialogInput.keydown(this._doKeyDown);
                a("body").append(this._dialogInput);
                ai = this._dialogInst = this._newInst(this._dialogInput, false);
                ai.settings = {};
                a.data(this._dialogInput[0], "datepicker", ai)
            }
            i(ai.settings, an || {});
            af = (af && af.constructor === Date ? this._formatDate(ai, af) : af);
            this._dialogInput.val(af);
            this._pos = (ak ? (ak.length ? ak : [ak.pageX, ak.pageY]) : null);
            if (!this._pos) {
                ae = document.documentElement.clientWidth;
                ad = document.documentElement.clientHeight;
                al = document.documentElement.scrollLeft || document.body.scrollLeft;
                am = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(ae / 2) - 100 + al, (ad / 2) - 150 + am]
            }
            this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
            ai.settings.onSelect = aj;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if (a.blockUI) {
                a.blockUI(this.dpDiv)
            }
            a.data(this._dialogInput[0], "datepicker", ai);
            return this
        },
        _destroyDatepicker: function (ag) {
            var af, ad = a(ag),
                ae = a.data(ag, "datepicker");
            if (!ad.hasClass(this.markerClassName)) {
                return
            }
            af = ag.nodeName.toLowerCase();
            a.removeData(ag, "datepicker");
            if (af === "input") {
                ae.append.remove();
                ae.trigger.remove();
                ad.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
            } else {
                if (af === "div" || af === "span") {
                    ad.removeClass(this.markerClassName).empty()
                }
            }
            if (l === ae) {
                l = null
            }
        },
        _enableDatepicker: function (ah) {
            var ag, ae, ad = a(ah),
                af = a.data(ah, "datepicker");
            if (!ad.hasClass(this.markerClassName)) {
                return
            }
            ag = ah.nodeName.toLowerCase();
            if (ag === "input") {
                ah.disabled = false;
                af.trigger.filter("button").each(function () {
                    this.disabled = false
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })
            } else {
                if (ag === "div" || ag === "span") {
                    ae = ad.children("." + this._inlineClass);
                    ae.children().removeClass("ui-state-disabled");
                    ae.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false)
                }
            }
            this._disabledInputs = a.map(this._disabledInputs, function (ai) {
                return (ai === ah ? null : ai)
            })
        },
        _disableDatepicker: function (ah) {
            var ag, ae, ad = a(ah),
                af = a.data(ah, "datepicker");
            if (!ad.hasClass(this.markerClassName)) {
                return
            }
            ag = ah.nodeName.toLowerCase();
            if (ag === "input") {
                ah.disabled = true;
                af.trigger.filter("button").each(function () {
                    this.disabled = true
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })
            } else {
                if (ag === "div" || ag === "span") {
                    ae = ad.children("." + this._inlineClass);
                    ae.children().addClass("ui-state-disabled");
                    ae.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true)
                }
            }
            this._disabledInputs = a.map(this._disabledInputs, function (ai) {
                return (ai === ah ? null : ai)
            });
            this._disabledInputs[this._disabledInputs.length] = ah
        },
        _isDisabledDatepicker: function (ae) {
            if (!ae) {
                return false
            }
            for (var ad = 0; ad < this._disabledInputs.length; ad++) {
                if (this._disabledInputs[ad] === ae) {
                    return true
                }
            }
            return false
        },
        _getInst: function (ae) {
            try {
                return a.data(ae, "datepicker")
            } catch (ad) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (aj, ah, ak) {
            var ai, ad, ag, af, ae = this._getInst(aj);
            if (arguments.length === 2 && typeof ah === "string") {
                return (ah === "defaults" ? a.extend({}, a.datepicker._defaults) : (ae ? (ah === "all" ? a.extend({}, ae.settings) : this._get(ae, ah)) : null))
            }
            ai = ah || {};
            if (typeof ah === "string") {
                ai = {};
                ai[ah] = ak
            }
            if (ae) {
                if (this._curInst === ae) {
                    this._hideDatepicker()
                }
                ad = this._getDateDatepicker(aj, true);
                ag = this._getMinMaxDate(ae, "min");
                af = this._getMinMaxDate(ae, "max");
                i(ae.settings, ai);
                if (ag !== null && ai.dateFormat !== undefined && ai.minDate === undefined) {
                    ae.settings.minDate = this._formatDate(ae, ag)
                }
                if (af !== null && ai.dateFormat !== undefined && ai.maxDate === undefined) {
                    ae.settings.maxDate = this._formatDate(ae, af)
                }
                if ("disabled" in ai) {
                    if (ai.disabled) {
                        this._disableDatepicker(aj)
                    } else {
                        this._enableDatepicker(aj)
                    }
                }
                this._attachments(a(aj), ae);
                this._autoSize(ae);
                this._setDate(ae, ad);
                this._updateAlternate(ae);
                this._updateDatepicker(ae)
            }
        },
        _changeDatepicker: function (ae, ad, af) {
            this._optionDatepicker(ae, ad, af)
        },
        _refreshDatepicker: function (ae) {
            var ad = this._getInst(ae);
            if (ad) {
                this._updateDatepicker(ad)
            }
        },
        _setDateDatepicker: function (af, ad) {
            var ae = this._getInst(af);
            if (ae) {
                this._setDate(ae, ad);
                this._updateDatepicker(ae);
                this._updateAlternate(ae)
            }
        },
        _getDateDatepicker: function (af, ae) {
            var ad = this._getInst(af);
            if (ad && !ad.inline) {
                this._setDateFromField(ad, ae)
            }
            return (ad ? this._getDate(ad) : null)
        },
        _doKeyDown: function (ae) {
            var ai, ad, aj, ag = a.datepicker._getInst(ae.target),
                af = true,
                ah = ag.dpDiv.is(".ui-datepicker-rtl");
            ag._keyEvent = true;
            if (a.datepicker._datepickerShowing) {
                switch (ae.keyCode) {
                    case 9:
                        a.datepicker._hideDatepicker();
                        af = false;
                        break;
                    case 13:
                        aj = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", ag.dpDiv);
                        if (aj[0]) {
                            a.datepicker._selectDay(ae.target, ag.selectedMonth, ag.selectedYear, aj[0])
                        }
                        ai = a.datepicker._get(ag, "onSelect");
                        if (ai) {
                            ad = a.datepicker._formatDate(ag);
                            ai.apply((ag.input ? ag.input[0] : null), [ad, ag])
                        } else {
                            a.datepicker._hideDatepicker()
                        }
                        return false;
                    case 27:
                        a.datepicker._hideDatepicker();
                        break;
                    case 33:
                        a.datepicker._adjustDate(ae.target, (ae.ctrlKey ? -a.datepicker._get(ag, "stepBigMonths") : -a.datepicker._get(ag, "stepMonths")), "M");
                        break;
                    case 34:
                        a.datepicker._adjustDate(ae.target, (ae.ctrlKey ? +a.datepicker._get(ag, "stepBigMonths") : +a.datepicker._get(ag, "stepMonths")), "M");
                        break;
                    case 35:
                        if (ae.ctrlKey || ae.metaKey) {
                            a.datepicker._clearDate(ae.target)
                        }
                        af = ae.ctrlKey || ae.metaKey;
                        break;
                    case 36:
                        if (ae.ctrlKey || ae.metaKey) {
                            a.datepicker._gotoToday(ae.target)
                        }
                        af = ae.ctrlKey || ae.metaKey;
                        break;
                    case 37:
                        if (ae.ctrlKey || ae.metaKey) {
                            a.datepicker._adjustDate(ae.target, (ah ? +1 : -1), "D")
                        }
                        af = ae.ctrlKey || ae.metaKey;
                        if (ae.originalEvent.altKey) {
                            a.datepicker._adjustDate(ae.target, (ae.ctrlKey ? -a.datepicker._get(ag, "stepBigMonths") : -a.datepicker._get(ag, "stepMonths")), "M")
                        }
                        break;
                    case 38:
                        if (ae.ctrlKey || ae.metaKey) {
                            a.datepicker._adjustDate(ae.target, -7, "D")
                        }
                        af = ae.ctrlKey || ae.metaKey;
                        break;
                    case 39:
                        if (ae.ctrlKey || ae.metaKey) {
                            a.datepicker._adjustDate(ae.target, (ah ? -1 : +1), "D")
                        }
                        af = ae.ctrlKey || ae.metaKey;
                        if (ae.originalEvent.altKey) {
                            a.datepicker._adjustDate(ae.target, (ae.ctrlKey ? +a.datepicker._get(ag, "stepBigMonths") : +a.datepicker._get(ag, "stepMonths")), "M")
                        }
                        break;
                    case 40:
                        if (ae.ctrlKey || ae.metaKey) {
                            a.datepicker._adjustDate(ae.target, +7, "D")
                        }
                        af = ae.ctrlKey || ae.metaKey;
                        break;
                    default:
                        af = false
                }
            } else {
                if (ae.keyCode === 36 && ae.ctrlKey) {
                    a.datepicker._showDatepicker(this)
                } else {
                    af = false
                }
            }
            if (af) {
                ae.preventDefault();
                ae.stopPropagation()
            }
        },
        _doKeyPress: function (af) {
            var ad, ae, ag = a.datepicker._getInst(af.target);
            if (a.datepicker._get(ag, "constrainInput")) {
                ad = a.datepicker._possibleChars(a.datepicker._get(ag, "dateFormat"));
                ae = String.fromCharCode(af.charCode == null ? af.keyCode : af.charCode);
                return af.ctrlKey || af.metaKey || (ae < " " || !ad || ad.indexOf(ae) > -1)
            }
        },
        _doKeyUp: function (af) {
            var ad, ag = a.datepicker._getInst(af.target);
            if (ag.input.val() !== ag.lastVal) {
                try {
                    ad = a.datepicker.parseDate(a.datepicker._get(ag, "dateFormat"), (ag.input ? ag.input.val() : null), a.datepicker._getFormatConfig(ag));
                    if (ad) {
                        a.datepicker._setDateFromField(ag);
                        a.datepicker._updateAlternate(ag);
                        a.datepicker._updateDatepicker(ag)
                    }
                } catch (ae) {}
            }
            return true
        },
        _showDatepicker: function (ag) {
            ag = ag.target || ag;
            if (ag.nodeName.toLowerCase() !== "input") {
                ag = a("input", ag.parentNode)[0]
            }
            if (a.datepicker._isDisabledDatepicker(ag) || a.datepicker._lastInput === ag) {
                return
            }
            var ah, ad, ae, ai, aj, ak, af;
            ah = a.datepicker._getInst(ag);
            if (a.datepicker._curInst && a.datepicker._curInst !== ah) {
                a.datepicker._curInst.dpDiv.stop(true, true);
                if (ah && a.datepicker._datepickerShowing) {
                    a.datepicker._hideDatepicker(a.datepicker._curInst.input[0])
                }
            }
            ad = a.datepicker._get(ah, "beforeShow");
            ae = ad ? ad.apply(ag, [ag, ah]) : {};
            if (ae === false) {
                return
            }
            i(ah.settings, ae);
            ah.lastVal = null;
            a.datepicker._lastInput = ag;
            a.datepicker._setDateFromField(ah);
            if (a.datepicker._inDialog) {
                ag.value = ""
            }
            if (!a.datepicker._pos) {
                a.datepicker._pos = a.datepicker._findPos(ag);
                a.datepicker._pos[1] += ag.offsetHeight
            }
            ai = false;
            a(ag).parents().each(function () {
                ai |= a(this).css("position") === "fixed";
                return !ai
            });
            aj = {
                left: a.datepicker._pos[0],
                top: a.datepicker._pos[1]
            };
            a.datepicker._pos = null;
            ah.dpDiv.empty();
            ah.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            a.datepicker._updateDatepicker(ah);
            aj = a.datepicker._checkOffset(ah, aj, ai);
            ah.dpDiv.css({
                position: (a.datepicker._inDialog && a.blockUI ? "static" : (ai ? "fixed" : "absolute")),
                display: "none",
                left: aj.left + "px",
                top: aj.top + "px"
            });
            if (!ah.inline) {
                ak = a.datepicker._get(ah, "showAnim");
                af = a.datepicker._get(ah, "duration");
                ah.dpDiv.css("z-index", j(a(ag)) + 1);
                a.datepicker._datepickerShowing = true;
                if (a.effects && a.effects.effect[ak]) {
                    ah.dpDiv.show(ak, a.datepicker._get(ah, "showOptions"), af)
                } else {
                    ah.dpDiv[ak || "show"](ak ? af : null)
                }
                if (a.datepicker._shouldFocusInput(ah)) {
                    ah.input.focus()
                }
                a.datepicker._curInst = ah
            }
        },
        _updateDatepicker: function (af) {
            this.maxRows = 4;
            l = af;
            af.dpDiv.empty().append(this._generateHTML(af));
            this._attachHandlers(af);
            var ah, ag = this._getNumberOfMonths(af),
                ae = ag[1],
                ai = 17,
                ad = af.dpDiv.find("." + this._dayOverClass + " a");
            if (ad.length > 0) {
                k.apply(ad.get(0))
            }
            af.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            if (ae > 1) {
                af.dpDiv.addClass("ui-datepicker-multi-" + ae).css("width", (ai * ae) + "em")
            }
            af.dpDiv[(ag[0] !== 1 || ag[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            af.dpDiv[(this._get(af, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (af === a.datepicker._curInst && a.datepicker._datepickerShowing && a.datepicker._shouldFocusInput(af)) {
                af.input.focus()
            }
            if (af.yearshtml) {
                ah = af.yearshtml;
                setTimeout(function () {
                    if (ah === af.yearshtml && af.yearshtml) {
                        af.dpDiv.find("select.ui-datepicker-year:first").replaceWith(af.yearshtml)
                    }
                    ah = af.yearshtml = null
                }, 0)
            }
        },
        _shouldFocusInput: function (ad) {
            return ad.input && ad.input.is(":visible") && !ad.input.is(":disabled") && !ad.input.is(":focus")
        },
        _checkOffset: function (ah, aj, ai) {
            var ae = ah.dpDiv.outerWidth(),
                ad = ah.dpDiv.outerHeight(),
                ag = ah.input ? ah.input.outerWidth() : 0,
                af = ah.input ? ah.input.outerHeight() : 0,
                al = document.documentElement.clientWidth + (ai ? 0 : a(document).scrollLeft()),
                ak = document.documentElement.clientHeight + (ai ? 0 : a(document).scrollTop());
            aj.left -= (this._get(ah, "isRTL") ? (ae - ag) : 0);
            aj.left -= (ai && aj.left === ah.input.offset().left) ? a(document).scrollLeft() : 0;
            aj.top -= (ai && aj.top === (ah.input.offset().top + af)) ? a(document).scrollTop() : 0;
            aj.left -= Math.min(aj.left, (aj.left + ae > al && al > ae) ? Math.abs(aj.left + ae - al) : 0);
            aj.top -= Math.min(aj.top, (aj.top + ad > ak && ak > ad) ? Math.abs(ad + af) : 0);
            return aj
        },
        _findPos: function (af) {
            var ag, ad = this._getInst(af),
                ae = this._get(ad, "isRTL");
            while (af && (af.type === "hidden" || af.nodeType !== 1 || a.expr.filters.hidden(af))) {
                af = af[ae ? "previousSibling" : "nextSibling"]
            }
            ag = a(af).offset();
            return [ag.left, ag.top]
        },
        _hideDatepicker: function (ae) {
            var ai, ad, ah, ag, af = this._curInst;
            if (!af || (ae && af !== a.data(ae, "datepicker"))) {
                return
            }
            if (this._datepickerShowing) {
                ai = this._get(af, "showAnim");
                ad = this._get(af, "duration");
                ah = function () {
                    a.datepicker._tidyDialog(af)
                };
                if (a.effects && (a.effects.effect[ai] || a.effects[ai])) {
                    af.dpDiv.hide(ai, a.datepicker._get(af, "showOptions"), ad, ah)
                } else {
                    af.dpDiv[(ai === "slideDown" ? "slideUp" : (ai === "fadeIn" ? "fadeOut" : "hide"))]((ai ? ad : null), ah)
                }
                if (!ai) {
                    ah()
                }
                this._datepickerShowing = false;
                ag = this._get(af, "onClose");
                if (ag) {
                    ag.apply((af.input ? af.input[0] : null), [(af.input ? af.input.val() : ""), af])
                }
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if (a.blockUI) {
                        a.unblockUI();
                        a("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function (ad) {
            ad.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (ae) {
            if (!a.datepicker._curInst) {
                return
            }
            var ad = a(ae.target),
                af = a.datepicker._getInst(ad[0]);
            if (((ad[0].id !== a.datepicker._mainDivId && ad.parents("#" + a.datepicker._mainDivId).length === 0 && !ad.hasClass(a.datepicker.markerClassName) && !ad.closest("." + a.datepicker._triggerClass).length && a.datepicker._datepickerShowing && !(a.datepicker._inDialog && a.blockUI))) || (ad.hasClass(a.datepicker.markerClassName) && a.datepicker._curInst !== af)) {
                a.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (ad, af, ag) {
            var ah = a(ad),
                ae = this._getInst(ah[0]);
            if (this._isDisabledDatepicker(ah[0])) {
                return
            }
            this._adjustInstDate(ae, af + (ag === "M" ? this._get(ae, "showCurrentAtPos") : 0), ag);
            this._updateDatepicker(ae)
        },
        _gotoToday: function (ae) {
            var ad, ag = a(ae),
                af = this._getInst(ag[0]);
            if (this._get(af, "gotoCurrent") && af.currentDay) {
                af.selectedDay = af.currentDay;
                af.drawMonth = af.selectedMonth = af.currentMonth;
                af.drawYear = af.selectedYear = af.currentYear
            } else {
                ad = new Date();
                af.selectedDay = ad.getDate();
                af.drawMonth = af.selectedMonth = ad.getMonth();
                af.drawYear = af.selectedYear = ad.getFullYear()
            }
            this._notifyChange(af);
            this._adjustDate(ag)
        },
        _selectMonthYear: function (ad, ag, af) {
            var ah = a(ad),
                ae = this._getInst(ah[0]);
            ae["selected" + (af === "M" ? "Month" : "Year")] = ae["draw" + (af === "M" ? "Month" : "Year")] = parseInt(ag.options[ag.selectedIndex].value, 10);
            this._notifyChange(ae);
            this._adjustDate(ah)
        },
        _selectDay: function (ad, af, ai, ah) {
            var ae, ag = a(ad);
            if (a(ah).hasClass(this._unselectableClass) || this._isDisabledDatepicker(ag[0])) {
                return
            }
            ae = this._getInst(ag[0]);
            ae.selectedDay = ae.currentDay = a("a", ah).html();
            ae.selectedMonth = ae.currentMonth = af;
            ae.selectedYear = ae.currentYear = ai;
            this._selectDate(ad, this._formatDate(ae, ae.currentDay, ae.currentMonth, ae.currentYear))
        },
        _clearDate: function (ad) {
            var ae = a(ad);
            this._selectDate(ae, "")
        },
        _selectDate: function (ae, ad) {
            var ag, ah = a(ae),
                af = this._getInst(ah[0]);
            ad = (ad != null ? ad : this._formatDate(af));
            if (af.input) {
                af.input.val(ad)
            }
            this._updateAlternate(af);
            ag = this._get(af, "onSelect");
            if (ag) {
                ag.apply((af.input ? af.input[0] : null), [ad, af])
            } else {
                if (af.input) {
                    af.input.trigger("change")
                }
            }
            if (af.inline) {
                this._updateDatepicker(af)
            } else {
                this._hideDatepicker();
                this._lastInput = af.input[0];
                if (typeof (af.input[0]) !== "object") {
                    af.input.focus()
                }
                this._lastInput = null
            }
        },
        _updateAlternate: function (ah) {
            var ae, af, ag, ad = this._get(ah, "altField");
            if (ad) {
                ae = this._get(ah, "altFormat") || this._get(ah, "dateFormat");
                af = this._getDate(ah);
                ag = this.formatDate(ae, af, this._getFormatConfig(ah));
                a(ad).each(function () {
                    a(this).val(ag)
                })
            }
        },
        noWeekends: function (ad) {
            var ae = ad.getDay();
            return [(ae > 0 && ae < 6), ""]
        },
        iso8601Week: function (ae) {
            var af, ad = new Date(ae.getTime());
            ad.setDate(ad.getDate() + 4 - (ad.getDay() || 7));
            af = ad.getTime();
            ad.setMonth(0);
            ad.setDate(1);
            return Math.floor(Math.round((af - ad) / 86400000) / 7) + 1
        },
        parseDate: function (al, az, aw) {
            if (al == null || az == null) {
                throw "Invalid arguments"
            }
            az = (typeof az === "object" ? az.toString() : az + "");
            if (az === "") {
                return null
            }
            var ao, ai, ak, ap = 0,
                ay = (aw ? aw.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                ax = (typeof ay !== "string" ? ay : new Date().getFullYear() % 100 + parseInt(ay, 10)),
                ah = (aw ? aw.dayNamesShort : null) || this._defaults.dayNamesShort,
                ag = (aw ? aw.dayNames : null) || this._defaults.dayNames,
                av = (aw ? aw.monthNamesShort : null) || this._defaults.monthNamesShort,
                au = (aw ? aw.monthNames : null) || this._defaults.monthNames,
                aA = -1,
                at = -1,
                af = -1,
                aj = -1,
                aq = false,
                ae, ar = function (aB) {
                    var aC = (ao + 1 < al.length && al.charAt(ao + 1) === aB);
                    if (aC) {
                        ao++
                    }
                    return aC
                },
                an = function (aD) {
                    var aC = ar(aD),
                        aG = (aD === "@" ? 14 : (aD === "!" ? 20 : (aD === "y" && aC ? 4 : (aD === "o" ? 3 : 2)))),
                        aE = (aD === "y" ? aG : 1),
                        aB = new RegExp("^\\d{" + aE + "," + aG + "}"),
                        aF = az.substring(ap).match(aB);
                    if (!aF) {
                        throw "Missing number at position " + ap
                    }
                    ap += aF[0].length;
                    return parseInt(aF[0], 10)
                },
                am = function (aD, aF, aC) {
                    var aB = -1,
                        aE = a.map(ar(aD) ? aC : aF, function (aH, aG) {
                            return [
                                [aG, aH]
                            ]
                        }).sort(function (aG, aH) {
                            return -(aG[1].length - aH[1].length)
                        });
                    a.each(aE, function (aG, aI) {
                        var aH = aI[1];
                        if (az.substr(ap, aH.length).toLowerCase() === aH.toLowerCase()) {
                            aB = aI[0];
                            ap += aH.length;
                            return false
                        }
                    });
                    if (aB !== -1) {
                        return aB + 1
                    } else {
                        throw "Unknown name at position " + ap
                    }
                },
                ad = function () {
                    if (az.charAt(ap) !== al.charAt(ao)) {
                        throw "Unexpected literal at position " + ap
                    }
                    ap++
                };
            for (ao = 0; ao < al.length; ao++) {
                if (aq) {
                    if (al.charAt(ao) === "'" && !ar("'")) {
                        aq = false
                    } else {
                        ad()
                    }
                } else {
                    switch (al.charAt(ao)) {
                        case "d":
                            af = an("d");
                            break;
                        case "D":
                            am("D", ah, ag);
                            break;
                        case "o":
                            aj = an("o");
                            break;
                        case "m":
                            at = an("m");
                            break;
                        case "M":
                            at = am("M", av, au);
                            break;
                        case "y":
                            aA = an("y");
                            break;
                        case "@":
                            ae = new Date(an("@"));
                            aA = ae.getFullYear();
                            at = ae.getMonth() + 1;
                            af = ae.getDate();
                            break;
                        case "!":
                            ae = new Date((an("!") - this._ticksTo1970) / 10000);
                            aA = ae.getFullYear();
                            at = ae.getMonth() + 1;
                            af = ae.getDate();
                            break;
                        case "'":
                            if (ar("'")) {
                                ad()
                            } else {
                                aq = true
                            }
                            break;
                        default:
                            ad()
                    }
                }
            }
            if (ap < az.length) {
                ak = az.substr(ap);
                if (!/^\s+/.test(ak)) {
                    throw "Extra/unparsed characters found in date: " + ak
                }
            }
            if (aA === -1) {
                aA = new Date().getFullYear()
            } else {
                if (aA < 100) {
                    aA += new Date().getFullYear() - new Date().getFullYear() % 100 + (aA <= ax ? 0 : -100)
                }
            }
            if (aj > -1) {
                at = 1;
                af = aj;
                do {
                    ai = this._getDaysInMonth(aA, at - 1);
                    if (af <= ai) {
                        break
                    }
                    at++;
                    af -= ai
                } while (true)
            }
            ae = this._daylightSavingAdjust(new Date(aA, at - 1, af));
            if (ae.getFullYear() !== aA || ae.getMonth() + 1 !== at || ae.getDate() !== af) {
                throw "Invalid date"
            }
            return ae
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
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function (ag, ad, ap) {
            if (!ad) {
                return ""
            }
            var aj, af = (ap ? ap.dayNamesShort : null) || this._defaults.dayNamesShort,
                ae = (ap ? ap.dayNames : null) || this._defaults.dayNames,
                an = (ap ? ap.monthNamesShort : null) || this._defaults.monthNamesShort,
                am = (ap ? ap.monthNames : null) || this._defaults.monthNames,
                al = function (aq) {
                    var ar = (aj + 1 < ag.length && ag.charAt(aj + 1) === aq);
                    if (ar) {
                        aj++
                    }
                    return ar
                },
                ai = function (ar, au, aq) {
                    var at = "" + au;
                    if (al(ar)) {
                        while (at.length < aq) {
                            at = "0" + at
                        }
                    }
                    return at
                },
                ah = function (ar, au, at, aq) {
                    return (al(ar) ? aq[au] : at[au])
                },
                ao = "",
                ak = false;
            if (ad) {
                for (aj = 0; aj < ag.length; aj++) {
                    if (ak) {
                        if (ag.charAt(aj) === "'" && !al("'")) {
                            ak = false
                        } else {
                            ao += ag.charAt(aj)
                        }
                    } else {
                        switch (ag.charAt(aj)) {
                            case "d":
                                ao += ai("d", ad.getDate(), 2);
                                break;
                            case "D":
                                ao += ah("D", ad.getDay(), af, ae);
                                break;
                            case "o":
                                ao += ai("o", Math.round((new Date(ad.getFullYear(), ad.getMonth(), ad.getDate()).getTime() - new Date(ad.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                break;
                            case "m":
                                ao += ai("m", ad.getMonth() + 1, 2);
                                break;
                            case "M":
                                ao += ah("M", ad.getMonth(), an, am);
                                break;
                            case "y":
                                ao += (al("y") ? ad.getFullYear() : (ad.getYear() % 100 < 10 ? "0" : "") + ad.getYear() % 100);
                                break;
                            case "@":
                                ao += ad.getTime();
                                break;
                            case "!":
                                ao += ad.getTime() * 10000 + this._ticksTo1970;
                                break;
                            case "'":
                                if (al("'")) {
                                    ao += "'"
                                } else {
                                    ak = true
                                }
                                break;
                            default:
                                ao += ag.charAt(aj)
                        }
                    }
                }
            }
            return ao
        },
        _possibleChars: function (ae) {
            var af, ad = "",
                ag = false,
                ah = function (ai) {
                    var aj = (af + 1 < ae.length && ae.charAt(af + 1) === ai);
                    if (aj) {
                        af++
                    }
                    return aj
                };
            for (af = 0; af < ae.length; af++) {
                if (ag) {
                    if (ae.charAt(af) === "'" && !ah("'")) {
                        ag = false
                    } else {
                        ad += ae.charAt(af)
                    }
                } else {
                    switch (ae.charAt(af)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            ad += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            if (ah("'")) {
                                ad += "'"
                            } else {
                                ag = true
                            }
                            break;
                        default:
                            ad += ae.charAt(af)
                    }
                }
            }
            return ad
        },
        _get: function (ad, ae) {
            return ad.settings[ae] !== undefined ? ad.settings[ae] : this._defaults[ae]
        },
        _setDateFromField: function (ai, aj) {
            if (ai.input.val() === ai.lastVal) {
                return
            }
            var ae = this._get(ai, "dateFormat"),
                af = ai.lastVal = ai.input ? ai.input.val() : null,
                ag = this._getDefaultDate(ai),
                ad = ag,
                ak = this._getFormatConfig(ai);
            try {
                ad = this.parseDate(ae, af, ak) || ag
            } catch (ah) {
                af = (aj ? "" : af)
            }
            ai.selectedDay = ad.getDate();
            ai.drawMonth = ai.selectedMonth = ad.getMonth();
            ai.drawYear = ai.selectedYear = ad.getFullYear();
            ai.currentDay = (af ? ad.getDate() : 0);
            ai.currentMonth = (af ? ad.getMonth() : 0);
            ai.currentYear = (af ? ad.getFullYear() : 0);
            this._adjustInstDate(ai)
        },
        _getDefaultDate: function (ad) {
            return this._restrictMinMax(ad, this._determineDate(ad, this._get(ad, "defaultDate"), new Date()))
        },
        _determineDate: function (af, ad, ae) {
            var ah = function (ak) {
                    var aj = new Date();
                    aj.setDate(aj.getDate() + ak);
                    return aj
                },
                ai = function (ao) {
                    try {
                        return a.datepicker.parseDate(a.datepicker._get(af, "dateFormat"), ao, a.datepicker._getFormatConfig(af))
                    } catch (al) {}
                    var aj = (ao.toLowerCase().match(/^c/) ? a.datepicker._getDate(af) : null) || new Date(),
                        aq = aj.getFullYear(),
                        an = aj.getMonth(),
                        ak = aj.getDate(),
                        ap = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                        am = ap.exec(ao);
                    while (am) {
                        switch (am[2] || "d") {
                            case "d":
                            case "D":
                                ak += parseInt(am[1], 10);
                                break;
                            case "w":
                            case "W":
                                ak += parseInt(am[1], 10) * 7;
                                break;
                            case "m":
                            case "M":
                                an += parseInt(am[1], 10);
                                ak = Math.min(ak, a.datepicker._getDaysInMonth(aq, an));
                                break;
                            case "y":
                            case "Y":
                                aq += parseInt(am[1], 10);
                                ak = Math.min(ak, a.datepicker._getDaysInMonth(aq, an));
                                break
                        }
                        am = ap.exec(ao)
                    }
                    return new Date(aq, an, ak)
                },
                ag = (ad == null || ad === "" ? ae : (typeof ad === "string" ? ai(ad) : (typeof ad === "number" ? (isNaN(ad) ? ae : ah(ad)) : new Date(ad.getTime()))));
            ag = (ag && ag.toString() === "Invalid Date" ? ae : ag);
            if (ag) {
                ag.setHours(0);
                ag.setMinutes(0);
                ag.setSeconds(0);
                ag.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(ag)
        },
        _daylightSavingAdjust: function (ad) {
            if (!ad) {
                return null
            }
            ad.setHours(ad.getHours() > 12 ? ad.getHours() + 2 : 0);
            return ad
        },
        _setDate: function (af, ae, ah) {
            var ad = !ae,
                ai = af.selectedMonth,
                aj = af.selectedYear,
                ag = this._restrictMinMax(af, this._determineDate(af, ae, new Date()));
            af.selectedDay = af.currentDay = ag.getDate();
            af.drawMonth = af.selectedMonth = af.currentMonth = ag.getMonth();
            af.drawYear = af.selectedYear = af.currentYear = ag.getFullYear();
            if ((ai !== af.selectedMonth || aj !== af.selectedYear) && !ah) {
                this._notifyChange(af)
            }
            this._adjustInstDate(af);
            if (af.input) {
                af.input.val(ad ? "" : this._formatDate(af))
            }
        },
        _getDate: function (ad) {
            var ae = (!ad.currentYear || (ad.input && ad.input.val() === "") ? null : this._daylightSavingAdjust(new Date(ad.currentYear, ad.currentMonth, ad.currentDay)));
            return ae
        },
        _attachHandlers: function (ae) {
            var af = this._get(ae, "stepMonths"),
                ad = "#" + ae.id.replace(/\\\\/g, "\\");
            ae.dpDiv.find("[data-handler]").map(function () {
                var ag = {
                    prev: function () {
                        a.datepicker._adjustDate(ad, -af, "M")
                    },
                    next: function () {
                        a.datepicker._adjustDate(ad, +af, "M")
                    },
                    hide: function () {
                        a.datepicker._hideDatepicker()
                    },
                    today: function () {
                        a.datepicker._gotoToday(ad)
                    },
                    selectDay: function () {
                        a.datepicker._selectDay(ad, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                        return false
                    },
                    selectMonth: function () {
                        a.datepicker._selectMonthYear(ad, this, "M");
                        return false
                    },
                    selectYear: function () {
                        a.datepicker._selectMonthYear(ad, this, "Y");
                        return false
                    }
                };
                a(this).bind(this.getAttribute("data-event"), ag[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (aC) {
            var aH, aS, aR, aN, aM, ak, ay, ah, ae, ax, a0, an, ao, aJ, aK, ad, aZ, aW, ar, aB, at, aU, az, ag, aV, ai, af, a4, am, aq, aF, al, aP, aT, aw, a2, ap, aQ, a6, a3 = new Date(),
                a5 = this._daylightSavingAdjust(new Date(a3.getFullYear(), a3.getMonth(), a3.getDate())),
                aE = this._get(aC, "isRTL"),
                aX = this._get(aC, "showButtonPanel"),
                aA = this._get(aC, "hideIfNoPrevNext"),
                aL = this._get(aC, "navigationAsDateFormat"),
                aO = this._getNumberOfMonths(aC),
                aY = this._get(aC, "showCurrentAtPos"),
                a1 = this._get(aC, "stepMonths"),
                aD = (aO[0] !== 1 || aO[1] !== 1),
                aj = this._daylightSavingAdjust((!aC.currentDay ? new Date(9999, 9, 9) : new Date(aC.currentYear, aC.currentMonth, aC.currentDay))),
                aI = this._getMinMaxDate(aC, "min"),
                aG = this._getMinMaxDate(aC, "max"),
                au = aC.drawMonth - aY,
                av = aC.drawYear;
            if (au < 0) {
                au += 12;
                av--
            }
            if (aG) {
                aH = this._daylightSavingAdjust(new Date(aG.getFullYear(), aG.getMonth() - (aO[0] * aO[1]) + 1, aG.getDate()));
                aH = (aI && aH < aI ? aI : aH);
                while (this._daylightSavingAdjust(new Date(av, au, 1)) > aH) {
                    au--;
                    if (au < 0) {
                        au = 11;
                        av--
                    }
                }
            }
            aC.drawMonth = au;
            aC.drawYear = av;
            aS = this._get(aC, "prevText");
            aS = (!aL ? aS : this.formatDate(aS, this._daylightSavingAdjust(new Date(av, au - a1, 1)), this._getFormatConfig(aC)));
            aR = (this._canAdjustMonth(aC, -1, av, au) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + aS + "'><span class='ui-icon ui-icon-circle-triangle-" + (aE ? "e" : "w") + "'>" + aS + "</span></a>" : (aA ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + aS + "'><span class='ui-icon ui-icon-circle-triangle-" + (aE ? "e" : "w") + "'>" + aS + "</span></a>"));
            aN = this._get(aC, "nextText");
            aN = (!aL ? aN : this.formatDate(aN, this._daylightSavingAdjust(new Date(av, au + a1, 1)), this._getFormatConfig(aC)));
            aM = (this._canAdjustMonth(aC, +1, av, au) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + aN + "'><span class='ui-icon ui-icon-circle-triangle-" + (aE ? "w" : "e") + "'>" + aN + "</span></a>" : (aA ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + aN + "'><span class='ui-icon ui-icon-circle-triangle-" + (aE ? "w" : "e") + "'>" + aN + "</span></a>"));
            ak = this._get(aC, "currentText");
            ay = (this._get(aC, "gotoCurrent") && aC.currentDay ? aj : a5);
            ak = (!aL ? ak : this.formatDate(ak, ay, this._getFormatConfig(aC)));
            ah = (!aC.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(aC, "closeText") + "</button>" : "");
            ae = (aX) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (aE ? ah : "") + (this._isInRange(aC, ay) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + ak + "</button>" : "") + (aE ? "" : ah) + "</div>" : "";
            ax = parseInt(this._get(aC, "firstDay"), 10);
            ax = (isNaN(ax) ? 0 : ax);
            a0 = this._get(aC, "showWeek");
            an = this._get(aC, "dayNames");
            ao = this._get(aC, "dayNamesMin");
            aJ = this._get(aC, "monthNames");
            aK = this._get(aC, "monthNamesShort");
            ad = this._get(aC, "beforeShowDay");
            aZ = this._get(aC, "showOtherMonths");
            aW = this._get(aC, "selectOtherMonths");
            ar = this._getDefaultDate(aC);
            aB = "";
            at;
            for (aU = 0; aU < aO[0]; aU++) {
                az = "";
                this.maxRows = 4;
                for (ag = 0; ag < aO[1]; ag++) {
                    aV = this._daylightSavingAdjust(new Date(av, au, aC.selectedDay));
                    ai = " ui-corner-all";
                    af = "";
                    if (aD) {
                        af += "<div class='ui-datepicker-group";
                        if (aO[1] > 1) {
                            switch (ag) {
                                case 0:
                                    af += " ui-datepicker-group-first";
                                    ai = " ui-corner-" + (aE ? "right" : "left");
                                    break;
                                case aO[1] - 1:
                                    af += " ui-datepicker-group-last";
                                    ai = " ui-corner-" + (aE ? "left" : "right");
                                    break;
                                default:
                                    af += " ui-datepicker-group-middle";
                                    ai = "";
                                    break
                            }
                        }
                        af += "'>"
                    }
                    af += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + ai + "'>" + (/all|left/.test(ai) && aU === 0 ? (aE ? aM : aR) : "") + (/all|right/.test(ai) && aU === 0 ? (aE ? aR : aM) : "") + this._generateMonthYearHeader(aC, au, av, aI, aG, aU > 0 || ag > 0, aJ, aK) + "</div><table class='ui-datepicker-calendar'><thead><tr>";
                    a4 = (a0 ? "<th class='ui-datepicker-week-col'>" + this._get(aC, "weekHeader") + "</th>" : "");
                    for (at = 0; at < 7; at++) {
                        am = (at + ax) % 7;
                        a4 += "<th scope='col'" + ((at + ax + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + an[am] + "'>" + ao[am] + "</span></th>"
                    }
                    af += a4 + "</tr></thead><tbody>";
                    aq = this._getDaysInMonth(av, au);
                    if (av === aC.selectedYear && au === aC.selectedMonth) {
                        aC.selectedDay = Math.min(aC.selectedDay, aq)
                    }
                    aF = (this._getFirstDayOfMonth(av, au) - ax + 7) % 7;
                    al = Math.ceil((aF + aq) / 7);
                    aP = (aD ? this.maxRows > al ? this.maxRows : al : al);
                    this.maxRows = aP;
                    aT = this._daylightSavingAdjust(new Date(av, au, 1 - aF));
                    for (aw = 0; aw < aP; aw++) {
                        af += "<tr>";
                        a2 = (!a0 ? "" : "<td class='ui-datepicker-week-col'>" + this._get(aC, "calculateWeek")(aT) + "</td>");
                        for (at = 0; at < 7; at++) {
                            ap = (ad ? ad.apply((aC.input ? aC.input[0] : null), [aT]) : [true, ""]);
                            aQ = (aT.getMonth() !== au);
                            a6 = (aQ && !aW) || !ap[0] || (aI && aT < aI) || (aG && aT > aG);
                            a2 += "<td class='" + ((at + ax + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (aQ ? " ui-datepicker-other-month" : "") + ((aT.getTime() === aV.getTime() && au === aC.selectedMonth && aC._keyEvent) || (ar.getTime() === aT.getTime() && ar.getTime() === aV.getTime()) ? " " + this._dayOverClass : "") + (a6 ? " " + this._unselectableClass + " ui-state-disabled" : "") + (aQ && !aZ ? "" : " " + ap[1] + (aT.getTime() === aj.getTime() ? " " + this._currentClass : "") + (aT.getTime() === a5.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!aQ || aZ) && ap[2] ? " title='" + ap[2].replace(/'/g, "&#39;") + "'" : "") + (a6 ? "" : " data-handler='selectDay' data-event='click' data-month='" + aT.getMonth() + "' data-year='" + aT.getFullYear() + "'") + ">" + (aQ && !aZ ? "&#xa0;" : (a6 ? "<span class='ui-state-default'>" + aT.getDate() + "</span>" : "<a class='ui-state-default" + (aT.getTime() === a5.getTime() ? " ui-state-highlight" : "") + (aT.getTime() === aj.getTime() ? " ui-state-active" : "") + (aQ ? " ui-priority-secondary" : "") + "' href='#'>" + aT.getDate() + "</a>")) + "</td>";
                            aT.setDate(aT.getDate() + 1);
                            aT = this._daylightSavingAdjust(aT)
                        }
                        af += a2 + "</tr>"
                    }
                    au++;
                    if (au > 11) {
                        au = 0;
                        av++
                    }
                    af += "</tbody></table>" + (aD ? "</div>" + ((aO[0] > 0 && ag === aO[1] - 1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
                    az += af
                }
                aB += az
            }
            aB += ae;
            aC._keyEvent = false;
            return aB
        },
        _generateMonthYearHeader: function (am, ag, ah, ao, an, au, ar, at) {
            var al, ak, ap, ay, aw, af, ax, ai, ad = this._get(am, "changeMonth"),
                ae = this._get(am, "changeYear"),
                av = this._get(am, "showMonthAfterYear"),
                aj = "<div class='ui-datepicker-title'>",
                aq = "";
            if (au || !ad) {
                aq += "<span class='ui-datepicker-month'>" + ar[ag] + "</span>"
            } else {
                al = (ao && ao.getFullYear() === ah);
                ak = (an && an.getFullYear() === ah);
                aq += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                for (ap = 0; ap < 12; ap++) {
                    if ((!al || ap >= ao.getMonth()) && (!ak || ap <= an.getMonth())) {
                        aq += "<option value='" + ap + "'" + (ap === ag ? " selected='selected'" : "") + ">" + at[ap] + "</option>"
                    }
                }
                aq += "</select>"
            }
            if (!av) {
                aj += aq + (au || !(ad && ae) ? "&#xa0;" : "")
            }
            if (!am.yearshtml) {
                am.yearshtml = "";
                if (au || !ae) {
                    aj += "<span class='ui-datepicker-year'>" + ah + "</span>"
                } else {
                    ay = this._get(am, "yearRange").split(":");
                    aw = new Date().getFullYear();
                    af = function (az) {
                        var aA = (az.match(/c[+\-].*/) ? ah + parseInt(az.substring(1), 10) : (az.match(/[+\-].*/) ? aw + parseInt(az, 10) : parseInt(az, 10)));
                        return (isNaN(aA) ? aw : aA)
                    };
                    ax = af(ay[0]);
                    ai = Math.max(ax, af(ay[1] || ""));
                    ax = (ao ? Math.max(ax, ao.getFullYear()) : ax);
                    ai = (an ? Math.min(ai, an.getFullYear()) : ai);
                    am.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                    for (; ax <= ai; ax++) {
                        am.yearshtml += "<option value='" + ax + "'" + (ax === ah ? " selected='selected'" : "") + ">" + ax + "</option>"
                    }
                    am.yearshtml += "</select>";
                    aj += am.yearshtml;
                    am.yearshtml = null
                }
            }
            aj += this._get(am, "yearSuffix");
            if (av) {
                aj += (au || !(ad && ae) ? "&#xa0;" : "") + aq
            }
            aj += "</div>";
            return aj
        },
        _adjustInstDate: function (af, ah, ai) {
            var aj = af.drawYear + (ai === "Y" ? ah : 0),
                ag = af.drawMonth + (ai === "M" ? ah : 0),
                ae = Math.min(af.selectedDay, this._getDaysInMonth(aj, ag)) + (ai === "D" ? ah : 0),
                ad = this._restrictMinMax(af, this._daylightSavingAdjust(new Date(aj, ag, ae)));
            af.selectedDay = ad.getDate();
            af.drawMonth = af.selectedMonth = ad.getMonth();
            af.drawYear = af.selectedYear = ad.getFullYear();
            if (ai === "M" || ai === "Y") {
                this._notifyChange(af)
            }
        },
        _restrictMinMax: function (ae, ad) {
            var ag = this._getMinMaxDate(ae, "min"),
                af = this._getMinMaxDate(ae, "max"),
                ah = (ag && ad < ag ? ag : ad);
            return (af && ah > af ? af : ah)
        },
        _notifyChange: function (ad) {
            var ae = this._get(ad, "onChangeMonthYear");
            if (ae) {
                ae.apply((ad.input ? ad.input[0] : null), [ad.selectedYear, ad.selectedMonth + 1, ad])
            }
        },
        _getNumberOfMonths: function (ad) {
            var ae = this._get(ad, "numberOfMonths");
            return (ae == null ? [1, 1] : (typeof ae === "number" ? [1, ae] : ae))
        },
        _getMinMaxDate: function (ad, ae) {
            return this._determineDate(ad, this._get(ad, ae + "Date"), null)
        },
        _getDaysInMonth: function (ae, ad) {
            return 32 - this._daylightSavingAdjust(new Date(ae, ad, 32)).getDate()
        },
        _getFirstDayOfMonth: function (ae, ad) {
            return new Date(ae, ad, 1).getDay()
        },
        _canAdjustMonth: function (ag, ai, ae, ad) {
            var ah = this._getNumberOfMonths(ag),
                af = this._daylightSavingAdjust(new Date(ae, ad + (ai < 0 ? ai : ah[0] * ah[1]), 1));
            if (ai < 0) {
                af.setDate(this._getDaysInMonth(af.getFullYear(), af.getMonth()))
            }
            return this._isInRange(ag, af)
        },
        _isInRange: function (af, ae) {
            var al, ad, ai = this._getMinMaxDate(af, "min"),
                ag = this._getMinMaxDate(af, "max"),
                aj = null,
                ah = null,
                ak = this._get(af, "yearRange");
            if (ak) {
                al = ak.split(":");
                ad = new Date().getFullYear();
                aj = parseInt(al[0], 10);
                ah = parseInt(al[1], 10);
                if (al[0].match(/[+\-].*/)) {
                    aj += ad
                }
                if (al[1].match(/[+\-].*/)) {
                    ah += ad
                }
            }
            return ((!ai || ae.getTime() >= ai.getTime()) && (!ag || ae.getTime() <= ag.getTime()) && (!aj || ae.getFullYear() >= aj) && (!ah || ae.getFullYear() <= ah))
        },
        _getFormatConfig: function (ad) {
            var ae = this._get(ad, "shortYearCutoff");
            ae = (typeof ae !== "string" ? ae : new Date().getFullYear() % 100 + parseInt(ae, 10));
            return {
                shortYearCutoff: ae,
                dayNamesShort: this._get(ad, "dayNamesShort"),
                dayNames: this._get(ad, "dayNames"),
                monthNamesShort: this._get(ad, "monthNamesShort"),
                monthNames: this._get(ad, "monthNames")
            }
        },
        _formatDate: function (af, ae, ag, ah) {
            if (!ae) {
                af.currentDay = af.selectedDay;
                af.currentMonth = af.selectedMonth;
                af.currentYear = af.selectedYear
            }
            var ad = (ae ? (typeof ae === "object" ? ae : this._daylightSavingAdjust(new Date(ah, ag, ae))) : this._daylightSavingAdjust(new Date(af.currentYear, af.currentMonth, af.currentDay)));
            return this.formatDate(this._get(af, "dateFormat"), ad, this._getFormatConfig(af))
        }
    });

    function h(ad) {
        var ae = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return ad.delegate(ae, "mouseout", function () {
            a(this).removeClass("ui-state-hover");
            if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                a(this).removeClass("ui-datepicker-prev-hover")
            }
            if (this.className.indexOf("ui-datepicker-next") !== -1) {
                a(this).removeClass("ui-datepicker-next-hover")
            }
        }).delegate(ae, "mouseover", k)
    }

    function k() {
        if (!a.datepicker._isDisabledDatepicker(l.inline ? l.dpDiv.parent()[0] : l.input[0])) {
            a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
            a(this).addClass("ui-state-hover");
            if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                a(this).addClass("ui-datepicker-prev-hover")
            }
            if (this.className.indexOf("ui-datepicker-next") !== -1) {
                a(this).addClass("ui-datepicker-next-hover")
            }
        }
    }

    function i(af, ae) {
        a.extend(af, ae);
        for (var ad in ae) {
            if (ae[ad] == null) {
                af[ad] = ae[ad]
            }
        }
        return af
    }
    a.fn.datepicker = function (ad) {
        if (!this.length) {
            return this
        }
        if (!a.datepicker.initialized) {
            a(document).mousedown(a.datepicker._checkExternalClick);
            a.datepicker.initialized = true
        }
        if (a("#" + a.datepicker._mainDivId).length === 0) {
            a("body").append(a.datepicker.dpDiv)
        }
        var ae = Array.prototype.slice.call(arguments, 1);
        if (typeof ad === "string" && (ad === "isDisabled" || ad === "getDate" || ad === "widget")) {
            return a.datepicker["_" + ad + "Datepicker"].apply(a.datepicker, [this[0]].concat(ae))
        }
        if (ad === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
            return a.datepicker["_" + ad + "Datepicker"].apply(a.datepicker, [this[0]].concat(ae))
        }
        return this.each(function () {
            typeof ad === "string" ? a.datepicker["_" + ad + "Datepicker"].apply(a.datepicker, [this].concat(ae)) : a.datepicker._attachDatepicker(this, ad)
        })
    };
    a.datepicker = new g();
    a.datepicker.initialized = false;
    a.datepicker.uuid = new Date().getTime();
    a.datepicker.version = "1.11.4";
    var f = a.datepicker;
    /*
     * jQuery UI Draggable 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/draggable/
     */
    a.widget("ui.draggable", a.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false,
            drag: null,
            start: null,
            stop: null
        },
        _create: function () {
            if (this.options.helper === "original") {
                this._setPositionRelative()
            }
            if (this.options.addClasses) {
                this.element.addClass("ui-draggable")
            }
            if (this.options.disabled) {
                this.element.addClass("ui-draggable-disabled")
            }
            this._setHandleClassName();
            this._mouseInit()
        },
        _setOption: function (ad, ae) {
            this._super(ad, ae);
            if (ad === "handle") {
                this._removeHandleClassName();
                this._setHandleClassName()
            }
        },
        _destroy: function () {
            if ((this.helper || this.element).is(".ui-draggable-dragging")) {
                this.destroyOnClear = true;
                return
            }
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._removeHandleClassName();
            this._mouseDestroy()
        },
        _mouseCapture: function (ad) {
            var ae = this.options;
            this._blurActiveElement(ad);
            if (this.helper || ae.disabled || a(ad.target).closest(".ui-resizable-handle").length > 0) {
                return false
            }
            this.handle = this._getHandle(ad);
            if (!this.handle) {
                return false
            }
            this._blockFrames(ae.iframeFix === true ? "iframe" : ae.iframeFix);
            return true
        },
        _blockFrames: function (ad) {
            this.iframeBlocks = this.document.find(ad).map(function () {
                var ae = a(this);
                return a("<div>").css("position", "absolute").appendTo(ae.parent()).outerWidth(ae.outerWidth()).outerHeight(ae.outerHeight()).offset(ae.offset())[0]
            })
        },
        _unblockFrames: function () {
            if (this.iframeBlocks) {
                this.iframeBlocks.remove();
                delete this.iframeBlocks
            }
        },
        _blurActiveElement: function (af) {
            var ad = this.document[0];
            if (!this.handleElement.is(af.target)) {
                return
            }
            try {
                if (ad.activeElement && ad.activeElement.nodeName.toLowerCase() !== "body") {
                    a(ad.activeElement).blur()
                }
            } catch (ae) {}
        },
        _mouseStart: function (ad) {
            var ae = this.options;
            this.helper = this._createHelper(ad);
            this.helper.addClass("ui-draggable-dragging");
            this._cacheHelperProportions();
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent(true);
            this.offsetParent = this.helper.offsetParent();
            this.hasFixedAncestor = this.helper.parents().filter(function () {
                return a(this).css("position") === "fixed"
            }).length > 0;
            this.positionAbs = this.element.offset();
            this._refreshOffsets(ad);
            this.originalPosition = this.position = this._generatePosition(ad, false);
            this.originalPageX = ad.pageX;
            this.originalPageY = ad.pageY;
            (ae.cursorAt && this._adjustOffsetFromHelper(ae.cursorAt));
            this._setContainment();
            if (this._trigger("start", ad) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            if (a.ui.ddmanager && !ae.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, ad)
            }
            this._normalizeRightBottom();
            this._mouseDrag(ad, true);
            if (a.ui.ddmanager) {
                a.ui.ddmanager.dragStart(this, ad)
            }
            return true
        },
        _refreshOffsets: function (ad) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: false,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            };
            this.offset.click = {
                left: ad.pageX - this.offset.left,
                top: ad.pageY - this.offset.top
            }
        },
        _mouseDrag: function (ad, ae) {
            if (this.hasFixedAncestor) {
                this.offset.parent = this._getParentOffset()
            }
            this.position = this._generatePosition(ad, true);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!ae) {
                var af = this._uiHash();
                if (this._trigger("drag", ad, af) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = af.position
            }
            this.helper[0].style.left = this.position.left + "px";
            this.helper[0].style.top = this.position.top + "px";
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, ad)
            }
            return false
        },
        _mouseStop: function (ae) {
            var af = this,
                ad = false;
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                ad = a.ui.ddmanager.drop(this, ae)
            }
            if (this.dropped) {
                ad = this.dropped;
                this.dropped = false
            }
            if ((this.options.revert === "invalid" && !ad) || (this.options.revert === "valid" && ad) || this.options.revert === true || (a.isFunction(this.options.revert) && this.options.revert.call(this.element, ad))) {
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    if (af._trigger("stop", ae) !== false) {
                        af._clear()
                    }
                })
            } else {
                if (this._trigger("stop", ae) !== false) {
                    this._clear()
                }
            }
            return false
        },
        _mouseUp: function (ad) {
            this._unblockFrames();
            if (a.ui.ddmanager) {
                a.ui.ddmanager.dragStop(this, ad)
            }
            if (this.handleElement.is(ad.target)) {
                this.element.focus()
            }
            return a.ui.mouse.prototype._mouseUp.call(this, ad)
        },
        cancel: function () {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({})
            } else {
                this._clear()
            }
            return this
        },
        _getHandle: function (ad) {
            return this.options.handle ? !!a(ad.target).closest(this.element.find(this.options.handle)).length : true
        },
        _setHandleClassName: function () {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;
            this.handleElement.addClass("ui-draggable-handle")
        },
        _removeHandleClassName: function () {
            this.handleElement.removeClass("ui-draggable-handle")
        },
        _createHelper: function (ad) {
            var ag = this.options,
                af = a.isFunction(ag.helper),
                ae = af ? a(ag.helper.apply(this.element[0], [ad])) : (ag.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);
            if (!ae.parents("body").length) {
                ae.appendTo((ag.appendTo === "parent" ? this.element[0].parentNode : ag.appendTo))
            }
            if (af && ae[0] === this.element[0]) {
                this._setPositionRelative()
            }
            if (ae[0] !== this.element[0] && !(/(fixed|absolute)/).test(ae.css("position"))) {
                ae.css("position", "absolute")
            }
            return ae
        },
        _setPositionRelative: function () {
            if (!(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
        },
        _adjustOffsetFromHelper: function (ad) {
            if (typeof ad === "string") {
                ad = ad.split(" ")
            }
            if (a.isArray(ad)) {
                ad = {
                    left: +ad[0],
                    top: +ad[1] || 0
                }
            }
            if ("left" in ad) {
                this.offset.click.left = ad.left + this.margins.left
            }
            if ("right" in ad) {
                this.offset.click.left = this.helperProportions.width - ad.right + this.margins.left
            }
            if ("top" in ad) {
                this.offset.click.top = ad.top + this.margins.top
            }
            if ("bottom" in ad) {
                this.offset.click.top = this.helperProportions.height - ad.bottom + this.margins.top
            }
        },
        _isRootNode: function (ad) {
            return (/(html|body)/i).test(ad.tagName) || ad === this.document[0]
        },
        _getParentOffset: function () {
            var ae = this.offsetParent.offset(),
                ad = this.document[0];
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== ad && a.contains(this.scrollParent[0], this.offsetParent[0])) {
                ae.left += this.scrollParent.scrollLeft();
                ae.top += this.scrollParent.scrollTop()
            }
            if (this._isRootNode(this.offsetParent[0])) {
                ae = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: ae.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: ae.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition !== "relative") {
                return {
                    top: 0,
                    left: 0
                }
            }
            var ad = this.element.position(),
                ae = this._isRootNode(this.scrollParent[0]);
            return {
                top: ad.top - (parseInt(this.helper.css("top"), 10) || 0) + (!ae ? this.scrollParent.scrollTop() : 0),
                left: ad.left - (parseInt(this.helper.css("left"), 10) || 0) + (!ae ? this.scrollParent.scrollLeft() : 0)
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0),
                right: (parseInt(this.element.css("marginRight"), 10) || 0),
                bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var ag, ad, ae, ah = this.options,
                af = this.document[0];
            this.relativeContainer = null;
            if (!ah.containment) {
                this.containment = null;
                return
            }
            if (ah.containment === "window") {
                this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || af.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (ah.containment === "document") {
                this.containment = [0, 0, a(af).width() - this.helperProportions.width - this.margins.left, (a(af).height() || af.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (ah.containment.constructor === Array) {
                this.containment = ah.containment;
                return
            }
            if (ah.containment === "parent") {
                ah.containment = this.helper[0].parentNode
            }
            ad = a(ah.containment);
            ae = ad[0];
            if (!ae) {
                return
            }
            ag = /(scroll|auto)/.test(ad.css("overflow"));
            this.containment = [(parseInt(ad.css("borderLeftWidth"), 10) || 0) + (parseInt(ad.css("paddingLeft"), 10) || 0), (parseInt(ad.css("borderTopWidth"), 10) || 0) + (parseInt(ad.css("paddingTop"), 10) || 0), (ag ? Math.max(ae.scrollWidth, ae.offsetWidth) : ae.offsetWidth) - (parseInt(ad.css("borderRightWidth"), 10) || 0) - (parseInt(ad.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (ag ? Math.max(ae.scrollHeight, ae.offsetHeight) : ae.offsetHeight) - (parseInt(ad.css("borderBottomWidth"), 10) || 0) - (parseInt(ad.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
            this.relativeContainer = ad
        },
        _convertPositionTo: function (ad, af) {
            if (!af) {
                af = this.position
            }
            var ae = ad === "absolute" ? 1 : -1,
                ag = this._isRootNode(this.scrollParent[0]);
            return {
                top: (af.top + this.offset.relative.top * ae + this.offset.parent.top * ae - ((this.cssPosition === "fixed" ? -this.offset.scroll.top : (ag ? 0 : this.offset.scroll.top)) * ae)),
                left: (af.left + this.offset.relative.left * ae + this.offset.parent.left * ae - ((this.cssPosition === "fixed" ? -this.offset.scroll.left : (ag ? 0 : this.offset.scroll.left)) * ae))
            }
        },
        _generatePosition: function (ag, ae) {
            var af, ad, am, ah, ai = this.options,
                al = this._isRootNode(this.scrollParent[0]),
                aj = ag.pageX,
                ak = ag.pageY;
            if (!al || !this.offset.scroll) {
                this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft()
                }
            }
            if (ae) {
                if (this.containment) {
                    if (this.relativeContainer) {
                        ad = this.relativeContainer.offset();
                        af = [this.containment[0] + ad.left, this.containment[1] + ad.top, this.containment[2] + ad.left, this.containment[3] + ad.top]
                    } else {
                        af = this.containment
                    }
                    if (ag.pageX - this.offset.click.left < af[0]) {
                        aj = af[0] + this.offset.click.left
                    }
                    if (ag.pageY - this.offset.click.top < af[1]) {
                        ak = af[1] + this.offset.click.top
                    }
                    if (ag.pageX - this.offset.click.left > af[2]) {
                        aj = af[2] + this.offset.click.left
                    }
                    if (ag.pageY - this.offset.click.top > af[3]) {
                        ak = af[3] + this.offset.click.top
                    }
                }
                if (ai.grid) {
                    am = ai.grid[1] ? this.originalPageY + Math.round((ak - this.originalPageY) / ai.grid[1]) * ai.grid[1] : this.originalPageY;
                    ak = af ? ((am - this.offset.click.top >= af[1] || am - this.offset.click.top > af[3]) ? am : ((am - this.offset.click.top >= af[1]) ? am - ai.grid[1] : am + ai.grid[1])) : am;
                    ah = ai.grid[0] ? this.originalPageX + Math.round((aj - this.originalPageX) / ai.grid[0]) * ai.grid[0] : this.originalPageX;
                    aj = af ? ((ah - this.offset.click.left >= af[0] || ah - this.offset.click.left > af[2]) ? ah : ((ah - this.offset.click.left >= af[0]) ? ah - ai.grid[0] : ah + ai.grid[0])) : ah
                }
                if (ai.axis === "y") {
                    aj = this.originalPageX
                }
                if (ai.axis === "x") {
                    ak = this.originalPageY
                }
            }
            return {
                top: (ak - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.offset.scroll.top : (al ? 0 : this.offset.scroll.top))),
                left: (aj - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.offset.scroll.left : (al ? 0 : this.offset.scroll.left)))
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false;
            if (this.destroyOnClear) {
                this.destroy()
            }
        },
        _normalizeRightBottom: function () {
            if (this.options.axis !== "y" && this.helper.css("right") !== "auto") {
                this.helper.width(this.helper.width());
                this.helper.css("right", "auto")
            }
            if (this.options.axis !== "x" && this.helper.css("bottom") !== "auto") {
                this.helper.height(this.helper.height());
                this.helper.css("bottom", "auto")
            }
        },
        _trigger: function (ae, ad, af) {
            af = af || this._uiHash();
            a.ui.plugin.call(this, ae, [ad, af, this], true);
            if (/^(drag|start|stop)/.test(ae)) {
                this.positionAbs = this._convertPositionTo("absolute");
                af.offset = this.positionAbs
            }
            return a.Widget.prototype._trigger.call(this, ae, ad, af)
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
    });
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function (ae, af, ad) {
            var ag = a.extend({}, af, {
                item: ad.element
            });
            ad.sortables = [];
            a(ad.options.connectToSortable).each(function () {
                var ah = a(this).sortable("instance");
                if (ah && !ah.options.disabled) {
                    ad.sortables.push(ah);
                    ah.refreshPositions();
                    ah._trigger("activate", ae, ag)
                }
            })
        },
        stop: function (ae, af, ad) {
            var ag = a.extend({}, af, {
                item: ad.element
            });
            ad.cancelHelperRemoval = false;
            a.each(ad.sortables, function () {
                var ah = this;
                if (ah.isOver) {
                    ah.isOver = 0;
                    ad.cancelHelperRemoval = true;
                    ah.cancelHelperRemoval = false;
                    ah._storedCSS = {
                        position: ah.placeholder.css("position"),
                        top: ah.placeholder.css("top"),
                        left: ah.placeholder.css("left")
                    };
                    ah._mouseStop(ae);
                    ah.options.helper = ah.options._helper
                } else {
                    ah.cancelHelperRemoval = true;
                    ah._trigger("deactivate", ae, ag)
                }
            })
        },
        drag: function (ae, af, ad) {
            a.each(ad.sortables, function () {
                var ag = false,
                    ah = this;
                ah.positionAbs = ad.positionAbs;
                ah.helperProportions = ad.helperProportions;
                ah.offset.click = ad.offset.click;
                if (ah._intersectsWith(ah.containerCache)) {
                    ag = true;
                    a.each(ad.sortables, function () {
                        this.positionAbs = ad.positionAbs;
                        this.helperProportions = ad.helperProportions;
                        this.offset.click = ad.offset.click;
                        if (this !== ah && this._intersectsWith(this.containerCache) && a.contains(ah.element[0], this.element[0])) {
                            ag = false
                        }
                        return ag
                    })
                }
                if (ag) {
                    if (!ah.isOver) {
                        ah.isOver = 1;
                        ad._parent = af.helper.parent();
                        ah.currentItem = af.helper.appendTo(ah.element).data("ui-sortable-item", true);
                        ah.options._helper = ah.options.helper;
                        ah.options.helper = function () {
                            return af.helper[0]
                        };
                        ae.target = ah.currentItem[0];
                        ah._mouseCapture(ae, true);
                        ah._mouseStart(ae, true, true);
                        ah.offset.click.top = ad.offset.click.top;
                        ah.offset.click.left = ad.offset.click.left;
                        ah.offset.parent.left -= ad.offset.parent.left - ah.offset.parent.left;
                        ah.offset.parent.top -= ad.offset.parent.top - ah.offset.parent.top;
                        ad._trigger("toSortable", ae);
                        ad.dropped = ah.element;
                        a.each(ad.sortables, function () {
                            this.refreshPositions()
                        });
                        ad.currentItem = ad.element;
                        ah.fromOutside = ad
                    }
                    if (ah.currentItem) {
                        ah._mouseDrag(ae);
                        af.position = ah.position
                    }
                } else {
                    if (ah.isOver) {
                        ah.isOver = 0;
                        ah.cancelHelperRemoval = true;
                        ah.options._revert = ah.options.revert;
                        ah.options.revert = false;
                        ah._trigger("out", ae, ah._uiHash(ah));
                        ah._mouseStop(ae, true);
                        ah.options.revert = ah.options._revert;
                        ah.options.helper = ah.options._helper;
                        if (ah.placeholder) {
                            ah.placeholder.remove()
                        }
                        af.helper.appendTo(ad._parent);
                        ad._refreshOffsets(ae);
                        af.position = ad._generatePosition(ae, true);
                        ad._trigger("fromSortable", ae);
                        ad.dropped = false;
                        a.each(ad.sortables, function () {
                            this.refreshPositions()
                        })
                    }
                }
            })
        }
    });
    a.ui.plugin.add("draggable", "cursor", {
        start: function (ad, ah, ae) {
            var ag = a("body"),
                af = ae.options;
            if (ag.css("cursor")) {
                af._cursor = ag.css("cursor")
            }
            ag.css("cursor", af.cursor)
        },
        stop: function (ad, ag, ae) {
            var af = ae.options;
            if (af._cursor) {
                a("body").css("cursor", af._cursor)
            }
        }
    });
    a.ui.plugin.add("draggable", "opacity", {
        start: function (ad, ah, ae) {
            var ag = a(ah.helper),
                af = ae.options;
            if (ag.css("opacity")) {
                af._opacity = ag.css("opacity")
            }
            ag.css("opacity", af.opacity)
        },
        stop: function (ad, ag, ae) {
            var af = ae.options;
            if (af._opacity) {
                a(ag.helper).css("opacity", af._opacity)
            }
        }
    });
    a.ui.plugin.add("draggable", "scroll", {
        start: function (ad, af, ae) {
            if (!ae.scrollParentNotHidden) {
                ae.scrollParentNotHidden = ae.helper.scrollParent(false)
            }
            if (ae.scrollParentNotHidden[0] !== ae.document[0] && ae.scrollParentNotHidden[0].tagName !== "HTML") {
                ae.overflowOffset = ae.scrollParentNotHidden.offset()
            }
        },
        drag: function (ae, aj, af) {
            var ag = af.options,
                ah = false,
                ai = af.scrollParentNotHidden[0],
                ad = af.document[0];
            if (ai !== ad && ai.tagName !== "HTML") {
                if (!ag.axis || ag.axis !== "x") {
                    if ((af.overflowOffset.top + ai.offsetHeight) - ae.pageY < ag.scrollSensitivity) {
                        ai.scrollTop = ah = ai.scrollTop + ag.scrollSpeed
                    } else {
                        if (ae.pageY - af.overflowOffset.top < ag.scrollSensitivity) {
                            ai.scrollTop = ah = ai.scrollTop - ag.scrollSpeed
                        }
                    }
                }
                if (!ag.axis || ag.axis !== "y") {
                    if ((af.overflowOffset.left + ai.offsetWidth) - ae.pageX < ag.scrollSensitivity) {
                        ai.scrollLeft = ah = ai.scrollLeft + ag.scrollSpeed
                    } else {
                        if (ae.pageX - af.overflowOffset.left < ag.scrollSensitivity) {
                            ai.scrollLeft = ah = ai.scrollLeft - ag.scrollSpeed
                        }
                    }
                }
            } else {
                if (!ag.axis || ag.axis !== "x") {
                    if (ae.pageY - a(ad).scrollTop() < ag.scrollSensitivity) {
                        ah = a(ad).scrollTop(a(ad).scrollTop() - ag.scrollSpeed)
                    } else {
                        if (a(window).height() - (ae.pageY - a(ad).scrollTop()) < ag.scrollSensitivity) {
                            ah = a(ad).scrollTop(a(ad).scrollTop() + ag.scrollSpeed)
                        }
                    }
                }
                if (!ag.axis || ag.axis !== "y") {
                    if (ae.pageX - a(ad).scrollLeft() < ag.scrollSensitivity) {
                        ah = a(ad).scrollLeft(a(ad).scrollLeft() - ag.scrollSpeed)
                    } else {
                        if (a(window).width() - (ae.pageX - a(ad).scrollLeft()) < ag.scrollSensitivity) {
                            ah = a(ad).scrollLeft(a(ad).scrollLeft() + ag.scrollSpeed)
                        }
                    }
                }
            }
            if (ah !== false && a.ui.ddmanager && !ag.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(af, ae)
            }
        }
    });
    a.ui.plugin.add("draggable", "snap", {
        start: function (ad, ag, ae) {
            var af = ae.options;
            ae.snapElements = [];
            a(af.snap.constructor !== String ? (af.snap.items || ":data(ui-draggable)") : af.snap).each(function () {
                var ai = a(this),
                    ah = ai.offset();
                if (this !== ae.element[0]) {
                    ae.snapElements.push({
                        item: this,
                        width: ai.outerWidth(),
                        height: ai.outerHeight(),
                        top: ah.top,
                        left: ah.left
                    })
                }
            })
        },
        drag: function (ag, ar, aj) {
            var aq, ae, al, ao, ak, an, ap, ad, ai, ah, am = aj.options,
                af = am.snapTolerance,
                at = ar.offset.left,
                au = at + aj.helperProportions.width,
                av = ar.offset.top,
                aw = av + aj.helperProportions.height;
            for (ai = aj.snapElements.length - 1; ai >= 0; ai--) {
                ak = aj.snapElements[ai].left - aj.margins.left;
                an = ak + aj.snapElements[ai].width;
                ap = aj.snapElements[ai].top - aj.margins.top;
                ad = ap + aj.snapElements[ai].height;
                if (au < ak - af || at > an + af || aw < ap - af || av > ad + af || !a.contains(aj.snapElements[ai].item.ownerDocument, aj.snapElements[ai].item)) {
                    if (aj.snapElements[ai].snapping) {
                        (aj.options.snap.release && aj.options.snap.release.call(aj.element, ag, a.extend(aj._uiHash(), {
                            snapItem: aj.snapElements[ai].item
                        })))
                    }
                    aj.snapElements[ai].snapping = false;
                    continue
                }
                if (am.snapMode !== "inner") {
                    aq = Math.abs(ap - aw) <= af;
                    ae = Math.abs(ad - av) <= af;
                    al = Math.abs(ak - au) <= af;
                    ao = Math.abs(an - at) <= af;
                    if (aq) {
                        ar.position.top = aj._convertPositionTo("relative", {
                            top: ap - aj.helperProportions.height,
                            left: 0
                        }).top
                    }
                    if (ae) {
                        ar.position.top = aj._convertPositionTo("relative", {
                            top: ad,
                            left: 0
                        }).top
                    }
                    if (al) {
                        ar.position.left = aj._convertPositionTo("relative", {
                            top: 0,
                            left: ak - aj.helperProportions.width
                        }).left
                    }
                    if (ao) {
                        ar.position.left = aj._convertPositionTo("relative", {
                            top: 0,
                            left: an
                        }).left
                    }
                }
                ah = (aq || ae || al || ao);
                if (am.snapMode !== "outer") {
                    aq = Math.abs(ap - av) <= af;
                    ae = Math.abs(ad - aw) <= af;
                    al = Math.abs(ak - at) <= af;
                    ao = Math.abs(an - au) <= af;
                    if (aq) {
                        ar.position.top = aj._convertPositionTo("relative", {
                            top: ap,
                            left: 0
                        }).top
                    }
                    if (ae) {
                        ar.position.top = aj._convertPositionTo("relative", {
                            top: ad - aj.helperProportions.height,
                            left: 0
                        }).top
                    }
                    if (al) {
                        ar.position.left = aj._convertPositionTo("relative", {
                            top: 0,
                            left: ak
                        }).left
                    }
                    if (ao) {
                        ar.position.left = aj._convertPositionTo("relative", {
                            top: 0,
                            left: an - aj.helperProportions.width
                        }).left
                    }
                }
                if (!aj.snapElements[ai].snapping && (aq || ae || al || ao || ah)) {
                    (aj.options.snap.snap && aj.options.snap.snap.call(aj.element, ag, a.extend(aj._uiHash(), {
                        snapItem: aj.snapElements[ai].item
                    })))
                }
                aj.snapElements[ai].snapping = (aq || ae || al || ao || ah)
            }
        }
    });
    a.ui.plugin.add("draggable", "stack", {
        start: function (ad, ai, af) {
            var ag, ah = af.options,
                ae = a.makeArray(a(ah.stack)).sort(function (aj, ak) {
                    return (parseInt(a(aj).css("zIndex"), 10) || 0) - (parseInt(a(ak).css("zIndex"), 10) || 0)
                });
            if (!ae.length) {
                return
            }
            ag = parseInt(a(ae[0]).css("zIndex"), 10) || 0;
            a(ae).each(function (aj) {
                a(this).css("zIndex", ag + aj)
            });
            this.css("zIndex", (ag + ae.length))
        }
    });
    a.ui.plugin.add("draggable", "zIndex", {
        start: function (ad, ah, ae) {
            var ag = a(ah.helper),
                af = ae.options;
            if (ag.css("zIndex")) {
                af._zIndex = ag.css("zIndex")
            }
            ag.css("zIndex", af.zIndex)
        },
        stop: function (ad, ag, ae) {
            var af = ae.options;
            if (af._zIndex) {
                a(ag.helper).css("zIndex", af._zIndex)
            }
        }
    });
    var n = a.ui.draggable;
    /*
     * jQuery UI Resizable 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/resizable/
     */
    a.widget("ui.resizable", a.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function (ad) {
            return parseInt(ad, 10) || 0
        },
        _isNumber: function (ad) {
            return !isNaN(parseInt(ad, 10))
        },
        _hasScroll: function (ae, ad) {
            if (a(ae).css("overflow") === "hidden") {
                return false
            }
            var ag = (ad && ad === "left") ? "scrollLeft" : "scrollTop",
                af = false;
            if (ae[ag] > 0) {
                return true
            }
            ae[ag] = 1;
            af = (ae[ag] > 0);
            ae[ag] = 0;
            return af
        },
        _create: function () {
            var ah, ag, ae, ad, af, aj = this,
                ai = this.options;
            this.element.addClass("ui-resizable");
            a.extend(this, {
                _aspectRatio: !!(ai.aspectRatio),
                aspectRatio: ai.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: ai.helper || ai.ghost || ai.animate ? ai.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)) {
                this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = ai.handles || (!a(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            this._handles = a();
            if (this.handles.constructor === String) {
                if (this.handles === "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                ah = this.handles.split(",");
                this.handles = {};
                for (ag = 0; ag < ah.length; ag++) {
                    ae = a.trim(ah[ag]);
                    af = "ui-resizable-" + ae;
                    ad = a("<div class='ui-resizable-handle " + af + "'></div>");
                    ad.css({
                        zIndex: ai.zIndex
                    });
                    if ("se" === ae) {
                        ad.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[ae] = ".ui-resizable-" + ae;
                    this.element.append(ad)
                }
            }
            this._renderAxis = function (ao) {
                var al, ak, am, an;
                ao = ao || this.element;
                for (al in this.handles) {
                    if (this.handles[al].constructor === String) {
                        this.handles[al] = this.element.children(this.handles[al]).first().show()
                    } else {
                        if (this.handles[al].jquery || this.handles[al].nodeType) {
                            this.handles[al] = a(this.handles[al]);
                            this._on(this.handles[al], {
                                mousedown: aj._mouseDown
                            })
                        }
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)) {
                        ak = a(this.handles[al], this.element);
                        an = /sw|ne|nw|se|n|s/.test(al) ? ak.outerHeight() : ak.outerWidth();
                        am = ["padding", /ne|nw|n/.test(al) ? "Top" : /se|sw|s/.test(al) ? "Bottom" : /^e$/.test(al) ? "Right" : "Left"].join("");
                        ao.css(am, an);
                        this._proportionallyResize()
                    }
                    this._handles = this._handles.add(this.handles[al])
                }
            };
            this._renderAxis(this.element);
            this._handles = this._handles.add(this.element.find(".ui-resizable-handle"));
            this._handles.disableSelection();
            this._handles.mouseover(function () {
                if (!aj.resizing) {
                    if (this.className) {
                        ad = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    aj.axis = ad && ad[1] ? ad[1] : "se"
                }
            });
            if (ai.autoHide) {
                this._handles.hide();
                a(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
                    if (ai.disabled) {
                        return
                    }
                    a(this).removeClass("ui-resizable-autohide");
                    aj._handles.show()
                }).mouseleave(function () {
                    if (ai.disabled) {
                        return
                    }
                    if (!aj.resizing) {
                        a(this).addClass("ui-resizable-autohide");
                        aj._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        _destroy: function () {
            this._mouseDestroy();
            var ae, ad = function (af) {
                a(af).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                ad(this.element);
                ae = this.element;
                this.originalElement.css({
                    position: ae.css("position"),
                    width: ae.outerWidth(),
                    height: ae.outerHeight(),
                    top: ae.css("top"),
                    left: ae.css("left")
                }).insertAfter(ae);
                ae.remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            ad(this.originalElement);
            return this
        },
        _mouseCapture: function (ae) {
            var ag, af, ad = false;
            for (ag in this.handles) {
                af = a(this.handles[ag])[0];
                if (af === ae.target || a.contains(af, ae.target)) {
                    ad = true
                }
            }
            return !this.options.disabled && ad
        },
        _mouseStart: function (ah) {
            var ad, af, ae, ai = this.options,
                ag = this.element;
            this.resizing = true;
            this._renderProxy();
            ad = this._num(this.helper.css("left"));
            af = this._num(this.helper.css("top"));
            if (ai.containment) {
                ad += a(ai.containment).scrollLeft() || 0;
                af += a(ai.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: ad,
                top: af
            };
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: ag.width(),
                height: ag.height()
            };
            this.originalSize = this._helper ? {
                width: ag.outerWidth(),
                height: ag.outerHeight()
            } : {
                width: ag.width(),
                height: ag.height()
            };
            this.sizeDiff = {
                width: ag.outerWidth() - ag.width(),
                height: ag.outerHeight() - ag.height()
            };
            this.originalPosition = {
                left: ad,
                top: af
            };
            this.originalMousePosition = {
                left: ah.pageX,
                top: ah.pageY
            };
            this.aspectRatio = (typeof ai.aspectRatio === "number") ? ai.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
            ae = a(".ui-resizable-" + this.axis).css("cursor");
            a("body").css("cursor", ae === "auto" ? this.axis + "-resize" : ae);
            ag.addClass("ui-resizable-resizing");
            this._propagate("start", ah);
            return true
        },
        _mouseDrag: function (ah) {
            var ae, ai, aj = this.originalMousePosition,
                ad = this.axis,
                af = (ah.pageX - aj.left) || 0,
                ag = (ah.pageY - aj.top) || 0,
                ak = this._change[ad];
            this._updatePrevProperties();
            if (!ak) {
                return false
            }
            ae = ak.apply(this, [ah, af, ag]);
            this._updateVirtualBoundaries(ah.shiftKey);
            if (this._aspectRatio || ah.shiftKey) {
                ae = this._updateRatio(ae, ah)
            }
            ae = this._respectSize(ae, ah);
            this._updateCache(ae);
            this._propagate("resize", ah);
            ai = this._applyChanges();
            if (!this._helper && this._proportionallyResizeElements.length) {
                this._proportionallyResize()
            }
            if (!a.isEmptyObject(ai)) {
                this._updatePrevProperties();
                this._trigger("resize", ah, this.ui());
                this._applyChanges()
            }
            return false
        },
        _mouseStop: function (ad) {
            this.resizing = false;
            var ah, ae, aj, ak, ai, af, am, ag = this.options,
                al = this;
            if (this._helper) {
                ah = this._proportionallyResizeElements;
                ae = ah.length && (/textarea/i).test(ah[0].nodeName);
                aj = ae && this._hasScroll(ah[0], "left") ? 0 : al.sizeDiff.height;
                ak = ae ? 0 : al.sizeDiff.width;
                ai = {
                    width: (al.helper.width() - ak),
                    height: (al.helper.height() - aj)
                };
                af = (parseInt(al.element.css("left"), 10) + (al.position.left - al.originalPosition.left)) || null;
                am = (parseInt(al.element.css("top"), 10) + (al.position.top - al.originalPosition.top)) || null;
                if (!ag.animate) {
                    this.element.css(a.extend(ai, {
                        top: am,
                        left: af
                    }))
                }
                al.helper.height(al.size.height);
                al.helper.width(al.size.width);
                if (this._helper && !ag.animate) {
                    this._proportionallyResize()
                }
            }
            a("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", ad);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        },
        _updatePrevProperties: function () {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            };
            this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function () {
            var ad = {};
            if (this.position.top !== this.prevPosition.top) {
                ad.top = this.position.top + "px"
            }
            if (this.position.left !== this.prevPosition.left) {
                ad.left = this.position.left + "px"
            }
            if (this.size.width !== this.prevSize.width) {
                ad.width = this.size.width + "px"
            }
            if (this.size.height !== this.prevSize.height) {
                ad.height = this.size.height + "px"
            }
            this.helper.css(ad);
            return ad
        },
        _updateVirtualBoundaries: function (ae) {
            var aj, ah, ai, ag, ad, af = this.options;
            ad = {
                minWidth: this._isNumber(af.minWidth) ? af.minWidth : 0,
                maxWidth: this._isNumber(af.maxWidth) ? af.maxWidth : Infinity,
                minHeight: this._isNumber(af.minHeight) ? af.minHeight : 0,
                maxHeight: this._isNumber(af.maxHeight) ? af.maxHeight : Infinity
            };
            if (this._aspectRatio || ae) {
                aj = ad.minHeight * this.aspectRatio;
                ai = ad.minWidth / this.aspectRatio;
                ah = ad.maxHeight * this.aspectRatio;
                ag = ad.maxWidth / this.aspectRatio;
                if (aj > ad.minWidth) {
                    ad.minWidth = aj
                }
                if (ai > ad.minHeight) {
                    ad.minHeight = ai
                }
                if (ah < ad.maxWidth) {
                    ad.maxWidth = ah
                }
                if (ag < ad.maxHeight) {
                    ad.maxHeight = ag
                }
            }
            this._vBoundaries = ad
        },
        _updateCache: function (ad) {
            this.offset = this.helper.offset();
            if (this._isNumber(ad.left)) {
                this.position.left = ad.left
            }
            if (this._isNumber(ad.top)) {
                this.position.top = ad.top
            }
            if (this._isNumber(ad.height)) {
                this.size.height = ad.height
            }
            if (this._isNumber(ad.width)) {
                this.size.width = ad.width
            }
        },
        _updateRatio: function (ag) {
            var ae = this.position,
                af = this.size,
                ad = this.axis;
            if (this._isNumber(ag.height)) {
                ag.width = (ag.height * this.aspectRatio)
            } else {
                if (this._isNumber(ag.width)) {
                    ag.height = (ag.width / this.aspectRatio)
                }
            }
            if (ad === "sw") {
                ag.left = ae.left + (af.width - ag.width);
                ag.top = null
            }
            if (ad === "nw") {
                ag.top = ae.top + (af.height - ag.height);
                ag.left = ae.left + (af.width - ag.width)
            }
            return ag
        },
        _respectSize: function (ag) {
            var an = this._vBoundaries,
                ad = this.axis,
                ak = this._isNumber(ag.width) && an.maxWidth && (an.maxWidth < ag.width),
                aj = this._isNumber(ag.height) && an.maxHeight && (an.maxHeight < ag.height),
                am = this._isNumber(ag.width) && an.minWidth && (an.minWidth > ag.width),
                al = this._isNumber(ag.height) && an.minHeight && (an.minHeight > ag.height),
                ai = this.originalPosition.left + this.originalSize.width,
                ah = this.position.top + this.size.height,
                af = /sw|nw|w/.test(ad),
                ae = /nw|ne|n/.test(ad);
            if (am) {
                ag.width = an.minWidth
            }
            if (al) {
                ag.height = an.minHeight
            }
            if (ak) {
                ag.width = an.maxWidth
            }
            if (aj) {
                ag.height = an.maxHeight
            }
            if (am && af) {
                ag.left = ai - an.minWidth
            }
            if (ak && af) {
                ag.left = ai - an.maxWidth
            }
            if (al && ae) {
                ag.top = ah - an.minHeight
            }
            if (aj && ae) {
                ag.top = ah - an.maxHeight
            }
            if (!ag.width && !ag.height && !ag.left && ag.top) {
                ag.top = null
            } else {
                if (!ag.width && !ag.height && !ag.top && ag.left) {
                    ag.left = null
                }
            }
            return ag
        },
        _getPaddingPlusBorderDimensions: function (ae) {
            var af = 0,
                ah = [],
                ad = [ae.css("borderTopWidth"), ae.css("borderRightWidth"), ae.css("borderBottomWidth"), ae.css("borderLeftWidth")],
                ag = [ae.css("paddingTop"), ae.css("paddingRight"), ae.css("paddingBottom"), ae.css("paddingLeft")];
            for (; af < 4; af++) {
                ah[af] = (parseInt(ad[af], 10) || 0);
                ah[af] += (parseInt(ag[af], 10) || 0)
            }
            return {
                height: ah[0] + ah[2],
                width: ah[1] + ah[3]
            }
        },
        _proportionallyResize: function () {
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var af, ae = 0,
                ad = this.helper || this.element;
            for (; ae < this._proportionallyResizeElements.length; ae++) {
                af = this._proportionallyResizeElements[ae];
                if (!this.outerDimensions) {
                    this.outerDimensions = this._getPaddingPlusBorderDimensions(af)
                }
                af.css({
                    height: (ad.height() - this.outerDimensions.height) || 0,
                    width: (ad.width() - this.outerDimensions.width) || 0
                })
            }
        },
        _renderProxy: function () {
            var ad = this.element,
                ae = this.options;
            this.elementOffset = ad.offset();
            if (this._helper) {
                this.helper = this.helper || a("<div style='overflow:hidden;'></div>");
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++ae.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function (ae, ad) {
                return {
                    width: this.originalSize.width + ad
                }
            },
            w: function (af, ae) {
                var ad = this.originalSize,
                    ag = this.originalPosition;
                return {
                    left: ag.left + ae,
                    width: ad.width - ae
                }
            },
            n: function (ag, ae, af) {
                var ad = this.originalSize,
                    ah = this.originalPosition;
                return {
                    top: ah.top + af,
                    height: ad.height - af
                }
            },
            s: function (af, ad, ae) {
                return {
                    height: this.originalSize.height + ae
                }
            },
            se: function (af, ad, ae) {
                return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [af, ad, ae]))
            },
            sw: function (af, ad, ae) {
                return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [af, ad, ae]))
            },
            ne: function (af, ad, ae) {
                return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [af, ad, ae]))
            },
            nw: function (af, ad, ae) {
                return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [af, ad, ae]))
            }
        },
        _propagate: function (ae, ad) {
            a.ui.plugin.call(this, ae, [ad, this.ui()]);
            (ae !== "resize" && this._trigger(ae, ad, this.ui()))
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
    });
    a.ui.plugin.add("resizable", "animate", {
        stop: function (ad) {
            var al = a(this).resizable("instance"),
                ag = al.options,
                ah = al._proportionallyResizeElements,
                ae = ah.length && (/textarea/i).test(ah[0].nodeName),
                ai = ae && al._hasScroll(ah[0], "left") ? 0 : al.sizeDiff.height,
                aj = ae ? 0 : al.sizeDiff.width,
                ak = {
                    width: (al.size.width - aj),
                    height: (al.size.height - ai)
                },
                af = (parseInt(al.element.css("left"), 10) + (al.position.left - al.originalPosition.left)) || null,
                am = (parseInt(al.element.css("top"), 10) + (al.position.top - al.originalPosition.top)) || null;
            al.element.animate(a.extend(ak, am && af ? {
                top: am,
                left: af
            } : {}), {
                duration: ag.animateDuration,
                easing: ag.animateEasing,
                step: function () {
                    var an = {
                        width: parseInt(al.element.css("width"), 10),
                        height: parseInt(al.element.css("height"), 10),
                        top: parseInt(al.element.css("top"), 10),
                        left: parseInt(al.element.css("left"), 10)
                    };
                    if (ah && ah.length) {
                        a(ah[0]).css({
                            width: an.width,
                            height: an.height
                        })
                    }
                    al._updateCache(an);
                    al._propagate("resize", ad)
                }
            })
        }
    });
    a.ui.plugin.add("resizable", "containment", {
        start: function () {
            var ai, am, af, ae, ag, ao, aj, an = a(this).resizable("instance"),
                ak = an.options,
                ah = an.element,
                al = ak.containment,
                ad = (al instanceof a) ? al.get(0) : (/parent/.test(al)) ? ah.parent().get(0) : al;
            if (!ad) {
                return
            }
            an.containerElement = a(ad);
            if (/document/.test(al) || al === document) {
                an.containerOffset = {
                    left: 0,
                    top: 0
                };
                an.containerPosition = {
                    left: 0,
                    top: 0
                };
                an.parentData = {
                    element: a(document),
                    left: 0,
                    top: 0,
                    width: a(document).width(),
                    height: a(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                ai = a(ad);
                am = [];
                a(["Top", "Right", "Left", "Bottom"]).each(function (ap, aq) {
                    am[ap] = an._num(ai.css("padding" + aq))
                });
                an.containerOffset = ai.offset();
                an.containerPosition = ai.position();
                an.containerSize = {
                    height: (ai.innerHeight() - am[3]),
                    width: (ai.innerWidth() - am[1])
                };
                af = an.containerOffset;
                ae = an.containerSize.height;
                ag = an.containerSize.width;
                ao = (an._hasScroll(ad, "left") ? ad.scrollWidth : ag);
                aj = (an._hasScroll(ad) ? ad.scrollHeight : ae);
                an.parentData = {
                    element: ad,
                    left: af.left,
                    top: af.top,
                    width: ao,
                    height: aj
                }
            }
        },
        resize: function (ai) {
            var ap, aj, al, ak, ao = a(this).resizable("instance"),
                am = ao.options,
                ae = ao.containerOffset,
                ah = ao.position,
                an = ao._aspectRatio || ai.shiftKey,
                ag = {
                    top: 0,
                    left: 0
                },
                ad = ao.containerElement,
                af = true;
            if (ad[0] !== document && (/static/).test(ad.css("position"))) {
                ag = ae
            }
            if (ah.left < (ao._helper ? ae.left : 0)) {
                ao.size.width = ao.size.width + (ao._helper ? (ao.position.left - ae.left) : (ao.position.left - ag.left));
                if (an) {
                    ao.size.height = ao.size.width / ao.aspectRatio;
                    af = false
                }
                ao.position.left = am.helper ? ae.left : 0
            }
            if (ah.top < (ao._helper ? ae.top : 0)) {
                ao.size.height = ao.size.height + (ao._helper ? (ao.position.top - ae.top) : ao.position.top);
                if (an) {
                    ao.size.width = ao.size.height * ao.aspectRatio;
                    af = false
                }
                ao.position.top = ao._helper ? ae.top : 0
            }
            al = ao.containerElement.get(0) === ao.element.parent().get(0);
            ak = /relative|absolute/.test(ao.containerElement.css("position"));
            if (al && ak) {
                ao.offset.left = ao.parentData.left + ao.position.left;
                ao.offset.top = ao.parentData.top + ao.position.top
            } else {
                ao.offset.left = ao.element.offset().left;
                ao.offset.top = ao.element.offset().top
            }
            ap = Math.abs(ao.sizeDiff.width + (ao._helper ? ao.offset.left - ag.left : (ao.offset.left - ae.left)));
            aj = Math.abs(ao.sizeDiff.height + (ao._helper ? ao.offset.top - ag.top : (ao.offset.top - ae.top)));
            if (ap + ao.size.width >= ao.parentData.width) {
                ao.size.width = ao.parentData.width - ap;
                if (an) {
                    ao.size.height = ao.size.width / ao.aspectRatio;
                    af = false
                }
            }
            if (aj + ao.size.height >= ao.parentData.height) {
                ao.size.height = ao.parentData.height - aj;
                if (an) {
                    ao.size.width = ao.size.height * ao.aspectRatio;
                    af = false
                }
            }
            if (!af) {
                ao.position.left = ao.prevPosition.left;
                ao.position.top = ao.prevPosition.top;
                ao.size.width = ao.prevSize.width;
                ao.size.height = ao.prevSize.height
            }
        },
        stop: function () {
            var ak = a(this).resizable("instance"),
                aj = ak.options,
                ae = ak.containerOffset,
                af = ak.containerPosition,
                ad = ak.containerElement,
                ah = a(ak.helper),
                ai = ah.offset(),
                al = ah.outerWidth() - ak.sizeDiff.width,
                ag = ah.outerHeight() - ak.sizeDiff.height;
            if (ak._helper && !aj.animate && (/relative/).test(ad.css("position"))) {
                a(this).css({
                    left: ai.left - af.left - ae.left,
                    width: al,
                    height: ag
                })
            }
            if (ak._helper && !aj.animate && (/static/).test(ad.css("position"))) {
                a(this).css({
                    left: ai.left - af.left - ae.left,
                    width: al,
                    height: ag
                })
            }
        }
    });
    a.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var ae = a(this).resizable("instance"),
                ad = ae.options;
            a(ad.alsoResize).each(function () {
                var af = a(this);
                af.data("ui-resizable-alsoresize", {
                    width: parseInt(af.width(), 10),
                    height: parseInt(af.height(), 10),
                    left: parseInt(af.css("left"), 10),
                    top: parseInt(af.css("top"), 10)
                })
            })
        },
        resize: function (ae, aj) {
            var ai = a(this).resizable("instance"),
                af = ai.options,
                ah = ai.originalSize,
                ag = ai.originalPosition,
                ad = {
                    height: (ai.size.height - ah.height) || 0,
                    width: (ai.size.width - ah.width) || 0,
                    top: (ai.position.top - ag.top) || 0,
                    left: (ai.position.left - ag.left) || 0
                };
            a(af.alsoResize).each(function () {
                var al = a(this),
                    am = a(this).data("ui-resizable-alsoresize"),
                    an = {},
                    ak = al.parents(aj.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                a.each(ak, function (ao, ap) {
                    var aq = (am[ap] || 0) + (ad[ap] || 0);
                    if (aq && aq >= 0) {
                        an[ap] = aq || null
                    }
                });
                al.css(an)
            })
        },
        stop: function () {
            a(this).removeData("resizable-alsoresize")
        }
    });
    a.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var af = a(this).resizable("instance"),
                ae = af.options,
                ad = af.size;
            af.ghost = af.originalElement.clone();
            af.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: ad.height,
                width: ad.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof ae.ghost === "string" ? ae.ghost : "");
            af.ghost.appendTo(af.helper)
        },
        resize: function () {
            var ad = a(this).resizable("instance");
            if (ad.ghost) {
                ad.ghost.css({
                    position: "relative",
                    height: ad.size.height,
                    width: ad.size.width
                })
            }
        },
        stop: function () {
            var ad = a(this).resizable("instance");
            if (ad.ghost && ad.helper) {
                ad.helper.get(0).removeChild(ad.ghost.get(0))
            }
        }
    });
    a.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var ar, av = a(this).resizable("instance"),
                ao = av.options,
                ae = av.size,
                aq = av.originalSize,
                ap = av.originalPosition,
                ad = av.axis,
                af = typeof ao.grid === "number" ? [ao.grid, ao.grid] : ao.grid,
                ag = (af[0] || 1),
                ah = (af[1] || 1),
                at = Math.round((ae.width - aq.width) / ag) * ag,
                au = Math.round((ae.height - aq.height) / ah) * ah,
                an = aq.width + at,
                am = aq.height + au,
                aj = ao.maxWidth && (ao.maxWidth < an),
                ai = ao.maxHeight && (ao.maxHeight < am),
                al = ao.minWidth && (ao.minWidth > an),
                ak = ao.minHeight && (ao.minHeight > am);
            ao.grid = af;
            if (al) {
                an += ag
            }
            if (ak) {
                am += ah
            }
            if (aj) {
                an -= ag
            }
            if (ai) {
                am -= ah
            }
            if (/^(se|s|e)$/.test(ad)) {
                av.size.width = an;
                av.size.height = am
            } else {
                if (/^(ne)$/.test(ad)) {
                    av.size.width = an;
                    av.size.height = am;
                    av.position.top = ap.top - au
                } else {
                    if (/^(sw)$/.test(ad)) {
                        av.size.width = an;
                        av.size.height = am;
                        av.position.left = ap.left - at
                    } else {
                        if (am - ah <= 0 || an - ag <= 0) {
                            ar = av._getPaddingPlusBorderDimensions(this)
                        }
                        if (am - ah > 0) {
                            av.size.height = am;
                            av.position.top = ap.top - au
                        } else {
                            am = ah - ar.height;
                            av.size.height = am;
                            av.position.top = ap.top + aq.height - am
                        }
                        if (an - ag > 0) {
                            av.size.width = an;
                            av.position.left = ap.left - at
                        } else {
                            an = ag - ar.width;
                            av.size.width = an;
                            av.position.left = ap.left + aq.width - an
                        }
                    }
                }
            }
        }
    });
    var P = a.ui.resizable;
    /*
     * jQuery UI Dialog 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/dialog/
     */
    var m = a.widget("ui.dialog", {
        version: "1.11.4",
        options: {
            appendTo: "body",
            autoOpen: true,
            buttons: [],
            closeOnEscape: true,
            closeText: "Close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function (ad) {
                    var ae = a(this).css(ad).offset().top;
                    if (ae < 0) {
                        a(this).css("top", ad.top - ae)
                    }
                }
            },
            resizable: true,
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
        sizeRelatedOptions: {
            buttons: true,
            height: true,
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true,
            width: true
        },
        resizableRelatedOptions: {
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true
        },
        _create: function () {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            };
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            };
            this.originalTitle = this.element.attr("title");
            this.options.title = this.options.title || this.originalTitle;
            this._createWrapper();
            this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);
            this._createTitlebar();
            this._createButtonPane();
            if (this.options.draggable && a.fn.draggable) {
                this._makeDraggable()
            }
            if (this.options.resizable && a.fn.resizable) {
                this._makeResizable()
            }
            this._isOpen = false;
            this._trackFocus()
        },
        _init: function () {
            if (this.options.autoOpen) {
                this.open()
            }
        },
        _appendTo: function () {
            var ad = this.options.appendTo;
            if (ad && (ad.jquery || ad.nodeType)) {
                return a(ad)
            }
            return this.document.find(ad || "body").eq(0)
        },
        _destroy: function () {
            var ad, ae = this.originalPosition;
            this._untrackInstance();
            this._destroyOverlay();
            this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach();
            this.uiDialog.stop(true, true).remove();
            if (this.originalTitle) {
                this.element.attr("title", this.originalTitle)
            }
            ad = ae.parent.children().eq(ae.index);
            if (ad.length && ad[0] !== this.element[0]) {
                ad.before(this.element)
            } else {
                ae.parent.append(this.element)
            }
        },
        widget: function () {
            return this.uiDialog
        },
        disable: a.noop,
        enable: a.noop,
        close: function (af) {
            var ad, ag = this;
            if (!this._isOpen || this._trigger("beforeClose", af) === false) {
                return
            }
            this._isOpen = false;
            this._focusedElement = null;
            this._destroyOverlay();
            this._untrackInstance();
            if (!this.opener.filter(":focusable").focus().length) {
                try {
                    ad = this.document[0].activeElement;
                    if (ad && ad.nodeName.toLowerCase() !== "body") {
                        a(ad).blur()
                    }
                } catch (ae) {}
            }
            this._hide(this.uiDialog, this.options.hide, function () {
                ag._trigger("close", af)
            })
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function () {
            this._moveToTop()
        },
        _moveToTop: function (ad, af) {
            var ae = false,
                ah = this.uiDialog.siblings(".ui-front:visible").map(function () {
                    return +a(this).css("z-index")
                }).get(),
                ag = Math.max.apply(null, ah);
            if (ag >= +this.uiDialog.css("z-index")) {
                this.uiDialog.css("z-index", ag + 1);
                ae = true
            }
            if (ae && !af) {
                this._trigger("focus", ad)
            }
            return ae
        },
        open: function () {
            var ad = this;
            if (this._isOpen) {
                if (this._moveToTop()) {
                    this._focusTabbable()
                }
                return
            }
            this._isOpen = true;
            this.opener = a(this.document[0].activeElement);
            this._size();
            this._position();
            this._createOverlay();
            this._moveToTop(null, true);
            if (this.overlay) {
                this.overlay.css("z-index", this.uiDialog.css("z-index") - 1)
            }
            this._show(this.uiDialog, this.options.show, function () {
                ad._focusTabbable();
                ad._trigger("focus")
            });
            this._makeFocusTarget();
            this._trigger("open")
        },
        _focusTabbable: function () {
            var ad = this._focusedElement;
            if (!ad) {
                ad = this.element.find("[autofocus]")
            }
            if (!ad.length) {
                ad = this.element.find(":tabbable")
            }
            if (!ad.length) {
                ad = this.uiDialogButtonPane.find(":tabbable")
            }
            if (!ad.length) {
                ad = this.uiDialogTitlebarClose.filter(":tabbable")
            }
            if (!ad.length) {
                ad = this.uiDialog
            }
            ad.eq(0).focus()
        },
        _keepFocus: function (ae) {
            function ad() {
                var af = this.document[0].activeElement,
                    ag = this.uiDialog[0] === af || a.contains(this.uiDialog[0], af);
                if (!ag) {
                    this._focusTabbable()
                }
            }
            ae.preventDefault();
            ad.call(this);
            this._delay(ad)
        },
        _createWrapper: function () {
            this.uiDialog = a("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo());
            this._on(this.uiDialog, {
                keydown: function (ad) {
                    if (this.options.closeOnEscape && !ad.isDefaultPrevented() && ad.keyCode && ad.keyCode === a.ui.keyCode.ESCAPE) {
                        ad.preventDefault();
                        this.close(ad);
                        return
                    }
                    if (ad.keyCode !== a.ui.keyCode.TAB || ad.isDefaultPrevented()) {
                        return
                    }
                    var ag = this.uiDialog.find(":tabbable"),
                        ae = ag.filter(":first"),
                        af = ag.filter(":last");
                    if ((ad.target === af[0] || ad.target === this.uiDialog[0]) && !ad.shiftKey) {
                        this._delay(function () {
                            ae.focus()
                        });
                        ad.preventDefault()
                    } else {
                        if ((ad.target === ae[0] || ad.target === this.uiDialog[0]) && ad.shiftKey) {
                            this._delay(function () {
                                af.focus()
                            });
                            ad.preventDefault()
                        }
                    }
                },
                mousedown: function (ad) {
                    if (this._moveToTop(ad)) {
                        this._focusTabbable()
                    }
                }
            });
            if (!this.element.find("[aria-describedby]").length) {
                this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                })
            }
        },
        _createTitlebar: function () {
            var ad;
            this.uiDialogTitlebar = a("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);
            this._on(this.uiDialogTitlebar, {
                mousedown: function (ae) {
                    if (!a(ae.target).closest(".ui-dialog-titlebar-close")) {
                        this.uiDialog.focus()
                    }
                }
            });
            this.uiDialogTitlebarClose = a("<button type='button'></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: false
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);
            this._on(this.uiDialogTitlebarClose, {
                click: function (ae) {
                    ae.preventDefault();
                    this.close(ae)
                }
            });
            ad = a("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);
            this._title(ad);
            this.uiDialog.attr({
                "aria-labelledby": ad.attr("id")
            })
        },
        _title: function (ad) {
            if (!this.options.title) {
                ad.html("&#160;")
            }
            ad.text(this.options.title)
        },
        _createButtonPane: function () {
            this.uiDialogButtonPane = a("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            this.uiButtonSet = a("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);
            this._createButtons()
        },
        _createButtons: function () {
            var ae = this,
                ad = this.options.buttons;
            this.uiDialogButtonPane.remove();
            this.uiButtonSet.empty();
            if (a.isEmptyObject(ad) || (a.isArray(ad) && !ad.length)) {
                this.uiDialog.removeClass("ui-dialog-buttons");
                return
            }
            a.each(ad, function (ah, ai) {
                var ag, af;
                ai = a.isFunction(ai) ? {
                    click: ai,
                    text: ah
                } : ai;
                ai = a.extend({
                    type: "button"
                }, ai);
                ag = ai.click;
                ai.click = function () {
                    ag.apply(ae.element[0], arguments)
                };
                af = {
                    icons: ai.icons,
                    text: ai.showText
                };
                delete ai.icons;
                delete ai.showText;
                a("<button></button>", ai).button(af).appendTo(ae.uiButtonSet)
            });
            this.uiDialog.addClass("ui-dialog-buttons");
            this.uiDialogButtonPane.appendTo(this.uiDialog)
        },
        _makeDraggable: function () {
            var af = this,
                ae = this.options;

            function ad(ag) {
                return {
                    position: ag.position,
                    offset: ag.offset
                }
            }
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (ag, ah) {
                    a(this).addClass("ui-dialog-dragging");
                    af._blockFrames();
                    af._trigger("dragStart", ag, ad(ah))
                },
                drag: function (ag, ah) {
                    af._trigger("drag", ag, ad(ah))
                },
                stop: function (ag, aj) {
                    var ah = aj.offset.left - af.document.scrollLeft(),
                        ai = aj.offset.top - af.document.scrollTop();
                    ae.position = {
                        my: "left top",
                        at: "left" + (ah >= 0 ? "+" : "") + ah + " top" + (ai >= 0 ? "+" : "") + ai,
                        of: af.window
                    };
                    a(this).removeClass("ui-dialog-dragging");
                    af._unblockFrames();
                    af._trigger("dragStop", ag, ad(aj))
                }
            })
        },
        _makeResizable: function () {
            var ai = this,
                af = this.options,
                ae = af.resizable,
                ag = this.uiDialog.css("position"),
                ah = typeof ae === "string" ? ae : "n,e,s,w,se,sw,ne,nw";

            function ad(aj) {
                return {
                    originalPosition: aj.originalPosition,
                    originalSize: aj.originalSize,
                    position: aj.position,
                    size: aj.size
                }
            }
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: af.maxWidth,
                maxHeight: af.maxHeight,
                minWidth: af.minWidth,
                minHeight: this._minHeight(),
                handles: ah,
                start: function (aj, ak) {
                    a(this).addClass("ui-dialog-resizing");
                    ai._blockFrames();
                    ai._trigger("resizeStart", aj, ad(ak))
                },
                resize: function (aj, ak) {
                    ai._trigger("resize", aj, ad(ak))
                },
                stop: function (aj, an) {
                    var al = ai.uiDialog.offset(),
                        ak = al.left - ai.document.scrollLeft(),
                        am = al.top - ai.document.scrollTop();
                    af.height = ai.uiDialog.height();
                    af.width = ai.uiDialog.width();
                    af.position = {
                        my: "left top",
                        at: "left" + (ak >= 0 ? "+" : "") + ak + " top" + (am >= 0 ? "+" : "") + am,
                        of: ai.window
                    };
                    a(this).removeClass("ui-dialog-resizing");
                    ai._unblockFrames();
                    ai._trigger("resizeStop", aj, ad(an))
                }
            }).css("position", ag)
        },
        _trackFocus: function () {
            this._on(this.widget(), {
                focusin: function (ad) {
                    this._makeFocusTarget();
                    this._focusedElement = a(ad.target)
                }
            })
        },
        _makeFocusTarget: function () {
            this._untrackInstance();
            this._trackingInstances().unshift(this)
        },
        _untrackInstance: function () {
            var ae = this._trackingInstances(),
                ad = a.inArray(this, ae);
            if (ad !== -1) {
                ae.splice(ad, 1)
            }
        },
        _trackingInstances: function () {
            var ad = this.document.data("ui-dialog-instances");
            if (!ad) {
                ad = [];
                this.document.data("ui-dialog-instances", ad)
            }
            return ad
        },
        _minHeight: function () {
            var ad = this.options;
            return ad.height === "auto" ? ad.minHeight : Math.min(ad.minHeight, ad.height)
        },
        _position: function () {
            var ad = this.uiDialog.is(":visible");
            if (!ad) {
                this.uiDialog.show()
            }
            this.uiDialog.position(this.options.position);
            if (!ad) {
                this.uiDialog.hide()
            }
        },
        _setOptions: function (ad) {
            var ag = this,
                af = false,
                ae = {};
            a.each(ad, function (ah, ai) {
                ag._setOption(ah, ai);
                if (ah in ag.sizeRelatedOptions) {
                    af = true
                }
                if (ah in ag.resizableRelatedOptions) {
                    ae[ah] = ai
                }
            });
            if (af) {
                this._size();
                this._position()
            }
            if (this.uiDialog.is(":data(ui-resizable)")) {
                this.uiDialog.resizable("option", ae)
            }
        },
        _setOption: function (af, ah) {
            var ad, ae, ag = this.uiDialog;
            if (af === "dialogClass") {
                ag.removeClass(this.options.dialogClass).addClass(ah)
            }
            if (af === "disabled") {
                return
            }
            this._super(af, ah);
            if (af === "appendTo") {
                this.uiDialog.appendTo(this._appendTo())
            }
            if (af === "buttons") {
                this._createButtons()
            }
            if (af === "closeText") {
                this.uiDialogTitlebarClose.button({
                    label: "" + ah
                })
            }
            if (af === "draggable") {
                ad = ag.is(":data(ui-draggable)");
                if (ad && !ah) {
                    ag.draggable("destroy")
                }
                if (!ad && ah) {
                    this._makeDraggable()
                }
            }
            if (af === "position") {
                this._position()
            }
            if (af === "resizable") {
                ae = ag.is(":data(ui-resizable)");
                if (ae && !ah) {
                    ag.resizable("destroy")
                }
                if (ae && typeof ah === "string") {
                    ag.resizable("option", "handles", ah)
                }
                if (!ae && ah !== false) {
                    this._makeResizable()
                }
            }
            if (af === "title") {
                this._title(this.uiDialogTitlebar.find(".ui-dialog-title"))
            }
        },
        _size: function () {
            var af, ae, ad, ag = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            });
            if (ag.minWidth > ag.width) {
                ag.width = ag.minWidth
            }
            af = this.uiDialog.css({
                height: "auto",
                width: ag.width
            }).outerHeight();
            ae = Math.max(0, ag.minHeight - af);
            ad = typeof ag.maxHeight === "number" ? Math.max(0, ag.maxHeight - af) : "none";
            if (ag.height === "auto") {
                this.element.css({
                    minHeight: ae,
                    maxHeight: ad,
                    height: "auto"
                })
            } else {
                this.element.height(Math.max(0, ag.height - af))
            }
            if (this.uiDialog.is(":data(ui-resizable)")) {
                this.uiDialog.resizable("option", "minHeight", this._minHeight())
            }
        },
        _blockFrames: function () {
            this.iframeBlocks = this.document.find("iframe").map(function () {
                var ad = a(this);
                return a("<div>").css({
                    position: "absolute",
                    width: ad.outerWidth(),
                    height: ad.outerHeight()
                }).appendTo(ad.parent()).offset(ad.offset())[0]
            })
        },
        _unblockFrames: function () {
            if (this.iframeBlocks) {
                this.iframeBlocks.remove();
                delete this.iframeBlocks
            }
        },
        _allowInteraction: function (ad) {
            if (a(ad.target).closest(".ui-dialog").length) {
                return true
            }
            return !!a(ad.target).closest(".ui-datepicker").length
        },
        _createOverlay: function () {
            if (!this.options.modal) {
                return
            }
            var ad = true;
            this._delay(function () {
                ad = false
            });
            if (!this.document.data("ui-dialog-overlays")) {
                this._on(this.document, {
                    focusin: function (ae) {
                        if (ad) {
                            return
                        }
                        if (!this._allowInteraction(ae)) {
                            ae.preventDefault();
                            this._trackingInstances()[0]._focusTabbable()
                        }
                    }
                })
            }
            this.overlay = a("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo());
            this._on(this.overlay, {
                mousedown: "_keepFocus"
            });
            this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
        },
        _destroyOverlay: function () {
            if (!this.options.modal) {
                return
            }
            if (this.overlay) {
                var ad = this.document.data("ui-dialog-overlays") - 1;
                if (!ad) {
                    this.document.unbind("focusin").removeData("ui-dialog-overlays")
                } else {
                    this.document.data("ui-dialog-overlays", ad)
                }
                this.overlay.remove();
                this.overlay = null
            }
        }
    });
    /*
     * jQuery UI Droppable 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/droppable/
     */
    a.widget("ui.droppable", {
        version: "1.11.4",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function () {
            var af, ae = this.options,
                ad = ae.accept;
            this.isover = false;
            this.isout = true;
            this.accept = a.isFunction(ad) ? ad : function (ag) {
                return ag.is(ad)
            };
            this.proportions = function () {
                if (arguments.length) {
                    af = arguments[0]
                } else {
                    return af ? af : af = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    }
                }
            };
            this._addToManager(ae.scope);
            ae.addClasses && this.element.addClass("ui-droppable")
        },
        _addToManager: function (ad) {
            a.ui.ddmanager.droppables[ad] = a.ui.ddmanager.droppables[ad] || [];
            a.ui.ddmanager.droppables[ad].push(this)
        },
        _splice: function (ad) {
            var ae = 0;
            for (; ae < ad.length; ae++) {
                if (ad[ae] === this) {
                    ad.splice(ae, 1)
                }
            }
        },
        _destroy: function () {
            var ad = a.ui.ddmanager.droppables[this.options.scope];
            this._splice(ad);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function (ae, af) {
            if (ae === "accept") {
                this.accept = a.isFunction(af) ? af : function (ag) {
                    return ag.is(af)
                }
            } else {
                if (ae === "scope") {
                    var ad = a.ui.ddmanager.droppables[this.options.scope];
                    this._splice(ad);
                    this._addToManager(af)
                }
            }
            this._super(ae, af)
        },
        _activate: function (ae) {
            var ad = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.addClass(this.options.activeClass)
            }
            if (ad) {
                this._trigger("activate", ae, this.ui(ad))
            }
        },
        _deactivate: function (ae) {
            var ad = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }
            if (ad) {
                this._trigger("deactivate", ae, this.ui(ad))
            }
        },
        _over: function (ae) {
            var ad = a.ui.ddmanager.current;
            if (!ad || (ad.currentItem || ad.element)[0] === this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (ad.currentItem || ad.element))) {
                if (this.options.hoverClass) {
                    this.element.addClass(this.options.hoverClass)
                }
                this._trigger("over", ae, this.ui(ad))
            }
        },
        _out: function (ae) {
            var ad = a.ui.ddmanager.current;
            if (!ad || (ad.currentItem || ad.element)[0] === this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (ad.currentItem || ad.element))) {
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("out", ae, this.ui(ad))
            }
        },
        _drop: function (ag, ae) {
            var af = ae || a.ui.ddmanager.current,
                ad = false;
            if (!af || (af.currentItem || af.element)[0] === this.element[0]) {
                return false
            }
            this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
                var ah = a(this).droppable("instance");
                if (ah.options.greedy && !ah.options.disabled && ah.options.scope === af.options.scope && ah.accept.call(ah.element[0], (af.currentItem || af.element)) && a.ui.intersect(af, a.extend(ah, {
                        offset: ah.element.offset()
                    }), ah.options.tolerance, ag)) {
                    ad = true;
                    return false
                }
            });
            if (ad) {
                return false
            }
            if (this.accept.call(this.element[0], (af.currentItem || af.element))) {
                if (this.options.activeClass) {
                    this.element.removeClass(this.options.activeClass)
                }
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("drop", ag, this.ui(af));
                return this.element
            }
            return false
        },
        ui: function (ad) {
            return {
                draggable: (ad.currentItem || ad.element),
                helper: ad.helper,
                position: ad.position,
                offset: ad.positionAbs
            }
        }
    });
    a.ui.intersect = (function () {
        function ad(ag, ae, af) {
            return (ag >= ae) && (ag < (ae + af))
        }
        return function (af, ag, al, ah) {
            if (!ag.offset) {
                return false
            }
            var am = (af.positionAbs || af.position.absolute).left + af.margins.left,
                ao = (af.positionAbs || af.position.absolute).top + af.margins.top,
                an = am + af.helperProportions.width,
                ap = ao + af.helperProportions.height,
                ai = ag.offset.left,
                ak = ag.offset.top,
                aj = ai + ag.proportions().width,
                ae = ak + ag.proportions().height;
            switch (al) {
                case "fit":
                    return (ai <= am && an <= aj && ak <= ao && ap <= ae);
                case "intersect":
                    return (ai < am + (af.helperProportions.width / 2) && an - (af.helperProportions.width / 2) < aj && ak < ao + (af.helperProportions.height / 2) && ap - (af.helperProportions.height / 2) < ae);
                case "pointer":
                    return ad(ah.pageY, ak, ag.proportions().height) && ad(ah.pageX, ai, ag.proportions().width);
                case "touch":
                    return ((ao >= ak && ao <= ae) || (ap >= ak && ap <= ae) || (ao < ak && ap > ae)) && ((am >= ai && am <= aj) || (an >= ai && an <= aj) || (am < ai && an > aj));
                default:
                    return false
            }
        }
    })();
    a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function (ai, ad) {
            var ae, af, ah = a.ui.ddmanager.droppables[ai.options.scope] || [],
                aj = ad ? ad.type : null,
                ag = (ai.currentItem || ai.element).find(":data(ui-droppable)").addBack();
            droppablesLoop: for (ae = 0; ae < ah.length; ae++) {
                if (ah[ae].options.disabled || (ai && !ah[ae].accept.call(ah[ae].element[0], (ai.currentItem || ai.element)))) {
                    continue
                }
                for (af = 0; af < ag.length; af++) {
                    if (ag[af] === ah[ae].element[0]) {
                        ah[ae].proportions().height = 0;
                        continue droppablesLoop
                    }
                }
                ah[ae].visible = ah[ae].element.css("display") !== "none";
                if (!ah[ae].visible) {
                    continue
                }
                if (aj === "mousedown") {
                    ah[ae]._activate.call(ah[ae], ad)
                }
                ah[ae].offset = ah[ae].element.offset();
                ah[ae].proportions({
                    width: ah[ae].element[0].offsetWidth,
                    height: ah[ae].element[0].offsetHeight
                })
            }
        },
        drop: function (ad, af) {
            var ae = false;
            a.each((a.ui.ddmanager.droppables[ad.options.scope] || []).slice(), function () {
                if (!this.options) {
                    return
                }
                if (!this.options.disabled && this.visible && a.ui.intersect(ad, this, this.options.tolerance, af)) {
                    ae = this._drop.call(this, af) || ae
                }
                if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (ad.currentItem || ad.element))) {
                    this.isout = true;
                    this.isover = false;
                    this._deactivate.call(this, af)
                }
            });
            return ae
        },
        dragStart: function (ad, ae) {
            ad.element.parentsUntil("body").bind("scroll.droppable", function () {
                if (!ad.options.refreshPositions) {
                    a.ui.ddmanager.prepareOffsets(ad, ae)
                }
            })
        },
        drag: function (ad, ae) {
            if (ad.options.refreshPositions) {
                a.ui.ddmanager.prepareOffsets(ad, ae)
            }
            a.each(a.ui.ddmanager.droppables[ad.options.scope] || [], function () {
                if (this.options.disabled || this.greedyChild || !this.visible) {
                    return
                }
                var ai, aj, ah, ag = a.ui.intersect(ad, this, this.options.tolerance, ae),
                    af = !ag && this.isover ? "isout" : (ag && !this.isover ? "isover" : null);
                if (!af) {
                    return
                }
                if (this.options.greedy) {
                    aj = this.options.scope;
                    ah = this.element.parents(":data(ui-droppable)").filter(function () {
                        return a(this).droppable("instance").options.scope === aj
                    });
                    if (ah.length) {
                        ai = a(ah[0]).droppable("instance");
                        ai.greedyChild = (af === "isover")
                    }
                }
                if (ai && af === "isover") {
                    ai.isover = false;
                    ai.isout = true;
                    ai._out.call(ai, ae)
                }
                this[af] = true;
                this[af === "isout" ? "isover" : "isout"] = false;
                this[af === "isover" ? "_over" : "_out"].call(this, ae);
                if (ai && af === "isout") {
                    ai.isout = false;
                    ai.isover = true;
                    ai._over.call(ai, ae)
                }
            })
        },
        dragStop: function (ad, ae) {
            ad.element.parentsUntil("body").unbind("scroll.droppable");
            if (!ad.options.refreshPositions) {
                a.ui.ddmanager.prepareOffsets(ad, ae)
            }
        }
    };
    var o = a.ui.droppable;
    /*
     * jQuery UI Effects 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/category/effects-core/
     */
    var e = "ui-effects-",
        H = a;
    a.effects = {
        effect: {}
    };
    /*
     * jQuery Color Animations v2.1.2
     * https://github.com/jquery/jquery-color
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * Date: Wed Jan 16 08:47:09 2013 -0600
     */
    (function (ai, ar) {
        var am = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
            ak = /^([\-+])=\s*(\d+\.?\d*)/,
            ao = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function (at) {
                    return [at[1], at[2], at[3], at[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function (at) {
                    return [at[1] * 2.55, at[2] * 2.55, at[3] * 2.55, at[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                parse: function (at) {
                    return [parseInt(at[1], 16), parseInt(at[2], 16), parseInt(at[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                parse: function (at) {
                    return [parseInt(at[1] + at[1], 16), parseInt(at[2] + at[2], 16), parseInt(at[3] + at[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function (at) {
                    return [at[1], at[2] / 100, at[3] / 100, at[4]]
                }
            }],
            ae = ai.Color = function (av, aw, au, at) {
                return new ai.Color.fn.parse(av, aw, au, at)
            },
            al = {
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
            aj = {
                "byte": {
                    floor: true,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: true
                }
            },
            ap = ae.support = {},
            aq = ai("<p>")[0],
            af, ag = ai.each;
        aq.style.cssText = "background-color:rgba(1,1,1,.5)";
        ap.rgba = aq.style.backgroundColor.indexOf("rgba") > -1;
        ag(al, function (au, at) {
            at.cache = "_" + au;
            at.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        });

        function ad(aw, au, at) {
            var av = aj[au.type] || {};
            if (aw == null) {
                return (at || !au.def) ? null : au.def
            }
            aw = av.floor ? ~~aw : parseFloat(aw);
            if (isNaN(aw)) {
                return au.def
            }
            if (av.mod) {
                return (aw + av.mod) % av.mod
            }
            return 0 > aw ? 0 : av.max < aw ? av.max : aw
        }

        function an(av) {
            var at = ae(),
                au = at._rgba = [];
            av = av.toLowerCase();
            ag(ao, function (aw, az) {
                var ay, ax = az.re.exec(av),
                    aB = ax && az.parse(ax),
                    aA = az.space || "rgba";
                if (aB) {
                    ay = at[aA](aB);
                    at[al[aA].cache] = ay[al[aA].cache];
                    au = at._rgba = ay._rgba;
                    return false
                }
            });
            if (au.length) {
                if (au.join() === "0,0,0,0") {
                    ai.extend(au, af.transparent)
                }
                return at
            }
            return af[av]
        }
        ae.fn = ai.extend(ae.prototype, {
            parse: function (ax, av, au, at) {
                if (ax === ar) {
                    this._rgba = [null, null, null, null];
                    return this
                }
                if (ax.jquery || ax.nodeType) {
                    ax = ai(ax).css(av);
                    av = ar
                }
                var aw = this,
                    az = ai.type(ax),
                    ay = this._rgba = [];
                if (av !== ar) {
                    ax = [ax, av, au, at];
                    az = "array"
                }
                if (az === "string") {
                    return this.parse(an(ax) || af._default)
                }
                if (az === "array") {
                    ag(al.rgba.props, function (aA, aB) {
                        ay[aB.idx] = ad(ax[aB.idx], aB)
                    });
                    return this
                }
                if (az === "object") {
                    if (ax instanceof ae) {
                        ag(al, function (aB, aA) {
                            if (ax[aA.cache]) {
                                aw[aA.cache] = ax[aA.cache].slice()
                            }
                        })
                    } else {
                        ag(al, function (aC, aB) {
                            var aA = aB.cache;
                            ag(aB.props, function (aD, aE) {
                                if (!aw[aA] && aB.to) {
                                    if (aD === "alpha" || ax[aD] == null) {
                                        return
                                    }
                                    aw[aA] = aB.to(aw._rgba)
                                }
                                aw[aA][aE.idx] = ad(ax[aD], aE, true)
                            });
                            if (aw[aA] && ai.inArray(null, aw[aA].slice(0, 3)) < 0) {
                                aw[aA][3] = 1;
                                if (aB.from) {
                                    aw._rgba = aB.from(aw[aA])
                                }
                            }
                        })
                    }
                    return this
                }
            },
            is: function (at) {
                var av = ae(at),
                    aw = true,
                    au = this;
                ag(al, function (ax, aA) {
                    var az, ay = av[aA.cache];
                    if (ay) {
                        az = au[aA.cache] || aA.to && aA.to(au._rgba) || [];
                        ag(aA.props, function (aB, aC) {
                            if (ay[aC.idx] != null) {
                                aw = (ay[aC.idx] === az[aC.idx]);
                                return aw
                            }
                        })
                    }
                    return aw
                });
                return aw
            },
            _space: function () {
                var au = [],
                    at = this;
                ag(al, function (aw, av) {
                    if (at[av.cache]) {
                        au.push(aw)
                    }
                });
                return au.pop()
            },
            transition: function (av, at) {
                var au = ae(av),
                    ay = au._space(),
                    ax = al[ay],
                    aA = this.alpha() === 0 ? ae("transparent") : this,
                    az = aA[ax.cache] || ax.to(aA._rgba),
                    aw = az.slice();
                au = au[ax.cache];
                ag(ax.props, function (aD, aE) {
                    var aC = aE.idx,
                        aF = az[aC],
                        aB = au[aC],
                        aG = aj[aE.type] || {};
                    if (aB === null) {
                        return
                    }
                    if (aF === null) {
                        aw[aC] = aB
                    } else {
                        if (aG.mod) {
                            if (aB - aF > aG.mod / 2) {
                                aF += aG.mod
                            } else {
                                if (aF - aB > aG.mod / 2) {
                                    aF -= aG.mod
                                }
                            }
                        }
                        aw[aC] = ad((aB - aF) * at + aF, aE)
                    }
                });
                return this[ay](aw)
            },
            blend: function (av) {
                if (this._rgba[3] === 1) {
                    return this
                }
                var aw = this._rgba.slice(),
                    at = aw.pop(),
                    au = ae(av)._rgba;
                return ae(ai.map(aw, function (ay, ax) {
                    return (1 - at) * au[ax] + at * ay
                }))
            },
            toRgbaString: function () {
                var at = "rgba(",
                    au = ai.map(this._rgba, function (aw, av) {
                        return aw == null ? (av > 2 ? 1 : 0) : aw
                    });
                if (au[3] === 1) {
                    au.pop();
                    at = "rgb("
                }
                return at + au.join() + ")"
            },
            toHslaString: function () {
                var au = "hsla(",
                    at = ai.map(this.hsla(), function (aw, av) {
                        if (aw == null) {
                            aw = av > 2 ? 1 : 0
                        }
                        if (av && av < 3) {
                            aw = Math.round(aw * 100) + "%"
                        }
                        return aw
                    });
                if (at[3] === 1) {
                    at.pop();
                    au = "hsl("
                }
                return au + at.join() + ")"
            },
            toHexString: function (au) {
                var av = this._rgba.slice(),
                    at = av.pop();
                if (au) {
                    av.push(~~(at * 255))
                }
                return "#" + ai.map(av, function (aw) {
                    aw = (aw || 0).toString(16);
                    return aw.length === 1 ? "0" + aw : aw
                }).join("")
            },
            toString: function () {
                return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
            }
        });
        ae.fn.parse.prototype = ae.fn;

        function ah(au, av, at) {
            at = (at + 1) % 1;
            if (at * 6 < 1) {
                return au + (av - au) * at * 6
            }
            if (at * 2 < 1) {
                return av
            }
            if (at * 3 < 2) {
                return au + (av - au) * ((2 / 3) - at) * 6
            }
            return au
        }
        al.hsla.to = function (aD) {
            if (aD[0] == null || aD[1] == null || aD[2] == null) {
                return [null, null, null, aD[3]]
            }
            var aC = aD[0] / 255,
                ax = aD[1] / 255,
                av = aD[2] / 255,
                at = aD[3],
                aA = Math.max(aC, ax, av),
                aB = Math.min(aC, ax, av),
                aw = aA - aB,
                au = aA + aB,
                az = au * 0.5,
                ay, aE;
            if (aB === aA) {
                ay = 0
            } else {
                if (aC === aA) {
                    ay = (60 * (ax - av) / aw) + 360
                } else {
                    if (ax === aA) {
                        ay = (60 * (av - aC) / aw) + 120
                    } else {
                        ay = (60 * (aC - ax) / aw) + 240
                    }
                }
            }
            if (aw === 0) {
                aE = 0
            } else {
                if (az <= 0.5) {
                    aE = aw / au
                } else {
                    aE = aw / (2 - au)
                }
            }
            return [Math.round(ay) % 360, aE, az, at == null ? 1 : at]
        };
        al.hsla.from = function (av) {
            if (av[0] == null || av[1] == null || av[2] == null) {
                return [null, null, null, av[3]]
            }
            var au = av[0] / 360,
                az = av[1],
                aw = av[2],
                at = av[3],
                ay = aw <= 0.5 ? aw * (1 + az) : aw + az - aw * az,
                ax = 2 * aw - ay;
            return [Math.round(ah(ax, ay, au + (1 / 3)) * 255), Math.round(ah(ax, ay, au) * 255), Math.round(ah(ax, ay, au - (1 / 3)) * 255), at]
        };
        ag(al, function (ax, aw) {
            var av = aw.props,
                at = aw.cache,
                ay = aw.to,
                au = aw.from;
            ae.fn[ax] = function (aD) {
                if (ay && !this[at]) {
                    this[at] = ay(this._rgba)
                }
                if (aD === ar) {
                    return this[at].slice()
                }
                var aB, aC = ai.type(aD),
                    az = (aC === "array" || aC === "object") ? aD : arguments,
                    aA = this[at].slice();
                ag(av, function (aE, aF) {
                    var aG = az[aC === "object" ? aE : aF.idx];
                    if (aG == null) {
                        aG = aA[aF.idx]
                    }
                    aA[aF.idx] = ad(aG, aF)
                });
                if (au) {
                    aB = ae(au(aA));
                    aB[at] = aA;
                    return aB
                } else {
                    return ae(aA)
                }
            };
            ag(av, function (az, aA) {
                if (ae.fn[az]) {
                    return
                }
                ae.fn[az] = function (aF) {
                    var aG = ai.type(aF),
                        aC = (az === "alpha" ? (this._hsla ? "hsla" : "rgba") : ax),
                        aD = this[aC](),
                        aB = aD[aA.idx],
                        aE;
                    if (aG === "undefined") {
                        return aB
                    }
                    if (aG === "function") {
                        aF = aF.call(this, aB);
                        aG = ai.type(aF)
                    }
                    if (aF == null && aA.empty) {
                        return this
                    }
                    if (aG === "string") {
                        aE = ak.exec(aF);
                        if (aE) {
                            aF = aB + parseFloat(aE[2]) * (aE[1] === "+" ? 1 : -1)
                        }
                    }
                    aD[aA.idx] = aF;
                    return this[aC](aD)
                }
            })
        });
        ae.hook = function (at) {
            var au = at.split(" ");
            ag(au, function (aw, av) {
                ai.cssHooks[av] = {
                    set: function (aA, aC) {
                        var aB, ay, ax = "";
                        if (aC !== "transparent" && (ai.type(aC) !== "string" || (aB = an(aC)))) {
                            aC = ae(aB || aC);
                            if (!ap.rgba && aC._rgba[3] !== 1) {
                                ay = av === "backgroundColor" ? aA.parentNode : aA;
                                while ((ax === "" || ax === "transparent") && ay && ay.style) {
                                    try {
                                        ax = ai.css(ay, "backgroundColor");
                                        ay = ay.parentNode
                                    } catch (az) {}
                                }
                                aC = aC.blend(ax && ax !== "transparent" ? ax : "_default")
                            }
                            aC = aC.toRgbaString()
                        }
                        try {
                            aA.style[av] = aC
                        } catch (az) {}
                    }
                };
                ai.fx.step[av] = function (ax) {
                    if (!ax.colorInit) {
                        ax.start = ae(ax.elem, av);
                        ax.end = ae(ax.end);
                        ax.colorInit = true
                    }
                    ai.cssHooks[av].set(ax.elem, ax.start.transition(ax.end, ax.pos))
                }
            })
        };
        ae.hook(am);
        ai.cssHooks.borderColor = {
            expand: function (au) {
                var at = {};
                ag(["Top", "Right", "Bottom", "Left"], function (av, aw) {
                    at["border" + aw + "Color"] = au
                });
                return at
            }
        };
        af = ai.Color.names = {
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
    })(H);
    (function () {
        var ad = ["add", "remove", "toggle"],
            af = {
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
        a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (ah, ai) {
            a.fx.step[ai] = function (aj) {
                if (aj.end !== "none" && !aj.setAttr || aj.pos === 1 && !aj.setAttr) {
                    H.style(aj.elem, ai, aj.end);
                    aj.setAttr = true
                }
            }
        });

        function ae(ah) {
            var ai, aj, ak = ah.ownerDocument.defaultView ? ah.ownerDocument.defaultView.getComputedStyle(ah, null) : ah.currentStyle,
                al = {};
            if (ak && ak.length && ak[0] && ak[ak[0]]) {
                aj = ak.length;
                while (aj--) {
                    ai = ak[aj];
                    if (typeof ak[ai] === "string") {
                        al[a.camelCase(ai)] = ak[ai]
                    }
                }
            } else {
                for (ai in ak) {
                    if (typeof ak[ai] === "string") {
                        al[ai] = ak[ai]
                    }
                }
            }
            return al
        }

        function ag(ak, aj) {
            var ah = {},
                ai, al;
            for (ai in aj) {
                al = aj[ai];
                if (ak[ai] !== al) {
                    if (!af[ai]) {
                        if (a.fx.step[ai] || !isNaN(parseFloat(al))) {
                            ah[ai] = al
                        }
                    }
                }
            }
            return ah
        }
        if (!a.fn.addBack) {
            a.fn.addBack = function (ah) {
                return this.add(ah == null ? this.prevObject : this.prevObject.filter(ah))
            }
        }
        a.effects.animateClass = function (al, ai, aj, ah) {
            var ak = a.speed(ai, aj, ah);
            return this.queue(function () {
                var an = a(this),
                    ap = an.attr("class") || "",
                    ao, am = ak.children ? an.find("*").addBack() : an;
                am = am.map(function () {
                    var aq = a(this);
                    return {
                        el: aq,
                        start: ae(this)
                    }
                });
                ao = function () {
                    a.each(ad, function (ar, aq) {
                        if (al[aq]) {
                            an[aq + "Class"](al[aq])
                        }
                    })
                };
                ao();
                am = am.map(function () {
                    this.end = ae(this.el[0]);
                    this.diff = ag(this.start, this.end);
                    return this
                });
                an.attr("class", ap);
                am = am.map(function () {
                    var at = this,
                        aq = a.Deferred(),
                        ar = a.extend({}, ak, {
                            queue: false,
                            complete: function () {
                                aq.resolve(at)
                            }
                        });
                    this.el.animate(this.diff, ar);
                    return aq.promise()
                });
                a.when.apply(a, am.get()).done(function () {
                    ao();
                    a.each(arguments, function () {
                        var aq = this.el;
                        a.each(this.diff, function (ar) {
                            aq.css(ar, "")
                        })
                    });
                    ak.complete.call(an[0])
                })
            })
        };
        a.fn.extend({
            addClass: (function (ah) {
                return function (aj, al, ak, ai) {
                    return al ? a.effects.animateClass.call(this, {
                        add: aj
                    }, al, ak, ai) : ah.apply(this, arguments)
                }
            })(a.fn.addClass),
            removeClass: (function (ah) {
                return function (aj, al, ak, ai) {
                    return arguments.length > 1 ? a.effects.animateClass.call(this, {
                        remove: aj
                    }, al, ak, ai) : ah.apply(this, arguments)
                }
            })(a.fn.removeClass),
            toggleClass: (function (ah) {
                return function (aj, al, am, ak, ai) {
                    if (typeof al === "boolean" || al === undefined) {
                        if (!am) {
                            return ah.apply(this, arguments)
                        } else {
                            return a.effects.animateClass.call(this, (al ? {
                                add: aj
                            } : {
                                remove: aj
                            }), am, ak, ai)
                        }
                    } else {
                        return a.effects.animateClass.call(this, {
                            toggle: aj
                        }, al, am, ak)
                    }
                }
            })(a.fn.toggleClass),
            switchClass: function (ak, ah, al, aj, ai) {
                return a.effects.animateClass.call(this, {
                    add: ah,
                    remove: ak
                }, al, aj, ai)
            }
        })
    })();
    (function () {
        a.extend(a.effects, {
            version: "1.11.4",
            save: function (af, ah) {
                for (var ag = 0; ag < ah.length; ag++) {
                    if (ah[ag] !== null) {
                        af.data(e + ah[ag], af[0].style[ah[ag]])
                    }
                }
            },
            restore: function (af, ah) {
                var ai, ag;
                for (ag = 0; ag < ah.length; ag++) {
                    if (ah[ag] !== null) {
                        ai = af.data(e + ah[ag]);
                        if (ai === undefined) {
                            ai = ""
                        }
                        af.css(ah[ag], ai)
                    }
                }
            },
            setMode: function (af, ag) {
                if (ag === "toggle") {
                    ag = af.is(":hidden") ? "show" : "hide"
                }
                return ag
            },
            getBaseline: function (af, ag) {
                var ai, ah;
                switch (af[0]) {
                    case "top":
                        ai = 0;
                        break;
                    case "middle":
                        ai = 0.5;
                        break;
                    case "bottom":
                        ai = 1;
                        break;
                    default:
                        ai = af[0] / ag.height
                }
                switch (af[1]) {
                    case "left":
                        ah = 0;
                        break;
                    case "center":
                        ah = 0.5;
                        break;
                    case "right":
                        ah = 1;
                        break;
                    default:
                        ah = af[1] / ag.width
                }
                return {
                    x: ah,
                    y: ai
                }
            },
            createWrapper: function (ah) {
                if (ah.parent().is(".ui-effects-wrapper")) {
                    return ah.parent()
                }
                var ai = {
                        width: ah.outerWidth(true),
                        height: ah.outerHeight(true),
                        "float": ah.css("float")
                    },
                    ak = a("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }),
                    aj = {
                        width: ah.width(),
                        height: ah.height()
                    },
                    af = document.activeElement;
                try {
                    af.id
                } catch (ag) {
                    af = document.body
                }
                ah.wrap(ak);
                if (ah[0] === af || a.contains(ah[0], af)) {
                    a(af).focus()
                }
                ak = ah.parent();
                if (ah.css("position") === "static") {
                    ak.css({
                        position: "relative"
                    });
                    ah.css({
                        position: "relative"
                    })
                } else {
                    a.extend(ai, {
                        position: ah.css("position"),
                        zIndex: ah.css("z-index")
                    });
                    a.each(["top", "left", "bottom", "right"], function (al, am) {
                        ai[am] = ah.css(am);
                        if (isNaN(parseInt(ai[am], 10))) {
                            ai[am] = "auto"
                        }
                    });
                    ah.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })
                }
                ah.css(aj);
                return ak.css(ai).show()
            },
            removeWrapper: function (ag) {
                var af = document.activeElement;
                if (ag.parent().is(".ui-effects-wrapper")) {
                    ag.parent().replaceWith(ag);
                    if (ag[0] === af || a.contains(ag[0], af)) {
                        a(af).focus()
                    }
                }
                return ag
            },
            setTransition: function (af, ah, ag, ai) {
                ai = ai || {};
                a.each(ah, function (aj, al) {
                    var ak = af.cssUnit(al);
                    if (ak[0] > 0) {
                        ai[al] = ak[0] * ag + ak[1]
                    }
                });
                return ai
            }
        });

        function ad(ag, ah, ai, af) {
            if (a.isPlainObject(ag)) {
                ah = ag;
                ag = ag.effect
            }
            ag = {
                effect: ag
            };
            if (ah == null) {
                ah = {}
            }
            if (a.isFunction(ah)) {
                af = ah;
                ai = null;
                ah = {}
            }
            if (typeof ah === "number" || a.fx.speeds[ah]) {
                af = ai;
                ai = ah;
                ah = {}
            }
            if (a.isFunction(ai)) {
                af = ai;
                ai = null
            }
            if (ah) {
                a.extend(ag, ah)
            }
            ai = ai || ah.duration;
            ag.duration = a.fx.off ? 0 : typeof ai === "number" ? ai : ai in a.fx.speeds ? a.fx.speeds[ai] : a.fx.speeds._default;
            ag.complete = af || ah.complete;
            return ag
        }

        function ae(af) {
            if (!af || typeof af === "number" || a.fx.speeds[af]) {
                return true
            }
            if (typeof af === "string" && !a.effects.effect[af]) {
                return true
            }
            if (a.isFunction(af)) {
                return true
            }
            if (typeof af === "object" && !af.effect) {
                return true
            }
            return false
        }
        a.fn.extend({
            effect: function () {
                var af = ad.apply(this, arguments),
                    ah = af.mode,
                    ai = af.queue,
                    ag = a.effects.effect[af.effect];
                if (a.fx.off || !ag) {
                    if (ah) {
                        return this[ah](af.duration, af.complete)
                    } else {
                        return this.each(function () {
                            if (af.complete) {
                                af.complete.call(this)
                            }
                        })
                    }
                }

                function aj(ao) {
                    var am = a(this),
                        ak = af.complete,
                        an = af.mode;

                    function al() {
                        if (a.isFunction(ak)) {
                            ak.call(am[0])
                        }
                        if (a.isFunction(ao)) {
                            ao()
                        }
                    }
                    if (am.is(":hidden") ? an === "hide" : an === "show") {
                        am[an]();
                        al()
                    } else {
                        ag.call(am[0], af, al)
                    }
                }
                return ai === false ? this.each(aj) : this.queue(ai || "fx", aj)
            },
            show: (function (af) {
                return function (ah) {
                    if (ae(ah)) {
                        return af.apply(this, arguments)
                    } else {
                        var ag = ad.apply(this, arguments);
                        ag.mode = "show";
                        return this.effect.call(this, ag)
                    }
                }
            })(a.fn.show),
            hide: (function (af) {
                return function (ah) {
                    if (ae(ah)) {
                        return af.apply(this, arguments)
                    } else {
                        var ag = ad.apply(this, arguments);
                        ag.mode = "hide";
                        return this.effect.call(this, ag)
                    }
                }
            })(a.fn.hide),
            toggle: (function (af) {
                return function (ah) {
                    if (ae(ah) || typeof ah === "boolean") {
                        return af.apply(this, arguments)
                    } else {
                        var ag = ad.apply(this, arguments);
                        ag.mode = "toggle";
                        return this.effect.call(this, ag)
                    }
                }
            })(a.fn.toggle),
            cssUnit: function (af) {
                var ag = this.css(af),
                    ah = [];
                a.each(["em", "px", "%", "pt"], function (ai, aj) {
                    if (ag.indexOf(aj) > 0) {
                        ah = [parseFloat(ag), aj]
                    }
                });
                return ah
            }
        })
    })();
    (function () {
        var ad = {};
        a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (ae, af) {
            ad[af] = function (ag) {
                return Math.pow(ag, ae + 2)
            }
        });
        a.extend(ad, {
            Sine: function (ae) {
                return 1 - Math.cos(ae * Math.PI / 2)
            },
            Circ: function (ae) {
                return 1 - Math.sqrt(1 - ae * ae)
            },
            Elastic: function (ae) {
                return ae === 0 || ae === 1 ? ae : -Math.pow(2, 8 * (ae - 1)) * Math.sin(((ae - 1) * 80 - 7.5) * Math.PI / 15)
            },
            Back: function (ae) {
                return ae * ae * (3 * ae - 2)
            },
            Bounce: function (af) {
                var ag, ae = 4;
                while (af < ((ag = Math.pow(2, --ae)) - 1) / 11) {}
                return 1 / Math.pow(4, 3 - ae) - 7.5625 * Math.pow((ag * 3 - 2) / 22 - af, 2)
            }
        });
        a.each(ad, function (af, ae) {
            a.easing["easeIn" + af] = ae;
            a.easing["easeOut" + af] = function (ag) {
                return 1 - ae(1 - ag)
            };
            a.easing["easeInOut" + af] = function (ag) {
                return ag < 0.5 ? ae(ag * 2) / 2 : 1 - ae(ag * -2 + 2) / 2
            }
        })
    })();
    var p = a.effects;
    /*
     * jQuery UI Effects Blind 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/blind-effect/
     */
    var q = a.effects.effect.blind = function (al, ag) {
        var ah = a(this),
            aq = /up|down|vertical/,
            ap = /up|left|vertical|horizontal/,
            am = ["position", "top", "bottom", "left", "right", "height", "width"],
            aj = a.effects.setMode(ah, al.mode || "hide"),
            ae = al.direction || "up",
            at = aq.test(ae),
            an = at ? "height" : "width",
            ao = at ? "top" : "left",
            ak = ap.test(ae),
            ad = {},
            ar = aj === "show",
            au, af, ai;
        if (ah.parent().is(".ui-effects-wrapper")) {
            a.effects.save(ah.parent(), am)
        } else {
            a.effects.save(ah, am)
        }
        ah.show();
        au = a.effects.createWrapper(ah).css({
            overflow: "hidden"
        });
        af = au[an]();
        ai = parseFloat(au.css(ao)) || 0;
        ad[an] = ar ? af : 0;
        if (!ak) {
            ah.css(at ? "bottom" : "right", 0).css(at ? "top" : "left", "auto").css({
                position: "absolute"
            });
            ad[ao] = ar ? ai : af + ai
        }
        if (ar) {
            au.css(an, 0);
            if (!ak) {
                au.css(ao, ai + af)
            }
        }
        au.animate(ad, {
            duration: al.duration,
            easing: al.easing,
            queue: false,
            complete: function () {
                if (aj === "hide") {
                    ah.hide()
                }
                a.effects.restore(ah, am);
                a.effects.removeWrapper(ah);
                ag()
            }
        })
    };
    /*
     * jQuery UI Effects Bounce 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/bounce-effect/
     */
    var r = a.effects.effect.bounce = function (ao, ag) {
        var aj = a(this),
            ap = ["position", "top", "bottom", "left", "right", "height", "width"],
            am = a.effects.setMode(aj, ao.mode || "effect"),
            ak = am === "hide",
            au = am === "show",
            ae = ao.direction || "up",
            af = ao.distance,
            aw = ao.times || 5,
            ad = aw * 2 + (au || ak ? 1 : 0),
            av = ao.duration / ad,
            ai = ao.easing,
            at = (ae === "up" || ae === "down") ? "top" : "left",
            an = (ae === "up" || ae === "left"),
            al, ax, ah, aq = aj.queue(),
            ar = aq.length;
        if (au || ak) {
            ap.push("opacity")
        }
        a.effects.save(aj, ap);
        aj.show();
        a.effects.createWrapper(aj);
        if (!af) {
            af = aj[at === "top" ? "outerHeight" : "outerWidth"]() / 3
        }
        if (au) {
            ah = {
                opacity: 1
            };
            ah[at] = 0;
            aj.css("opacity", 0).css(at, an ? -af * 2 : af * 2).animate(ah, av, ai)
        }
        if (ak) {
            af = af / Math.pow(2, aw - 1)
        }
        ah = {};
        ah[at] = 0;
        for (al = 0; al < aw; al++) {
            ax = {};
            ax[at] = (an ? "-=" : "+=") + af;
            aj.animate(ax, av, ai).animate(ah, av, ai);
            af = ak ? af * 2 : af / 2
        }
        if (ak) {
            ax = {
                opacity: 0
            };
            ax[at] = (an ? "-=" : "+=") + af;
            aj.animate(ax, av, ai)
        }
        aj.queue(function () {
            if (ak) {
                aj.hide()
            }
            a.effects.restore(aj, ap);
            a.effects.removeWrapper(aj);
            ag()
        });
        if (ar > 1) {
            aq.splice.apply(aq, [1, 0].concat(aq.splice(ar, ad + 1)))
        }
        aj.dequeue()
    };
    /*
     * jQuery UI Effects Clip 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/clip-effect/
     */
    var s = a.effects.effect.clip = function (ak, ah) {
        var ai = a(this),
            am = ["position", "top", "bottom", "left", "right", "height", "width"],
            aj = a.effects.setMode(ai, ak.mode || "hide"),
            an = aj === "show",
            af = ak.direction || "vertical",
            ap = af === "vertical",
            ao = ap ? "height" : "width",
            al = ap ? "top" : "left",
            ae = {},
            aq, ad, ag;
        a.effects.save(ai, am);
        ai.show();
        aq = a.effects.createWrapper(ai).css({
            overflow: "hidden"
        });
        ad = (ai[0].tagName === "IMG") ? aq : ai;
        ag = ad[ao]();
        if (an) {
            ad.css(ao, 0);
            ad.css(al, ag / 2)
        }
        ae[ao] = an ? ag : 0;
        ae[al] = an ? 0 : ag / 2;
        ad.animate(ae, {
            queue: false,
            duration: ak.duration,
            easing: ak.easing,
            complete: function () {
                if (!an) {
                    ai.hide()
                }
                a.effects.restore(ai, am);
                a.effects.removeWrapper(ai);
                ah()
            }
        })
    };
    /*
     * jQuery UI Effects Drop 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/drop-effect/
     */
    var t = a.effects.effect.drop = function (ak, ag) {
        var ah = a(this),
            al = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
            ai = a.effects.setMode(ah, ak.mode || "hide"),
            an = ai === "show",
            ae = ak.direction || "left",
            am = (ae === "up" || ae === "down") ? "top" : "left",
            aj = (ae === "up" || ae === "left") ? "pos" : "neg",
            ad = {
                opacity: an ? 1 : 0
            },
            af;
        a.effects.save(ah, al);
        ah.show();
        a.effects.createWrapper(ah);
        af = ak.distance || ah[am === "top" ? "outerHeight" : "outerWidth"](true) / 2;
        if (an) {
            ah.css("opacity", 0).css(am, aj === "pos" ? -af : af)
        }
        ad[am] = (an ? (aj === "pos" ? "+=" : "-=") : (aj === "pos" ? "-=" : "+=")) + af;
        ah.animate(ad, {
            queue: false,
            duration: ak.duration,
            easing: ak.easing,
            complete: function () {
                if (ai === "hide") {
                    ah.hide()
                }
                a.effects.restore(ah, al);
                a.effects.removeWrapper(ah);
                ag()
            }
        })
    };
    /*
     * jQuery UI Effects Explode 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/explode-effect/
     */
    var u = a.effects.effect.explode = function (ap, ag) {
        var at = ap.pieces ? Math.round(Math.sqrt(ap.pieces)) : 3,
            ae = at,
            ah = a(this),
            am = a.effects.setMode(ah, ap.mode || "hide"),
            au = am === "show",
            aq = ah.show().css("visibility", "hidden").offset(),
            aw = Math.ceil(ah.outerWidth() / ae),
            ai = Math.ceil(ah.outerHeight() / at),
            ar = [],
            aj, ak, al, av, an, ao;

        function af() {
            ar.push(this);
            if (ar.length === at * ae) {
                ad()
            }
        }
        for (aj = 0; aj < at; aj++) {
            av = aq.top + aj * ai;
            ao = aj - (at - 1) / 2;
            for (ak = 0; ak < ae; ak++) {
                al = aq.left + ak * aw;
                an = ak - (ae - 1) / 2;
                ah.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -ak * aw,
                    top: -aj * ai
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: aw,
                    height: ai,
                    left: al + (au ? an * aw : 0),
                    top: av + (au ? ao * ai : 0),
                    opacity: au ? 0 : 1
                }).animate({
                    left: al + (au ? 0 : an * aw),
                    top: av + (au ? 0 : ao * ai),
                    opacity: au ? 1 : 0
                }, ap.duration || 500, ap.easing, af)
            }
        }

        function ad() {
            ah.css({
                visibility: "visible"
            });
            a(ar).remove();
            if (!au) {
                ah.hide()
            }
            ag()
        }
    };
    /*
     * jQuery UI Effects Fade 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/fade-effect/
     */
    var v = a.effects.effect.fade = function (ag, ad) {
        var ae = a(this),
            af = a.effects.setMode(ae, ag.mode || "toggle");
        ae.animate({
            opacity: af
        }, {
            queue: false,
            duration: ag.duration,
            easing: ag.easing,
            complete: ad
        })
    };
    /*
     * jQuery UI Effects Fold 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/fold-effect/
     */
    var w = a.effects.effect.fold = function (am, ag) {
        var ai = a(this),
            ao = ["position", "top", "bottom", "left", "right", "height", "width"],
            al = a.effects.setMode(ai, am.mode || "hide"),
            aq = al === "show",
            aj = al === "hide",
            ar = am.size || 15,
            an = /([0-9]+)%/.exec(ar),
            ak = !!am.horizFirst,
            at = aq !== ak,
            ap = at ? ["width", "height"] : ["height", "width"],
            ah = am.duration / 2,
            au, af, ad = {},
            ae = {};
        a.effects.save(ai, ao);
        ai.show();
        au = a.effects.createWrapper(ai).css({
            overflow: "hidden"
        });
        af = at ? [au.width(), au.height()] : [au.height(), au.width()];
        if (an) {
            ar = parseInt(an[1], 10) / 100 * af[aj ? 0 : 1]
        }
        if (aq) {
            au.css(ak ? {
                height: 0,
                width: ar
            } : {
                height: ar,
                width: 0
            })
        }
        ad[ap[0]] = aq ? af[0] : ar;
        ae[ap[1]] = aq ? af[1] : 0;
        au.animate(ad, ah, am.easing).animate(ae, ah, am.easing, function () {
            if (aj) {
                ai.hide()
            }
            a.effects.restore(ai, ao);
            a.effects.removeWrapper(ai);
            ag()
        })
    };
    /*
     * jQuery UI Effects Highlight 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/highlight-effect/
     */
    var x = a.effects.effect.highlight = function (ah, ae) {
        var af = a(this),
            ai = ["backgroundImage", "backgroundColor", "opacity"],
            ag = a.effects.setMode(af, ah.mode || "show"),
            ad = {
                backgroundColor: af.css("backgroundColor")
            };
        if (ag === "hide") {
            ad.opacity = 0
        }
        a.effects.save(af, ai);
        af.show().css({
            backgroundImage: "none",
            backgroundColor: ah.color || "#ffff99"
        }).animate(ad, {
            queue: false,
            duration: ah.duration,
            easing: ah.easing,
            complete: function () {
                if (ag === "hide") {
                    af.hide()
                }
                a.effects.restore(af, ai);
                ae()
            }
        })
    };
    /*
     * jQuery UI Effects Size 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/size-effect/
     */
    var C = a.effects.effect.size = function (ak, af) {
        var am, ad, ah, ag = a(this),
            ap = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
            aq = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
            ar = ["width", "height", "overflow"],
            ae = ["fontSize"],
            av = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            ai = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            aj = a.effects.setMode(ag, ak.mode || "effect"),
            at = ak.restore || aj !== "effect",
            au = ak.scale || "both",
            al = ak.origin || ["middle", "center"],
            an = ag.css("position"),
            ao = at ? ap : aq,
            aw = {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            };
        if (aj === "show") {
            ag.show()
        }
        am = {
            height: ag.height(),
            width: ag.width(),
            outerHeight: ag.outerHeight(),
            outerWidth: ag.outerWidth()
        };
        if (ak.mode === "toggle" && aj === "show") {
            ag.from = ak.to || aw;
            ag.to = ak.from || am
        } else {
            ag.from = ak.from || (aj === "show" ? aw : am);
            ag.to = ak.to || (aj === "hide" ? aw : am)
        }
        ah = {
            from: {
                y: ag.from.height / am.height,
                x: ag.from.width / am.width
            },
            to: {
                y: ag.to.height / am.height,
                x: ag.to.width / am.width
            }
        };
        if (au === "box" || au === "both") {
            if (ah.from.y !== ah.to.y) {
                ao = ao.concat(av);
                ag.from = a.effects.setTransition(ag, av, ah.from.y, ag.from);
                ag.to = a.effects.setTransition(ag, av, ah.to.y, ag.to)
            }
            if (ah.from.x !== ah.to.x) {
                ao = ao.concat(ai);
                ag.from = a.effects.setTransition(ag, ai, ah.from.x, ag.from);
                ag.to = a.effects.setTransition(ag, ai, ah.to.x, ag.to)
            }
        }
        if (au === "content" || au === "both") {
            if (ah.from.y !== ah.to.y) {
                ao = ao.concat(ae).concat(ar);
                ag.from = a.effects.setTransition(ag, ae, ah.from.y, ag.from);
                ag.to = a.effects.setTransition(ag, ae, ah.to.y, ag.to)
            }
        }
        a.effects.save(ag, ao);
        ag.show();
        a.effects.createWrapper(ag);
        ag.css("overflow", "hidden").css(ag.from);
        if (al) {
            ad = a.effects.getBaseline(al, am);
            ag.from.top = (am.outerHeight - ag.outerHeight()) * ad.y;
            ag.from.left = (am.outerWidth - ag.outerWidth()) * ad.x;
            ag.to.top = (am.outerHeight - ag.to.outerHeight) * ad.y;
            ag.to.left = (am.outerWidth - ag.to.outerWidth) * ad.x
        }
        ag.css(ag.from);
        if (au === "content" || au === "both") {
            av = av.concat(["marginTop", "marginBottom"]).concat(ae);
            ai = ai.concat(["marginLeft", "marginRight"]);
            ar = ap.concat(av).concat(ai);
            ag.find("*[width]").each(function () {
                var ay = a(this),
                    ax = {
                        height: ay.height(),
                        width: ay.width(),
                        outerHeight: ay.outerHeight(),
                        outerWidth: ay.outerWidth()
                    };
                if (at) {
                    a.effects.save(ay, ar)
                }
                ay.from = {
                    height: ax.height * ah.from.y,
                    width: ax.width * ah.from.x,
                    outerHeight: ax.outerHeight * ah.from.y,
                    outerWidth: ax.outerWidth * ah.from.x
                };
                ay.to = {
                    height: ax.height * ah.to.y,
                    width: ax.width * ah.to.x,
                    outerHeight: ax.height * ah.to.y,
                    outerWidth: ax.width * ah.to.x
                };
                if (ah.from.y !== ah.to.y) {
                    ay.from = a.effects.setTransition(ay, av, ah.from.y, ay.from);
                    ay.to = a.effects.setTransition(ay, av, ah.to.y, ay.to)
                }
                if (ah.from.x !== ah.to.x) {
                    ay.from = a.effects.setTransition(ay, ai, ah.from.x, ay.from);
                    ay.to = a.effects.setTransition(ay, ai, ah.to.x, ay.to)
                }
                ay.css(ay.from);
                ay.animate(ay.to, ak.duration, ak.easing, function () {
                    if (at) {
                        a.effects.restore(ay, ar)
                    }
                })
            })
        }
        ag.animate(ag.to, {
            queue: false,
            duration: ak.duration,
            easing: ak.easing,
            complete: function () {
                if (ag.to.opacity === 0) {
                    ag.css("opacity", ag.from.opacity)
                }
                if (aj === "hide") {
                    ag.hide()
                }
                a.effects.restore(ag, ao);
                if (!at) {
                    if (an === "static") {
                        ag.css({
                            position: "relative",
                            top: ag.to.top,
                            left: ag.to.left
                        })
                    } else {
                        a.each(["top", "left"], function (ax, ay) {
                            ag.css(ay, function (az, aA) {
                                var aC = parseInt(aA, 10),
                                    aB = ax ? ag.to.left : ag.to.top;
                                if (aA === "auto") {
                                    return aB + "px"
                                }
                                return aC + aB + "px"
                            })
                        })
                    }
                }
                a.effects.removeWrapper(ag);
                af()
            }
        })
    };
    /*
     * jQuery UI Effects Scale 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/scale-effect/
     */
    var A = a.effects.effect.scale = function (ai, ae) {
        var af = a(this),
            aj = a.extend(true, {}, ai),
            ah = a.effects.setMode(af, ai.mode || "effect"),
            am = parseInt(ai.percent, 10) || (parseInt(ai.percent, 10) === 0 ? 0 : (ah === "hide" ? 0 : 100)),
            ad = ai.direction || "both",
            ak = ai.origin,
            al = {
                height: af.height(),
                width: af.width(),
                outerHeight: af.outerHeight(),
                outerWidth: af.outerWidth()
            },
            ag = {
                y: ad !== "horizontal" ? (am / 100) : 1,
                x: ad !== "vertical" ? (am / 100) : 1
            };
        aj.effect = "size";
        aj.queue = false;
        aj.complete = ae;
        if (ah !== "effect") {
            aj.origin = ak || ["middle", "center"];
            aj.restore = true
        }
        aj.from = ai.from || (ah === "show" ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        } : al);
        aj.to = {
            height: al.height * ag.y,
            width: al.width * ag.x,
            outerHeight: al.outerHeight * ag.y,
            outerWidth: al.outerWidth * ag.x
        };
        if (aj.fade) {
            if (ah === "show") {
                aj.from.opacity = 0;
                aj.to.opacity = 1
            }
            if (ah === "hide") {
                aj.from.opacity = 1;
                aj.to.opacity = 0
            }
        }
        af.effect(aj)
    };
    /*
     * jQuery UI Effects Puff 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/puff-effect/
     */
    var y = a.effects.effect.puff = function (ai, ad) {
        var ae = a(this),
            ah = a.effects.setMode(ae, ai.mode || "hide"),
            ag = ah === "hide",
            ak = parseInt(ai.percent, 10) || 150,
            af = ak / 100,
            aj = {
                height: ae.height(),
                width: ae.width(),
                outerHeight: ae.outerHeight(),
                outerWidth: ae.outerWidth()
            };
        a.extend(ai, {
            effect: "scale",
            queue: false,
            fade: true,
            mode: ah,
            complete: ad,
            percent: ag ? ak : 100,
            from: ag ? aj : {
                height: aj.height * af,
                width: aj.width * af,
                outerHeight: aj.outerHeight * af,
                outerWidth: aj.outerWidth * af
            }
        });
        ae.effect(ai)
    };
    /*
     * jQuery UI Effects Pulsate 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/pulsate-effect/
     */
    var z = a.effects.effect.pulsate = function (al, af) {
        var ah = a(this),
            ak = a.effects.setMode(ah, al.mode || "show"),
            ao = ak === "show",
            ai = ak === "hide",
            ap = (ao || ak === "hide"),
            ae = ((al.times || 5) * 2) + (ap ? 1 : 0),
            ag = al.duration / ae,
            ad = 0,
            am = ah.queue(),
            an = am.length,
            aj;
        if (ao || !ah.is(":visible")) {
            ah.css("opacity", 0).show();
            ad = 1
        }
        for (aj = 1; aj < ae; aj++) {
            ah.animate({
                opacity: ad
            }, ag, al.easing);
            ad = 1 - ad
        }
        ah.animate({
            opacity: ad
        }, ag, al.easing);
        ah.queue(function () {
            if (ai) {
                ah.hide()
            }
            af()
        });
        if (an > 1) {
            am.splice.apply(am, [1, 0].concat(am.splice(an, ae + 1)))
        }
        ah.dequeue()
    };
    /*
     * jQuery UI Effects Shake 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/shake-effect/
     */
    var B = a.effects.effect.shake = function (an, aj) {
        var ak = a(this),
            ap = ["position", "top", "bottom", "left", "right", "height", "width"],
            am = a.effects.setMode(ak, an.mode || "effect"),
            ah = an.direction || "left",
            ai = an.distance || 20,
            av = an.times || 3,
            ag = av * 2 + 1,
            au = Math.round(an.duration / ag),
            at = (ah === "up" || ah === "down") ? "top" : "left",
            ao = (ah === "up" || ah === "left"),
            ad = {},
            ae = {},
            af = {},
            al, aq = ak.queue(),
            ar = aq.length;
        a.effects.save(ak, ap);
        ak.show();
        a.effects.createWrapper(ak);
        ad[at] = (ao ? "-=" : "+=") + ai;
        ae[at] = (ao ? "+=" : "-=") + ai * 2;
        af[at] = (ao ? "-=" : "+=") + ai * 2;
        ak.animate(ad, au, an.easing);
        for (al = 1; al < av; al++) {
            ak.animate(ae, au, an.easing).animate(af, au, an.easing)
        }
        ak.animate(ae, au, an.easing).animate(ad, au / 2, an.easing).queue(function () {
            if (am === "hide") {
                ak.hide()
            }
            a.effects.restore(ak, ap);
            a.effects.removeWrapper(ak);
            aj()
        });
        if (ar > 1) {
            aq.splice.apply(aq, [1, 0].concat(aq.splice(ar, ag + 1)))
        }
        ak.dequeue()
    };
    /*
     * jQuery UI Effects Slide 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/slide-effect/
     */
    var D = a.effects.effect.slide = function (aj, ag) {
        var ah = a(this),
            al = ["position", "top", "bottom", "left", "right", "width", "height"],
            ai = a.effects.setMode(ah, aj.mode || "show"),
            an = ai === "show",
            ae = aj.direction || "left",
            am = (ae === "up" || ae === "down") ? "top" : "left",
            ak = (ae === "up" || ae === "left"),
            af, ad = {};
        a.effects.save(ah, al);
        ah.show();
        af = aj.distance || ah[am === "top" ? "outerHeight" : "outerWidth"](true);
        a.effects.createWrapper(ah).css({
            overflow: "hidden"
        });
        if (an) {
            ah.css(am, ak ? (isNaN(af) ? "-" + af : -af) : af)
        }
        ad[am] = (an ? (ak ? "+=" : "-=") : (ak ? "-=" : "+=")) + af;
        ah.animate(ad, {
            queue: false,
            duration: aj.duration,
            easing: aj.easing,
            complete: function () {
                if (ai === "hide") {
                    ah.hide()
                }
                a.effects.restore(ah, al);
                a.effects.removeWrapper(ah);
                ag()
            }
        })
    };
    /*
     * jQuery UI Effects Transfer 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/transfer-effect/
     */
    var E = a.effects.effect.transfer = function (ak, af) {
        var ag = a(this),
            am = a(ak.to),
            an = am.css("position") === "fixed",
            ae = a("body"),
            aj = an ? ae.scrollTop() : 0,
            ai = an ? ae.scrollLeft() : 0,
            ah = am.offset(),
            ad = {
                top: ah.top - aj,
                left: ah.left - ai,
                height: am.innerHeight(),
                width: am.innerWidth()
            },
            al = ag.offset(),
            ao = a("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(ak.className).css({
                top: al.top - aj,
                left: al.left - ai,
                height: ag.innerHeight(),
                width: ag.innerWidth(),
                position: an ? "fixed" : "absolute"
            }).animate(ad, ak.duration, ak.easing, function () {
                ao.remove();
                af()
            })
    };
    /*
     * jQuery UI Progressbar 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/progressbar/
     */
    var N = a.widget("ui.progressbar", {
        version: "1.11.4",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function () {
            this.oldValue = this.options.value = this._constrainedValue();
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            });
            this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this._refreshValue()
        },
        _destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove()
        },
        value: function (ad) {
            if (ad === undefined) {
                return this.options.value
            }
            this.options.value = this._constrainedValue(ad);
            this._refreshValue()
        },
        _constrainedValue: function (ad) {
            if (ad === undefined) {
                ad = this.options.value
            }
            this.indeterminate = ad === false;
            if (typeof ad !== "number") {
                ad = 0
            }
            return this.indeterminate ? false : Math.min(this.options.max, Math.max(this.min, ad))
        },
        _setOptions: function (ad) {
            var ae = ad.value;
            delete ad.value;
            this._super(ad);
            this.options.value = this._constrainedValue(ae);
            this._refreshValue()
        },
        _setOption: function (ad, ae) {
            if (ad === "max") {
                ae = Math.max(this.min, ae)
            }
            if (ad === "disabled") {
                this.element.toggleClass("ui-state-disabled", !!ae).attr("aria-disabled", ae)
            }
            this._super(ad, ae)
        },
        _percentage: function () {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function () {
            var ae = this.options.value,
                ad = this._percentage();
            this.valueDiv.toggle(this.indeterminate || ae > this.min).toggleClass("ui-corner-right", ae === this.options.max).width(ad.toFixed(0) + "%");
            this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate);
            if (this.indeterminate) {
                this.element.removeAttr("aria-valuenow");
                if (!this.overlayDiv) {
                    this.overlayDiv = a("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv)
                }
            } else {
                this.element.attr({
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": ae
                });
                if (this.overlayDiv) {
                    this.overlayDiv.remove();
                    this.overlayDiv = null
                }
            }
            if (this.oldValue !== ae) {
                this.oldValue = ae;
                this._trigger("change")
            }
            if (ae === this.options.max) {
                this._trigger("complete")
            }
        }
    });
    /*
     * jQuery UI Selectable 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/selectable/
     */
    var Q = a.widget("ui.selectable", a.ui.mouse, {
        version: "1.11.4",
        options: {
            appendTo: "body",
            autoRefresh: true,
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
            var ad, ae = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            this.refresh = function () {
                ad = a(ae.options.filter, ae.element[0]);
                ad.addClass("ui-selectee");
                ad.each(function () {
                    var af = a(this),
                        ag = af.offset();
                    a.data(this, "selectable-item", {
                        element: this,
                        $element: af,
                        left: ag.left,
                        top: ag.top,
                        right: ag.left + af.outerWidth(),
                        bottom: ag.top + af.outerHeight(),
                        startselected: false,
                        selected: af.hasClass("ui-selected"),
                        selecting: af.hasClass("ui-selecting"),
                        unselecting: af.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = ad.addClass("ui-selectee");
            this._mouseInit();
            this.helper = a("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled");
            this._mouseDestroy()
        },
        _mouseStart: function (ad) {
            var af = this,
                ae = this.options;
            this.opos = [ad.pageX, ad.pageY];
            if (this.options.disabled) {
                return
            }
            this.selectees = a(ae.filter, this.element[0]);
            this._trigger("start", ad);
            a(ae.appendTo).append(this.helper);
            this.helper.css({
                left: ad.pageX,
                top: ad.pageY,
                width: 0,
                height: 0
            });
            if (ae.autoRefresh) {
                this.refresh()
            }
            this.selectees.filter(".ui-selected").each(function () {
                var ag = a.data(this, "selectable-item");
                ag.startselected = true;
                if (!ad.metaKey && !ad.ctrlKey) {
                    ag.$element.removeClass("ui-selected");
                    ag.selected = false;
                    ag.$element.addClass("ui-unselecting");
                    ag.unselecting = true;
                    af._trigger("unselecting", ad, {
                        unselecting: ag.element
                    })
                }
            });
            a(ad.target).parents().addBack().each(function () {
                var ag, ah = a.data(this, "selectable-item");
                if (ah) {
                    ag = (!ad.metaKey && !ad.ctrlKey) || !ah.$element.hasClass("ui-selected");
                    ah.$element.removeClass(ag ? "ui-unselecting" : "ui-selected").addClass(ag ? "ui-selecting" : "ui-unselecting");
                    ah.unselecting = !ag;
                    ah.selecting = ag;
                    ah.selected = ag;
                    if (ag) {
                        af._trigger("selecting", ad, {
                            selecting: ah.element
                        })
                    } else {
                        af._trigger("unselecting", ad, {
                            unselecting: ah.element
                        })
                    }
                    return false
                }
            })
        },
        _mouseDrag: function (ad) {
            this.dragged = true;
            if (this.options.disabled) {
                return
            }
            var ag, af = this,
                ae = this.options,
                ah = this.opos[0],
                aj = this.opos[1],
                ai = ad.pageX,
                ak = ad.pageY;
            if (ah > ai) {
                ag = ai;
                ai = ah;
                ah = ag
            }
            if (aj > ak) {
                ag = ak;
                ak = aj;
                aj = ag
            }
            this.helper.css({
                left: ah,
                top: aj,
                width: ai - ah,
                height: ak - aj
            });
            this.selectees.each(function () {
                var am = a.data(this, "selectable-item"),
                    al = false;
                if (!am || am.element === af.element[0]) {
                    return
                }
                if (ae.tolerance === "touch") {
                    al = (!(am.left > ai || am.right < ah || am.top > ak || am.bottom < aj))
                } else {
                    if (ae.tolerance === "fit") {
                        al = (am.left > ah && am.right < ai && am.top > aj && am.bottom < ak)
                    }
                }
                if (al) {
                    if (am.selected) {
                        am.$element.removeClass("ui-selected");
                        am.selected = false
                    }
                    if (am.unselecting) {
                        am.$element.removeClass("ui-unselecting");
                        am.unselecting = false
                    }
                    if (!am.selecting) {
                        am.$element.addClass("ui-selecting");
                        am.selecting = true;
                        af._trigger("selecting", ad, {
                            selecting: am.element
                        })
                    }
                } else {
                    if (am.selecting) {
                        if ((ad.metaKey || ad.ctrlKey) && am.startselected) {
                            am.$element.removeClass("ui-selecting");
                            am.selecting = false;
                            am.$element.addClass("ui-selected");
                            am.selected = true
                        } else {
                            am.$element.removeClass("ui-selecting");
                            am.selecting = false;
                            if (am.startselected) {
                                am.$element.addClass("ui-unselecting");
                                am.unselecting = true
                            }
                            af._trigger("unselecting", ad, {
                                unselecting: am.element
                            })
                        }
                    }
                    if (am.selected) {
                        if (!ad.metaKey && !ad.ctrlKey && !am.startselected) {
                            am.$element.removeClass("ui-selected");
                            am.selected = false;
                            am.$element.addClass("ui-unselecting");
                            am.unselecting = true;
                            af._trigger("unselecting", ad, {
                                unselecting: am.element
                            })
                        }
                    }
                }
            });
            return false
        },
        _mouseStop: function (ad) {
            var ae = this;
            this.dragged = false;
            a(".ui-unselecting", this.element[0]).each(function () {
                var af = a.data(this, "selectable-item");
                af.$element.removeClass("ui-unselecting");
                af.unselecting = false;
                af.startselected = false;
                ae._trigger("unselected", ad, {
                    unselected: af.element
                })
            });
            a(".ui-selecting", this.element[0]).each(function () {
                var af = a.data(this, "selectable-item");
                af.$element.removeClass("ui-selecting").addClass("ui-selected");
                af.selecting = false;
                af.selected = true;
                af.startselected = true;
                ae._trigger("selected", ad, {
                    selected: af.element
                })
            });
            this._trigger("stop", ad);
            this.helper.remove();
            return false
        }
    });
    /*
     * jQuery UI Selectmenu 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/selectmenu
     */
    var R = a.widget("ui.selectmenu", {
        version: "1.11.4",
        defaultElement: "<select>",
        options: {
            appendTo: null,
            disabled: null,
            icons: {
                button: "ui-icon-triangle-1-s"
            },
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            width: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            select: null
        },
        _create: function () {
            var ad = this.element.uniqueId().attr("id");
            this.ids = {
                element: ad,
                button: ad + "-button",
                menu: ad + "-menu"
            };
            this._drawButton();
            this._drawMenu();
            if (this.options.disabled) {
                this.disable()
            }
        },
        _drawButton: function () {
            var ad = this;
            this.label = a("label[for='" + this.ids.element + "']").attr("for", this.ids.button);
            this._on(this.label, {
                click: function (ae) {
                    this.button.focus();
                    ae.preventDefault()
                }
            });
            this.element.hide();
            this.button = a("<span>", {
                "class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
                tabindex: this.options.disabled ? -1 : 0,
                id: this.ids.button,
                role: "combobox",
                "aria-expanded": "false",
                "aria-autocomplete": "list",
                "aria-owns": this.ids.menu,
                "aria-haspopup": "true"
            }).insertAfter(this.element);
            a("<span>", {
                "class": "ui-icon " + this.options.icons.button
            }).prependTo(this.button);
            this.buttonText = a("<span>", {
                "class": "ui-selectmenu-text"
            }).appendTo(this.button);
            this._setText(this.buttonText, this.element.find("option:selected").text());
            this._resizeButton();
            this._on(this.button, this._buttonEvents);
            this.button.one("focusin", function () {
                if (!ad.menuItems) {
                    ad._refreshMenu()
                }
            });
            this._hoverable(this.button);
            this._focusable(this.button)
        },
        _drawMenu: function () {
            var ad = this;
            this.menu = a("<ul>", {
                "aria-hidden": "true",
                "aria-labelledby": this.ids.button,
                id: this.ids.menu
            });
            this.menuWrap = a("<div>", {
                "class": "ui-selectmenu-menu ui-front"
            }).append(this.menu).appendTo(this._appendTo());
            this.menuInstance = this.menu.menu({
                role: "listbox",
                select: function (ae, af) {
                    ae.preventDefault();
                    ad._setSelection();
                    ad._select(af.item.data("ui-selectmenu-item"), ae)
                },
                focus: function (ae, ag) {
                    var af = ag.item.data("ui-selectmenu-item");
                    if (ad.focusIndex != null && af.index !== ad.focusIndex) {
                        ad._trigger("focus", ae, {
                            item: af
                        });
                        if (!ad.isOpen) {
                            ad._select(af, ae)
                        }
                    }
                    ad.focusIndex = af.index;
                    ad.button.attr("aria-activedescendant", ad.menuItems.eq(af.index).attr("id"))
                }
            }).menu("instance");
            this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all");
            this.menuInstance._off(this.menu, "mouseleave");
            this.menuInstance._closeOnDocumentClick = function () {
                return false
            };
            this.menuInstance._isDivider = function () {
                return false
            }
        },
        refresh: function () {
            this._refreshMenu();
            this._setText(this.buttonText, this._getSelectedItem().text());
            if (!this.options.width) {
                this._resizeButton()
            }
        },
        _refreshMenu: function () {
            this.menu.empty();
            var ad, ae = this.element.find("option");
            if (!ae.length) {
                return
            }
            this._parseOptions(ae);
            this._renderMenu(this.menu, this.items);
            this.menuInstance.refresh();
            this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup");
            ad = this._getSelectedItem();
            this.menuInstance.focus(null, ad);
            this._setAria(ad.data("ui-selectmenu-item"));
            this._setOption("disabled", this.element.prop("disabled"))
        },
        open: function (ad) {
            if (this.options.disabled) {
                return
            }
            if (!this.menuItems) {
                this._refreshMenu()
            } else {
                this.menu.find(".ui-state-focus").removeClass("ui-state-focus");
                this.menuInstance.focus(null, this._getSelectedItem())
            }
            this.isOpen = true;
            this._toggleAttr();
            this._resizeMenu();
            this._position();
            this._on(this.document, this._documentClick);
            this._trigger("open", ad)
        },
        _position: function () {
            this.menuWrap.position(a.extend({
                of: this.button
            }, this.options.position))
        },
        close: function (ad) {
            if (!this.isOpen) {
                return
            }
            this.isOpen = false;
            this._toggleAttr();
            this.range = null;
            this._off(this.document);
            this._trigger("close", ad)
        },
        widget: function () {
            return this.button
        },
        menuWidget: function () {
            return this.menu
        },
        _renderMenu: function (ag, ae) {
            var af = this,
                ad = "";
            a.each(ae, function (ah, ai) {
                if (ai.optgroup !== ad) {
                    a("<li>", {
                        "class": "ui-selectmenu-optgroup ui-menu-divider" + (ai.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : ""),
                        text: ai.optgroup
                    }).appendTo(ag);
                    ad = ai.optgroup
                }
                af._renderItemData(ag, ai)
            })
        },
        _renderItemData: function (ae, ad) {
            return this._renderItem(ae, ad).data("ui-selectmenu-item", ad)
        },
        _renderItem: function (af, ad) {
            var ae = a("<li>");
            if (ad.disabled) {
                ae.addClass("ui-state-disabled")
            }
            this._setText(ae, ad.label);
            return ae.appendTo(af)
        },
        _setText: function (ad, ae) {
            if (ae) {
                ad.text(ae)
            } else {
                ad.html("&#160;")
            }
        },
        _move: function (ad, ae) {
            var ag, ah, af = ".ui-menu-item";
            if (this.isOpen) {
                ag = this.menuItems.eq(this.focusIndex)
            } else {
                ag = this.menuItems.eq(this.element[0].selectedIndex);
                af += ":not(.ui-state-disabled)"
            }
            if (ad === "first" || ad === "last") {
                ah = ag[ad === "first" ? "prevAll" : "nextAll"](af).eq(-1)
            } else {
                ah = ag[ad + "All"](af).eq(0)
            }
            if (ah.length) {
                this.menuInstance.focus(ae, ah)
            }
        },
        _getSelectedItem: function () {
            return this.menuItems.eq(this.element[0].selectedIndex)
        },
        _toggle: function (ad) {
            this[this.isOpen ? "close" : "open"](ad)
        },
        _setSelection: function () {
            var ad;
            if (!this.range) {
                return
            }
            if (window.getSelection) {
                ad = window.getSelection();
                ad.removeAllRanges();
                ad.addRange(this.range)
            } else {
                this.range.select()
            }
            this.button.focus()
        },
        _documentClick: {
            mousedown: function (ad) {
                if (!this.isOpen) {
                    return
                }
                if (!a(ad.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length) {
                    this.close(ad)
                }
            }
        },
        _buttonEvents: {
            mousedown: function () {
                var ad;
                if (window.getSelection) {
                    ad = window.getSelection();
                    if (ad.rangeCount) {
                        this.range = ad.getRangeAt(0)
                    }
                } else {
                    this.range = document.selection.createRange()
                }
            },
            click: function (ad) {
                this._setSelection();
                this._toggle(ad)
            },
            keydown: function (ad) {
                var ae = true;
                switch (ad.keyCode) {
                    case a.ui.keyCode.TAB:
                    case a.ui.keyCode.ESCAPE:
                        this.close(ad);
                        ae = false;
                        break;
                    case a.ui.keyCode.ENTER:
                        if (this.isOpen) {
                            this._selectFocusedItem(ad)
                        }
                        break;
                    case a.ui.keyCode.UP:
                        if (ad.altKey) {
                            this._toggle(ad)
                        } else {
                            this._move("prev", ad)
                        }
                        break;
                    case a.ui.keyCode.DOWN:
                        if (ad.altKey) {
                            this._toggle(ad)
                        } else {
                            this._move("next", ad)
                        }
                        break;
                    case a.ui.keyCode.SPACE:
                        if (this.isOpen) {
                            this._selectFocusedItem(ad)
                        } else {
                            this._toggle(ad)
                        }
                        break;
                    case a.ui.keyCode.LEFT:
                        this._move("prev", ad);
                        break;
                    case a.ui.keyCode.RIGHT:
                        this._move("next", ad);
                        break;
                    case a.ui.keyCode.HOME:
                    case a.ui.keyCode.PAGE_UP:
                        this._move("first", ad);
                        break;
                    case a.ui.keyCode.END:
                    case a.ui.keyCode.PAGE_DOWN:
                        this._move("last", ad);
                        break;
                    default:
                        this.menu.trigger(ad);
                        ae = false
                }
                if (ae) {
                    ad.preventDefault()
                }
            }
        },
        _selectFocusedItem: function (ad) {
            var ae = this.menuItems.eq(this.focusIndex);
            if (!ae.hasClass("ui-state-disabled")) {
                this._select(ae.data("ui-selectmenu-item"), ad)
            }
        },
        _select: function (ae, ad) {
            var af = this.element[0].selectedIndex;
            this.element[0].selectedIndex = ae.index;
            this._setText(this.buttonText, ae.label);
            this._setAria(ae);
            this._trigger("select", ad, {
                item: ae
            });
            if (ae.index !== af) {
                this._trigger("change", ad, {
                    item: ae
                })
            }
            this.close(ad)
        },
        _setAria: function (ae) {
            var ad = this.menuItems.eq(ae.index).attr("id");
            this.button.attr({
                "aria-labelledby": ad,
                "aria-activedescendant": ad
            });
            this.menu.attr("aria-activedescendant", ad)
        },
        _setOption: function (ad, ae) {
            if (ad === "icons") {
                this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(ae.button)
            }
            this._super(ad, ae);
            if (ad === "appendTo") {
                this.menuWrap.appendTo(this._appendTo())
            }
            if (ad === "disabled") {
                this.menuInstance.option("disabled", ae);
                this.button.toggleClass("ui-state-disabled", ae).attr("aria-disabled", ae);
                this.element.prop("disabled", ae);
                if (ae) {
                    this.button.attr("tabindex", -1);
                    this.close()
                } else {
                    this.button.attr("tabindex", 0)
                }
            }
            if (ad === "width") {
                this._resizeButton()
            }
        },
        _appendTo: function () {
            var ad = this.options.appendTo;
            if (ad) {
                ad = ad.jquery || ad.nodeType ? a(ad) : this.document.find(ad).eq(0)
            }
            if (!ad || !ad[0]) {
                ad = this.element.closest(".ui-front")
            }
            if (!ad.length) {
                ad = this.document[0].body
            }
            return ad
        },
        _toggleAttr: function () {
            this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen);
            this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen);
            this.menu.attr("aria-hidden", !this.isOpen)
        },
        _resizeButton: function () {
            var ad = this.options.width;
            if (!ad) {
                ad = this.element.show().outerWidth();
                this.element.hide()
            }
            this.button.outerWidth(ad)
        },
        _resizeMenu: function () {
            this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
        },
        _getCreateOptions: function () {
            return {
                disabled: this.element.prop("disabled")
            }
        },
        _parseOptions: function (ae) {
            var ad = [];
            ae.each(function (af, ag) {
                var ai = a(ag),
                    ah = ai.parent("optgroup");
                ad.push({
                    element: ai,
                    index: af,
                    value: ai.val(),
                    label: ai.text(),
                    optgroup: ah.attr("label") || "",
                    disabled: ah.prop("disabled") || ai.prop("disabled")
                })
            });
            this.items = ad
        },
        _destroy: function () {
            this.menuWrap.remove();
            this.button.remove();
            this.element.show();
            this.element.removeUniqueId();
            this.label.attr("for", this.ids.element)
        }
    });
    /*
     * jQuery UI Slider 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/slider/
     */
    var S = a.widget("ui.slider", a.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function () {
            this._keySliding = false;
            this._mouseSliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this._calculateNewMax();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            this._refresh();
            this._setOption("disabled", this.options.disabled);
            this._animateOff = false
        },
        _refresh: function () {
            this._createRange();
            this._createHandles();
            this._setupEvents();
            this._refreshValue()
        },
        _createHandles: function () {
            var ah, af, ai = this.options,
                ad = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                ae = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                ag = [];
            af = (ai.values && ai.values.length) || 1;
            if (ad.length > af) {
                ad.slice(af).remove();
                ad = ad.slice(0, af)
            }
            for (ah = ad.length; ah < af; ah++) {
                ag.push(ae)
            }
            this.handles = ad.add(a(ag.join("")).appendTo(this.element));
            this.handle = this.handles.eq(0);
            this.handles.each(function (aj) {
                a(this).data("ui-slider-handle-index", aj)
            })
        },
        _createRange: function () {
            var ae = this.options,
                ad = "";
            if (ae.range) {
                if (ae.range === true) {
                    if (!ae.values) {
                        ae.values = [this._valueMin(), this._valueMin()]
                    } else {
                        if (ae.values.length && ae.values.length !== 2) {
                            ae.values = [ae.values[0], ae.values[0]]
                        } else {
                            if (a.isArray(ae.values)) {
                                ae.values = ae.values.slice(0)
                            }
                        }
                    }
                }
                if (!this.range || !this.range.length) {
                    this.range = a("<div></div>").appendTo(this.element);
                    ad = "ui-slider-range ui-widget-header ui-corner-all"
                } else {
                    this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                        left: "",
                        bottom: ""
                    })
                }
                this.range.addClass(ad + ((ae.range === "min" || ae.range === "max") ? " ui-slider-range-" + ae.range : ""))
            } else {
                if (this.range) {
                    this.range.remove()
                }
                this.range = null
            }
        },
        _setupEvents: function () {
            this._off(this.handles);
            this._on(this.handles, this._handleEvents);
            this._hoverable(this.handles);
            this._focusable(this.handles)
        },
        _destroy: function () {
            this.handles.remove();
            if (this.range) {
                this.range.remove()
            }
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all");
            this._mouseDestroy()
        },
        _mouseCapture: function (ag) {
            var am, aj, af, ae, ah, ad, al, ai, an = this,
                ak = this.options;
            if (ak.disabled) {
                return false
            }
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            am = {
                x: ag.pageX,
                y: ag.pageY
            };
            aj = this._normValueFromMouse(am);
            af = this._valueMax() - this._valueMin() + 1;
            this.handles.each(function (ao) {
                var ap = Math.abs(aj - an.values(ao));
                if ((af > ap) || (af === ap && (ao === an._lastChangedValue || an.values(ao) === ak.min))) {
                    af = ap;
                    ae = a(this);
                    ah = ao
                }
            });
            ad = this._start(ag, ah);
            if (ad === false) {
                return false
            }
            this._mouseSliding = true;
            this._handleIndex = ah;
            ae.addClass("ui-state-active").focus();
            al = ae.offset();
            ai = !a(ag.target).parents().addBack().is(".ui-slider-handle");
            this._clickOffset = ai ? {
                left: 0,
                top: 0
            } : {
                left: ag.pageX - al.left - (ae.width() / 2),
                top: ag.pageY - al.top - (ae.height() / 2) - (parseInt(ae.css("borderTopWidth"), 10) || 0) - (parseInt(ae.css("borderBottomWidth"), 10) || 0) + (parseInt(ae.css("marginTop"), 10) || 0)
            };
            if (!this.handles.hasClass("ui-state-hover")) {
                this._slide(ag, ah, aj)
            }
            this._animateOff = true;
            return true
        },
        _mouseStart: function () {
            return true
        },
        _mouseDrag: function (ad) {
            var af = {
                    x: ad.pageX,
                    y: ad.pageY
                },
                ae = this._normValueFromMouse(af);
            this._slide(ad, this._handleIndex, ae);
            return false
        },
        _mouseStop: function (ad) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(ad, this._handleIndex);
            this._change(ad, this._handleIndex);
            this._handleIndex = null;
            this._clickOffset = null;
            this._animateOff = false;
            return false
        },
        _detectOrientation: function () {
            this.orientation = (this.options.orientation === "vertical") ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (ag) {
            var af, ae, ad, ai, ah;
            if (this.orientation === "horizontal") {
                af = this.elementSize.width;
                ae = ag.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                af = this.elementSize.height;
                ae = ag.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            ad = (ae / af);
            if (ad > 1) {
                ad = 1
            }
            if (ad < 0) {
                ad = 0
            }
            if (this.orientation === "vertical") {
                ad = 1 - ad
            }
            ai = this._valueMax() - this._valueMin();
            ah = this._valueMin() + ad * ai;
            return this._trimAlignValue(ah)
        },
        _start: function (ad, ae) {
            var af = {
                handle: this.handles[ae],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                af.value = this.values(ae);
                af.values = this.values()
            }
            return this._trigger("start", ad, af)
        },
        _slide: function (ae, af, ag) {
            var ai, ah, ad;
            if (this.options.values && this.options.values.length) {
                ai = this.values(af ? 0 : 1);
                if ((this.options.values.length === 2 && this.options.range === true) && ((af === 0 && ag > ai) || (af === 1 && ag < ai))) {
                    ag = ai
                }
                if (ag !== this.values(af)) {
                    ah = this.values();
                    ah[af] = ag;
                    ad = this._trigger("slide", ae, {
                        handle: this.handles[af],
                        value: ag,
                        values: ah
                    });
                    ai = this.values(af ? 0 : 1);
                    if (ad !== false) {
                        this.values(af, ag)
                    }
                }
            } else {
                if (ag !== this.value()) {
                    ad = this._trigger("slide", ae, {
                        handle: this.handles[af],
                        value: ag
                    });
                    if (ad !== false) {
                        this.value(ag)
                    }
                }
            }
        },
        _stop: function (ad, ae) {
            var af = {
                handle: this.handles[ae],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                af.value = this.values(ae);
                af.values = this.values()
            }
            this._trigger("stop", ad, af)
        },
        _change: function (ad, ae) {
            if (!this._keySliding && !this._mouseSliding) {
                var af = {
                    handle: this.handles[ae],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    af.value = this.values(ae);
                    af.values = this.values()
                }
                this._lastChangedValue = ae;
                this._trigger("change", ad, af)
            }
        },
        value: function (ad) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(ad);
                this._refreshValue();
                this._change(null, 0);
                return
            }
            return this._value()
        },
        values: function (ae, af) {
            var ah, ag, ad;
            if (arguments.length > 1) {
                this.options.values[ae] = this._trimAlignValue(af);
                this._refreshValue();
                this._change(null, ae);
                return
            }
            if (arguments.length) {
                if (a.isArray(arguments[0])) {
                    ah = this.options.values;
                    ag = arguments[0];
                    for (ad = 0; ad < ah.length; ad += 1) {
                        ah[ad] = this._trimAlignValue(ag[ad]);
                        this._change(null, ad)
                    }
                    this._refreshValue()
                } else {
                    if (this.options.values && this.options.values.length) {
                        return this._values(ae)
                    } else {
                        return this.value()
                    }
                }
            } else {
                return this._values()
            }
        },
        _setOption: function (ae, ag) {
            var ad, af = 0;
            if (ae === "range" && this.options.range === true) {
                if (ag === "min") {
                    this.options.value = this._values(0);
                    this.options.values = null
                } else {
                    if (ag === "max") {
                        this.options.value = this._values(this.options.values.length - 1);
                        this.options.values = null
                    }
                }
            }
            if (a.isArray(this.options.values)) {
                af = this.options.values.length
            }
            if (ae === "disabled") {
                this.element.toggleClass("ui-state-disabled", !!ag)
            }
            this._super(ae, ag);
            switch (ae) {
                case "orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    this.handles.css(ag === "horizontal" ? "bottom" : "left", "");
                    break;
                case "value":
                    this._animateOff = true;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = false;
                    break;
                case "values":
                    this._animateOff = true;
                    this._refreshValue();
                    for (ad = 0; ad < af; ad += 1) {
                        this._change(null, ad)
                    }
                    this._animateOff = false;
                    break;
                case "step":
                case "min":
                case "max":
                    this._animateOff = true;
                    this._calculateNewMax();
                    this._refreshValue();
                    this._animateOff = false;
                    break;
                case "range":
                    this._animateOff = true;
                    this._refresh();
                    this._animateOff = false;
                    break
            }
        },
        _value: function () {
            var ad = this.options.value;
            ad = this._trimAlignValue(ad);
            return ad
        },
        _values: function (ae) {
            var af, ag, ad;
            if (arguments.length) {
                af = this.options.values[ae];
                af = this._trimAlignValue(af);
                return af
            } else {
                if (this.options.values && this.options.values.length) {
                    ag = this.options.values.slice();
                    for (ad = 0; ad < ag.length; ad += 1) {
                        ag[ad] = this._trimAlignValue(ag[ad])
                    }
                    return ag
                } else {
                    return []
                }
            }
        },
        _trimAlignValue: function (af) {
            if (af <= this._valueMin()) {
                return this._valueMin()
            }
            if (af >= this._valueMax()) {
                return this._valueMax()
            }
            var ae = (this.options.step > 0) ? this.options.step : 1,
                ag = (af - this._valueMin()) % ae,
                ad = af - ag;
            if (Math.abs(ag) * 2 >= ae) {
                ad += (ag > 0) ? ae : (-ae)
            }
            return parseFloat(ad.toFixed(5))
        },
        _calculateNewMax: function () {
            var ae = this.options.max,
                af = this._valueMin(),
                ag = this.options.step,
                ad = Math.floor((+(ae - af).toFixed(this._precision())) / ag) * ag;
            ae = ad + af;
            this.max = parseFloat(ae.toFixed(this._precision()))
        },
        _precision: function () {
            var ad = this._precisionOf(this.options.step);
            if (this.options.min !== null) {
                ad = Math.max(ad, this._precisionOf(this.options.min))
            }
            return ad
        },
        _precisionOf: function (ae) {
            var af = ae.toString(),
                ad = af.indexOf(".");
            return ad === -1 ? 0 : af.length - ad - 1
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.max
        },
        _refreshValue: function () {
            var af, aj, ak, am, al, ah = this.options.range,
                ag = this.options,
                ai = this,
                ae = (!this._animateOff) ? ag.animate : false,
                ad = {};
            if (this.options.values && this.options.values.length) {
                this.handles.each(function (an) {
                    aj = (ai.values(an) - ai._valueMin()) / (ai._valueMax() - ai._valueMin()) * 100;
                    ad[ai.orientation === "horizontal" ? "left" : "bottom"] = aj + "%";
                    a(this).stop(1, 1)[ae ? "animate" : "css"](ad, ag.animate);
                    if (ai.options.range === true) {
                        if (ai.orientation === "horizontal") {
                            if (an === 0) {
                                ai.range.stop(1, 1)[ae ? "animate" : "css"]({
                                    left: aj + "%"
                                }, ag.animate)
                            }
                            if (an === 1) {
                                ai.range[ae ? "animate" : "css"]({
                                    width: (aj - af) + "%"
                                }, {
                                    queue: false,
                                    duration: ag.animate
                                })
                            }
                        } else {
                            if (an === 0) {
                                ai.range.stop(1, 1)[ae ? "animate" : "css"]({
                                    bottom: (aj) + "%"
                                }, ag.animate)
                            }
                            if (an === 1) {
                                ai.range[ae ? "animate" : "css"]({
                                    height: (aj - af) + "%"
                                }, {
                                    queue: false,
                                    duration: ag.animate
                                })
                            }
                        }
                    }
                    af = aj
                })
            } else {
                ak = this.value();
                am = this._valueMin();
                al = this._valueMax();
                aj = (al !== am) ? (ak - am) / (al - am) * 100 : 0;
                ad[this.orientation === "horizontal" ? "left" : "bottom"] = aj + "%";
                this.handle.stop(1, 1)[ae ? "animate" : "css"](ad, ag.animate);
                if (ah === "min" && this.orientation === "horizontal") {
                    this.range.stop(1, 1)[ae ? "animate" : "css"]({
                        width: aj + "%"
                    }, ag.animate)
                }
                if (ah === "max" && this.orientation === "horizontal") {
                    this.range[ae ? "animate" : "css"]({
                        width: (100 - aj) + "%"
                    }, {
                        queue: false,
                        duration: ag.animate
                    })
                }
                if (ah === "min" && this.orientation === "vertical") {
                    this.range.stop(1, 1)[ae ? "animate" : "css"]({
                        height: aj + "%"
                    }, ag.animate)
                }
                if (ah === "max" && this.orientation === "vertical") {
                    this.range[ae ? "animate" : "css"]({
                        height: (100 - aj) + "%"
                    }, {
                        queue: false,
                        duration: ag.animate
                    })
                }
            }
        },
        _handleEvents: {
            keydown: function (af) {
                var ad, ae, ah, ai, ag = a(af.target).data("ui-slider-handle-index");
                switch (af.keyCode) {
                    case a.ui.keyCode.HOME:
                    case a.ui.keyCode.END:
                    case a.ui.keyCode.PAGE_UP:
                    case a.ui.keyCode.PAGE_DOWN:
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        af.preventDefault();
                        if (!this._keySliding) {
                            this._keySliding = true;
                            a(af.target).addClass("ui-state-active");
                            ad = this._start(af, ag);
                            if (ad === false) {
                                return
                            }
                        }
                        break
                }
                ai = this.options.step;
                if (this.options.values && this.options.values.length) {
                    ae = ah = this.values(ag)
                } else {
                    ae = ah = this.value()
                }
                switch (af.keyCode) {
                    case a.ui.keyCode.HOME:
                        ah = this._valueMin();
                        break;
                    case a.ui.keyCode.END:
                        ah = this._valueMax();
                        break;
                    case a.ui.keyCode.PAGE_UP:
                        ah = this._trimAlignValue(ae + ((this._valueMax() - this._valueMin()) / this.numPages));
                        break;
                    case a.ui.keyCode.PAGE_DOWN:
                        ah = this._trimAlignValue(ae - ((this._valueMax() - this._valueMin()) / this.numPages));
                        break;
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                        if (ae === this._valueMax()) {
                            return
                        }
                        ah = this._trimAlignValue(ae + ai);
                        break;
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (ae === this._valueMin()) {
                            return
                        }
                        ah = this._trimAlignValue(ae - ai);
                        break
                }
                this._slide(af, ag, ah)
            },
            keyup: function (ad) {
                var ae = a(ad.target).data("ui-slider-handle-index");
                if (this._keySliding) {
                    this._keySliding = false;
                    this._stop(ad, ae);
                    this._change(ad, ae);
                    a(ad.target).removeClass("ui-state-active")
                }
            }
        }
    });
    /*
     * jQuery UI Sortable 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/sortable/
     */
    var T = a.widget("ui.sortable", a.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "sort",
        ready: false,
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
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
        _isOverAxis: function (af, ad, ae) {
            return (af >= ad) && (af < (ad + ae))
        },
        _isFloating: function (ad) {
            return (/left|right/).test(ad.css("float")) || (/inline|table-cell/).test(ad.css("display"))
        },
        _create: function () {
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.offset = this.element.offset();
            this._mouseInit();
            this._setHandleClassName();
            this.ready = true
        },
        _setOption: function (ad, ae) {
            this._super(ad, ae);
            if (ad === "handle") {
                this._setHandleClassName()
            }
        },
        _setHandleClassName: function () {
            this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle");
            a.each(this.items, function () {
                (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
            })
        },
        _destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle");
            this._mouseDestroy();
            for (var ad = this.items.length - 1; ad >= 0; ad--) {
                this.items[ad].item.removeData(this.widgetName + "-item")
            }
            return this
        },
        _mouseCapture: function (ae, af) {
            var ad = null,
                ah = false,
                ag = this;
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type === "static") {
                return false
            }
            this._refreshItems(ae);
            a(ae.target).parents().each(function () {
                if (a.data(this, ag.widgetName + "-item") === ag) {
                    ad = a(this);
                    return false
                }
            });
            if (a.data(ae.target, ag.widgetName + "-item") === ag) {
                ad = a(ae.target)
            }
            if (!ad) {
                return false
            }
            if (this.options.handle && !af) {
                a(this.options.handle, ad).find("*").addBack().each(function () {
                    if (this === ae.target) {
                        ah = true
                    }
                });
                if (!ah) {
                    return false
                }
            }
            this.currentItem = ad;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function (ae, ai, ag) {
            var af, ad, ah = this.options;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(ae);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            a.extend(this.offset, {
                click: {
                    left: ae.pageX - this.offset.left,
                    top: ae.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            this.originalPosition = this._generatePosition(ae);
            this.originalPageX = ae.pageX;
            this.originalPageY = ae.pageY;
            (ah.cursorAt && this._adjustOffsetFromHelper(ah.cursorAt));
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] !== this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (ah.containment) {
                this._setContainment()
            }
            if (ah.cursor && ah.cursor !== "auto") {
                ad = this.document.find("body");
                this.storedCursor = ad.css("cursor");
                ad.css("cursor", ah.cursor);
                this.storedStylesheet = a("<style>*{ cursor: " + ah.cursor + " !important; }</style>").appendTo(ad)
            }
            if (ah.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", ah.opacity)
            }
            if (ah.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", ah.zIndex)
            }
            if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", ae, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!ag) {
                for (af = this.containers.length - 1; af >= 0; af--) {
                    this.containers[af]._trigger("activate", ae, this._uiHash(this))
                }
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            if (a.ui.ddmanager && !ah.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, ae)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(ae);
            return true
        },
        _mouseDrag: function (ad) {
            var ae, ag, ah, af, ai = this.options,
                aj = false;
            this.position = this._generatePosition(ad);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - ad.pageY < ai.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = aj = this.scrollParent[0].scrollTop + ai.scrollSpeed
                    } else {
                        if (ad.pageY - this.overflowOffset.top < ai.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = aj = this.scrollParent[0].scrollTop - ai.scrollSpeed
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - ad.pageX < ai.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = aj = this.scrollParent[0].scrollLeft + ai.scrollSpeed
                    } else {
                        if (ad.pageX - this.overflowOffset.left < ai.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = aj = this.scrollParent[0].scrollLeft - ai.scrollSpeed
                        }
                    }
                } else {
                    if (ad.pageY - this.document.scrollTop() < ai.scrollSensitivity) {
                        aj = this.document.scrollTop(this.document.scrollTop() - ai.scrollSpeed)
                    } else {
                        if (this.window.height() - (ad.pageY - this.document.scrollTop()) < ai.scrollSensitivity) {
                            aj = this.document.scrollTop(this.document.scrollTop() + ai.scrollSpeed)
                        }
                    }
                    if (ad.pageX - this.document.scrollLeft() < ai.scrollSensitivity) {
                        aj = this.document.scrollLeft(this.document.scrollLeft() - ai.scrollSpeed)
                    } else {
                        if (this.window.width() - (ad.pageX - this.document.scrollLeft()) < ai.scrollSensitivity) {
                            aj = this.document.scrollLeft(this.document.scrollLeft() + ai.scrollSpeed)
                        }
                    }
                }
                if (aj !== false && a.ui.ddmanager && !ai.dropBehaviour) {
                    a.ui.ddmanager.prepareOffsets(this, ad)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis !== "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis !== "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (ae = this.items.length - 1; ae >= 0; ae--) {
                ag = this.items[ae];
                ah = ag.item[0];
                af = this._intersectsWithPointer(ag);
                if (!af) {
                    continue
                }
                if (ag.instance !== this.currentContainer) {
                    continue
                }
                if (ah !== this.currentItem[0] && this.placeholder[af === 1 ? "next" : "prev"]()[0] !== ah && !a.contains(this.placeholder[0], ah) && (this.options.type === "semi-dynamic" ? !a.contains(this.element[0], ah) : true)) {
                    this.direction = af === 1 ? "down" : "up";
                    if (this.options.tolerance === "pointer" || this._intersectsWithSides(ag)) {
                        this._rearrange(ad, ag)
                    } else {
                        break
                    }
                    this._trigger("change", ad, this._uiHash());
                    break
                }
            }
            this._contactContainers(ad);
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, ad)
            }
            this._trigger("sort", ad, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function (ag, ah) {
            if (!ag) {
                return
            }
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                a.ui.ddmanager.drop(this, ag)
            }
            if (this.options.revert) {
                var ai = this,
                    af = this.placeholder.offset(),
                    ae = this.options.axis,
                    ad = {};
                if (!ae || ae === "x") {
                    ad.left = af.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)
                }
                if (!ae || ae === "y") {
                    ad.top = af.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)
                }
                this.reverting = true;
                a(this.helper).animate(ad, parseInt(this.options.revert, 10) || 500, function () {
                    ai._clear(ag)
                })
            } else {
                this._clear(ag, ah)
            }
            return false
        },
        cancel: function () {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                if (this.options.helper === "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var ad = this.containers.length - 1; ad >= 0; ad--) {
                    this.containers[ad]._trigger("deactivate", null, this._uiHash(this));
                    if (this.containers[ad].containerCache.over) {
                        this.containers[ad]._trigger("out", null, this._uiHash(this));
                        this.containers[ad].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                if (this.placeholder[0].parentNode) {
                    this.placeholder[0].parentNode.removeChild(this.placeholder[0])
                }
                if (this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
                    this.helper.remove()
                }
                a.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                if (this.domPosition.prev) {
                    a(this.domPosition.prev).after(this.currentItem)
                } else {
                    a(this.domPosition.parent).prepend(this.currentItem)
                }
            }
            return this
        },
        serialize: function (ae) {
            var ad = this._getItemsAsjQuery(ae && ae.connected),
                af = [];
            ae = ae || {};
            a(ad).each(function () {
                var ag = (a(ae.item || this).attr(ae.attribute || "id") || "").match(ae.expression || (/(.+)[\-=_](.+)/));
                if (ag) {
                    af.push((ae.key || ag[1] + "[]") + "=" + (ae.key && ae.expression ? ag[1] : ag[2]))
                }
            });
            if (!af.length && ae.key) {
                af.push(ae.key + "=")
            }
            return af.join("&")
        },
        toArray: function (ae) {
            var ad = this._getItemsAsjQuery(ae && ae.connected),
                af = [];
            ae = ae || {};
            ad.each(function () {
                af.push(a(ae.item || this).attr(ae.attribute || "id") || "")
            });
            return af
        },
        _intersectsWith: function (aj) {
            var an = this.positionAbs.left,
                ao = an + this.helperProportions.width,
                ap = this.positionAbs.top,
                aq = ap + this.helperProportions.height,
                ak = aj.left,
                al = ak + aj.width,
                am = aj.top,
                ad = am + aj.height,
                af = this.offset.click.top,
                ae = this.offset.click.left,
                ah = (this.options.axis === "x") || ((ap + af) > am && (ap + af) < ad),
                ai = (this.options.axis === "y") || ((an + ae) > ak && (an + ae) < al),
                ag = ah && ai;
            if (this.options.tolerance === "pointer" || this.options.forcePointerForContainers || (this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > aj[this.floating ? "width" : "height"])) {
                return ag
            } else {
                return (ak < an + (this.helperProportions.width / 2) && ao - (this.helperProportions.width / 2) < al && am < ap + (this.helperProportions.height / 2) && aq - (this.helperProportions.height / 2) < ad)
            }
        },
        _intersectsWithPointer: function (ah) {
            var af = (this.options.axis === "x") || this._isOverAxis(this.positionAbs.top + this.offset.click.top, ah.top, ah.height),
                ag = (this.options.axis === "y") || this._isOverAxis(this.positionAbs.left + this.offset.click.left, ah.left, ah.width),
                ae = af && ag,
                ai = this._getDragVerticalDirection(),
                ad = this._getDragHorizontalDirection();
            if (!ae) {
                return false
            }
            return this.floating ? (((ad && ad === "right") || ai === "down") ? 2 : 1) : (ai && (ai === "down" ? 2 : 1))
        },
        _intersectsWithSides: function (ag) {
            var ae = this._isOverAxis(this.positionAbs.top + this.offset.click.top, ag.top + (ag.height / 2), ag.height),
                af = this._isOverAxis(this.positionAbs.left + this.offset.click.left, ag.left + (ag.width / 2), ag.width),
                ah = this._getDragVerticalDirection(),
                ad = this._getDragHorizontalDirection();
            if (this.floating && ad) {
                return ((ad === "right" && af) || (ad === "left" && !af))
            } else {
                return ah && ((ah === "down" && ae) || (ah === "up" && !ae))
            }
        },
        _getDragVerticalDirection: function () {
            var ad = this.positionAbs.top - this.lastPositionAbs.top;
            return ad !== 0 && (ad > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var ad = this.positionAbs.left - this.lastPositionAbs.left;
            return ad !== 0 && (ad > 0 ? "right" : "left")
        },
        refresh: function (ad) {
            this._refreshItems(ad);
            this._setHandleClassName();
            this.refreshPositions();
            return this
        },
        _connectWith: function () {
            var ad = this.options;
            return ad.connectWith.constructor === String ? [ad.connectWith] : ad.connectWith
        },
        _getItemsAsjQuery: function (ae) {
            var ah, ak, ag, ai, aj = [],
                al = [],
                af = this._connectWith();
            if (af && ae) {
                for (ah = af.length - 1; ah >= 0; ah--) {
                    ag = a(af[ah], this.document[0]);
                    for (ak = ag.length - 1; ak >= 0; ak--) {
                        ai = a.data(ag[ak], this.widgetFullName);
                        if (ai && ai !== this && !ai.options.disabled) {
                            al.push([a.isFunction(ai.options.items) ? ai.options.items.call(ai.element) : a(ai.options.items, ai.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), ai])
                        }
                    }
                }
            }
            al.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);

            function ad() {
                aj.push(this)
            }
            for (ah = al.length - 1; ah >= 0; ah--) {
                al[ah][0].each(ad)
            }
            return a(aj)
        },
        _removeCurrentsFromItems: function () {
            var ad = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = a.grep(this.items, function (ae) {
                for (var af = 0; af < ad.length; af++) {
                    if (ad[af] === ae.item[0]) {
                        return false
                    }
                }
                return true
            })
        },
        _refreshItems: function (ag) {
            this.items = [];
            this.containers = [this];
            var ah, al, af, ai, ao, ad, aj, an, ak = this.items,
                am = [
                    [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], ag, {
                        item: this.currentItem
                    }) : a(this.options.items, this.element), this]
                ],
                ae = this._connectWith();
            if (ae && this.ready) {
                for (ah = ae.length - 1; ah >= 0; ah--) {
                    af = a(ae[ah], this.document[0]);
                    for (al = af.length - 1; al >= 0; al--) {
                        ai = a.data(af[al], this.widgetFullName);
                        if (ai && ai !== this && !ai.options.disabled) {
                            am.push([a.isFunction(ai.options.items) ? ai.options.items.call(ai.element[0], ag, {
                                item: this.currentItem
                            }) : a(ai.options.items, ai.element), ai]);
                            this.containers.push(ai)
                        }
                    }
                }
            }
            for (ah = am.length - 1; ah >= 0; ah--) {
                ao = am[ah][1];
                ad = am[ah][0];
                for (al = 0, an = ad.length; al < an; al++) {
                    aj = a(ad[al]);
                    aj.data(this.widgetName + "-item", ao);
                    ak.push({
                        item: aj,
                        instance: ao,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function (ad) {
            this.floating = this.items.length ? this.options.axis === "x" || this._isFloating(this.items[0].item) : false;
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            var ae, af, ah, ag;
            for (ae = this.items.length - 1; ae >= 0; ae--) {
                af = this.items[ae];
                if (af.instance !== this.currentContainer && this.currentContainer && af.item[0] !== this.currentItem[0]) {
                    continue
                }
                ah = this.options.toleranceElement ? a(this.options.toleranceElement, af.item) : af.item;
                if (!ad) {
                    af.width = ah.outerWidth();
                    af.height = ah.outerHeight()
                }
                ag = ah.offset();
                af.left = ag.left;
                af.top = ag.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (ae = this.containers.length - 1; ae >= 0; ae--) {
                    ag = this.containers[ae].element.offset();
                    this.containers[ae].containerCache.left = ag.left;
                    this.containers[ae].containerCache.top = ag.top;
                    this.containers[ae].containerCache.width = this.containers[ae].element.outerWidth();
                    this.containers[ae].containerCache.height = this.containers[ae].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function (af) {
            af = af || this;
            var ad, ae = af.options;
            if (!ae.placeholder || ae.placeholder.constructor === String) {
                ad = ae.placeholder;
                ae.placeholder = {
                    element: function () {
                        var ah = af.currentItem[0].nodeName.toLowerCase(),
                            ag = a("<" + ah + ">", af.document[0]).addClass(ad || af.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        if (ah === "tbody") {
                            af._createTrPlaceholder(af.currentItem.find("tr").eq(0), a("<tr>", af.document[0]).appendTo(ag))
                        } else {
                            if (ah === "tr") {
                                af._createTrPlaceholder(af.currentItem, ag)
                            } else {
                                if (ah === "img") {
                                    ag.attr("src", af.currentItem.attr("src"))
                                }
                            }
                        }
                        if (!ad) {
                            ag.css("visibility", "hidden")
                        }
                        return ag
                    },
                    update: function (ag, ah) {
                        if (ad && !ae.forcePlaceholderSize) {
                            return
                        }
                        if (!ah.height()) {
                            ah.height(af.currentItem.innerHeight() - parseInt(af.currentItem.css("paddingTop") || 0, 10) - parseInt(af.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!ah.width()) {
                            ah.width(af.currentItem.innerWidth() - parseInt(af.currentItem.css("paddingLeft") || 0, 10) - parseInt(af.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            af.placeholder = a(ae.placeholder.element.call(af.element, af.currentItem));
            af.currentItem.after(af.placeholder);
            ae.placeholder.update(af, af.placeholder)
        },
        _createTrPlaceholder: function (ad, ae) {
            var af = this;
            ad.children().each(function () {
                a("<td>&#160;</td>", af.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(ae)
            })
        },
        _contactContainers: function (ag) {
            var ai, am, af, al, ao, ap, ae, an, ah, ad, aj = null,
                ak = null;
            for (ai = this.containers.length - 1; ai >= 0; ai--) {
                if (a.contains(this.currentItem[0], this.containers[ai].element[0])) {
                    continue
                }
                if (this._intersectsWith(this.containers[ai].containerCache)) {
                    if (aj && a.contains(this.containers[ai].element[0], aj.element[0])) {
                        continue
                    }
                    aj = this.containers[ai];
                    ak = ai
                } else {
                    if (this.containers[ai].containerCache.over) {
                        this.containers[ai]._trigger("out", ag, this._uiHash(this));
                        this.containers[ai].containerCache.over = 0
                    }
                }
            }
            if (!aj) {
                return
            }
            if (this.containers.length === 1) {
                if (!this.containers[ak].containerCache.over) {
                    this.containers[ak]._trigger("over", ag, this._uiHash(this));
                    this.containers[ak].containerCache.over = 1
                }
            } else {
                af = 10000;
                al = null;
                ah = aj.floating || this._isFloating(this.currentItem);
                ao = ah ? "left" : "top";
                ap = ah ? "width" : "height";
                ad = ah ? "clientX" : "clientY";
                for (am = this.items.length - 1; am >= 0; am--) {
                    if (!a.contains(this.containers[ak].element[0], this.items[am].item[0])) {
                        continue
                    }
                    if (this.items[am].item[0] === this.currentItem[0]) {
                        continue
                    }
                    ae = this.items[am].item.offset()[ao];
                    an = false;
                    if (ag[ad] - ae > this.items[am][ap] / 2) {
                        an = true
                    }
                    if (Math.abs(ag[ad] - ae) < af) {
                        af = Math.abs(ag[ad] - ae);
                        al = this.items[am];
                        this.direction = an ? "up" : "down"
                    }
                }
                if (!al && !this.options.dropOnEmpty) {
                    return
                }
                if (this.currentContainer === this.containers[ak]) {
                    if (!this.currentContainer.containerCache.over) {
                        this.containers[ak]._trigger("over", ag, this._uiHash());
                        this.currentContainer.containerCache.over = 1
                    }
                    return
                }
                al ? this._rearrange(ag, al, null, true) : this._rearrange(ag, null, this.containers[ak].element, true);
                this._trigger("change", ag, this._uiHash());
                this.containers[ak]._trigger("change", ag, this._uiHash(this));
                this.currentContainer = this.containers[ak];
                this.options.placeholder.update(this.currentContainer, this.placeholder);
                this.containers[ak]._trigger("over", ag, this._uiHash(this));
                this.containers[ak].containerCache.over = 1
            }
        },
        _createHelper: function (ad) {
            var af = this.options,
                ae = a.isFunction(af.helper) ? a(af.helper.apply(this.element[0], [ad, this.currentItem])) : (af.helper === "clone" ? this.currentItem.clone() : this.currentItem);
            if (!ae.parents("body").length) {
                a(af.appendTo !== "parent" ? af.appendTo : this.currentItem[0].parentNode)[0].appendChild(ae[0])
            }
            if (ae[0] === this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (!ae[0].style.width || af.forceHelperSize) {
                ae.width(this.currentItem.width())
            }
            if (!ae[0].style.height || af.forceHelperSize) {
                ae.height(this.currentItem.height())
            }
            return ae
        },
        _adjustOffsetFromHelper: function (ad) {
            if (typeof ad === "string") {
                ad = ad.split(" ")
            }
            if (a.isArray(ad)) {
                ad = {
                    left: +ad[0],
                    top: +ad[1] || 0
                }
            }
            if ("left" in ad) {
                this.offset.click.left = ad.left + this.margins.left
            }
            if ("right" in ad) {
                this.offset.click.left = this.helperProportions.width - ad.right + this.margins.left
            }
            if ("top" in ad) {
                this.offset.click.top = ad.top + this.margins.top
            }
            if ("bottom" in ad) {
                this.offset.click.top = this.helperProportions.height - ad.bottom + this.margins.top
            }
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var ad = this.offsetParent.offset();
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0])) {
                ad.left += this.scrollParent.scrollLeft();
                ad.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] === this.document[0].body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && a.ui.ie)) {
                ad = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: ad.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: ad.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition === "relative") {
                var ad = this.currentItem.position();
                return {
                    top: ad.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: ad.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var ad, ae, ag, af = this.options;
            if (af.containment === "parent") {
                af.containment = this.helper[0].parentNode
            }
            if (af.containment === "document" || af.containment === "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, af.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, (af.containment === "document" ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(af.containment)) {
                ad = a(af.containment)[0];
                ae = a(af.containment).offset();
                ag = (a(ad).css("overflow") !== "hidden");
                this.containment = [ae.left + (parseInt(a(ad).css("borderLeftWidth"), 10) || 0) + (parseInt(a(ad).css("paddingLeft"), 10) || 0) - this.margins.left, ae.top + (parseInt(a(ad).css("borderTopWidth"), 10) || 0) + (parseInt(a(ad).css("paddingTop"), 10) || 0) - this.margins.top, ae.left + (ag ? Math.max(ad.scrollWidth, ad.offsetWidth) : ad.offsetWidth) - (parseInt(a(ad).css("borderLeftWidth"), 10) || 0) - (parseInt(a(ad).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, ae.top + (ag ? Math.max(ad.scrollHeight, ad.offsetHeight) : ad.offsetHeight) - (parseInt(a(ad).css("borderTopWidth"), 10) || 0) - (parseInt(a(ad).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (ad, af) {
            if (!af) {
                af = this.position
            }
            var ae = ad === "absolute" ? 1 : -1,
                ag = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                ah = (/(html|body)/i).test(ag[0].tagName);
            return {
                top: (af.top + this.offset.relative.top * ae + this.offset.parent.top * ae - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (ah ? 0 : ag.scrollTop())) * ae)),
                left: (af.left + this.offset.relative.left * ae + this.offset.parent.left * ae - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : ah ? 0 : ag.scrollLeft()) * ae))
            }
        },
        _generatePosition: function (ad) {
            var ak, ae, af = this.options,
                ag = ad.pageX,
                ah = ad.pageY,
                ai = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                aj = (/(html|body)/i).test(ai[0].tagName);
            if (this.cssPosition === "relative" && !(this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            if (this.originalPosition) {
                if (this.containment) {
                    if (ad.pageX - this.offset.click.left < this.containment[0]) {
                        ag = this.containment[0] + this.offset.click.left
                    }
                    if (ad.pageY - this.offset.click.top < this.containment[1]) {
                        ah = this.containment[1] + this.offset.click.top
                    }
                    if (ad.pageX - this.offset.click.left > this.containment[2]) {
                        ag = this.containment[2] + this.offset.click.left
                    }
                    if (ad.pageY - this.offset.click.top > this.containment[3]) {
                        ah = this.containment[3] + this.offset.click.top
                    }
                }
                if (af.grid) {
                    ak = this.originalPageY + Math.round((ah - this.originalPageY) / af.grid[1]) * af.grid[1];
                    ah = this.containment ? ((ak - this.offset.click.top >= this.containment[1] && ak - this.offset.click.top <= this.containment[3]) ? ak : ((ak - this.offset.click.top >= this.containment[1]) ? ak - af.grid[1] : ak + af.grid[1])) : ak;
                    ae = this.originalPageX + Math.round((ag - this.originalPageX) / af.grid[0]) * af.grid[0];
                    ag = this.containment ? ((ae - this.offset.click.left >= this.containment[0] && ae - this.offset.click.left <= this.containment[2]) ? ae : ((ae - this.offset.click.left >= this.containment[0]) ? ae - af.grid[0] : ae + af.grid[0])) : ae
                }
            }
            return {
                top: (ah - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (aj ? 0 : ai.scrollTop())))),
                left: (ag - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : aj ? 0 : ai.scrollLeft())))
            }
        },
        _rearrange: function (af, ah, ad, ag) {
            ad ? ad[0].appendChild(this.placeholder[0]) : ah.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? ah.item[0] : ah.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var ae = this.counter;
            this._delay(function () {
                if (ae === this.counter) {
                    this.refreshPositions(!ag)
                }
            })
        },
        _clear: function (af, ah) {
            this.reverting = false;
            var ag, ad = [];
            if (!this._noFinalSort && this.currentItem.parent().length) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] === this.currentItem[0]) {
                for (ag in this._storedCSS) {
                    if (this._storedCSS[ag] === "auto" || this._storedCSS[ag] === "static") {
                        this._storedCSS[ag] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            if (this.fromOutside && !ah) {
                ad.push(function (ai) {
                    this._trigger("receive", ai, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !ah) {
                ad.push(function (ai) {
                    this._trigger("update", ai, this._uiHash())
                })
            }
            if (this !== this.currentContainer) {
                if (!ah) {
                    ad.push(function (ai) {
                        this._trigger("remove", ai, this._uiHash())
                    });
                    ad.push((function (ai) {
                        return function (aj) {
                            ai._trigger("receive", aj, this._uiHash(this))
                        }
                    }).call(this, this.currentContainer));
                    ad.push((function (ai) {
                        return function (aj) {
                            ai._trigger("update", aj, this._uiHash(this))
                        }
                    }).call(this, this.currentContainer))
                }
            }

            function ae(ak, aj, ai) {
                return function (al) {
                    ai._trigger(ak, al, aj._uiHash(aj))
                }
            }
            for (ag = this.containers.length - 1; ag >= 0; ag--) {
                if (!ah) {
                    ad.push(ae("deactivate", this, this.containers[ag]))
                }
                if (this.containers[ag].containerCache.over) {
                    ad.push(ae("out", this, this.containers[ag]));
                    this.containers[ag].containerCache.over = 0
                }
            }
            if (this.storedCursor) {
                this.document.find("body").css("cursor", this.storedCursor);
                this.storedStylesheet.remove()
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (!ah) {
                this._trigger("beforeStop", af, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (!this.cancelHelperRemoval) {
                if (this.helper[0] !== this.currentItem[0]) {
                    this.helper.remove()
                }
                this.helper = null
            }
            if (!ah) {
                for (ag = 0; ag < ad.length; ag++) {
                    ad[ag].call(this, af)
                }
                this._trigger("stop", af, this._uiHash())
            }
            this.fromOutside = false;
            return !this.cancelHelperRemoval
        },
        _trigger: function () {
            if (a.Widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },
        _uiHash: function (ad) {
            var ae = ad || this;
            return {
                helper: ae.helper,
                placeholder: ae.placeholder || a([]),
                position: ae.position,
                originalPosition: ae.originalPosition,
                offset: ae.positionAbs,
                item: ae.currentItem,
                sender: ad ? ad.element : null
            }
        }
    });
    /*
     * jQuery UI Spinner 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/spinner/
     */
    function V(ad) {
        return function () {
            var ae = this.element.val();
            ad.apply(this, arguments);
            this._refresh();
            if (ae !== this.element.val()) {
                this._trigger("change")
            }
        }
    }
    var U = a.widget("ui.spinner", {
        version: "1.11.4",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: true,
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
            this._setOption("max", this.options.max);
            this._setOption("min", this.options.min);
            this._setOption("step", this.options.step);
            if (this.value() !== "") {
                this._value(this.element.val(), true)
            }
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function () {
            var ae = {},
                ad = this.element;
            a.each(["min", "max", "step"], function (af, ag) {
                var ah = ad.attr(ag);
                if (ah !== undefined && ah.length) {
                    ae[ag] = ah
                }
            });
            return ae
        },
        _events: {
            keydown: function (ad) {
                if (this._start(ad) && this._keydown(ad)) {
                    ad.preventDefault()
                }
            },
            keyup: "_stop",
            focus: function () {
                this.previous = this.element.val()
            },
            blur: function (ad) {
                if (this.cancelBlur) {
                    delete this.cancelBlur;
                    return
                }
                this._stop();
                this._refresh();
                if (this.previous !== this.element.val()) {
                    this._trigger("change", ad)
                }
            },
            mousewheel: function (ae, ad) {
                if (!ad) {
                    return
                }
                if (!this.spinning && !this._start(ae)) {
                    return false
                }
                this._spin((ad > 0 ? 1 : -1) * this.options.step, ae);
                clearTimeout(this.mousewheelTimer);
                this.mousewheelTimer = this._delay(function () {
                    if (this.spinning) {
                        this._stop(ae)
                    }
                }, 100);
                ae.preventDefault()
            },
            "mousedown .ui-spinner-button": function (ae) {
                var af;
                af = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val();

                function ad() {
                    var ag = this.element[0] === this.document[0].activeElement;
                    if (!ag) {
                        this.element.focus();
                        this.previous = af;
                        this._delay(function () {
                            this.previous = af
                        })
                    }
                }
                ae.preventDefault();
                ad.call(this);
                this.cancelBlur = true;
                this._delay(function () {
                    delete this.cancelBlur;
                    ad.call(this)
                });
                if (this._start(ae) === false) {
                    return
                }
                this._repeat(null, a(ae.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, ae)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function (ad) {
                if (!a(ad.currentTarget).hasClass("ui-state-active")) {
                    return
                }
                if (this._start(ad) === false) {
                    return false
                }
                this._repeat(null, a(ad.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, ad)
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function () {
            var ad = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton");
            this.buttons = ad.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all");
            if (this.buttons.height() > Math.ceil(ad.height() * 0.5) && ad.height() > 0) {
                ad.height(ad.height())
            }
            if (this.options.disabled) {
                this.disable()
            }
        },
        _keydown: function (ad) {
            var af = this.options,
                ae = a.ui.keyCode;
            switch (ad.keyCode) {
                case ae.UP:
                    this._repeat(null, 1, ad);
                    return true;
                case ae.DOWN:
                    this._repeat(null, -1, ad);
                    return true;
                case ae.PAGE_UP:
                    this._repeat(null, af.page, ad);
                    return true;
                case ae.PAGE_DOWN:
                    this._repeat(null, -af.page, ad);
                    return true
            }
            return false
        },
        _uiSpinnerHtml: function () {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
        },
        _buttonHtml: function () {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
        },
        _start: function (ad) {
            if (!this.spinning && this._trigger("start", ad) === false) {
                return false
            }
            if (!this.counter) {
                this.counter = 1
            }
            this.spinning = true;
            return true
        },
        _repeat: function (ae, af, ad) {
            ae = ae || 500;
            clearTimeout(this.timer);
            this.timer = this._delay(function () {
                this._repeat(40, af, ad)
            }, ae);
            this._spin(af * this.options.step, ad)
        },
        _spin: function (ae, ad) {
            var af = this.value() || 0;
            if (!this.counter) {
                this.counter = 1
            }
            af = this._adjustValue(af + ae * this._increment(this.counter));
            if (!this.spinning || this._trigger("spin", ad, {
                    value: af
                }) !== false) {
                this._value(af);
                this.counter++
            }
        },
        _increment: function (ad) {
            var ae = this.options.incremental;
            if (ae) {
                return a.isFunction(ae) ? ae(ad) : Math.floor(ad * ad * ad / 50000 - ad * ad / 500 + 17 * ad / 200 + 1)
            }
            return 1
        },
        _precision: function () {
            var ad = this._precisionOf(this.options.step);
            if (this.options.min !== null) {
                ad = Math.max(ad, this._precisionOf(this.options.min))
            }
            return ad
        },
        _precisionOf: function (ae) {
            var af = ae.toString(),
                ad = af.indexOf(".");
            return ad === -1 ? 0 : af.length - ad - 1
        },
        _adjustValue: function (ag) {
            var ae, ad, af = this.options;
            ae = af.min !== null ? af.min : 0;
            ad = ag - ae;
            ad = Math.round(ad / af.step) * af.step;
            ag = ae + ad;
            ag = parseFloat(ag.toFixed(this._precision()));
            if (af.max !== null && ag > af.max) {
                return af.max
            }
            if (af.min !== null && ag < af.min) {
                return af.min
            }
            return ag
        },
        _stop: function (ad) {
            if (!this.spinning) {
                return
            }
            clearTimeout(this.timer);
            clearTimeout(this.mousewheelTimer);
            this.counter = 0;
            this.spinning = false;
            this._trigger("stop", ad)
        },
        _setOption: function (ad, af) {
            if (ad === "culture" || ad === "numberFormat") {
                var ae = this._parse(this.element.val());
                this.options[ad] = af;
                this.element.val(this._format(ae));
                return
            }
            if (ad === "max" || ad === "min" || ad === "step") {
                if (typeof af === "string") {
                    af = this._parse(af)
                }
            }
            if (ad === "icons") {
                this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(af.up);
                this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(af.down)
            }
            this._super(ad, af);
            if (ad === "disabled") {
                this.widget().toggleClass("ui-state-disabled", !!af);
                this.element.prop("disabled", !!af);
                this.buttons.button(af ? "disable" : "enable")
            }
        },
        _setOptions: V(function (ad) {
            this._super(ad)
        }),
        _parse: function (ad) {
            if (typeof ad === "string" && ad !== "") {
                ad = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(ad, 10, this.options.culture) : +ad
            }
            return ad === "" || isNaN(ad) ? null : ad
        },
        _format: function (ad) {
            if (ad === "") {
                return ""
            }
            return window.Globalize && this.options.numberFormat ? Globalize.format(ad, this.options.numberFormat, this.options.culture) : ad
        },
        _refresh: function () {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        isValid: function () {
            var ad = this.value();
            if (ad === null) {
                return false
            }
            return ad === this._adjustValue(ad)
        },
        _value: function (af, ad) {
            var ae;
            if (af !== "") {
                ae = this._parse(af);
                if (ae !== null) {
                    if (!ad) {
                        ae = this._adjustValue(ae)
                    }
                    af = this._format(ae)
                }
            }
            this.element.val(af);
            this._refresh()
        },
        _destroy: function () {
            this.element.removeClass("ui-spinner-input").prop("disabled", false).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.uiSpinner.replaceWith(this.element)
        },
        stepUp: V(function (ad) {
            this._stepUp(ad)
        }),
        _stepUp: function (ad) {
            if (this._start()) {
                this._spin((ad || 1) * this.options.step);
                this._stop()
            }
        },
        stepDown: V(function (ad) {
            this._stepDown(ad)
        }),
        _stepDown: function (ad) {
            if (this._start()) {
                this._spin((ad || 1) * -this.options.step);
                this._stop()
            }
        },
        pageUp: V(function (ad) {
            this._stepUp((ad || 1) * this.options.page)
        }),
        pageDown: V(function (ad) {
            this._stepDown((ad || 1) * this.options.page)
        }),
        value: function (ad) {
            if (!arguments.length) {
                return this._parse(this.element.val())
            }
            V(this._value).call(this, ad)
        },
        widget: function () {
            return this.uiSpinner
        }
    });
    /*
     * jQuery UI Tabs 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/tabs/
     */
    var W = a.widget("ui.tabs", {
        version: "1.11.4",
        delay: 300,
        options: {
            active: null,
            collapsible: false,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _isLocal: (function () {
            var ad = /#.*$/;
            return function (ae) {
                var af, ah;
                ae = ae.cloneNode(false);
                af = ae.href.replace(ad, "");
                ah = location.href.replace(ad, "");
                try {
                    af = decodeURIComponent(af)
                } catch (ag) {}
                try {
                    ah = decodeURIComponent(ah)
                } catch (ag) {}
                return ae.hash.length > 1 && af === ah
            }
        })(),
        _create: function () {
            var ae = this,
                ad = this.options;
            this.running = false;
            this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", ad.collapsible);
            this._processTabs();
            ad.active = this._initialActive();
            if (a.isArray(ad.disabled)) {
                ad.disabled = a.unique(ad.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"), function (af) {
                    return ae.tabs.index(af)
                }))).sort()
            }
            if (this.options.active !== false && this.anchors.length) {
                this.active = this._findActive(ad.active)
            } else {
                this.active = a()
            }
            this._refresh();
            if (this.active.length) {
                this.load(ad.active)
            }
        },
        _initialActive: function () {
            var ad = this.options.active,
                ae = this.options.collapsible,
                af = location.hash.substring(1);
            if (ad === null) {
                if (af) {
                    this.tabs.each(function (ag, ah) {
                        if (a(ah).attr("aria-controls") === af) {
                            ad = ag;
                            return false
                        }
                    })
                }
                if (ad === null) {
                    ad = this.tabs.index(this.tabs.filter(".ui-tabs-active"))
                }
                if (ad === null || ad === -1) {
                    ad = this.tabs.length ? 0 : false
                }
            }
            if (ad !== false) {
                ad = this.tabs.index(this.tabs.eq(ad));
                if (ad === -1) {
                    ad = ae ? false : 0
                }
            }
            if (!ae && ad === false && this.anchors.length) {
                ad = 0
            }
            return ad
        },
        _getCreateEventData: function () {
            return {
                tab: this.active,
                panel: !this.active.length ? a() : this._getPanelForTab(this.active)
            }
        },
        _tabKeydown: function (ad) {
            var ae = a(this.document[0].activeElement).closest("li"),
                ag = this.tabs.index(ae),
                af = true;
            if (this._handlePageNav(ad)) {
                return
            }
            switch (ad.keyCode) {
                case a.ui.keyCode.RIGHT:
                case a.ui.keyCode.DOWN:
                    ag++;
                    break;
                case a.ui.keyCode.UP:
                case a.ui.keyCode.LEFT:
                    af = false;
                    ag--;
                    break;
                case a.ui.keyCode.END:
                    ag = this.anchors.length - 1;
                    break;
                case a.ui.keyCode.HOME:
                    ag = 0;
                    break;
                case a.ui.keyCode.SPACE:
                    ad.preventDefault();
                    clearTimeout(this.activating);
                    this._activate(ag);
                    return;
                case a.ui.keyCode.ENTER:
                    ad.preventDefault();
                    clearTimeout(this.activating);
                    this._activate(ag === this.options.active ? false : ag);
                    return;
                default:
                    return
            }
            ad.preventDefault();
            clearTimeout(this.activating);
            ag = this._focusNextTab(ag, af);
            if (!ad.ctrlKey && !ad.metaKey) {
                ae.attr("aria-selected", "false");
                this.tabs.eq(ag).attr("aria-selected", "true");
                this.activating = this._delay(function () {
                    this.option("active", ag)
                }, this.delay)
            }
        },
        _panelKeydown: function (ad) {
            if (this._handlePageNav(ad)) {
                return
            }
            if (ad.ctrlKey && ad.keyCode === a.ui.keyCode.UP) {
                ad.preventDefault();
                this.active.focus()
            }
        },
        _handlePageNav: function (ad) {
            if (ad.altKey && ad.keyCode === a.ui.keyCode.PAGE_UP) {
                this._activate(this._focusNextTab(this.options.active - 1, false));
                return true
            }
            if (ad.altKey && ad.keyCode === a.ui.keyCode.PAGE_DOWN) {
                this._activate(this._focusNextTab(this.options.active + 1, true));
                return true
            }
        },
        _findNextTab: function (af, ae) {
            var ag = this.tabs.length - 1;

            function ad() {
                if (af > ag) {
                    af = 0
                }
                if (af < 0) {
                    af = ag
                }
                return af
            }
            while (a.inArray(ad(), this.options.disabled) !== -1) {
                af = ae ? af + 1 : af - 1
            }
            return af
        },
        _focusNextTab: function (ae, ad) {
            ae = this._findNextTab(ae, ad);
            this.tabs.eq(ae).focus();
            return ae
        },
        _setOption: function (ad, ae) {
            if (ad === "active") {
                this._activate(ae);
                return
            }
            if (ad === "disabled") {
                this._setupDisabled(ae);
                return
            }
            this._super(ad, ae);
            if (ad === "collapsible") {
                this.element.toggleClass("ui-tabs-collapsible", ae);
                if (!ae && this.options.active === false) {
                    this._activate(0)
                }
            }
            if (ad === "event") {
                this._setupEvents(ae)
            }
            if (ad === "heightStyle") {
                this._setupHeightStyle(ae)
            }
        },
        _sanitizeSelector: function (ad) {
            return ad ? ad.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function () {
            var ae = this.options,
                ad = this.tablist.children(":has(a[href])");
            ae.disabled = a.map(ad.filter(".ui-state-disabled"), function (af) {
                return ad.index(af)
            });
            this._processTabs();
            if (ae.active === false || !this.anchors.length) {
                ae.active = false;
                this.active = a()
            } else {
                if (this.active.length && !a.contains(this.tablist[0], this.active[0])) {
                    if (this.tabs.length === ae.disabled.length) {
                        ae.active = false;
                        this.active = a()
                    } else {
                        this._activate(this._findNextTab(Math.max(0, ae.active - 1), false))
                    }
                } else {
                    ae.active = this.tabs.index(this.active)
                }
            }
            this._refresh()
        },
        _refresh: function () {
            this._setupDisabled(this.options.disabled);
            this._setupEvents(this.options.event);
            this._setupHeightStyle(this.options.heightStyle);
            this.tabs.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            });
            this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-hidden": "true"
            });
            if (!this.active.length) {
                this.tabs.eq(0).attr("tabIndex", 0)
            } else {
                this.active.addClass("ui-tabs-active ui-state-active").attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                });
                this._getPanelForTab(this.active).show().attr({
                    "aria-hidden": "false"
                })
            }
        },
        _processTabs: function () {
            var ag = this,
                af = this.tabs,
                ad = this.anchors,
                ae = this.panels;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function (ah) {
                if (a(this).is(".ui-state-disabled")) {
                    ah.preventDefault()
                }
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                if (a(this).closest("li").is(".ui-state-disabled")) {
                    this.blur()
                }
            });
            this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            });
            this.anchors = this.tabs.map(function () {
                return a("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            });
            this.panels = a();
            this.anchors.each(function (aj, ah) {
                var an, al, am, ai = a(ah).uniqueId().attr("id"),
                    ao = a(ah).closest("li"),
                    ak = ao.attr("aria-controls");
                if (ag._isLocal(ah)) {
                    an = ah.hash;
                    am = an.substring(1);
                    al = ag.element.find(ag._sanitizeSelector(an))
                } else {
                    am = ao.attr("aria-controls") || a({}).uniqueId()[0].id;
                    an = "#" + am;
                    al = ag.element.find(an);
                    if (!al.length) {
                        al = ag._createPanel(am);
                        al.insertAfter(ag.panels[aj - 1] || ag.tablist)
                    }
                    al.attr("aria-live", "polite")
                }
                if (al.length) {
                    ag.panels = ag.panels.add(al)
                }
                if (ak) {
                    ao.data("ui-tabs-aria-controls", ak)
                }
                ao.attr({
                    "aria-controls": am,
                    "aria-labelledby": ai
                });
                al.attr("aria-labelledby", ai)
            });
            this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel");
            if (af) {
                this._off(af.not(this.tabs));
                this._off(ad.not(this.anchors));
                this._off(ae.not(this.panels))
            }
        },
        _getList: function () {
            return this.tablist || this.element.find("ol,ul").eq(0)
        },
        _createPanel: function (ad) {
            return a("<div>").attr("id", ad).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", true)
        },
        _setupDisabled: function (ad) {
            if (a.isArray(ad)) {
                if (!ad.length) {
                    ad = false
                } else {
                    if (ad.length === this.anchors.length) {
                        ad = true
                    }
                }
            }
            for (var ae = 0, af;
                (af = this.tabs[ae]); ae++) {
                if (ad === true || a.inArray(ae, ad) !== -1) {
                    a(af).addClass("ui-state-disabled").attr("aria-disabled", "true")
                } else {
                    a(af).removeClass("ui-state-disabled").removeAttr("aria-disabled")
                }
            }
            this.options.disabled = ad
        },
        _setupEvents: function (ad) {
            var ae = {};
            if (ad) {
                a.each(ad.split(" "), function (ag, af) {
                    ae[af] = "_eventHandler"
                })
            }
            this._off(this.anchors.add(this.tabs).add(this.panels));
            this._on(true, this.anchors, {
                click: function (af) {
                    af.preventDefault()
                }
            });
            this._on(this.anchors, ae);
            this._on(this.tabs, {
                keydown: "_tabKeydown"
            });
            this._on(this.panels, {
                keydown: "_panelKeydown"
            });
            this._focusable(this.tabs);
            this._hoverable(this.tabs)
        },
        _setupHeightStyle: function (ad) {
            var ae, af = this.element.parent();
            if (ad === "fill") {
                ae = af.height();
                ae -= this.element.outerHeight() - this.element.height();
                this.element.siblings(":visible").each(function () {
                    var ag = a(this),
                        ah = ag.css("position");
                    if (ah === "absolute" || ah === "fixed") {
                        return
                    }
                    ae -= ag.outerHeight(true)
                });
                this.element.children().not(this.panels).each(function () {
                    ae -= a(this).outerHeight(true)
                });
                this.panels.each(function () {
                    a(this).height(Math.max(0, ae - a(this).innerHeight() + a(this).height()))
                }).css("overflow", "auto")
            } else {
                if (ad === "auto") {
                    ae = 0;
                    this.panels.each(function () {
                        ae = Math.max(ae, a(this).height("").height())
                    }).height(ae)
                }
            }
        },
        _eventHandler: function (ah) {
            var aj = this.options,
                ad = this.active,
                ae = a(ah.currentTarget),
                ak = ae.closest("li"),
                af = ak[0] === ad[0],
                ag = af && aj.collapsible,
                am = ag ? a() : this._getPanelForTab(ak),
                al = !ad.length ? a() : this._getPanelForTab(ad),
                ai = {
                    oldTab: ad,
                    oldPanel: al,
                    newTab: ag ? a() : ak,
                    newPanel: am
                };
            ah.preventDefault();
            if (ak.hasClass("ui-state-disabled") || ak.hasClass("ui-tabs-loading") || this.running || (af && !aj.collapsible) || (this._trigger("beforeActivate", ah, ai) === false)) {
                return
            }
            aj.active = ag ? false : this.tabs.index(ak);
            this.active = af ? a() : ak;
            if (this.xhr) {
                this.xhr.abort()
            }
            if (!al.length && !am.length) {
                a.error("jQuery UI Tabs: Mismatching fragment identifier.")
            }
            if (am.length) {
                this.load(this.tabs.index(ak), ah)
            }
            this._toggle(ah, ai)
        },
        _toggle: function (ae, af) {
            var ah = this,
                aj = af.newPanel,
                ai = af.oldPanel;
            this.running = true;

            function ad() {
                ah.running = false;
                ah._trigger("activate", ae, af)
            }

            function ag() {
                af.newTab.closest("li").addClass("ui-tabs-active ui-state-active");
                if (aj.length && ah.options.show) {
                    ah._show(aj, ah.options.show, ad)
                } else {
                    aj.show();
                    ad()
                }
            }
            if (ai.length && this.options.hide) {
                this._hide(ai, this.options.hide, function () {
                    af.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                    ag()
                })
            } else {
                af.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                ai.hide();
                ag()
            }
            ai.attr("aria-hidden", "true");
            af.oldTab.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            });
            if (aj.length && ai.length) {
                af.oldTab.attr("tabIndex", -1)
            } else {
                if (aj.length) {
                    this.tabs.filter(function () {
                        return a(this).attr("tabIndex") === 0
                    }).attr("tabIndex", -1)
                }
            }
            aj.attr("aria-hidden", "false");
            af.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _activate: function (af) {
            var ae, ad = this._findActive(af);
            if (ad[0] === this.active[0]) {
                return
            }
            if (!ad.length) {
                ad = this.active
            }
            ae = ad.find(".ui-tabs-anchor")[0];
            this._eventHandler({
                target: ae,
                currentTarget: ae,
                preventDefault: a.noop
            })
        },
        _findActive: function (ad) {
            return ad === false ? a() : this.tabs.eq(ad)
        },
        _getIndex: function (ad) {
            if (typeof ad === "string") {
                ad = this.anchors.index(this.anchors.filter("[href$='" + ad + "']"))
            }
            return ad
        },
        _destroy: function () {
            if (this.xhr) {
                this.xhr.abort()
            }
            this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
            this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");
            this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId();
            this.tablist.unbind(this.eventNamespace);
            this.tabs.add(this.panels).each(function () {
                if (a.data(this, "ui-tabs-destroy")) {
                    a(this).remove()
                } else {
                    a(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
                }
            });
            this.tabs.each(function () {
                var ad = a(this),
                    ae = ad.data("ui-tabs-aria-controls");
                if (ae) {
                    ad.attr("aria-controls", ae).removeData("ui-tabs-aria-controls")
                } else {
                    ad.removeAttr("aria-controls")
                }
            });
            this.panels.show();
            if (this.options.heightStyle !== "content") {
                this.panels.css("height", "")
            }
        },
        enable: function (ae) {
            var ad = this.options.disabled;
            if (ad === false) {
                return
            }
            if (ae === undefined) {
                ad = false
            } else {
                ae = this._getIndex(ae);
                if (a.isArray(ad)) {
                    ad = a.map(ad, function (af) {
                        return af !== ae ? af : null
                    })
                } else {
                    ad = a.map(this.tabs, function (af, ag) {
                        return ag !== ae ? ag : null
                    })
                }
            }
            this._setupDisabled(ad)
        },
        disable: function (ae) {
            var ad = this.options.disabled;
            if (ad === true) {
                return
            }
            if (ae === undefined) {
                ad = true
            } else {
                ae = this._getIndex(ae);
                if (a.inArray(ae, ad) !== -1) {
                    return
                }
                if (a.isArray(ad)) {
                    ad = a.merge([ae], ad).sort()
                } else {
                    ad = [ae]
                }
            }
            this._setupDisabled(ad)
        },
        load: function (ah, af) {
            ah = this._getIndex(ah);
            var ak = this,
                aj = this.tabs.eq(ah),
                ad = aj.find(".ui-tabs-anchor"),
                ai = this._getPanelForTab(aj),
                ag = {
                    tab: aj,
                    panel: ai
                },
                ae = function (al, am) {
                    if (am === "abort") {
                        ak.panels.stop(false, true)
                    }
                    aj.removeClass("ui-tabs-loading");
                    ai.removeAttr("aria-busy");
                    if (al === ak.xhr) {
                        delete ak.xhr
                    }
                };
            if (this._isLocal(ad[0])) {
                return
            }
            this.xhr = a.ajax(this._ajaxSettings(ad, af, ag));
            if (this.xhr && this.xhr.statusText !== "canceled") {
                aj.addClass("ui-tabs-loading");
                ai.attr("aria-busy", "true");
                this.xhr.done(function (am, an, al) {
                    setTimeout(function () {
                        ai.html(am);
                        ak._trigger("load", af, ag);
                        ae(al, an)
                    }, 1)
                }).fail(function (al, am) {
                    setTimeout(function () {
                        ae(al, am)
                    }, 1)
                })
            }
        },
        _ajaxSettings: function (ad, ae, af) {
            var ag = this;
            return {
                url: ad.attr("href"),
                beforeSend: function (ah, ai) {
                    return ag._trigger("beforeLoad", ae, a.extend({
                        jqXHR: ah,
                        ajaxSettings: ai
                    }, af))
                }
            }
        },
        _getPanelForTab: function (ae) {
            var ad = a(ae).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + ad))
        }
    });
    /*
     * jQuery UI Tooltip 1.11.4
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/tooltip/
     */
    var X = a.widget("ui.tooltip", {
        version: "1.11.4",
        options: {
            content: function () {
                var ad = a(this).attr("title") || "";
                return a("<a>").text(ad).html()
            },
            hide: true,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: true,
            tooltipClass: null,
            track: false,
            close: null,
            open: null
        },
        _addDescribedBy: function (ae, af) {
            var ad = (ae.attr("aria-describedby") || "").split(/\s+/);
            ad.push(af);
            ae.data("ui-tooltip-id", af).attr("aria-describedby", a.trim(ad.join(" ")))
        },
        _removeDescribedBy: function (ae) {
            var af = ae.data("ui-tooltip-id"),
                ad = (ae.attr("aria-describedby") || "").split(/\s+/),
                ag = a.inArray(af, ad);
            if (ag !== -1) {
                ad.splice(ag, 1)
            }
            ae.removeData("ui-tooltip-id");
            ad = a.trim(ad.join(" "));
            if (ad) {
                ae.attr("aria-describedby", ad)
            } else {
                ae.removeAttr("aria-describedby")
            }
        },
        _create: function () {
            this._on({
                mouseover: "open",
                focusin: "open"
            });
            this.tooltips = {};
            this.parents = {};
            if (this.options.disabled) {
                this._disable()
            }
            this.liveRegion = a("<div>").attr({
                role: "log",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)
        },
        _setOption: function (ad, af) {
            var ae = this;
            if (ad === "disabled") {
                this[af ? "_disable" : "_enable"]();
                this.options[ad] = af;
                return
            }
            this._super(ad, af);
            if (ad === "content") {
                a.each(this.tooltips, function (ag, ah) {
                    ae._updateContent(ah.element)
                })
            }
        },
        _disable: function () {
            var ad = this;
            a.each(this.tooltips, function (af, ag) {
                var ae = a.Event("blur");
                ae.target = ae.currentTarget = ag.element[0];
                ad.close(ae, true)
            });
            this.element.find(this.options.items).addBack().each(function () {
                var ae = a(this);
                if (ae.is("[title]")) {
                    ae.data("ui-tooltip-title", ae.attr("title")).removeAttr("title")
                }
            })
        },
        _enable: function () {
            this.element.find(this.options.items).addBack().each(function () {
                var ad = a(this);
                if (ad.data("ui-tooltip-title")) {
                    ad.attr("title", ad.data("ui-tooltip-title"))
                }
            })
        },
        open: function (ad) {
            var af = this,
                ae = a(ad ? ad.target : this.element).closest(this.options.items);
            if (!ae.length || ae.data("ui-tooltip-id")) {
                return
            }
            if (ae.attr("title")) {
                ae.data("ui-tooltip-title", ae.attr("title"))
            }
            ae.data("ui-tooltip-open", true);
            if (ad && ad.type === "mouseover") {
                ae.parents().each(function () {
                    var ah = a(this),
                        ag;
                    if (ah.data("ui-tooltip-open")) {
                        ag = a.Event("blur");
                        ag.target = ag.currentTarget = this;
                        af.close(ag, true)
                    }
                    if (ah.attr("title")) {
                        ah.uniqueId();
                        af.parents[this.id] = {
                            element: this,
                            title: ah.attr("title")
                        };
                        ah.attr("title", "")
                    }
                })
            }
            this._registerCloseHandlers(ad, ae);
            this._updateContent(ae, ad)
        },
        _updateContent: function (ah, af) {
            var ad, ae = this.options.content,
                ai = this,
                ag = af ? af.type : null;
            if (typeof ae === "string") {
                return this._open(af, ah, ae)
            }
            ad = ae.call(ah[0], function (aj) {
                ai._delay(function () {
                    if (!ah.data("ui-tooltip-open")) {
                        return
                    }
                    if (af) {
                        af.type = ag
                    }
                    this._open(af, ah, aj)
                })
            });
            if (ad) {
                this._open(af, ah, ad)
            }
        },
        _open: function (ag, aj, ae) {
            var al, ak, af, ad, ai = a.extend({}, this.options.position);
            if (!ae) {
                return
            }
            al = this._find(aj);
            if (al) {
                al.tooltip.find(".ui-tooltip-content").html(ae);
                return
            }
            if (aj.is("[title]")) {
                if (ag && ag.type === "mouseover") {
                    aj.attr("title", "")
                } else {
                    aj.removeAttr("title")
                }
            }
            al = this._tooltip(aj);
            ak = al.tooltip;
            this._addDescribedBy(aj, ak.attr("id"));
            ak.find(".ui-tooltip-content").html(ae);
            this.liveRegion.children().hide();
            if (ae.clone) {
                ad = ae.clone();
                ad.removeAttr("id").find("[id]").removeAttr("id")
            } else {
                ad = ae
            }
            a("<div>").html(ad).appendTo(this.liveRegion);

            function ah(am) {
                ai.of = am;
                if (ak.is(":hidden")) {
                    return
                }
                ak.position(ai)
            }
            if (this.options.track && ag && /^mouse/.test(ag.type)) {
                this._on(this.document, {
                    mousemove: ah
                });
                ah(ag)
            } else {
                ak.position(a.extend({
                    of: aj
                }, this.options.position))
            }
            ak.hide();
            this._show(ak, this.options.show);
            if (this.options.show && this.options.show.delay) {
                af = this.delayedShow = setInterval(function () {
                    if (ak.is(":visible")) {
                        ah(ai.of);
                        clearInterval(af)
                    }
                }, a.fx.interval)
            }
            this._trigger("open", ag, {
                tooltip: ak
            })
        },
        _registerCloseHandlers: function (ad, af) {
            var ae = {
                keyup: function (ag) {
                    if (ag.keyCode === a.ui.keyCode.ESCAPE) {
                        var ah = a.Event(ag);
                        ah.currentTarget = af[0];
                        this.close(ah, true)
                    }
                }
            };
            if (af[0] !== this.element[0]) {
                ae.remove = function () {
                    this._removeTooltip(this._find(af).tooltip)
                }
            }
            if (!ad || ad.type === "mouseover") {
                ae.mouseleave = "close"
            }
            if (!ad || ad.type === "focusin") {
                ae.focusout = "close"
            }
            this._on(true, af, ae)
        },
        close: function (ad) {
            var ag, af = this,
                ae = a(ad ? ad.currentTarget : this.element),
                ah = this._find(ae);
            if (!ah) {
                ae.removeData("ui-tooltip-open");
                return
            }
            ag = ah.tooltip;
            if (ah.closing) {
                return
            }
            clearInterval(this.delayedShow);
            if (ae.data("ui-tooltip-title") && !ae.attr("title")) {
                ae.attr("title", ae.data("ui-tooltip-title"))
            }
            this._removeDescribedBy(ae);
            ah.hiding = true;
            ag.stop(true);
            this._hide(ag, this.options.hide, function () {
                af._removeTooltip(a(this))
            });
            ae.removeData("ui-tooltip-open");
            this._off(ae, "mouseleave focusout keyup");
            if (ae[0] !== this.element[0]) {
                this._off(ae, "remove")
            }
            this._off(this.document, "mousemove");
            if (ad && ad.type === "mouseleave") {
                a.each(this.parents, function (ai, aj) {
                    a(aj.element).attr("title", aj.title);
                    delete af.parents[ai]
                })
            }
            ah.closing = true;
            this._trigger("close", ad, {
                tooltip: ag
            });
            if (!ah.hiding) {
                ah.closing = false
            }
        },
        _tooltip: function (ad) {
            var af = a("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),
                ae = af.uniqueId().attr("id");
            a("<div>").addClass("ui-tooltip-content").appendTo(af);
            af.appendTo(this.document[0].body);
            return this.tooltips[ae] = {
                element: ad,
                tooltip: af
            }
        },
        _find: function (ae) {
            var ad = ae.data("ui-tooltip-id");
            return ad ? this.tooltips[ad] : null
        },
        _removeTooltip: function (ad) {
            ad.remove();
            delete this.tooltips[ad.attr("id")]
        },
        _destroy: function () {
            var ad = this;
            a.each(this.tooltips, function (ag, ah) {
                var af = a.Event("blur"),
                    ae = ah.element;
                af.target = af.currentTarget = ae[0];
                ad.close(af, true);
                a("#" + ag).remove();
                if (ae.data("ui-tooltip-title")) {
                    if (!ae.attr("title")) {
                        ae.attr("title", ae.data("ui-tooltip-title"))
                    }
                    ae.removeData("ui-tooltip-title")
                }
            });
            this.liveRegion.remove()
        }
    })
}));