(function (a) {
    a.prettyPhoto = {
        version: "3.1.6"
    };
    a.fn.prettyPhoto = function (y) {
        y = jQuery.extend({
            hook: "rel",
            animation_speed: "fast",
            ajaxcallback: function () {},
            slideshow: 5000,
            autoplay_slideshow: false,
            opacity: 0.8,
            show_title: true,
            allow_resize: true,
            allow_expand: true,
            default_width: 500,
            default_height: 344,
            counter_separator_label: "/",
            theme: "pp_default",
            horizontal_padding: 20,
            hideflash: false,
            wmode: "opaque",
            autoplay: true,
            modal: false,
            deeplinking: true,
            overlay_gallery: true,
            overlay_gallery_max: 30,
            keyboard_shortcuts: true,
            changepicturecallback: function () {},
            callback: function () {},
            ie6_fallback: true,
            markup: '<div class="pp_pic_holder"> 						<div class="ppt">&nbsp;</div> 						<div class="pp_top"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 						<div class="pp_content_container"> 							<div class="pp_left"> 							<div class="pp_right"> 								<div class="pp_content"> 									<div class="pp_loaderIcon"></div> 									<div class="pp_fade"> 										<a href="#" class="pp_expand" title="Expand the image">Expand</a> 										<div class="pp_hoverContainer"> 											<a class="pp_next" href="#">next</a> 											<a class="pp_previous" href="#">previous</a> 										</div> 										<div id="pp_full_res"></div> 										<div class="pp_details"> 											<div class="pp_nav"> 												<a href="#" class="pp_arrow_previous">Previous</a> 												<p class="currentTextHolder">0/0</p> 												<a href="#" class="pp_arrow_next">Next</a> 											</div> 											<p class="pp_description"></p> 											<div class="pp_social">{pp_social}</div> 											<a class="pp_close" href="#">Close</a> 										</div> 									</div> 								</div> 							</div> 							</div> 						</div> 						<div class="pp_bottom"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 					</div> 					<div class="pp_overlay"></div>',
            gallery_markup: '<div class="pp_gallery"> 								<a href="#" class="pp_arrow_previous">Previous</a> 								<div> 									<ul> 										{gallery} 									</ul> 								</div> 								<a href="#" class="pp_arrow_next">Next</a> 							</div>',
            image_markup: '<img id="fullResImage" src="{path}" />',
            flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
            quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
            inline_markup: '<div class="pp_inline">{content}</div>',
            custom_markup: "",
            social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'
        }, y);
        var q = this,
            r = false,
            w, x, u, v, s, t, A = a(window).height(),
            B = a(window).width(),
            z;
        doresize = true, scroll_pos = j();
        a(window).unbind("resize.prettyphoto").bind("resize.prettyphoto", function () {
            g();
            o()
        });
        if (y.keyboard_shortcuts) {
            a(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto", function (C) {
                if (typeof $pp_pic_holder != "undefined") {
                    if ($pp_pic_holder.is(":visible")) {
                        switch (C.keyCode) {
                            case 37:
                                a.prettyPhoto.changePage("previous");
                                C.preventDefault();
                                break;
                            case 39:
                                a.prettyPhoto.changePage("next");
                                C.preventDefault();
                                break;
                            case 27:
                                if (!settings.modal) {
                                    a.prettyPhoto.close()
                                }
                                C.preventDefault();
                                break
                        }
                    }
                }
            })
        }
        a.prettyPhoto.initialize = function () {
            settings = y;
            if (settings.theme == "pp_default") {
                settings.horizontal_padding = 16
            }
            theRel = a(this).attr(settings.hook);
            galleryRegExp = /\[(?:.*)\]/;
            isSet = (galleryRegExp.exec(theRel)) ? true : false;
            pp_images = (isSet) ? jQuery.map(q, function (D, C) {
                if (a(D).attr(settings.hook).indexOf(theRel) != -1) {
                    return a(D).attr("href")
                }
            }) : a.makeArray(a(this).attr("href"));
            pp_titles = (isSet) ? jQuery.map(q, function (D, C) {
                if (a(D).attr(settings.hook).indexOf(theRel) != -1) {
                    return (a(D).find("img").attr("alt")) ? a(D).find("img").attr("alt") : ""
                }
            }) : a.makeArray(a(this).find("img").attr("alt"));
            pp_descriptions = (isSet) ? jQuery.map(q, function (D, C) {
                if (a(D).attr(settings.hook).indexOf(theRel) != -1) {
                    return (a(D).attr("title")) ? a(D).attr("title") : ""
                }
            }) : a.makeArray(a(this).attr("title"));
            if (pp_images.length > settings.overlay_gallery_max) {
                settings.overlay_gallery = false
            }
            set_position = jQuery.inArray(a(this).attr("href"), pp_images);
            rel_index = (isSet) ? set_position : a("a[" + settings.hook + "^='" + theRel + "']").index(a(this));
            f(this);
            if (settings.allow_resize) {
                a(window).bind("scroll.prettyphoto", function () {
                    g()
                })
            }
            a.prettyPhoto.open();
            return false
        };
        a.prettyPhoto.open = function (C) {
            if (typeof settings == "undefined") {
                settings = y;
                pp_images = a.makeArray(arguments[0]);
                pp_titles = (arguments[1]) ? a.makeArray(arguments[1]) : a.makeArray("");
                pp_descriptions = (arguments[2]) ? a.makeArray(arguments[2]) : a.makeArray("");
                isSet = (pp_images.length > 1) ? true : false;
                set_position = (arguments[3]) ? arguments[3] : 0;
                f(C.target)
            }
            if (settings.hideflash) {
                a("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "hidden")
            }
            h(a(pp_images).size());
            a(".pp_loaderIcon").show();
            if (settings.deeplinking) {
                e()
            }
            if (settings.social_tools) {
                facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href));
                $pp_pic_holder.find(".pp_social").html(facebook_like_link)
            }
            if ($ppt.is(":hidden")) {
                $ppt.css("opacity", 0).show()
            }
            $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity);
            $pp_pic_holder.find(".currentTextHolder").text((set_position + 1) + settings.counter_separator_label + a(pp_images).size());
            if (typeof pp_descriptions[set_position] != "undefined" && pp_descriptions[set_position] != "") {
                $pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position]))
            } else {
                $pp_pic_holder.find(".pp_description").hide()
            }
            movie_width = (parseFloat(d("width", pp_images[set_position]))) ? d("width", pp_images[set_position]) : settings.default_width.toString();
            movie_height = (parseFloat(d("height", pp_images[set_position]))) ? d("height", pp_images[set_position]) : settings.default_height.toString();
            r = false;
            if (movie_height.indexOf("%") != -1) {
                movie_height = parseFloat((a(window).height() * parseFloat(movie_height) / 100) - 150);
                r = true
            }
            if (movie_width.indexOf("%") != -1) {
                movie_width = parseFloat((a(window).width() * parseFloat(movie_width) / 100) - 150);
                r = true
            }
            $pp_pic_holder.fadeIn(function () {
                (settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined") ? $ppt.html(unescape(pp_titles[set_position])): $ppt.html("&nbsp;");
                imgPreloader = "";
                skipInjection = false;
                switch (l(pp_images[set_position])) {
                    case "image":
                        imgPreloader = new Image();
                        nextImage = new Image();
                        if (isSet && set_position < a(pp_images).size() - 1) {
                            nextImage.src = pp_images[set_position + 1]
                        }
                        prevImage = new Image();
                        if (isSet && pp_images[set_position - 1]) {
                            prevImage.src = pp_images[set_position - 1]
                        }
                        $pp_pic_holder.find("#pp_full_res")[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]);
                        imgPreloader.onload = function () {
                            w = i(imgPreloader.width, imgPreloader.height);
                            p()
                        };
                        imgPreloader.onerror = function () {
                            alert("Image cannot be loaded. Make sure the path is correct and image exist.");
                            a.prettyPhoto.close()
                        };
                        imgPreloader.src = pp_images[set_position];
                        break;
                    case "youtube":
                        w = i(movie_width, movie_height);
                        movie_id = d("v", pp_images[set_position]);
                        if (movie_id == "") {
                            movie_id = pp_images[set_position].split("youtu.be/");
                            movie_id = movie_id[1];
                            if (movie_id.indexOf("?") > 0) {
                                movie_id = movie_id.substr(0, movie_id.indexOf("?"))
                            }
                            if (movie_id.indexOf("&") > 0) {
                                movie_id = movie_id.substr(0, movie_id.indexOf("&"))
                            }
                        }
                        movie = "http://www.youtube.com/embed/" + movie_id;
                        (d("rel", pp_images[set_position])) ? movie += "?rel=" + d("rel", pp_images[set_position]): movie += "?rel=1";
                        if (settings.autoplay) {
                            movie += "&autoplay=1"
                        }
                        toInject = settings.iframe_markup.replace(/{width}/g, w.width).replace(/{height}/g, w.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie);
                        break;
                    case "vimeo":
                        w = i(movie_width, movie_height);
                        movie_id = pp_images[set_position];
                        var E = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;
                        var D = movie_id.match(E);
                        movie = "http://player.vimeo.com/video/" + D[3] + "?title=0&amp;byline=0&amp;portrait=0";
                        if (settings.autoplay) {
                            movie += "&autoplay=1;"
                        }
                        vimeo_width = w.width + "/embed/?moog_width=" + w.width;
                        toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, w.height).replace(/{path}/g, movie);
                        break;
                    case "quicktime":
                        w = i(movie_width, movie_height);
                        w.height += 15;
                        w.contentHeight += 15;
                        w.containerHeight += 15;
                        toInject = settings.quicktime_markup.replace(/{width}/g, w.width).replace(/{height}/g, w.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
                        break;
                    case "flash":
                        w = i(movie_width, movie_height);
                        flash_vars = pp_images[set_position];
                        flash_vars = flash_vars.substring(pp_images[set_position].indexOf("flashvars") + 10, pp_images[set_position].length);
                        filename = pp_images[set_position];
                        filename = filename.substring(0, filename.indexOf("?"));
                        toInject = settings.flash_markup.replace(/{width}/g, w.width).replace(/{height}/g, w.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + "?" + flash_vars);
                        break;
                    case "iframe":
                        w = i(movie_width, movie_height);
                        frame_url = pp_images[set_position];
                        frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1);
                        toInject = settings.iframe_markup.replace(/{width}/g, w.width).replace(/{height}/g, w.height).replace(/{path}/g, frame_url);
                        break;
                    case "ajax":
                        doresize = false;
                        w = i(movie_width, movie_height);
                        doresize = true;
                        skipInjection = true;
                        a.get(pp_images[set_position], function (F) {
                            toInject = settings.inline_markup.replace(/{content}/g, F);
                            $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject;
                            p()
                        });
                        break;
                    case "custom":
                        w = i(movie_width, movie_height);
                        toInject = settings.custom_markup;
                        break;
                    case "inline":
                        myClone = a(pp_images[set_position]).clone().append('<br clear="all" />').css({
                            width: settings.default_width
                        }).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(a("body")).show();
                        doresize = false;
                        w = i(a(myClone).width(), a(myClone).height());
                        doresize = true;
                        a(myClone).remove();
                        toInject = settings.inline_markup.replace(/{content}/g, a(pp_images[set_position]).html());
                        break
                }
                if (!imgPreloader && !skipInjection) {
                    $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject;
                    p()
                }
            });
            return false
        };
        a.prettyPhoto.changePage = function (C) {
            currentGalleryPage = 0;
            if (C == "previous") {
                set_position--;
                if (set_position < 0) {
                    set_position = a(pp_images).size() - 1
                }
            } else {
                if (C == "next") {
                    set_position++;
                    if (set_position > a(pp_images).size() - 1) {
                        set_position = 0
                    }
                } else {
                    set_position = C
                }
            }
            rel_index = set_position;
            if (!doresize) {
                doresize = true
            }
            if (settings.allow_expand) {
                a(".pp_contract").removeClass("pp_contract").addClass("pp_expand")
            }
            m(function () {
                a.prettyPhoto.open()
            })
        };
        a.prettyPhoto.changeGalleryPage = function (C) {
            if (C == "next") {
                currentGalleryPage++;
                if (currentGalleryPage > totalPage) {
                    currentGalleryPage = 0
                }
            } else {
                if (C == "previous") {
                    currentGalleryPage--;
                    if (currentGalleryPage < 0) {
                        currentGalleryPage = totalPage
                    }
                } else {
                    currentGalleryPage = C
                }
            }
            slide_speed = (C == "next" || C == "previous") ? settings.animation_speed : 0;
            slide_to = currentGalleryPage * (itemsPerPage * itemWidth);
            $pp_gallery.find("ul").animate({
                left: -slide_to
            }, slide_speed)
        };
        a.prettyPhoto.startSlideshow = function () {
            if (typeof z == "undefined") {
                $pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function () {
                    a.prettyPhoto.stopSlideshow();
                    return false
                });
                z = setInterval(a.prettyPhoto.startSlideshow, settings.slideshow)
            } else {
                a.prettyPhoto.changePage("next")
            }
        };
        a.prettyPhoto.stopSlideshow = function () {
            $pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function () {
                a.prettyPhoto.startSlideshow();
                return false
            });
            clearInterval(z);
            z = undefined
        };
        a.prettyPhoto.close = function () {
            if ($pp_overlay.is(":animated")) {
                return
            }
            a.prettyPhoto.stopSlideshow();
            $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden");
            a("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed, function () {
                a(this).remove()
            });
            $pp_overlay.fadeOut(settings.animation_speed, function () {
                if (settings.hideflash) {
                    a("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "visible")
                }
                a(this).remove();
                a(window).unbind("scroll.prettyphoto");
                b();
                settings.callback();
                doresize = true;
                x = false;
                delete settings
            })
        };

        function p() {
            a(".pp_loaderIcon").hide();
            projectedTop = scroll_pos.scrollTop + ((A / 2) - (w.containerHeight / 2));
            if (projectedTop < 0) {
                projectedTop = 0
            }
            $ppt.fadeTo(settings.animation_speed, 1);
            $pp_pic_holder.find(".pp_content").animate({
                height: w.contentHeight,
                width: w.contentWidth
            }, settings.animation_speed);
            $pp_pic_holder.animate({
                top: projectedTop,
                left: ((B / 2) - (w.containerWidth / 2) < 0) ? 0 : (B / 2) - (w.containerWidth / 2),
                width: w.containerWidth
            }, settings.animation_speed, function () {
                $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(w.height).width(w.width);
                $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed);
                if (isSet && l(pp_images[set_position]) == "image") {
                    $pp_pic_holder.find(".pp_hoverContainer").show()
                } else {
                    $pp_pic_holder.find(".pp_hoverContainer").hide()
                }
                if (settings.allow_expand) {
                    if (w.resized) {
                        a("a.pp_expand,a.pp_contract").show()
                    } else {
                        a("a.pp_expand").hide()
                    }
                }
                if (settings.autoplay_slideshow && !z && !x) {
                    a.prettyPhoto.startSlideshow()
                }
                settings.changepicturecallback();
                x = true
            });
            n();
            y.ajaxcallback()
        }

        function m(C) {
            $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden");
            $pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed, function () {
                a(".pp_loaderIcon").show();
                C()
            })
        }

        function h(C) {
            (C > 1) ? a(".pp_nav").show(): a(".pp_nav").hide()
        }

        function i(D, C) {
            resized = false;
            k(D, C);
            imageWidth = D, imageHeight = C;
            if (((t > B) || (s > A)) && doresize && settings.allow_resize && !r) {
                resized = true, fitting = false;
                while (!fitting) {
                    if ((t > B)) {
                        imageWidth = (B - 200);
                        imageHeight = (C / D) * imageWidth
                    } else {
                        if ((s > A)) {
                            imageHeight = (A - 200);
                            imageWidth = (D / C) * imageHeight
                        } else {
                            fitting = true
                        }
                    }
                    s = imageHeight, t = imageWidth
                }
                if ((t > B) || (s > A)) {
                    i(t, s)
                }
                k(imageWidth, imageHeight)
            }
            return {
                width: Math.floor(imageWidth),
                height: Math.floor(imageHeight),
                containerHeight: Math.floor(s),
                containerWidth: Math.floor(t) + (settings.horizontal_padding * 2),
                contentHeight: Math.floor(u),
                contentWidth: Math.floor(v),
                resized: resized
            }
        }

        function k(D, C) {
            D = parseFloat(D);
            C = parseFloat(C);
            $pp_details = $pp_pic_holder.find(".pp_details");
            $pp_details.width(D);
            detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom"));
            $pp_details = $pp_details.clone().addClass(settings.theme).width(D).appendTo(a("body")).css({
                position: "absolute",
                top: -10000
            });
            detailsHeight += $pp_details.height();
            detailsHeight = (detailsHeight <= 34) ? 36 : detailsHeight;
            $pp_details.remove();
            $pp_title = $pp_pic_holder.find(".ppt");
            $pp_title.width(D);
            titleHeight = parseFloat($pp_title.css("marginTop")) + parseFloat($pp_title.css("marginBottom"));
            $pp_title = $pp_title.clone().appendTo(a("body")).css({
                position: "absolute",
                top: -10000
            });
            titleHeight += $pp_title.height();
            $pp_title.remove();
            u = C + detailsHeight;
            v = D;
            s = u + titleHeight + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height();
            t = D
        }

        function l(C) {
            if (C.match(/youtube\.com\/watch/i) || C.match(/youtu\.be/i)) {
                return "youtube"
            } else {
                if (C.match(/vimeo\.com/i)) {
                    return "vimeo"
                } else {
                    if (C.match(/\b.mov\b/i)) {
                        return "quicktime"
                    } else {
                        if (C.match(/\b.swf\b/i)) {
                            return "flash"
                        } else {
                            if (C.match(/\biframe=true\b/i)) {
                                return "iframe"
                            } else {
                                if (C.match(/\bajax=true\b/i)) {
                                    return "ajax"
                                } else {
                                    if (C.match(/\bcustom=true\b/i)) {
                                        return "custom"
                                    } else {
                                        if (C.substr(0, 1) == "#") {
                                            return "inline"
                                        } else {
                                            return "image"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        function g() {
            if (doresize && typeof $pp_pic_holder != "undefined") {
                scroll_pos = j();
                contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width();
                projectedTop = (A / 2) + scroll_pos.scrollTop - (contentHeight / 2);
                if (projectedTop < 0) {
                    projectedTop = 0
                }
                if (contentHeight > A) {
                    return
                }
                $pp_pic_holder.css({
                    top: projectedTop,
                    left: (B / 2) + scroll_pos.scrollLeft - (contentwidth / 2)
                })
            }
        }

        function j() {
            if (self.pageYOffset) {
                return {
                    scrollTop: self.pageYOffset,
                    scrollLeft: self.pageXOffset
                }
            } else {
                if (document.documentElement && document.documentElement.scrollTop) {
                    return {
                        scrollTop: document.documentElement.scrollTop,
                        scrollLeft: document.documentElement.scrollLeft
                    }
                } else {
                    if (document.body) {
                        return {
                            scrollTop: document.body.scrollTop,
                            scrollLeft: document.body.scrollLeft
                        }
                    }
                }
            }
        }

        function o() {
            A = a(window).height(), B = a(window).width();
            if (typeof $pp_overlay != "undefined") {
                $pp_overlay.height(a(document).height()).width(B)
            }
        }

        function n() {
            if (isSet && settings.overlay_gallery && l(pp_images[set_position]) == "image") {
                itemWidth = 52 + 5;
                navWidth = (settings.theme == "facebook" || settings.theme == "pp_default") ? 50 : 30;
                itemsPerPage = Math.floor((w.containerWidth - 100 - navWidth) / itemWidth);
                itemsPerPage = (itemsPerPage < pp_images.length) ? itemsPerPage : pp_images.length;
                totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;
                if (totalPage == 0) {
                    navWidth = 0;
                    $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()
                } else {
                    $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show()
                }
                galleryWidth = itemsPerPage * itemWidth;
                fullGalleryWidth = pp_images.length * itemWidth;
                $pp_gallery.css("margin-left", -((galleryWidth / 2) + (navWidth / 2))).find("div:first").width(galleryWidth + 5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected");
                goToPage = (Math.floor(set_position / itemsPerPage) < totalPage) ? Math.floor(set_position / itemsPerPage) : totalPage;
                a.prettyPhoto.changeGalleryPage(goToPage);
                $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected")
            } else {
                $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave")
            }
        }

        function f(C) {
            if (settings.social_tools) {
                facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href))
            }
            settings.markup = settings.markup.replace("{pp_social}", "");
            a("body").append(settings.markup);
            $pp_pic_holder = a(".pp_pic_holder"), $ppt = a(".ppt"), $pp_overlay = a("div.pp_overlay");
            if (isSet && settings.overlay_gallery) {
                currentGalleryPage = 0;
                toInject = "";
                for (var D = 0; D < pp_images.length; D++) {
                    if (!pp_images[D].match(/\b(jpg|jpeg|png|gif)\b/gi)) {
                        classname = "default";
                        img_src = ""
                    } else {
                        classname = "";
                        img_src = pp_images[D]
                    }
                    toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>"
                }
                toInject = settings.gallery_markup.replace(/{gallery}/g, toInject);
                $pp_pic_holder.find("#pp_full_res").after(toInject);
                $pp_gallery = a(".pp_pic_holder .pp_gallery"), $pp_gallery_li = $pp_gallery.find("li");
                $pp_gallery.find(".pp_arrow_next").click(function () {
                    a.prettyPhoto.changeGalleryPage("next");
                    a.prettyPhoto.stopSlideshow();
                    return false
                });
                $pp_gallery.find(".pp_arrow_previous").click(function () {
                    a.prettyPhoto.changeGalleryPage("previous");
                    a.prettyPhoto.stopSlideshow();
                    return false
                });
                $pp_pic_holder.find(".pp_content").hover(function () {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()
                }, function () {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()
                });
                itemWidth = 52 + 5;
                $pp_gallery_li.each(function (E) {
                    a(this).find("a").click(function () {
                        a.prettyPhoto.changePage(E);
                        a.prettyPhoto.stopSlideshow();
                        return false
                    })
                })
            }
            if (settings.slideshow) {
                $pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>');
                $pp_pic_holder.find(".pp_nav .pp_play").click(function () {
                    a.prettyPhoto.startSlideshow();
                    return false
                })
            }
            $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme);
            $pp_overlay.css({
                opacity: 0,
                height: a(document).height(),
                width: a(window).width()
            }).bind("click", function () {
                if (!settings.modal) {
                    a.prettyPhoto.close()
                }
            });
            a("a.pp_close").bind("click", function () {
                a.prettyPhoto.close();
                return false
            });
            if (settings.allow_expand) {
                a("a.pp_expand").bind("click", function (E) {
                    if (a(this).hasClass("pp_expand")) {
                        a(this).removeClass("pp_expand").addClass("pp_contract");
                        doresize = false
                    } else {
                        a(this).removeClass("pp_contract").addClass("pp_expand");
                        doresize = true
                    }
                    m(function () {
                        a.prettyPhoto.open()
                    });
                    return false
                })
            }
            $pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click", function () {
                a.prettyPhoto.changePage("previous");
                a.prettyPhoto.stopSlideshow();
                return false
            });
            $pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click", function () {
                a.prettyPhoto.changePage("next");
                a.prettyPhoto.stopSlideshow();
                return false
            });
            g()
        }
        if (!pp_alreadyInitialized && c()) {
            pp_alreadyInitialized = true;
            hashIndex = c();
            hashRel = hashIndex;
            hashIndex = hashIndex.substring(hashIndex.indexOf("/") + 1, hashIndex.length - 1);
            hashRel = hashRel.substring(0, hashRel.indexOf("/"));
            setTimeout(function () {
                a("a[" + y.hook + "^='" + hashRel + "']:eq(" + hashIndex + ")").trigger("click")
            }, 50)
        }
        return this.unbind("click.prettyphoto").bind("click.prettyphoto", a.prettyPhoto.initialize)
    };

    function c() {
        var f = location.href;
        hashtag = (f.indexOf("#prettyPhoto") !== -1) ? decodeURI(f.substring(f.indexOf("#prettyPhoto") + 1, f.length)) : false;
        if (hashtag) {
            hashtag = hashtag.replace(/<|>/g, "")
        }
        return hashtag
    }

    function e() {
        if (typeof theRel == "undefined") {
            return
        }
        location.hash = theRel + "/" + rel_index + "/"
    }

    function b() {
        if (location.href.indexOf("#prettyPhoto") !== -1) {
            location.hash = "prettyPhoto"
        }
    }

    function d(f, j) {
        f = f.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var h = "[\\?&]" + f + "=([^&#]*)";
        var g = new RegExp(h);
        var i = g.exec(j);
        return (i == null) ? "" : i[1]
    }
})(jQuery);
var pp_alreadyInitialized = false;