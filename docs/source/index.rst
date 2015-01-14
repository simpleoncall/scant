.. scant documentation master file, created by
   sphinx-quickstart on Sun Jan 11 21:57:50 2015.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to scant's documentation!
=================================

A very minimalistic javascript library.

scant */skant/*
~~~~~~~~~~~~~~~

*adjective:* scant

1. barely sufficient or adequate.

 "companies with scant regard for the safety of future generations"

 *synonyms:*	little, little or no, minimal, hardly (any), limited, negligible, barely sufficient, meager

 *antonyms:*	abundant, ample, sufficient barely amounting to a specified number or quantity.

*verb:* scant;
*3rd person present:* scants;
*past tense:* scanted;
*past participle:* scanted;
*gerund or present participle:* scanting

1. provide grudgingly or in insufficient amounts.

 "he does not scant his attention to the later writings"


Download
========

`Github Page <https://github.com/simpleoncall/scant>`_

* Latest: :download:`scant-latest.min.js <./_static/download/scant-latest.min.js>` :download:`scant-latest.min.js.map <./_static/download/scant-latest.min.js.map>`
* v0.5.0: :download:`scant-v0.5.0.min.js <./_static/download/scant-v0.5.0.min.js>` :download:`scant-v0.5.0.min.js.map <./_static/download/scant-v0.5.0.min.js.map>`


Usage
=====

.. code-block:: html

    <script type="text/javascript" src="//path/to/scant.min.js"></script>
    <script type="text/javascript">
      // window.Scant === window.$
      // window.$ is only made available is $ is not already registered

      $.ready(function(){
        var $elm = $('.selector');
        $elm.on('click', '.child', function(evt){
          evt.stopPropagation();
          evt.preventDefault();

          var data = $('form').serialize();
          $.ajax({
            url: '/end-point',
            data: JSON.stringify(data),
            dataType: 'application/json',
            responseType: 'json',
          }, function(err, request){
            if(err || ~request.response){
              alert('oh no, something went wrong');
            } else {
              alert('go a good response back');
            }
          });
        });
      });
    </script>


API Documentation
=================

$ Object
~~~~~~~~

.. js:function:: $(selector)

    Main entry point for creating an instance of :js:class:`scant`.

    :param string|NodeElement|HTMLElement selector:
        Either a string css selector to use to fetch elements on the
        page or an element to wrap in :js:class:`scant`
    :returns: an instance of :js:class:`scant`.

.. js:function:: $.util.extend(target, source)

    Helper method to copy properties from one Object over to another

    :param Object target: Object to copy properties onto
    :param Object source: Object to copy properties from
    :returns: a copy of `target` with all of `sources`'s properties copied to it

.. js:function:: $.util.inherits(parent, child)

    Helper method to ensure that `child`'s prototype inherits
    from `parent`'s

    :param function parent: The parent class to inherit from
    :param function child: The child class to inherit to
    :returns: null

.. js:attribute:: $.fn

    The prototype for :js:class:`scant` exposed, useful for extending :js:class:`scant`.

    .. code-block:: js

        $.fn.hide = function(){
          // "this" refers to the instance of scant
          this.forEach(function(elm){
            elm.style.display = 'none';
          }.bind(this);
        };

        $('.hidden').hide();

.. js:function:: $.ajax(options, callback)

    Wrapper around making XMLHttpRequest's.

    .. code-block:: js

        // default options to $.ajax
        var defaultAjaxOptions = {
            // url to fetch
            url: null,
            // http method to use
            method: 'GET',
            // additional headers e.g. {'X-Token': 'token'}
            headers: {},
            // data to send
            data: null,
            // this gets set as 'Content-Type' header with request
            dataType: 'application/x-www-form-urlencoded; charset=UTF-8',
            // an optional function(request) to call before sending the request,
            // useful to make customizations to the XMLHttpRequest object before sending
            beforeSend: null,
            // the response type expected back
            responseType: '',
        };

    :param Object options: Object of options to override. :js:attr:`url` is required
    :param function callback:
        :js:data:`function(err, request)` will get called when the request has finished
        (success or fail). :js:data:`err` will be true if the request failed, null otherwise
        :js:data:`request` will be the :js:class:`XMLHttpRequest` object used for the request.
    :returns: null

.. js:function:: $.on(eventName, [selector], handler)

    Function for event delegation. This method will add `handler` as an event handler
    on `body`, optionally filtering based on the `selector` provided.

    :param string eventName: The event to bind (e.g. 'click', 'submit', etc)
    :param string selector: Optional parameter, a css selector used to filter events
    :param function handler: The handler to bind for the event
    :returns: null

.. js:function:: $.ready(handler)

    Function used to add a handler when the page has finished loaded ('DOMContentLoaded').

    :param function handler: The handler to invoke when 'DOMContentLoaded'
    :returns: null


scant Class
~~~~~~~~~~~

.. js:class:: scant([dom], [selector])

    The `scant` class inherits from `Array` and properties of an `Array` are available
    (although `forEach` is shimmed in if it is not supported by the browser).

    :param Object dom:
        `dom` is either an `Array` of elements or the result of calling
        `document.querySelectorAll` with a `selector`
    :param string selector: The selector used to fetch `dom`.

.. js:function:: scant.find(selector)

    Method used to find all children matching `selector` beloning to the elements
    stored in this instance of scant.

    :param string selector: A css selector to use to match elements.
    :returns: :js:class:`scant`

.. js:function:: scant.on(eventName, [selector], handler)

    This method is the same as :js:func:`$.on` except the handler is bound to every node
    stored in this instance of scant as opposed to binding to `body`.

    :param string eventName: The event to bind to (e.g. 'click', 'submit', etc)
    :param string selector: A css selector used to filter the events by
    :param function handler: The handler to call for each event.
    :returns: null

.. js:function:: scant.serialize([elm])

    Method used to serialize the data for elements stored in this instance of scant.
    Most useful for fetching the data from `form` elements. This method gets the name/value
    pairs for all `form` elements (creating an array when the same name is present multiple times)
    as well as appending element data attributes.

    :param Object elm:
        This parameter is mostly used internally to this function when making recursive
        calls for serializing the data, but can be a single dom element to serialize.
    :returns: Object


Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
