scant.js
========

[![Docs Status](https://readthedocs.org/projects/scant/badge/?version=latest)](https://scant.readthedocs.org)

A very minimalistic javascript library. It simply provides some helpers for
ajax, form serialization, extend, inherits and event delegation.

Scant's query selector will return back a normal javascript array with `forEach`
implemented if it does not exist, `find` (used to query for children of all
wrapped elements in the array) and `serialize` (used to serialize form elements
or data attributes);

### scant _/skant/_
#### adjective
*adjective:* scant

1. barely sufficient or adequate.
 
 "companies with scant regard for the safety of future generations"
 
 *synonyms:*	little, little or no, minimal, hardly (any), limited, negligible, barely sufficient, meager
 
 *antonyms:*	abundant, ample, sufficient barely amounting to a specified number or quantity.

#### verb
*verb:* scant;
*3rd person present:* scants;
*past tense:* scanted;
*past participle:* scanted;
*gerund or present participle:* scanting

1. provide grudgingly or in insufficient amounts.

 "he does not scant his attention to the later writings"

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
