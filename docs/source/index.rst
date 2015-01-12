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

Usage
=====

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

.. js:function:: $.on(eventName, selector, handler)

.. js:function:: $.ready(handler)

scant Class
~~~~~~~~~~~

.. js:class:: scant(dom, selector)


Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
