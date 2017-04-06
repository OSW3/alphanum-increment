"use strict";

var c = "";

module.exports = {
    increment: increment,
    decrement: decrement
};

function init(options) {

    var settings = Object.assign({
        alpha: true,
        digit: true,
        dashes: true,
        specials: false,
        orderby: "ALPHADIGIT",

        s_alpha: "abcdefghijklmnopqrstuvwxyz",
        s_digit: "0123456789",
        s_specials: "",
    }, options);


    if (settings.orderby == "DIGITALPHA") {
        if (settings.digit) c+= settings.s_digit;
        if (settings.alpha) c+= settings.s_alpha;
    } else {
        if (settings.alpha) c+= settings.s_alpha;
        if (settings.digit) c+= settings.s_digit;
    }

    if (settings.dashes)    c+= "-";
    if (settings.specials)  c+= settings.s_specials;
}

function increment(str, options) {

    init(options);

    if (str == undefined)
        return getFirst();

    str = str.toLowerCase();

    var strlen = str.length;
    var last = str.substring(strlen - 1);

    if (same(last, getLast())) {
        var up = true;

        if (strlen > 1) {
            var i = strlen;
            var incrementNext = false;
            while (i--) {

                if (same(str[i], getLast()) && i == strlen-1) {
                    incrementNext = true;
                    str = replaceAt(i, next(str[i]), str);
                }
                else {
                    var str_clone = str;
                    str = replaceAt(i, (incrementNext ? next(str[i]) : str[i]), str);

                    if (same(str_clone[i], getLast()) && incrementNext) {
                        incrementNext = true;
                    } else {
                        incrementNext = false;
                    }
                }

                if (!incrementNext && up) {
                    up = false;
                }
            }
        }

        if (up) {
            var a = new Array(strlen+2);
            str = a.join(getFirst());
        }

        return str;

    } else {
        return str.slice(0,-1).concat(next(last));
    }
}

function decrement(str, options) {

    init(options);

    if (str == undefined)
        return false;

    str = str.toLowerCase();

    var strlen = str.length;
    var last = str.substring(strlen - 1);

    if (same(last, getFirst())) {
        var up = true;

        if (strlen > 1) {

            var i = strlen;
            var incrementNext = false;
            while (i--) {

                if (same(str[i], getFirst()) && i == strlen-1) {
                    incrementNext = true;
                    str = replaceAt(i, prev(str[i]), str);
                }
                else {
                    var str_clone = str;
                    str = replaceAt(i, (incrementNext ? prev(str[i]) : str[i]), str);

                    if (same(str_clone[i], getFirst()) && incrementNext) {
                        incrementNext = true;
                    } else {
                        incrementNext = false;
                    }
                }

                if (!incrementNext && up) {
                    up = false;
                }
            }
        }

        if (up) {
            var a = new Array(strlen);
            str = a.join(getLast());
        }

        return str;

    } else {
        return str.slice(0,-1).concat(prev(last));
    }
}


function same(str,char) {
    var i = str.length;
    while (i--) if (str[i]!==char) return false;
    return true;
}

function next(char) {
    var index = c.indexOf(char);
    var n = !same(char, getLast()) ? index+1 : 0;

    return c[n];
}

function prev(char) {
    var index = c.indexOf(char);
    var n = !same(char, getFirst()) ? index-1 : c.length-1;

    return c[n];
}

function getFirst() {
    return c[0];
}

function getLast() {
    var c_len = c.length;
    return c[c_len-1];
}

function replaceAt(index, replacement, str) {
    return str.substr(0, index) + replacement+ str.substr(index + replacement.length);
}
