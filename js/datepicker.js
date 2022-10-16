! function (E, m) {
    function x() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    function b() {
        var a = new Date;
        return x(a.getFullYear(), a.getMonth(), a.getDate())
    }

    function D(a) {
        return function () {
            return this[a].apply(this, arguments)
        }
    }

    function z(d, g) {
        function c(h, a) {
            return a.toLowerCase()
        }
        var u, l = E(d).data(),
            t = {},
            f = new RegExp("^" + g.toLowerCase() + "([A-Z])");
        g = new RegExp("^" + g.toLowerCase());
        for (var p in l) {
            g.test(p) && (u = p.replace(f, c), t[u] = l[p])
        }
        return t
    }

    function C(d) {
        var f = {};
        if (q[d] || (d = d.split("-")[0], q[d])) {
            var c = q[d];
            return E.each(B, function (g, a) {
                a in c && (f[a] = c[a])
            }), f
        }
    }
    var w = E(window),
        A = function () {
            var a = {
                get: function (c) {
                    return this.slice(c)[0]
                },
                contains: function (g) {
                    for (var d = g && g.valueOf(), f = 0, c = this.length; c > f; f++) {
                        if (this[f].valueOf() === d) {
                            return f
                        }
                    }
                    return -1
                },
                remove: function (c) {
                    this.splice(c, 1)
                },
                replace: function (c) {
                    c && (E.isArray(c) || (c = [c]), this.clear(), this.push.apply(this, c))
                },
                clear: function () {
                    this.splice(0)
                },
                copy: function () {
                    var c = new A;
                    return c.replace(this), c
                }
            };
            return function () {
                var c = [];
                return c.push.apply(c, arguments), E.extend(c, a), c
            }
        }(),
        k = function (a, c) {
            this.dates = new A, this.viewDate = b(), this.focusDate = null, this._process_options(c), this.element = E(a), this.isInline = !1, this.isInput = this.element.is("input"), this.component = this.element.is(".date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = E(v.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("tfoot th.today").attr("colspan", function (f, d) {
                return parseInt(d) + 1
            }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
        };
    k.prototype = {
        constructor: k,
        _process_options: function (d) {
            this._o = E.extend({}, this._o, d);
            var f = this.o = E.extend({}, this._o),
                c = f.language;
            switch (q[c] || (c = c.split("-")[0], q[c] || (c = F.language)), f.language = c, f.startView) {
                case 2:
                case "decade":
                    f.startView = 2;
                    break;
                case 1:
                case "year":
                    f.startView = 1;
                    break;
                default:
                    f.startView = 0
            }
            switch (f.minViewMode) {
                case 1:
                case "months":
                    f.minViewMode = 1;
                    break;
                case 2:
                case "years":
                    f.minViewMode = 2;
                    break;
                default:
                    f.minViewMode = 0
            }
            f.startView = Math.max(f.startView, f.minViewMode), f.multidate !== !0 && (f.multidate = Number(f.multidate) || !1, f.multidate = f.multidate !== !1 ? Math.max(0, f.multidate) : 1), f.multidateSeparator = String(f.multidateSeparator), f.weekStart %= 7, f.weekEnd = (f.weekStart + 6) % 7;
            var l = v.parseFormat(f.format);
            f.startDate !== -1 / 0 && (f.startDate = f.startDate ? f.startDate instanceof Date ? this._local_to_utc(this._zero_time(f.startDate)) : v.parseDate(f.startDate, l, f.language) : -1 / 0), 1 / 0 !== f.endDate && (f.endDate = f.endDate ? f.endDate instanceof Date ? this._local_to_utc(this._zero_time(f.endDate)) : v.parseDate(f.endDate, l, f.language) : 1 / 0), f.daysOfWeekDisabled = f.daysOfWeekDisabled || [], E.isArray(f.daysOfWeekDisabled) || (f.daysOfWeekDisabled = f.daysOfWeekDisabled.split(/[,\s]*/)), f.daysOfWeekDisabled = E.map(f.daysOfWeekDisabled, function (a) {
                return parseInt(a, 10)
            });
            var g = String(f.orientation).toLowerCase().split(/\s+/g),
                h = f.orientation.toLowerCase();
            if (g = E.grep(g, function (a) {
                return /^auto|left|right|top|bottom$/.test(a)
            }), f.orientation = {
                x: "auto",
                y: "auto"
            }, h && "auto" !== h) {
                if (1 === g.length) {
                    switch (g[0]) {
                        case "top":
                        case "bottom":
                            f.orientation.y = g[0];
                            break;
                        case "left":
                        case "right":
                            f.orientation.x = g[0]
                    }
                } else {
                    h = E.grep(g, function (a) {
                        return /^left|right$/.test(a)
                    }), f.orientation.x = h[0] || "auto", h = E.grep(g, function (a) {
                        return /^top|bottom$/.test(a)
                    }), f.orientation.y = h[0] || "auto"
                }
            } else { }
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function (g) {
            for (var d, c, f, e = 0; e < g.length; e++) {
                d = g[e][0], 2 === g[e].length ? (c = m, f = g[e][1]) : 3 === g[e].length && (c = g[e][1], f = g[e][2]), d.on(f, c)
            }
        },
        _unapplyEvents: function (g) {
            for (var d, c, f, e = 0; e < g.length; e++) {
                d = g[e][0], 2 === g[e].length ? (f = m, c = g[e][1]) : 3 === g[e].length && (f = g[e][1], c = g[e][2]), d.off(c, f)
            }
        },
        _buildEvents: function () {
            this.isInput ? this._events = [
                [this.element, {
                    focus: E.proxy(this.show, this),
                    keyup: E.proxy(function (a) {
                        -1 === E.inArray(a.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                    }, this),
                    keydown: E.proxy(this.keydown, this)
                }]
            ] : this.component && this.hasInput ? this._events = [
                [this.element.find("input"), {
                    focus: E.proxy(this.show, this),
                    keyup: E.proxy(function (a) {
                        -1 === E.inArray(a.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                    }, this),
                    keydown: E.proxy(this.keydown, this)
                }],
                [this.component, {
                    click: E.proxy(this.show, this)
                }]
            ] : this.element.is("div") ? this.isInline = !0 : this._events = [
                [this.element, {
                    click: E.proxy(this.show, this)
                }]
            ], this._events.push([this.element, "*", {
                blur: E.proxy(function (a) {
                    this._focused_from = a.target
                }, this)
            }], [this.element, {
                blur: E.proxy(function (a) {
                    this._focused_from = a.target
                }, this)
            }]), this._secondaryEvents = [
                [this.picker, {
                    click: E.proxy(this.click, this)
                }],
                [E(window), {
                    resize: E.proxy(this.place, this)
                }],
                [E(document), {
                    "mousedown touchstart": E.proxy(function (a) {
                        this.element.is(a.target) || this.element.find(a.target).length || this.picker.is(a.target) || this.picker.find(a.target).length || this.hide()
                    }, this)
                }]
            ]
        },
        _attachEvents: function () {
            this._detachEvents(), this._applyEvents(this._events)
        },
        _detachEvents: function () {
            this._unapplyEvents(this._events)
        },
        _attachSecondaryEvents: function () {
            this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
        },
        _detachSecondaryEvents: function () {
            this._unapplyEvents(this._secondaryEvents)
        },
        _trigger: function (d, f) {
            var c = f || this.dates.get(-1),
                g = this._utc_to_local(c);
            this.element.trigger({
                type: d,
                date: g,
                dates: E.map(this.dates, this._utc_to_local),
                format: E.proxy(function (l, a) {
                    0 === arguments.length ? (l = this.dates.length - 1, a = this.o.format) : "string" == typeof l && (a = l, l = this.dates.length - 1), a = a || this.o.format;
                    var h = this.dates.get(l);
                    return v.formatDate(h, a, this.o.language)
                }, this)
            })
        },
        show: function () {
            this.isInline || this.picker.appendTo("body"), this.picker.show(), this.place(), this._attachSecondaryEvents(), this._trigger("show")
        },
        hide: function () {
            this.isInline || this.picker.is(":visible") && (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide"))
        },
        remove: function () {
            this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date
        },
        _utc_to_local: function (a) {
            return a && new Date(a.getTime() + 60000 * a.getTimezoneOffset())
        },
        _local_to_utc: function (a) {
            return a && new Date(a.getTime() - 60000 * a.getTimezoneOffset())
        },
        _zero_time: function (a) {
            return a && new Date(a.getFullYear(), a.getMonth(), a.getDate())
        },
        _zero_utc_time: function (a) {
            return a && new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()))
        },
        getDates: function () {
            return E.map(this.dates, this._utc_to_local)
        },
        getUTCDates: function () {
            return E.map(this.dates, function (a) {
                return new Date(a)
            })
        },
        getDate: function () {
            return this._utc_to_local(this.getUTCDate())
        },
        getUTCDate: function () {
            return new Date(this.dates.get(-1))
        },
        setDates: function () {
            var a = E.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, a), this._trigger("changeDate"), this.setValue()
        },
        setUTCDates: function () {
            var a = E.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, E.map(a, this._utc_to_local)), this._trigger("changeDate"), this.setValue()
        },
        setDate: D("setDates"),
        setUTCDate: D("setUTCDates"),
        setValue: function () {
            var a = this.getFormattedDate();
            this.isInput ? this.element.val(a).change() : this.component && this.element.find("input").val(a).change()
        },
        getFormattedDate: function (d) {
            d === m && (d = this.o.format);
            var c = this.o.language;
            return E.map(this.dates, function (a) {
                return v.formatDate(a, d, c)
            }).join(this.o.multidateSeparator)
        },
        setStartDate: function (a) {
            this._process_options({
                startDate: a
            }), this.update(), this.updateNavArrows()
        },
        setEndDate: function (a) {
            this._process_options({
                endDate: a
            }), this.update(), this.updateNavArrows()
        },
        setDaysOfWeekDisabled: function (a) {
            this._process_options({
                daysOfWeekDisabled: a
            }), this.update(), this.updateNavArrows()
        },
        place: function () {
            if (!this.isInline) {
                var H = this.picker.outerWidth(),
                    K = this.picker.outerHeight(),
                    h = 10,
                    Q = w.width(),
                    M = w.height(),
                    P = w.scrollTop(),
                    N = parseInt(this.element.parents().filter(function () {
                        return "auto" !== E(this).css("z-index")
                    }).first().css("z-index")) + 10,
                    G = this.component ? this.component.parent().offset() : this.element.offset(),
                    L = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                    t = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                    R = G.left,
                    O = G.top;
                this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (R -= H - t)) : (this.picker.addClass("datepicker-orient-left"), G.left < 0 ? R -= G.left - h : G.left + H > Q && (R = Q - H - h));
                var I, J, S = this.o.orientation.y;
                "auto" === S && (I = -P + G.top - K, J = P + M - (G.top + L + K), S = Math.max(I, J) === J ? "top" : "bottom"), this.picker.addClass("datepicker-orient-" + S), "top" === S ? O += L : O -= K + parseInt(this.picker.css("padding-top")), this.picker.css({
                    top: O,
                    left: R,
                    zIndex: N
                })
            }
        },
        _allow_update: !0,
        update: function () {
            if (this._allow_update) {
                var d = this.dates.copy(),
                    f = [],
                    c = !1;
                arguments.length ? (E.each(arguments, E.proxy(function (g, a) {
                    a instanceof Date && (a = this._local_to_utc(a)), f.push(a)
                }, this)), c = !0) : (f = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), f = f && this.o.multidate ? f.split(this.o.multidateSeparator) : [f], delete this.element.data().date), f = E.map(f, E.proxy(function (a) {
                    return v.parseDate(a, this.o.format, this.o.language)
                }, this)), f = E.grep(f, E.proxy(function (a) {
                    return a < this.o.startDate || a > this.o.endDate || !a
                }, this), !0), this.dates.replace(f), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)), c ? this.setValue() : f.length && String(d) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && d.length && this._trigger("clearDate"), this.fill()
            }
        },
        fillDow: function () {
            var d = this.o.weekStart,
                a = "<tr>";
            if (this.o.calendarWeeks) {
                var c = '<th class="cw">&nbsp;</th>';
                a += c, this.picker.find(".datepicker-days thead tr:first-child").prepend(c)
            }
            for (; d < this.o.weekStart + 7;) {
                a += '<th class="dow">' + q[this.o.language].daysMin[d++ % 7] + "</th>"
            }
            a += "</tr>", this.picker.find(".datepicker-days thead").append(a)
        },
        fillMonths: function () {
            for (var c = "", a = 0; 12 > a;) {
                c += '<span class="month">' + q[this.o.language].monthsShort[a++] + "</span>"
            }
            this.picker.find(".datepicker-months td").html(c)
        },
        setRange: function (a) {
            a && a.length ? this.range = E.map(a, function (c) {
                return c.valueOf()
            }) : delete this.range, this.fill()
        },
        getClassNames: function (d) {
            var f = [],
                c = this.viewDate.getUTCFullYear(),
                h = this.viewDate.getUTCMonth(),
                g = new Date;
            return d.getUTCFullYear() < c || d.getUTCFullYear() === c && d.getUTCMonth() < h ? f.push("old") : (d.getUTCFullYear() > c || d.getUTCFullYear() === c && d.getUTCMonth() > h) && f.push("new"), this.focusDate && d.valueOf() === this.focusDate.valueOf() && f.push("focused"), this.o.todayHighlight && d.getUTCFullYear() === g.getFullYear() && d.getUTCMonth() === g.getMonth() && d.getUTCDate() === g.getDate() && f.push("today"), -1 !== this.dates.contains(d) && f.push("active"), (d.valueOf() < this.o.startDate || d.valueOf() > this.o.endDate || -1 !== E.inArray(d.getUTCDay(), this.o.daysOfWeekDisabled)) && f.push("disabled"), this.range && (d > this.range[0] && d < this.range[this.range.length - 1] && f.push("range"), -1 !== E.inArray(d.valueOf(), this.range) && f.push("selected")), f
        },
        fill: function () {
            var f, V = new Date(this.viewDate),
                O = V.getUTCFullYear(),
                R = V.getUTCMonth(),
                I = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                P = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                G = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCFullYear() : 1 / 0,
                K = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCMonth() : 1 / 0,
                i = q[this.o.language].today || q.en.today || "",
                Y = q[this.o.language].clear || q.en.clear || "";
            this.picker.find(".datepicker-days thead th.datepicker-switch").text(q[this.o.language].months[R] + " " + O), this.picker.find("tfoot th.today").text(i).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot th.clear").text(Y).toggle(this.o.clearBtn !== !1), this.updateNavArrows(), this.fillMonths();
            var Q = x(O, R - 1, 28),
                aa = v.getDaysInMonth(Q.getUTCFullYear(), Q.getUTCMonth());
            Q.setUTCDate(aa), Q.setUTCDate(aa - (Q.getUTCDay() - this.o.weekStart + 7) % 7);
            var H = new Date(Q);
            H.setUTCDate(H.getUTCDate() + 42), H = H.valueOf();
            for (var L, ad = []; Q.valueOf() < H;) {
                if (Q.getUTCDay() === this.o.weekStart && (ad.push("<tr>"), this.o.calendarWeeks)) {
                    var ab = new Date(+Q + (this.o.weekStart - Q.getUTCDay() - 7) % 7 * 86400000),
                        J = new Date(Number(ab) + (11 - ab.getUTCDay()) % 7 * 86400000),
                        e = new Date(Number(e = x(J.getUTCFullYear(), 0, 1)) + (11 - e.getUTCDay()) % 7 * 86400000),
                        t = (J - e) / 86400000 / 7 + 1;
                    ad.push('<td class="cw">' + t + "</td>")
                }
                if (L = this.getClassNames(Q), L.push("day"), this.o.beforeShowDay !== E.noop) {
                    var X = this.o.beforeShowDay(this._utc_to_local(Q));
                    X === m ? X = {} : "boolean" == typeof X ? X = {
                        enabled: X
                    } : "string" == typeof X && (X = {
                        classes: X
                    }), X.enabled === !1 && L.push("disabled"), X.classes && (L = L.concat(X.classes.split(/\s+/))), X.tooltip && (f = X.tooltip)
                }
                L = E.unique(L), ad.push('<td class="' + L.join(" ") + '"' + (f ? ' title="' + f + '"' : "") + ">" + Q.getUTCDate() + "</td>"), Q.getUTCDay() === this.o.weekEnd && ad.push("</tr>"), Q.setUTCDate(Q.getUTCDate() + 1)
            }
            this.picker.find(".datepicker-days tbody").empty().append(ad.join(""));
            var g = this.picker.find(".datepicker-months").find("th:eq(1)").text(O).end().find("span").removeClass("active");
            E.each(this.dates, function (c, a) {
                a.getUTCFullYear() === O && g.eq(a.getUTCMonth()).addClass("active")
            }), (I > O || O > G) && g.addClass("disabled"), O === I && g.slice(0, P).addClass("disabled"), O === G && g.slice(K + 1).addClass("disabled"), ad = "", O = 10 * parseInt(O / 10, 10);
            var Z = this.picker.find(".datepicker-years").find("th:eq(1)").text(O + "-" + (O + 9)).end().find("td");
            O -= 1;
            for (var N, ac = E.map(this.dates, function (a) {
                return a.getUTCFullYear()
            }), W = -1; 11 > W; W++) {
                N = ["year"], -1 === W ? N.push("old") : 10 === W && N.push("new"), -1 !== E.inArray(O, ac) && N.push("active"), (I > O || O > G) && N.push("disabled"), ad += '<span class="' + N.join(" ") + '">' + O + "</span>", O += 1
            }
            Z.html(ad)
        },
        updateNavArrows: function () {
            if (this._allow_update) {
                var d = new Date(this.viewDate),
                    a = d.getUTCFullYear(),
                    c = d.getUTCMonth();
                switch (this.viewMode) {
                    case 0:
                        this.o.startDate !== -1 / 0 && a <= this.o.startDate.getUTCFullYear() && c <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({
                            visibility: "hidden"
                        }) : this.picker.find(".prev").css({
                            visibility: "visible"
                        }), 1 / 0 !== this.o.endDate && a >= this.o.endDate.getUTCFullYear() && c >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({
                            visibility: "hidden"
                        }) : this.picker.find(".next").css({
                            visibility: "visible"
                        });
                        break;
                    case 1:
                    case 2:
                        this.o.startDate !== -1 / 0 && a <= this.o.startDate.getUTCFullYear() ? this.picker.find(".prev").css({
                            visibility: "hidden"
                        }) : this.picker.find(".prev").css({
                            visibility: "visible"
                        }), 1 / 0 !== this.o.endDate && a >= this.o.endDate.getUTCFullYear() ? this.picker.find(".next").css({
                            visibility: "hidden"
                        }) : this.picker.find(".next").css({
                            visibility: "visible"
                        })
                }
            }
        },
        click: function (g) {
            g.preventDefault();
            var c, H, t, G = E(g.target).closest("span, td, th");
            if (1 === G.length) {
                switch (G[0].nodeName.toLowerCase()) {
                    case "th":
                        switch (G[0].className) {
                            case "datepicker-switch":
                                this.showMode(1);
                                break;
                            case "prev":
                            case "next":
                                var i = v.modes[this.viewMode].navStep * ("prev" === G[0].className ? -1 : 1);
                                switch (this.viewMode) {
                                    case 0:
                                        this.viewDate = this.moveMonth(this.viewDate, i), this._trigger("changeMonth", this.viewDate);
                                        break;
                                    case 1:
                                    case 2:
                                        this.viewDate = this.moveYear(this.viewDate, i), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)
                                }
                                this.fill();
                                break;
                            case "today":
                                var u = new Date;
                                u = x(u.getFullYear(), u.getMonth(), u.getDate(), 0, 0, 0), this.showMode(-2);
                                var f = "linked" === this.o.todayBtn ? null : "view";
                                this._setDate(u, f);
                                break;
                            case "clear":
                                var p;
                                this.isInput ? p = this.element : this.component && (p = this.element.find("input")), p && p.val("").change(), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
                        }
                        break;
                    case "span":
                        G.is(".disabled") || (this.viewDate.setUTCDate(1), G.is(".month") ? (t = 1, H = G.parent().find("span").index(G), c = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(H), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode && this._setDate(x(c, H, t))) : (t = 1, H = 0, c = parseInt(G.text(), 10) || 0, this.viewDate.setUTCFullYear(c), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(x(c, H, t))), this.showMode(-1), this.fill());
                        break;
                    case "td":
                        G.is(".day") && !G.is(".disabled") && (t = parseInt(G.text(), 10) || 1, c = this.viewDate.getUTCFullYear(), H = this.viewDate.getUTCMonth(), G.is(".old") ? 0 === H ? (H = 11, c -= 1) : H -= 1 : G.is(".new") && (11 === H ? (H = 0, c += 1) : H += 1), this._setDate(x(c, H, t)))
                }
            }
            this.picker.is(":visible") && this._focused_from && E(this._focused_from).focus(), delete this._focused_from
        },
        _toggle_multidate: function (c) {
            var a = this.dates.contains(c);
            if (c ? -1 !== a ? this.dates.remove(a) : this.dates.push(c) : this.dates.clear(), "number" == typeof this.o.multidate) {
                for (; this.dates.length > this.o.multidate;) {
                    this.dates.remove(0)
                }
            }
        },
        _setDate: function (d, a) {
            a && "date" !== a || this._toggle_multidate(d && new Date(d)), a && "view" !== a || (this.viewDate = d && new Date(d)), this.fill(), this.setValue(), this._trigger("changeDate");
            var c;
            this.isInput ? c = this.element : this.component && (c = this.element.find("input")), c && c.change(), !this.o.autoclose || a && "date" !== a || this.hide()
        },
        moveMonth: function (H, g) {
            if (!H) {
                return m
            }
            if (!g) {
                return H
            }
            var c, G, l = new Date(H.valueOf()),
                u = l.getUTCDate(),
                f = l.getUTCMonth(),
                p = Math.abs(g);
            if (g = g > 0 ? 1 : -1, 1 === p) {
                G = -1 === g ? function () {
                    return l.getUTCMonth() === f
                } : function () {
                    return l.getUTCMonth() !== c
                }, c = f + g, l.setUTCMonth(c), (0 > c || c > 11) && (c = (c + 12) % 12)
            } else {
                for (var e = 0; p > e; e++) {
                    l = this.moveMonth(l, g)
                }
                c = l.getUTCMonth(), l.setUTCDate(u), G = function () {
                    return c !== l.getUTCMonth()
                }
            }
            for (; G();) {
                l.setUTCDate(--u), l.setUTCMonth(c)
            }
            return l
        },
        moveYear: function (c, a) {
            return this.moveMonth(c, 12 * a)
        },
        dateWithinRange: function (a) {
            return a >= this.o.startDate && a <= this.o.endDate
        },
        keydown: function (o) {
            if (this.picker.is(":not(:visible)")) {
                return 27 === o.keyCode && this.show(), void 0
            }
            var a, d, l, f = !1,
                g = this.focusDate || this.viewDate;
            switch (o.keyCode) {
                case 27:
                    this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), o.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.o.keyboardNavigation) {
                        break
                    }
                    a = 37 === o.keyCode ? -1 : 1, o.ctrlKey ? (d = this.moveYear(this.dates.get(-1) || b(), a), l = this.moveYear(g, a), this._trigger("changeYear", this.viewDate)) : o.shiftKey ? (d = this.moveMonth(this.dates.get(-1) || b(), a), l = this.moveMonth(g, a), this._trigger("changeMonth", this.viewDate)) : (d = new Date(this.dates.get(-1) || b()), d.setUTCDate(d.getUTCDate() + a), l = new Date(g), l.setUTCDate(g.getUTCDate() + a)), this.dateWithinRange(d) && (this.focusDate = this.viewDate = l, this.setValue(), this.fill(), o.preventDefault());
                    break;
                case 38:
                case 40:
                    if (!this.o.keyboardNavigation) {
                        break
                    }
                    a = 38 === o.keyCode ? -1 : 1, o.ctrlKey ? (d = this.moveYear(this.dates.get(-1) || b(), a), l = this.moveYear(g, a), this._trigger("changeYear", this.viewDate)) : o.shiftKey ? (d = this.moveMonth(this.dates.get(-1) || b(), a), l = this.moveMonth(g, a), this._trigger("changeMonth", this.viewDate)) : (d = new Date(this.dates.get(-1) || b()), d.setUTCDate(d.getUTCDate() + 7 * a), l = new Date(g), l.setUTCDate(g.getUTCDate() + 7 * a)), this.dateWithinRange(d) && (this.focusDate = this.viewDate = l, this.setValue(), this.fill(), o.preventDefault());
                    break;
                case 32:
                    break;
                case 13:
                    g = this.focusDate || this.dates.get(-1) || this.viewDate, this._toggle_multidate(g), f = !0, this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (o.preventDefault(), this.o.autoclose && this.hide());
                    break;
                case 9:
                    this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
            }
            if (f) {
                this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate");
                var c;
                this.isInput ? c = this.element : this.component && (c = this.element.find("input")), c && c.change()
            }
        },
        showMode: function (a) {
            a && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + a))), this.picker.find(">div").hide().filter(".datepicker-" + v.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
        }
    };
    var y = function (a, c) {
        this.element = E(a), this.inputs = E.map(c.inputs, function (d) {
            return d.jquery ? d[0] : d
        }), delete c.inputs, E(this.inputs).datepicker(c).bind("changeDate", E.proxy(this.dateUpdated, this)), this.pickers = E.map(this.inputs, function (d) {
            return E(d).data("datepicker")
        }), this.updateDates()
    };
    y.prototype = {
        updateDates: function () {
            this.dates = E.map(this.pickers, function (a) {
                return a.getUTCDate()
            }), this.updateRanges()
        },
        updateRanges: function () {
            var a = E.map(this.dates, function (c) {
                return c.valueOf()
            });
            E.each(this.pickers, function (d, c) {
                c.setRange(a)
            })
        },
        dateUpdated: function (d) {
            if (!this.updating) {
                this.updating = !0;
                var f = E(d.target).data("datepicker"),
                    c = f.getUTCDate(),
                    h = E.inArray(d.target, this.inputs),
                    g = this.inputs.length;
                if (-1 !== h) {
                    if (E.each(this.pickers, function (i, a) {
                        a.getUTCDate() || a.setUTCDate(c)
                    }), c < this.dates[h]) {
                        for (; h >= 0 && c < this.dates[h];) {
                            this.pickers[h--].setUTCDate(c)
                        }
                    } else {
                        if (c > this.dates[h]) {
                            for (; g > h && c > this.dates[h];) {
                                this.pickers[h++].setUTCDate(c)
                            }
                        }
                    }
                    this.updateDates(), delete this.updating
                }
            }
        },
        remove: function () {
            E.map(this.pickers, function (a) {
                a.remove()
            }), delete this.element.data().datepicker
        }
    };
    var j = E.fn.datepicker;
    E.fn.datepicker = function (d) {
        var c = Array.apply(null, arguments);
        c.shift();
        var e;
        return this.each(function () {
            var r = E(this),
                s = r.data("datepicker"),
                a = "object" == typeof d && d;
            if (!s) {
                var t = z(this, "date"),
                    l = E.extend({}, F, t, a),
                    n = C(l.language),
                    u = E.extend({}, F, n, t, a);
                if (r.is(".input-daterange") || u.inputs) {
                    var i = {
                        inputs: u.inputs || r.find("input").toArray()
                    };
                    r.data("datepicker", s = new y(this, E.extend(u, i)))
                } else {
                    r.data("datepicker", s = new k(this, u))
                }
            }
            return "string" == typeof d && "function" == typeof s[d] && (e = s[d].apply(s, c), e !== m) ? !1 : void 0
        }), e !== m ? e : this
    };
    var F = E.fn.datepicker.defaults = {
        autoclose: !1,
        beforeShowDay: E.noop,
        calendarWeeks: !1,
        clearBtn: !1,
        daysOfWeekDisabled: [],
        endDate: 1 / 0,
        forceParse: !0,
        format: "mm/dd/yyyy",
        keyboardNavigation: !0,
        language: "en",
        minViewMode: 0,
        multidate: !1,
        multidateSeparator: ",",
        orientation: "auto",
        rtl: !1,
        startDate: -1 / 0,
        startView: 0,
        todayBtn: !1,
        todayHighlight: !1,
        weekStart: 0
    },
        B = E.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    E.fn.datepicker.Constructor = k;
    var q = E.fn.datepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear"
        }
    },
        v = {
            modes: [{
                clsName: "days",
                navFnc: "Month",
                navStep: 1
            }, {
                clsName: "months",
                navFnc: "FullYear",
                navStep: 1
            }, {
                clsName: "years",
                navFnc: "FullYear",
                navStep: 10
            }],
            isLeapYear: function (a) {
                return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
            },
            getDaysInMonth: function (c, a) {
                return [31, v.isLeapYear(c) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][a]
            },
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
            parseFormat: function (d) {
                var a = d.replace(this.validParts, "\x00").split("\x00"),
                    c = d.match(this.validParts);
                if (!a || !a.length || !c || 0 === c.length) {
                    throw new Error("Invalid date format.")
                }
                return {
                    separators: a,
                    parts: c
                }
            },
            parseDate: function (e, N, J) {
                function M() {
                    var c = this.slice(0, O[H].length),
                        a = O[H].slice(0, c.length);
                    return c === a
                }
                if (!e) {
                    return m
                }
                if (e instanceof Date) {
                    return e
                }
                "string" == typeof N && (N = v.parseFormat(N));
                var t, K, H, f = /([\-+]\d+)([dmwy])/,
                    O = e.match(/([\-+]\d+)([dmwy])/g);
                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)) {
                    for (e = new Date, H = 0; H < O.length; H++) {
                        switch (t = f.exec(O[H]), K = parseInt(t[1]), t[2]) {
                            case "d":
                                e.setUTCDate(e.getUTCDate() + K);
                                break;
                            case "m":
                                e = k.prototype.moveMonth.call(k.prototype, e, K);
                                break;
                            case "w":
                                e.setUTCDate(e.getUTCDate() + 7 * K);
                                break;
                            case "y":
                                e = k.prototype.moveYear.call(k.prototype, e, K)
                        }
                    }
                    return x(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), 0, 0, 0)
                }
                O = e && e.match(this.nonpunctuation) || [], e = new Date;
                var L, P, i = {},
                    I = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                    R = {
                        yyyy: function (c, a) {
                            return c.setUTCFullYear(a)
                        },
                        yy: function (c, a) {
                            return c.setUTCFullYear(2000 + a)
                        },
                        m: function (c, a) {
                            if (isNaN(c)) {
                                return c
                            }
                            for (a -= 1; 0 > a;) {
                                a += 12
                            }
                            for (a %= 12, c.setUTCMonth(a); c.getUTCMonth() !== a;) {
                                c.setUTCDate(c.getUTCDate() - 1)
                            }
                            return c
                        },
                        d: function (c, a) {
                            return c.setUTCDate(a)
                        }
                    };
                R.M = R.MM = R.mm = R.m, R.dd = R.d, e = x(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0);
                var Q = N.parts.slice();
                if (O.length !== Q.length && (Q = E(Q).filter(function (a, c) {
                    return -1 !== E.inArray(c, I)
                }).toArray()), O.length === Q.length) {
                    var G;
                    for (H = 0, G = Q.length; G > H; H++) {
                        if (L = parseInt(O[H], 10), t = Q[H], isNaN(L)) {
                            switch (t) {
                                case "MM":
                                    P = E(q[J].months).filter(M), L = E.inArray(P[0], q[J].months) + 1;
                                    break;
                                case "M":
                                    P = E(q[J].monthsShort).filter(M), L = E.inArray(P[0], q[J].monthsShort) + 1
                            }
                        }
                        i[t] = L
                    }
                    var d, g;
                    for (H = 0; H < I.length; H++) {
                        g = I[H], g in i && !isNaN(i[g]) && (d = new Date(e), R[g](d, i[g]), isNaN(d) || (e = d))
                    }
                }
                return e
            },
            formatDate: function (d, g, c) {
                if (!d) {
                    return ""
                }
                "string" == typeof g && (g = v.parseFormat(g));
                var p = {
                    d: d.getUTCDate(),
                    D: q[c].daysShort[d.getUTCDay()],
                    DD: q[c].days[d.getUTCDay()],
                    m: d.getUTCMonth() + 1,
                    M: q[c].monthsShort[d.getUTCMonth()],
                    MM: q[c].months[d.getUTCMonth()],
                    yy: d.getUTCFullYear().toString().substring(2),
                    yyyy: d.getUTCFullYear()
                };
                p.dd = (p.d < 10 ? "0" : "") + p.d, p.mm = (p.m < 10 ? "0" : "") + p.m, d = [];
                for (var l = E.extend([], g.separators), o = 0, f = g.parts.length; f >= o; o++) {
                    l.length && d.push(l.shift()), d.push(p[g.parts[o]])
                }
                return d.join("")
            },
            headTemplate: '<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
        };
    v.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + v.headTemplate + "<tbody></tbody>" + v.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + v.headTemplate + v.contTemplate + v.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + v.headTemplate + v.contTemplate + v.footTemplate + "</table></div></div>", E.fn.datepicker.DPGlobal = v, E.fn.datepicker.noConflict = function () {
        return E.fn.datepicker = j, this
    }, E(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function (a) {
        var c = E(this);
        c.data("datepicker") || (a.preventDefault(), c.datepicker("show"))
    }), E(function () {
        E('[data-provide="datepicker-inline"]').datepicker()
    })
}(window.jQuery);