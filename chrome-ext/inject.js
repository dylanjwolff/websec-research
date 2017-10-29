overrider = function () {
                var oldGetElementById = document.getElementById;

                Object.defineProperty(document, 'cookie', {
                    get: function() {
                        console.log('Getting cookie');
                        return this._value;
                    },
                    set: function(val) {
                        console.log('Setting cookie', arguments);
                        this._value = val;
                        return this._value;
                    },
                });
        };

script = document.createElement('script');
script.textContent = '(' + overrider + ')()';
document.documentElement.appendChild(script);
