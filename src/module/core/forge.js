/**
 * 采用标准方法来融合对象属性.
 * @author Molay Chen.
 * @returns {*}
 */
function forge() {
    if (arguments.length < 1) return null;
    // inherits first, copies other
    // only ie9+
    var o = Object.create(arguments[0]);
    for (var i = 1; i < arguments.length; i++) {
        var o2 = arguments[i];

        for (var key in o2)
            if (o2.hasOwnProperty(key))
                o[key] = o2[key];
    }
    return o;
}

module.exports = forge;