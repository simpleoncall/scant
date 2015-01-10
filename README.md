scant.js
========

A very minimalistic javascript library. It simply provides some helpers for
ajax, form serialization, extend, inherits and event delegation.

Scant's query selector will return back a normal javascript array with `forEach`
implemented if it does not exist, `find` (used to query for children of all
wrapped elements in the array) and `serialize` (used to serialize form elements
or data attributes);

## Install
```html
<script type="text/javascript" src="/js/scant.min.js"></script>
```

## Usage

```javascript
$.ready(function(){
    // gets called on DOMContentLoaded
    $.on('click', 'a', function(e){
        // gets called whenever an 'a' tag gets clicked
    });
    $.on('click', function(e){
        // called for every click on the page
    });

    $.ajax({
        url: '/some/url',
    }, function(err, result){
        // err is true when there was an error, null otherwise
        // result is the XMLHttpRequest object used for the request
    });

    var $body = $('body');
    var $sections = $body.find('section');
    $sections.forEach(function(elm){
        // do something here
    });
});
```
