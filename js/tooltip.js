jQuery(document).ready(function (a) {
    var c = a(".js-tooltip"),
        b = a("body");
    if (c.length) {
        c.each(function (h) {
            var e = a(this),
                i = e.data(),
                f = typeof i.tooltipPrefixClass !== "undefined" ? i.tooltipPrefixClass + "-" : "",
                g = h + 1;
            e.attr({
                id: "label_tooltip_" + g
            });
            e.wrap('<span class="' + f + 'container"></span>')
        })
    }
    var d = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
    b.on("click", function (h) {
        var g = a(h.target),
            f = a("#" + a("#js-tooltip-close").attr("data-focus-back")),
            e = a(".js-dialogtooltip");
        if ((!g.is(".js-dialogtooltip") && !g.is(".js-tooltip") && !g.closest(".js-dialogtooltip").length) || (g.is(f))) {
            e.remove();
            f.removeClass("is-active")
        }
    }).on("click", ".js-tooltip:not('.is-active')", function (o) {
        var e = a(this),
            p = e.data(),
            k = typeof p.tooltipPrefixClass !== "undefined" ? p.tooltipPrefixClass + "-" : "",
            m = p.tooltipText || "",
            j = typeof p.tooltipContentId !== "undefined" ? "#" + p.tooltipContentId : "",
            n = p.tooltipTitle || "",
            g = p.tooltipCloseText || "Close",
            h = p.tooltipCloseTitle || p.tooltipCloseText,
            f = p.tooltipCloseImg || "",
            l = e.attr("id"),
            i;
        a("#js-tooltip").remove();
        a(".js-tooltip").removeClass("is-active");
        i = '<dialog id="js-tooltip" class="js-dialogtooltip ' + k + 'tooltip" data-launched-by="click" aria-labelledby="tooltip-title" open aria-modal="true"><div role="document" class="' + k + 'tooltip__wrapper">';
        i += '<button id="js-tooltip-close" class="' + k + 'tooltip__close" data-focus-back="' + l + '" title="' + h + '" type="button"><span class="' + k + 'tooltip__closetext__container">';
        if (f !== "") {
            i += '<img src="' + f + '" alt="' + g + '" class="' + k + 'tooltip__closeimg" />'
        } else {
            i += g
        }
        i += "</span></button>";
        if (n !== "") {
            i += '<h1 id="tooltip-title" class="tooltip-title ' + k + 'tooltip__title">' + n + "</h1>"
        }
        if (m !== "") {
            i += "<p>" + m + "</p>"
        } else {
            if (j !== "" && a(j).length) {
                i += a(j).html()
            }
        }
        i += "</div></dialog>";
        setTimeout(function () {
            a(i).insertAfter(e)
        }, 50);
        setTimeout(function () {
            a("#js-tooltip-close").focus()
        }, 51);
        a("#" + l).addClass("is-active");
        o.preventDefault()
    });
    b.on("click", "#js-tooltip-close", function (h) {
        var f = a(this),
            g = f.parents("#js-tooltip").attr("data-launched-by"),
            e = a("#" + f.attr("data-focus-back"));
        a("#js-tooltip").remove();
        e.focus();
        e.removeClass("is-active")
    }).on("keydown", "#js-tooltip", function (g) {
        var e = a(this);
        if (g.keyCode == 27) {
            a("#js-tooltip-close").click();
            g.preventDefault()
        }
        if (g.keyCode == 9) {
            var f = e.find("*");
            var h = f.filter(d).filter(":visible");
            var i = a(document.activeElement);
            var k = h.length;
            var j = h.index(i);
            if (!g.shiftKey && (j == k - 1)) {
                h.get(0).focus();
                g.preventDefault()
            }
            if (g.shiftKey && j == 0) {
                h.get(k - 1).focus();
                g.preventDefault()
            }
        }
    })
});