window.Modernizr = function (H, J, L) {
        function an(b) {
            X.cssText = b
        }

        function I(c, d) {
            return an(aa.join(c + ";") + (d || ""))
        }

        function K(c, d) {
            return typeof c === d
        }

        function M(c, d) {
            return !!~("" + c).indexOf(d)
        }

        function O(c, f) {
            for (var g in c) {
                var h = c[g];
                if (!M(h, "-") && X[h] !== L) {
                    return f == "pfx" ? h : !0
                }
            }
            return !1
        }

        function Q(c, g, h) {
            for (var i in c) {
                var j = g[c[i]];
                if (j !== L) {
                    return h === !1 ? c[i] : K(j, "function") ? j.bind(h || g) : j
                }
            }
            return !1
        }

        function S(f, g, h) {
            var i = f.charAt(0).toUpperCase() + f.slice(1),
                j = (f + " " + ac.join(i + " ") + i).split(" ");
            return K(g, "string") || K(g, "undefined") ? O(j, g) : (j = (f + " " + ad.join(i + " ") + i).split(" "), Q(j, g, h))
        }
        var N = "2.6.2",
            P = {},
            R = !0,
            T = J.documentElement,
            V = "modernizr",
            W = J.createElement(V),
            X = W.style,
            Y, Z = {}.toString,
            aa = " -webkit- -moz- -o- -ms- ".split(" "),
            ab = "Webkit Moz O ms",
            ac = ab.split(" "),
            ad = ab.toLowerCase().split(" "),
            ae = {},
            af = {},
            ag = {},
            ah = [],
            ai = ah.slice,
            aj, ak = function (b, g, h, o) {
                var p, q, r, s, t = J.createElement("div"),
                    u = J.body,
                    v = u || J.createElement("body");
                if (parseInt(h, 10)) {
                    while (h--) {
                        r = J.createElement("div"), r.id = o ? o[h] : V + (h + 1), t.appendChild(r)
                    }
                }
                return p = ["&#173;", '<style id="s', V, '">', b, "</style>"].join(""), t.id = V, (u ? t : v).innerHTML += p, v.appendChild(t), u || (v.style.background = "", v.style.overflow = "hidden", s = T.style.overflow, T.style.overflow = "hidden", T.appendChild(v)), q = g(t, b), u ? t.parentNode.removeChild(t) : (v.parentNode.removeChild(v), T.style.overflow = s), !!q
            },
            al = {}.hasOwnProperty,
            am;
        !K(al, "undefined") && !K(al.call, "undefined") ? am = function (c, d) {
            return al.call(c, d)
        } : am = function (c, d) {
            return d in c && K(c.constructor.prototype[d], "undefined")
        }, Function.prototype.bind || (Function.prototype.bind = function (a) {
            var f = this;
            if (typeof f != "function") {
                throw new TypeError
            }
            var g = ai.call(arguments, 1),
                h = function () {
                    if (this instanceof h) {
                        var b = function () {};
                        b.prototype = f.prototype;
                        var c = new b,
                            d = f.apply(c, g.concat(ai.call(arguments)));
                        return Object(d) === d ? d : c
                    }
                    return f.apply(a, g.concat(ai.call(arguments)))
                };
            return h
        }), ae.touch = function () {
            var a;
            return "ontouchstart" in H || H.DocumentTouch && J instanceof DocumentTouch ? a = !0 : ak(["@media (", aa.join("touch-enabled),("), V, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (b) {
                a = b.offsetTop === 9
            }), a
        }, ae.cssanimations = function () {
            return S("animationName")
        }, ae.csstransitions = function () {
            return S("transition")
        };
        for (var U in ae) {
            am(ae, U) && (aj = U.toLowerCase(), P[aj] = ae[U](), ah.push((P[aj] ? "" : "no-") + aj))
        }
        return P.addTest = function (c, e) {
                if (typeof c == "object") {
                    for (var f in c) {
                        am(c, f) && P.addTest(f, c[f])
                    }
                } else {
                    c = c.toLowerCase();
                    if (P[c] !== L) {
                        return P
                    }
                    e = typeof e == "function" ? e() : e, typeof R != "undefined" && R && (T.className += " " + (e ? "" : "no-") + c), P[c] = e
                }
                return P
            }, an(""), W = Y = null,
            function (s, t) {
                function C(e, f) {
                    var g = e.createElement("p"),
                        h = e.getElementsByTagName("head")[0] || e.documentElement;
                    return g.innerHTML = "x<style>" + f + "</style>", h.insertBefore(g.lastChild, h.firstChild)
                }

                function D() {
                    var b = aq.elements;
                    return typeof b == "string" ? b.split(" ") : b
                }

                function E(c) {
                    var d = A[c[y]];
                    return d || (d = {}, z++, c[y] = z, A[z] = d), d
                }

                function F(b, d, e) {
                    d || (d = t);
                    if (B) {
                        return d.createElement(b)
                    }
                    e || (e = E(d));
                    var h;
                    return e.cache[b] ? h = e.cache[b].cloneNode() : w.test(b) ? h = (e.cache[b] = e.createElem(b)).cloneNode() : h = e.createElem(b), h.canHaveChildren && !v.test(b) ? e.frag.appendChild(h) : h
                }

                function G(b, h) {
                    b || (b = t);
                    if (B) {
                        return b.createDocumentFragment()
                    }
                    h = h || E(b);
                    var i = h.frag.cloneNode(),
                        j = 0,
                        k = D(),
                        l = k.length;
                    for (; j < l; j++) {
                        i.createElement(k[j])
                    }
                    return i
                }

                function ao(c, d) {
                    d.cache || (d.cache = {}, d.createElem = c.createElement, d.createFrag = c.createDocumentFragment, d.frag = d.createFrag()), c.createElement = function (a) {
                        return aq.shivMethods ? F(a, c, d) : d.createElem(a)
                    }, c.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + D().join().replace(/\w+/g, function (b) {
                        return d.createElem(b), d.frag.createElement(b), 'c("' + b + '")'
                    }) + ");return n}")(aq, d.frag)
                }

                function ap(b) {
                    b || (b = t);
                    var d = E(b);
                    return aq.shivCSS && !x && !d.hasCSS && (d.hasCSS = !!C(b, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), B || ao(b, d), b
                }
                var u = s.html5 || {},
                    v = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    w = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    x, y = "_html5shiv",
                    z = 0,
                    A = {},
                    B;
                (function () {
                    try {
                        var b = t.createElement("a");
                        b.innerHTML = "<xyz></xyz>", x = "hidden" in b, B = b.childNodes.length == 1 || function () {
                            t.createElement("a");
                            var c = t.createDocumentFragment();
                            return typeof c.cloneNode == "undefined" || typeof c.createDocumentFragment == "undefined" || typeof c.createElement == "undefined"
                        }()
                    } catch (d) {
                        x = !0, B = !0
                    }
                })();
                var aq = {
                    elements: u.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                    shivCSS: u.shivCSS !== !1,
                    supportsUnknownElements: B,
                    shivMethods: u.shivMethods !== !1,
                    type: "default",
                    shivDocument: ap,
                    createElement: F,
                    createDocumentFragment: G
                };
                s.html5 = aq, ap(t)
            }(this, J), P._version = N, P._prefixes = aa, P._domPrefixes = ad, P._cssomPrefixes = ac, P.testProp = function (b) {
                return O([b])
            }, P.testAllProps = S, P.testStyles = ak, P.prefixed = function (d, e, f) {
                return e ? S(d, e, f) : S(d, "pfx")
            }, T.className = T.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (R ? " js " + ah.join(" ") : ""), P
    }(this, this.document),
    function (C, E, G) {
        function H(b) {
            return "[object Function]" == S.call(b)
        }

        function I(b) {
            return "string" == typeof b
        }

        function J() {}

        function K(b) {
            return !b || "loaded" == b || "complete" == b || "uninitialized" == b
        }

        function L() {
            var b = T.shift();
            U = 1, b ? b.t ? Q(function () {
                ("c" == b.t ? F.injectCss : F.injectJs)(b.s, 0, b.a, b.x, b.e, 1)
            }, 0) : (b(), L()) : U = 0
        }

        function M(b, g, h, m, n, p, q) {
            function s(a) {
                if (!v && K(t.readyState) && (x.r = v = 1, !U && L(), t.onload = t.onreadystatechange = null, a)) {
                    "img" != b && Q(function () {
                        X.removeChild(t)
                    }, 50);
                    for (var c in ac[g]) {
                        ac[g].hasOwnProperty(c) && ac[g][c].onload()
                    }
                }
            }
            var q = q || F.errorTimeout,
                t = E.createElement(b),
                v = 0,
                w = 0,
                x = {
                    t: h,
                    s: g,
                    e: n,
                    a: p,
                    x: q
                };
            1 === ac[g] && (w = 1, ac[g] = []), "object" == b ? t.data = g : (t.src = g, t.type = b), t.width = t.height = "0", t.onerror = t.onload = t.onreadystatechange = function () {
                s.call(this, w)
            }, T.splice(m, 0, x), "img" != b && (w || 2 === ac[g] ? (X.insertBefore(t, W ? null : R), Q(s, q)) : ac[g].push(t))
        }

        function N(e, g, h, i, j) {
            return U = 0, g = g || "j", I(e) ? M("c" == g ? Z : Y, e, g, this.i++, h, i, j) : (T.splice(this.i++, 0, e), 1 == T.length && L()), this
        }

        function O() {
            var b = F;
            return b.loader = {
                load: N,
                i: 0
            }, b
        }
        var P = E.documentElement,
            Q = C.setTimeout,
            R = E.getElementsByTagName("script")[0],
            S = {}.toString,
            T = [],
            U = 0,
            V = "MozAppearance" in P.style,
            W = V && !!E.createRange().compareNode,
            X = W ? P : R.parentNode,
            P = C.opera && "[object Opera]" == S.call(C.opera),
            P = !!E.attachEvent && !P,
            Y = V ? "object" : P ? "script" : "img",
            Z = P ? "script" : Y,
            aa = Array.isArray || function (b) {
                return "[object Array]" == S.call(b)
            },
            ab = [],
            ac = {},
            ad = {
                timeout: function (c, d) {
                    return d.length && (c.timeout = d[0]), c
                }
            },
            D, F;
        F = function (c) {
            function d(h) {
                var h = h.split("!"),
                    i = ab.length,
                    j = h.pop(),
                    l = h.length,
                    j = {
                        url: j,
                        origUrl: j,
                        prefixes: h
                    },
                    o, p, q;
                for (p = 0; p < l; p++) {
                    q = h[p].split("="), (o = ad[q.shift()]) && (j = o(j, q))
                }
                for (p = 0; p < i; p++) {
                    j = ab[p](j)
                }
                return j
            }

            function e(b, l, o, p, q) {
                var r = d(b),
                    s = r.autoCallback;
                r.url.split(".").pop().split("?").shift(), r.bypass || (l && (l = H(l) ? l : l[b] || l[p] || l[b.split("/").pop().split("?")[0]]), r.instead ? r.instead(b, l, o, p, q) : (ac[r.url] ? r.noexec = !0 : ac[r.url] = 1, o.load(r.url, r.forceCSS || !r.forceJS && "css" == r.url.split(".").pop().split("?").shift() ? "c" : G, r.noexec, r.attrs, r.timeout), (H(l) || H(s)) && o.load(function () {
                    O(), l && l(r.origUrl, q, p), s && s(r.origUrl, q, p), ac[r.url] = 2
                })))
            }

            function f(g, o) {
                function p(b, h) {
                    if (b) {
                        if (I(b)) {
                            h || (s = function () {
                                var i = [].slice.call(arguments);
                                t.apply(this, i), u()
                            }), e(b, s, o, 0, q)
                        } else {
                            if (Object(b) === b) {
                                for (w in v = function () {
                                        var a = 0,
                                            i;
                                        for (i in b) {
                                            b.hasOwnProperty(i) && a++
                                        }
                                        return a
                                    }(), b) {
                                    b.hasOwnProperty(w) && (!h && !--v && (H(s) ? s = function () {
                                        var i = [].slice.call(arguments);
                                        t.apply(this, i), u()
                                    } : s[w] = function (i) {
                                        return function () {
                                            var a = [].slice.call(arguments);
                                            i && i.apply(this, a), u()
                                        }
                                    }(t[w])), e(b[w], s, o, w, q))
                                }
                            }
                        }
                    } else {
                        !h && u()
                    }
                }
                var q = !!g.test,
                    r = g.load || g.both,
                    s = g.callback || J,
                    t = s,
                    u = g.complete || J,
                    v, w;
                p(q ? g.yep : g.nope, !!r), r && p(r)
            }
            var k, m, n = this.yepnope.loader;
            if (I(c)) {
                e(c, 0, n, 0)
            } else {
                if (aa(c)) {
                    for (k = 0; k < c.length; k++) {
                        m = c[k], I(m) ? e(m, 0, n, 0) : aa(m) ? F(m) : Object(m) === m && f(m, n)
                    }
                } else {
                    Object(c) === c && f(c, n)
                }
            }
        }, F.addPrefix = function (c, d) {
            ad[c] = d
        }, F.addFilter = function (b) {
            ab.push(b)
        }, F.errorTimeout = 10000, null == E.readyState && E.addEventListener && (E.readyState = "loading", E.addEventListener("DOMContentLoaded", D = function () {
            E.removeEventListener("DOMContentLoaded", D, 0), E.readyState = "complete"
        }, 0)), C.yepnope = O(), C.yepnope.executeStack = L, C.yepnope.injectJs = function (b, f, g, h, m, n) {
            var p = E.createElement("script"),
                q, r, h = h || F.errorTimeout;
            p.src = b;
            for (r in g) {
                p.setAttribute(r, g[r])
            }
            f = n ? L : f || J, p.onreadystatechange = p.onload = function () {
                !q && K(p.readyState) && (q = 1, f(), p.onload = p.onreadystatechange = null)
            }, Q(function () {
                q || (q = 1, f(1))
            }, h), m ? p.onload() : R.parentNode.insertBefore(p, R)
        }, C.yepnope.injectCss = function (b, f, h, k, l, m) {
            var k = E.createElement("link"),
                n, f = m ? L : f || J;
            k.href = b, k.rel = "stylesheet", k.type = "text/css";
            for (n in h) {
                k.setAttribute(n, h[n])
            }
            l || (R.parentNode.insertBefore(k, R), Q(f, 0))
        }
    }(this, document), Modernizr.load = function () {
        yepnope.apply(window, [].slice.call(arguments, 0))
    };