/* simpleWeather v3.1.0 - http://simpleweatherjs.com */
(function (a) {
    function b(d, c) {
        if (d === "f") {
            return Math.round((5 / 9) * (c - 32))
        } else {
            return Math.round((9 / 5) * c + 32)
        }
    }
    a.extend({
        simpleWeather: function (e) {
            e = a.extend({
                location: "",
                woeid: "",
                unit: "f",
                success: function (g) {},
                error: function (g) {}
            }, e);
            var d = new Date();
            var f = "https://query.yahooapis.com/v1/public/yql?format=json&rnd=" + d.getFullYear() + d.getMonth() + d.getDay() + d.getHours() + "&diagnostics=true&callback=?&q=";
            if (e.location !== "") {
                var c = "";
                if (/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/.test(e.location)) {
                    c = "(" + e.location + ")"
                } else {
                    c = e.location
                }
                f += 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + c + '") and u="' + e.unit + '"'
            } else {
                if (e.woeid !== "") {
                    f += "select * from weather.forecast where woeid=" + e.woeid + ' and u="' + e.unit + '"'
                } else {
                    e.error("Could not retrieve weather due to an invalid location.");
                    return false
                }
            }
            a.getJSON(encodeURI(f), function (h) {
                if (h !== null && h.query !== null && h.query.results !== null && h.query.results.channel.description !== "Yahoo! Weather Error") {
                    var m = h.query.results.channel,
                        n = {},
                        j, g = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"],
                        l = "https://s.yimg.com/os/mit/media/m/weather/images/icons/l/44d-100567.png";
                    n.title = m.item.title;
                    n.temp = m.item.condition.temp;
                    n.code = m.item.condition.code;
                    n.todayCode = m.item.forecast[0].code;
                    n.currently = m.item.condition.text;
                    n.high = m.item.forecast[0].high;
                    n.low = m.item.forecast[0].low;
                    n.text = m.item.forecast[0].text;
                    n.humidity = m.atmosphere.humidity;
                    n.pressure = m.atmosphere.pressure;
                    n.rising = m.atmosphere.rising;
                    n.visibility = m.atmosphere.visibility;
                    n.sunrise = m.astronomy.sunrise;
                    n.sunset = m.astronomy.sunset;
                    n.description = m.item.description;
                    n.city = m.location.city;
                    n.country = m.location.country;
                    n.region = m.location.region;
                    n.updated = m.item.pubDate;
                    n.link = m.item.link;
                    n.units = {
                        temp: m.units.temperature,
                        distance: m.units.distance,
                        pressure: m.units.pressure,
                        speed: m.units.speed
                    };
                    n.wind = {
                        chill: m.wind.chill,
                        direction: g[Math.round(m.wind.direction / 22.5)],
                        speed: m.wind.speed
                    };
                    if (m.item.condition.temp < 80 && m.atmosphere.humidity < 40) {
                        n.heatindex = -42.379 + 2.04901523 * m.item.condition.temp + 10.14333127 * m.atmosphere.humidity - 0.22475541 * m.item.condition.temp * m.atmosphere.humidity - 6.83783 * (Math.pow(10, -3)) * (Math.pow(m.item.condition.temp, 2)) - 5.481717 * (Math.pow(10, -2)) * (Math.pow(m.atmosphere.humidity, 2)) + 1.22874 * (Math.pow(10, -3)) * (Math.pow(m.item.condition.temp, 2)) * m.atmosphere.humidity + 8.5282 * (Math.pow(10, -4)) * m.item.condition.temp * (Math.pow(m.atmosphere.humidity, 2)) - 1.99 * (Math.pow(10, -6)) * (Math.pow(m.item.condition.temp, 2)) * (Math.pow(m.atmosphere.humidity, 2))
                    } else {
                        n.heatindex = m.item.condition.temp
                    }
                    if (m.item.condition.code == "3200") {
                        n.thumbnail = l;
                        n.image = l
                    } else {
                        n.thumbnail = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + m.item.condition.code + "ds.png";
                        n.image = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + m.item.condition.code + "d.png"
                    }
                    n.alt = {
                        temp: b(e.unit, m.item.condition.temp),
                        high: b(e.unit, m.item.forecast[0].high),
                        low: b(e.unit, m.item.forecast[0].low)
                    };
                    if (e.unit === "f") {
                        n.alt.unit = "c"
                    } else {
                        n.alt.unit = "f"
                    }
                    n.forecast = [];
                    for (var k = 0; k < m.item.forecast.length; k++) {
                        j = m.item.forecast[k];
                        j.alt = {
                            high: b(e.unit, m.item.forecast[k].high),
                            low: b(e.unit, m.item.forecast[k].low)
                        };
                        if (m.item.forecast[k].code == "3200") {
                            j.thumbnail = l;
                            j.image = l
                        } else {
                            j.thumbnail = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + m.item.forecast[k].code + "ds.png";
                            j.image = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + m.item.forecast[k].code + "d.png"
                        }
                        n.forecast.push(j)
                    }
                    e.success(n)
                } else {
                    e.error("There was a problem retrieving the latest weather information.")
                }
            });
            return this
        }
    })
})(jQuery);
$(document).ready(function () {
    loadWeather("paris", "us")
});

function loadWeather(a, b) {
    $.simpleWeather({
        location: a,
        woeid: b,
        unit: "c",
        success: function (c) {
            html = '<span><i class="icon-' + c.code + '"></i> ' + c.temp + "&deg;" + c.units.temp + "</span>";
            html += "<ul><li>" + c.city + ", " + c.currently + "</li>";
            html += '<li class="currently">' + c.city + ", " + c.currently + "</li>";
            html += "<li>" + c.alt.temp + "&deg;C</li></ul>";
            $("#weather").html(html)
        },
        error: function (c) {
            $("#weather").html("<p>" + c + "</p>")
        }
    })
};