/**
 * Event emitter v0.1
 * @auther edo.
 */

;(function (global) {

    var EvtEmit = function () {};

    /**
     * Trigger the event.
     */
    EvtEmit.prototype.trigger = function (type, optData) {

        var handlers,
            handleArr,
            len, i = 0,
            func;

        if (!type) {
            return false;
        }

        handlers = this.handlers || (this.handlers = {});
        handleArr = handlers[type] || [];
        len = handleArr.length;

        for (; i < len; i++) {
            (func = handleArr[i]) && func.call(this, optData);
        }
    };

    /**
     * Bind function.
     */
    EvtEmit.prototype.bind = function (type, func) {
    
        var handlers = this.handlers || (this.handlers = {});

        if (!type) {
            return false;
        }

        (handlers[type] || (handlers[type] = [])).push(func);
    };

    /**
     * Unbind function.
     */
    EvtEmit.prototype.unbind = function (type, func) {
    
        var handlers,
            handleArr,
            i;

        if (!type) {
            return false;
        }

        handlers = this.handlers || (this.handlers = {});
        handleArr = handlers[type] || [];
        i = handleArr.length;

        while (i--) {
            handleArr[i] === func && handleArr.splice(i, 1);
        }
    };

    ////////////////////////////////////////////////////////////////////////
    /**
     * Defined class method.
     */
    EvtEmit.attach = (function() {

        var re = new RegExp('Object|Array|Date|Arguments', 'i');

        /**
         * util functions
         */
        function detectType(o) {

            return Object.prototype.toString.call(o).replace(/^\[object (.+)\]$/, '$1');
        }

        function makeArray(args, sp) {

            if (!sp) {
                sp = 0;
            }

            return Array.prototype.slice.call(args, sp);
        }

        function _cloneObject(o, type) {

            var newList = [],
                i, e;

            if(!type) {
                type = detectType(o);
            }
            if (type == 'Array') {
                for (i = 0; e = o[i];  i++) {
                  newList.push(_cloneObject(e));
                }

                return newList;
            }
            else if (type == 'Object' || type == 'Arguments') {

              return _extendObject({}, o, true);
            }
            else if (type == 'Date') {

              return new Date(o.toString());
            }
            else {

              return o;
            }
        }

        function _extendObject(parent, obj, deepCopy) {

            var v, type, k, key;

            for (k in obj) {
                v = obj[k];
                type = detectType(v);

                if (/^\+/.test(k) && type == 'Object') {
                  key = k.replace(/^\+/, '');
                  parent[key] = _extendObject(parent[key], v, deepCopy);
                }
                else {
                  parent[k] = (deepCopy && re.test(type))
                    ? _cloneObject(v, type)
                    : v;
                }
            }

            return parent;
        }

        return function(target) {

            _extendObject(target, new EvtEmit, true);
        };
    })();


    /**
     * Export
     */
    global.EvtEmit = EvtEmit;

}(this));