/**
 * Event emitter
 * @version 0.2
 * @auther Kazuya Hiruma.
 *
 * Copyright 2011 Kazuya Hiruma.
 * Licensed under the MIT License:
 *
 * http://css-eblog.com/
 */
(function (scope) {

    /**
     * EvtEmit class.
     * @constructor
     * @example
     * var targetObj = {};
     * EvtEmit.attach(targetObj);
     * //attach event
     * targetObj.bind('update', function (data) {
     *         alert('update!');
     * });
     * //dispatch event
     * targetObj.trigger('update', data);
     */
    function EvtEmit() {}

    function trigger (type, optData) {

        var handlers,
            handleArr,
            l,
            func;

        if (!type) {
            return false;
        }

        handlers = this.handlers || (this.handlers = {});
        handleArr = handlers[type] || [];
        l = handleArr.length;

        while(l--) {
            (func = handleArr[l]) &&
            func[0].call(func[1] || this, optData);
        }
    }

    function bind(type, func, context) {
        var handlers = this.handlers || (this.handlers = {});

        if (!type) {
            return false;
        }

        (handlers[type] || (handlers[type] = [])).push([func, context]);
    }

    function one(type, func, context) {

        var self = this;

        function _func () {
            self.off(type, _func);
            func.apply(context, arguments);
            context = null;
            self  = null;
            _func = null;
        }

        this.on(type, _func, context);
    }

    function unbind(type, func) {
    
        var handlers,
            handleArr,
            i;

        if (!type) {
            return false;
        }

        handlers  = this.handlers || (this.handlers = {});
        handleArr = handlers[type] || [];
        i = handleArr.length;

        if (!func) {
            this.handlers[type] = [];
        }
        else {
            while (i--) {
                handleArr[i][0] === func && handleArr.splice(i, 1);
            }
        }
    }

    /////////////////////////////////////////////////////////////////////
    
    //Shortcut.
    EvtEmit.fn = EvtEmit.prototype;


    /* ------------------------------------------------
         Trigger the event.
    --------------------------------------------------- */
    EvtEmit.fn.trigger = trigger;
    EvtEmit.fn.fire    = trigger;


    /* ------------------------------------------------
        Bind function.
    --------------------------------------------------- */
    EvtEmit.fn.bind = bind;
    EvtEmit.fn.on   = bind;


    /* ------------------------------------------------
        Invoke at onece.
    --------------------------------------------------- */
    EvtEmit.prototype.one = one;


    /* ------------------------------------------------
        Unbind function.
    --------------------------------------------------- */
    EvtEmit.prototype.unbind = unbind;
    EvtEmit.prototype.off    = unbind;


    ////////////////////////////////////////////////////////////////////////
    /* ------------------------------------------------
        Defined class method.
    --------------------------------------------------- */
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

            var val, type;

            for (var key in obj) {
                val = obj[key];
                type = detectType(val);

                parent[key] = (deepCopy && re.test(type)) ? _cloneObject(val, type) : val;
            }

            return parent;
        }

        return function(target) {
            _extendObject(target, new EvtEmit, true);
        };
    })();


    /* ------------------------------------------------
        Export EvtEmit as window.EvtEmit
    --------------------------------------------------- */
    scope.EvtEmit = EvtEmit;
}(this));
