var Scant = (function(){
    var inherits = function(parent, child){
        child.prototype = Object.create(parent.prototype, {
            constructor: {
                value: child,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    };

    var extend = function(target, source) {
        var a = Object.create(target);
        for(var prop in source){
            a[prop] = source[prop];
        }
        return a;
    };

    var scant = function(dom, selector){
        this.selector = selector || '';
        this.length = dom ? dom.length : 0;
        for(var i = 0; i < this.length; ++i){
            this[i] = dom[i];
        }
    };
    inherits(Array, scant);

    if(!scant.prototype.forEach){
        scant.prototype.forEach = function(func){
            for(var i = 0; i < this.length; ++i){
                func(this[i]);
            }
        };
    }

    scant.prototype.find = function(selector){
        var elements = [];
        this.forEach(function(elm){
            var elms = this.slice.call(elm.querySelectorAll(selector));
            elements = elements.concat(elms);
        }.bind(this));
        return new scant(elements);
    };

    var $ = function(selector){
        if(typeof selector === 'string'){
            var elements = document.querySelectorAll(selector);
            return new scant(elements, selector);
        }
        return new scant(selector);
    };

    $.extend = extend;
    $.inherits = inherits;

    var defaultAjaxOptions = {
        url: null,
        method: 'GET',
        headers: {},
        data: null,
        dataType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: null,
        error: null,
        beforeSend: null,
        responseType: '',
    };
    $.ajax = function(options){
        options = extend(defaultAjaxOptions, options);
        var req = new XMLHttpRequest();
        req.responseType = options.responseType;
        req.open(options.method, options.url, true);
        for(var key in options.headers){
            req.setRequestHeader(key, options.headers[key]);
        }
        req.onload = function(){
            if(req.status >= 200 && req.status < 400){
                if(typeof options.success === 'function'){
                    options.success(null, req);
                }
            } else {
                if(typeof options.error === 'function'){
                    options.error(true, req);
                }
            }
        };
        req.onerror = function(){
            if(typeof options.error === 'function'){
                options.error(true, req);
            }
        };
        if(typeof options.beforeSend === 'function'){
            options.beforeSend(req);
        }
        if(options.data){
            req.setRequestHeader('Content-Type', options.dataType);
        }
        req.send(options.data);

        return req;
    };

    $.on = function(eventName, selector, handler){
        if(typeof selector === 'function'){
            handler = selector;
            selector = null;
        }
        var body = document.querySelector('body');
        body.addEventListener(eventName, function(event){
            if(selector === null || event.target.matches(selector)){
                return handler(event);
            }
        });
    };

    $.ready = function(handler){
        $.on('DOMContentLoaded', handler);
    };

    return $;
})();

window.Scant = Scant;
window.$ === undefined && (window.$ = window.Scant);
