(function (a) {
    a('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var b = a(this.hash);
            b = b.length ? b : a("[name=" + this.hash.slice(1) + "]");
            if (b.length) {
                a("html, body").animate({
                    scrollTop: (b.offset().top - 54)
                }, 1000, "easeInOutExpo");
                return false
            }
        }
    });
    a(".js-scroll-trigger").click(function () {
        a(".navbar-collapse").collapse("hide")
    });
    a("body").scrollspy({
        target: "#mainNav",
        offset: 54
    })
})(jQuery);