(function (a, h, d, g) {
    var c = {
        bounds: true,
        strictBounds: false,
        country: null,
        map: false,
        details: false,
        detailsAttribute: "name",
        detailsScope: null,
        autoselect: true,
        location: false,
        mapOptions: {
            zoom: 14,
            scrollwheel: false,
            mapTypeId: "roadmap"
        },
        markerOptions: {
            draggable: false
        },
        maxZoom: 16,
        types: ["geocode"],
        blur: false,
        geocodeAfterResult: false,
        restoreValueAfterBlur: false
    };
    var b = ("street_address route intersection political country administrative_area_level_1 administrative_area_level_2 administrative_area_level_3 colloquial_area locality sublocality neighborhood premise subpremise postal_code natural_feature airport park point_of_interest post_box street_number floor room lat lng viewport location formatted_address location_type bounds").split(" ");
    var f = ("id place_id url website vicinity reference name rating international_phone_number icon formatted_phone_number").split(" ");

    function e(i, j) {
        this.options = a.extend(true, {}, c, j);
        if (j && j.types) {
            this.options.types = j.types
        }
        this.input = i;
        this.$input = a(i);
        this._defaults = c;
        this._name = "geocomplete";
        this.init()
    }
    a.extend(e.prototype, {
        init: function () {
            this.initMap();
            this.initMarker();
            this.initGeocoder();
            this.initDetails();
            this.initLocation()
        },
        initMap: function () {
            if (!this.options.map) {
                return
            }
            if (typeof this.options.map.setCenter == "function") {
                this.map = this.options.map;
                return
            }
            this.map = new google.maps.Map(a(this.options.map)[0], this.options.mapOptions);
            google.maps.event.addListener(this.map, "click", a.proxy(this.mapClicked, this));
            google.maps.event.addListener(this.map, "dragend", a.proxy(this.mapDragged, this));
            google.maps.event.addListener(this.map, "idle", a.proxy(this.mapIdle, this));
            google.maps.event.addListener(this.map, "zoom_changed", a.proxy(this.mapZoomed, this))
        },
        initMarker: function () {
            if (!this.map) {
                return
            }
            var i = a.extend(this.options.markerOptions, {
                map: this.map
            });
            if (i.disabled) {
                return
            }
            this.marker = new google.maps.Marker(i);
            google.maps.event.addListener(this.marker, "dragend", a.proxy(this.markerDragged, this))
        },
        initGeocoder: function () {
            var j = false;
            var i = {
                types: this.options.types,
                bounds: this.options.bounds === true ? null : this.options.bounds,
                componentRestrictions: this.options.componentRestrictions,
                strictBounds: this.options.strictBounds
            };
            if (this.options.country) {
                i.componentRestrictions = {
                    country: this.options.country
                }
            }
            this.autocomplete = new google.maps.places.Autocomplete(this.input, i);
            this.geocoder = new google.maps.Geocoder;
            if (this.map && this.options.bounds === true) {
                this.autocomplete.bindTo("bounds", this.map)
            }
            google.maps.event.addListener(this.autocomplete, "place_changed", a.proxy(this.placeChanged, this));
            this.$input.on("keypress." + this._name, function (k) {
                if (k.keyCode === 13) {
                    return false
                }
            });
            if (this.options.geocodeAfterResult === true) {
                this.$input.bind("keypress." + this._name, a.proxy(function () {
                    if (event.keyCode != 9 && this.selected === true) {
                        this.selected = false
                    }
                }, this))
            }
            this.$input.bind("geocode." + this._name, a.proxy(function () {
                this.find()
            }, this));
            this.$input.bind("geocode:result." + this._name, a.proxy(function () {
                this.lastInputVal = this.$input.val()
            }, this));
            if (this.options.blur === true) {
                this.$input.on("blur." + this._name, a.proxy(function () {
                    if (this.options.geocodeAfterResult === true && this.selected === true) {
                        return
                    }
                    if (this.options.restoreValueAfterBlur === true && this.selected === true) {
                        setTimeout(a.proxy(this.restoreLastValue, this), 0)
                    } else {
                        this.find()
                    }
                }, this))
            }
        },
        initDetails: function () {
            if (!this.options.details) {
                return
            }
            if (this.options.detailsScope) {
                var i = a(this.input).parents(this.options.detailsScope).find(this.options.details)
            } else {
                var i = a(this.options.details)
            }
            var j = this.options.detailsAttribute,
                k = {};

            function l(m) {
                k[m] = i.find("[" + j + "=" + m + "]")
            }
            a.each(b, function (m, n) {
                l(n);
                l(n + "_short")
            });
            a.each(f, function (m, n) {
                l(n)
            });
            this.$details = i;
            this.details = k
        },
        initLocation: function () {
            var j = this.options.location,
                i;
            if (!j) {
                return
            }
            if (typeof j == "string") {
                this.find(j);
                return
            }
            if (j instanceof Array) {
                i = new google.maps.LatLng(j[0], j[1])
            }
            if (j instanceof google.maps.LatLng) {
                i = j
            }
            if (i) {
                if (this.map) {
                    this.map.setCenter(i)
                }
                if (this.marker) {
                    this.marker.setPosition(i)
                }
            }
        },
        destroy: function () {
            if (this.map) {
                google.maps.event.clearInstanceListeners(this.map);
                google.maps.event.clearInstanceListeners(this.marker)
            }
            this.autocomplete.unbindAll();
            google.maps.event.clearInstanceListeners(this.autocomplete);
            google.maps.event.clearInstanceListeners(this.input);
            this.$input.removeData();
            this.$input.off(this._name);
            this.$input.unbind("." + this._name)
        },
        find: function (i) {
            this.geocode({
                address: i || this.$input.val()
            })
        },
        geocode: function (i) {
            if (!i.address) {
                return
            }
            if (this.options.bounds && !i.bounds) {
                if (this.options.bounds === true) {
                    i.bounds = this.map && this.map.getBounds()
                } else {
                    i.bounds = this.options.bounds
                }
            }
            if (this.options.country) {
                i.region = this.options.country
            }
            this.geocoder.geocode(i, a.proxy(this.handleGeocode, this))
        },
        selectFirstResult: function () {
            var l = "";
            if (a(".pac-item-selected")[0]) {
                l = "-selected"
            }
            var i = a(".pac-container:visible .pac-item" + l + ":first span:nth-child(2)").text();
            var j = a(".pac-container:visible .pac-item" + l + ":first span:nth-child(3)").text();
            var k = i;
            if (j) {
                k += " - " + j
            }
            this.$input.val(k);
            return k
        },
        restoreLastValue: function () {
            if (this.lastInputVal) {
                this.$input.val(this.lastInputVal)
            }
        },
        handleGeocode: function (j, k) {
            if (k === google.maps.GeocoderStatus.OK) {
                var i = j[0];
                this.$input.val(i.formatted_address);
                this.update(i);
                if (j.length > 1) {
                    this.trigger("geocode:multiple", j)
                }
            } else {
                this.trigger("geocode:error", k)
            }
        },
        trigger: function (j, i) {
            this.$input.trigger(j, [i])
        },
        center: function (i) {
            if (i.viewport) {
                this.map.fitBounds(i.viewport);
                if (this.map.getZoom() > this.options.maxZoom) {
                    this.map.setZoom(this.options.maxZoom)
                }
            } else {
                this.map.setZoom(this.options.maxZoom);
                this.map.setCenter(i.location)
            }
            if (this.marker) {
                this.marker.setPosition(i.location);
                this.marker.setAnimation(this.options.markerOptions.animation)
            }
        },
        update: function (i) {
            if (this.map) {
                this.center(i.geometry)
            }
            if (this.$details) {
                this.fillDetails(i)
            }
            this.trigger("geocode:result", i)
        },
        fillDetails: function (l) {
            var j = {},
                k = l.geometry,
                m = k.viewport,
                i = k.bounds;
            a.each(l.address_components, function (n, p) {
                var o = p.types[0];
                a.each(p.types, function (q, r) {
                    j[r] = p.long_name;
                    j[r + "_short"] = p.short_name
                })
            });
            a.each(f, function (n, o) {
                j[o] = l[o]
            });
            a.extend(j, {
                formatted_address: l.formatted_address,
                location_type: k.location_type || "PLACES",
                viewport: m,
                bounds: i,
                location: k.location,
                lat: k.location.lat(),
                lng: k.location.lng()
            });
            a.each(this.details, a.proxy(function (o, n) {
                var p = j[o];
                this.setDetail(n, p)
            }, this));
            this.data = j
        },
        setDetail: function (i, j) {
            if (j === g) {
                j = ""
            } else {
                if (typeof j.toUrlValue == "function") {
                    j = j.toUrlValue()
                }
            }
            if (i.is(":input")) {
                i.val(j)
            } else {
                i.text(j)
            }
        },
        markerDragged: function (i) {
            this.trigger("geocode:dragged", i.latLng)
        },
        mapClicked: function (i) {
            this.trigger("geocode:click", i.latLng)
        },
        mapDragged: function (i) {
            this.trigger("geocode:mapdragged", this.map.getCenter())
        },
        mapIdle: function (i) {
            this.trigger("geocode:idle", this.map.getCenter())
        },
        mapZoomed: function (i) {
            this.trigger("geocode:zoom", this.map.getZoom())
        },
        resetMarker: function () {
            this.marker.setPosition(this.data.location);
            this.setDetail(this.details.lat, this.data.location.lat());
            this.setDetail(this.details.lng, this.data.location.lng())
        },
        placeChanged: function () {
            var j = this.autocomplete.getPlace();
            this.selected = true;
            if (!j.geometry) {
                if (this.options.autoselect) {
                    var i = this.selectFirstResult();
                    this.find(i)
                }
            } else {
                this.update(j)
            }
        }
    });
    a.fn.geocomplete = function (k) {
        var i = "plugin_geocomplete";
        if (typeof k == "string") {
            var j = a(this).data(i) || a(this).geocomplete().data(i),
                l = j[k];
            if (typeof l == "function") {
                l.apply(j, Array.prototype.slice.call(arguments, 1));
                return a(this)
            } else {
                if (arguments.length == 2) {
                    l = arguments[1]
                }
                return l
            }
        } else {
            return this.each(function () {
                var m = a.data(this, i);
                if (!m) {
                    m = new e(this, k);
                    a.data(this, i, m)
                }
            })
        }
    }
})(jQuery, window, document);