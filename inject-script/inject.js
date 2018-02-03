var overrider = function () {
    var oldGetElementById = document.getElementById;

    Object.defineProperty(document, "cookie", {
        get: function() {
            console.log("Getting cookie");
            return this._cookie;
        },
        set: function(val) {
            console.log("Setting cookie", arguments);
            this._cookie= val;
            return this._cookie;
        },
    });
};

var script = document.createElement("script");
script.textContent = "(" + overrider + ")()";
document.documentElement.appendChild(script);
