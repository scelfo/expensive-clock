// Copyright 2011 Tony Scelfo (tony@tonyscelfo.com)

goog.provide('tonyscelfo.submit');


/**
 * @constructor
 * @param {string} formId
 * @return {boolean} Whether to let the form submit.
 */
tonyscelfo.submit = function(formId) {
  /**
   * @type {Element}
   */
  var form = document.getElementById(formId);
  var offset = form['offset'].value;
  var length = form['length'].value;
  var size = form['size'].value;
  var url = [
    '/',
    offset,
    '/',
    length,
    '/',
    size
  ].join('');
  window.location = url;
  return false;
}


goog.exportSymbol('tonyscelfo.submit', tonyscelfo.submit);
