(function (a) {
    var c = '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1"xmlns="http://www.w3.org/2000/svg"viewBox="0 12.705 512 486.59"x="0px" y="0px"xml:space="preserve"><polygon id="star-icon"points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "/></svg>';
    var f = {
        starWidth: "14px",
        normalFill: "#9f9f9f",
        ratedFill: "#e8511c",
        numStars: 5,
        maxValue: 5,
        precision: 1,
        rating: 0,
        fullStar: false,
        halfStar: false,
        readOnly: false,
        spacing: "0px",
        onChange: null,
        onSet: null
    };

    function e(n, m, l) {
        if (n === m) {
            n = m
        } else {
            if (n === l) {
                n = l
            }
        }
        return n
    }

    function d(o, n, m) {
        var l = o >= n && o <= m;
        if (!l) {
            throw Error("Invalid Rating, expected value between " + n + " and " + m)
        }
        return o
    }

    function h(n, l) {
        var m;
        a.each(l, function () {
            if (n === this.node) {
                m = this;
                return false
            }
        });
        return m
    }

    function g(m, l) {
        a.each(l, function (o) {
            if (m === this.node) {
                var n = l.slice(0, o),
                    p = l.slice(o + 1, l.length);
                l = n.concat(p);
                return false
            }
        });
        return l
    }

    function i(l) {
        return typeof l !== "undefined"
    }

    function k(m, y) {
        this.$node = m;
        this.node = m.get(0);
        var U = this;
        m.addClass("jq-ry-container");
        var l = a("<div/>").addClass("jq-ry-group-wrapper").appendTo(m);
        var n = a("<div/>").addClass("jq-ry-normal-group").addClass("jq-ry-group").appendTo(l);
        var o = a("<div/>").addClass("jq-ry-rated-group").addClass("jq-ry-group").appendTo(l);
        var T, S, A, R, z, r, s = 0;

        function Q(Y) {
            if (!i(Y)) {
                Y = y.rating
            }
            var W = Y / T;
            var X = W * A;
            if (W > 1) {
                X += (Math.ceil(W) - 1) * z
            }
            o.css("width", X + "%")
        }

        function C() {
            r = S * y.numStars;
            r += R * (y.numStars - 1);
            A = (S / r) * 100;
            z = (R / r) * 100;
            m.width(r);
            Q()
        }

        function P(W) {
            if (!i(W)) {
                return y.starWidth
            }
            y.starWidth = y.starHeight = W;
            S = parseFloat(y.starWidth.replace("px", ""));
            n.find("svg").attr({
                width: y.starWidth,
                height: y.starHeight
            });
            o.find("svg").attr({
                width: y.starWidth,
                height: y.starHeight
            });
            C();
            return m
        }

        function O(W) {
            if (!i(W)) {
                return y.spacing
            }
            y.spacing = W;
            R = parseFloat(y.spacing.replace("px", ""));
            n.find("svg:not(:first-child)").css({
                "margin-left": W
            });
            o.find("svg:not(:first-child)").css({
                "margin-left": W
            });
            C();
            return m
        }

        function G(W) {
            if (!i(W)) {
                return y.normalFill
            }
            y.normalFill = W;
            n.find("svg").attr({
                fill: y.normalFill
            });
            return m
        }

        function L(W) {
            if (!i(W)) {
                return y.ratedFill
            }
            y.ratedFill = W;
            o.find("svg").attr({
                fill: y.ratedFill
            });
            return m
        }

        function H(X) {
            if (!i(X)) {
                return y.numStars
            }
            y.numStars = X;
            T = y.maxValue / y.numStars;
            n.empty();
            o.empty();
            for (var W = 0; W < y.numStars; W++) {
                n.append(a(c));
                o.append(a(c))
            }
            P(y.starWidth);
            L(y.ratedFill);
            G(y.normalFill);
            O(y.spacing);
            Q();
            return m
        }

        function F(W) {
            if (!i(W)) {
                return y.maxValue
            }
            y.maxValue = W;
            T = y.maxValue / y.numStars;
            if (y.rating > W) {
                M(W)
            }
            Q();
            return m
        }

        function K(W) {
            if (!i(W)) {
                return y.precision
            }
            y.precision = W;
            Q();
            return m
        }

        function E(W) {
            if (!i(W)) {
                return y.halfStar
            }
            y.halfStar = W;
            return m
        }

        function D(W) {
            if (!i(W)) {
                return y.fullStar
            }
            y.fullStar = W;
            return m
        }

        function B(aa) {
            var Z = aa % T,
                W = T / 2,
                Y = y.halfStar,
                X = y.fullStar;
            if (!X && !Y) {
                return aa
            }
            if (X || (Y && Z > W)) {
                aa += T - Z
            } else {
                aa = aa - Z;
                if (Z > 0) {
                    aa += W
                }
            }
            return aa
        }

        function q(Y) {
            var ad = n.offset(),
                ab = ad.left,
                aa = ab + n.width();
            var Z = y.maxValue;
            var ac = Y.pageX;
            var X = 0;
            if (ac < ab) {
                X = s
            } else {
                if (ac > aa) {
                    X = Z
                } else {
                    var W = ((ac - ab) / (aa - ab));
                    if (R > 0) {
                        W *= 100;
                        var ae = W;
                        while (ae > 0) {
                            if (ae > A) {
                                X += T;
                                ae -= (A + z)
                            } else {
                                X += ae / A * T;
                                ae = 0
                            }
                        }
                    } else {
                        X = W * (y.maxValue)
                    }
                    X = B(X)
                }
            }
            return X
        }

        function v(W) {
            var Y = q(W).toFixed(y.precision);
            var X = y.maxValue;
            Y = e(parseFloat(Y), s, X);
            Q(Y);
            m.trigger("rateyo.change", {
                rating: Y
            })
        }

        function w() {
            Q();
            m.trigger("rateyo.change", {
                rating: y.rating
            })
        }

        function u(W) {
            var X = q(W).toFixed(y.precision);
            X = parseFloat(X);
            U.rating(X)
        }

        function t(X, W) {
            if (y.onChange && typeof y.onChange === "function") {
                y.onChange.apply(this, [W.rating, U])
            }
        }

        function x(X, W) {
            if (y.onSet && typeof y.onSet === "function") {
                y.onSet.apply(this, [W.rating, U])
            }
        }

        function p() {
            m.on("mousemove", v).on("mouseenter", v).on("mouseleave", w).on("click", u).on("rateyo.change", t).on("rateyo.set", x)
        }

        function V() {
            m.off("mousemove", v).off("mouseenter", v).off("mouseleave", w).off("click", u).off("rateyo.change", t).off("rateyo.set", x)
        }

        function N(W) {
            if (!i(W)) {
                return y.readOnly
            }
            y.readOnly = W;
            m.attr("readonly", true);
            V();
            if (!W) {
                m.removeAttr("readonly");
                p()
            }
            return m
        }

        function M(X) {
            if (!i(X)) {
                return y.rating
            }
            var Y = X;
            var W = y.maxValue;
            if (typeof Y === "string") {
                if (Y[Y.length - 1] === "%") {
                    Y = Y.substr(0, Y.length - 1);
                    W = 100;
                    F(W)
                }
                Y = parseFloat(Y)
            }
            d(Y, s, W);
            Y = parseFloat(Y.toFixed(y.precision));
            e(parseFloat(Y), s, W);
            y.rating = Y;
            Q();
            m.trigger("rateyo.set", {
                rating: Y
            });
            return m
        }

        function J(W) {
            if (!i(W)) {
                return y.onSet
            }
            y.onSet = W;
            return m
        }

        function I(W) {
            if (!i(W)) {
                return y.onChange
            }
            y.onChange = W;
            return m
        }
        this.rating = function (W) {
            if (!i(W)) {
                return y.rating
            }
            M(W);
            return m
        };
        this.destroy = function () {
            if (!y.readOnly) {
                V()
            }
            k.prototype.collection = g(m.get(0), this.collection);
            m.removeClass("jq-ry-container").children().remove();
            return m
        };
        this.method = function (Y) {
            if (!Y) {
                throw Error("Method name not specified!")
            }
            if (!i(this[Y])) {
                throw Error("Method " + Y + " doesn't exist!")
            }
            var W = Array.prototype.slice.apply(arguments, []),
                Z = W.slice(1),
                X = this[Y];
            return X.apply(this, Z)
        };
        this.option = function (X, Y) {
            if (!i(X)) {
                return y
            }
            var W;
            switch (X) {
                case "starWidth":
                    W = P;
                    break;
                case "numStars":
                    W = H;
                    break;
                case "normalFill":
                    W = G;
                    break;
                case "ratedFill":
                    W = L;
                    break;
                case "maxValue":
                    W = F;
                    break;
                case "precision":
                    W = K;
                    break;
                case "rating":
                    W = M;
                    break;
                case "halfStar":
                    W = E;
                    break;
                case "fullStar":
                    W = D;
                    break;
                case "readOnly":
                    W = N;
                    break;
                case "spacing":
                    W = O;
                    break;
                case "onSet":
                    W = J;
                    break;
                case "onChange":
                    W = I;
                    break;
                default:
                    throw Error("No such option as " + X)
            }
            return W(Y)
        };
        H(y.numStars);
        N(y.readOnly);
        this.collection.push(this);
        this.rating(y.rating)
    }
    k.prototype.collection = [];
    window.RateYo = k;

    function b(o) {
        var q = k.prototype.collection;
        var l = a(this);
        if (l.length === 0) {
            return l
        }
        var m = Array.prototype.slice.apply(arguments, []);
        if (m.length === 0) {
            o = m[0] = {}
        } else {
            if (m.length === 1 && typeof m[0] === "object") {
                o = m[0]
            } else {
                if (m.length >= 1 && typeof m[0] === "string") {
                    var n = m[0],
                        p = m.slice(1);
                    var r = [];
                    a.each(l, function (t, v) {
                        var s = h(v, q);
                        if (!s) {
                            throw Error("Trying to set options before even initialization")
                        }
                        var u = s[n];
                        if (!u) {
                            throw Error("Method " + n + " does not exist!")
                        }
                        var w = u.apply(s, p);
                        r.push(w)
                    });
                    r = r.length === 1 ? r[0] : a(r);
                    return r
                } else {
                    throw Error("Invalid Arguments")
                }
            }
        }
        o = a.extend(JSON.parse(JSON.stringify(f)), o);
        return a.each(l, function () {
            var s = h(this, q);
            if (!s) {
                return new k(a(this), a.extend({}, o))
            }
        })
    }

    function j() {
        return b.apply(this, Array.prototype.slice.apply(arguments, []))
    }
    a.fn.rateYo = j
}(jQuery));