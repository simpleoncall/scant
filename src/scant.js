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

    scant.prototype.serialize = function(elm){
        var results = {};
        if(elm === undefined){
            this.forEach(function(elm){
                results = extend(results, this.serialize(elm));
            }.bind(this));
        } else if(elm.nodeName === 'FORM'){
            this.forEach.call(elm.elements, function(elm){
                if(elm.nodeName === 'INPUT'){
                    switch(elm.type){
                    case 'text':
                    case 'hidden':
                    case 'button':
                    case 'reset':
                    case 'submit':
                    case 'password':
                        results[elm.name] = elm.value;
                        break;
                    case 'checkbox':
                    case 'radio':
                        if(elm.checked){
                            if(Array.isArray(results[elm.name])){
                                results[elm.name].push(elm.value);
                            } else if(elm.name in results){
                                results[elm.name] = [results[elm.name], elm.value];
                            } else {
                                results[elm.name] = elm.value;
                            }
                        }
                        break;
                    }
                } else if(elm.nodeName === 'TEXTAREA'){
                    results[elm.name] = elm.value;
                } else if(elm.nodeName === 'BUTTON'){
                    results[elm.name] = elm.value;
                } else if(elm.nodeName === 'SELECT'){
                    switch(elm.type){
                    case 'select-one':
                        results[elm.name] = elm.value;
                        break;
                    case 'select-multiple':
                        for(var i = 0; i < elm.options.length; ++i){
                            if(elm.options[i].selected){
                                if(Array.isArray(results[elm.name])){
                                    results[elm.name].push(elm.options[i].value);
                                } else if(elm.name in results){
                                    results[elm.name] = [results[elm.name], elm.options[i].value];
                                } else {
                                    results[elm.name] = elm.options[i].value;
                                }
                            }
                        }
                        break;
                    }
                }
            }.bind(this));
        } else {
            results = extend(results, elm.dataset);
        }

        return results;
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
        beforeSend: null,
        responseType: '',
    };
    $.ajax = function(options, callback){
        options = extend(defaultAjaxOptions, options);
        callback = typeof callback === 'function' ? callback : function(){};
        var req = new XMLHttpRequest();
        req.responseType = options.responseType;
        req.open(options.method, options.url, true);
        for(var key in options.headers){
            req.setRequestHeader(key, options.headers[key]);
        }
        req.onload = function(){
            if(req.status >= 200 && req.status < 400){
                callback(null, req);
            } else {
                callback(true, req);
            }
        };
        req.onerror = function(){
            callback(true, req);
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
        document.addEventListener('DOMContentLoaded', handler);
    };

    return $;
})();

window.Scant = Scant;
window.$ === undefined && (window.$ = window.Scant);
