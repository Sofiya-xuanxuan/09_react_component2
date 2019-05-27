me = function (e) {
    var t, r, n = (t = e, (r = document.createElement("img")).width = 1, r.height = 1, r.src = t, r);
    n.onload = n.onerror = function () {
        n.onload = null, n.onerror = null
    }
};