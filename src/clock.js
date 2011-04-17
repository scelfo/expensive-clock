// Copyright 2011 Tony Scelfo (tony@tonyscelfo.com)

goog.provide('tonyscelfo.clock');

goog.require('goog.Timer');
goog.require('goog.array');
goog.require('goog.dom');


/**
 * @constructor
 * @param {number} offset
 * @param {number} length
 * @param {number} size
 */
tonyscelfo.clock = function(offset, length, size) {
  /**
   * The offset into the time string.
   * @type {number}
   * @private
   */
  this.offset_ = offset;

  /**
   * The length of the time string.
   * @type {number}
   * @private
   */
  this.length_ = length;

  /**
   * The size of the time string.
   * @type {number}
   * @private
   */
  this.size_ = size;

  /**
   * Run for this many cycles, infinite if less than 0.
   * @type {number}
   * @private
   */
  this.count_ = -1;
};

/**
 * @type {goog.Timer}
 */
tonyscelfo.clock.prototype.interval_;

/**
 * @type {Element}
 */
tonyscelfo.clock.prototype.currentElement_;

/**
 * @type {Element}
 */
tonyscelfo.clock.prototype.previousElement_;

/**
 * @param {number} section Value for this section.
 * @param {number} length Length to pad until.
 * @return {string}
 * @private
 */
tonyscelfo.clock.pad_ = function(section, length) {
  var returnMe = '' + section;
  for (var i = 0, l = length - returnMe.length; i < l; i++) {
    returnMe = '0' + returnMe;
  }
  return returnMe;
};

/**
 * Start the clock.
 */
tonyscelfo.clock.prototype.init = function() {
  var offsetToEvenSeconds = goog.now() % 1000;
  goog.Timer.callOnce(goog.bind(this.startInterval_, this), offsetToEvenSeconds);
  this.draw_();
};

/**
 * Establish the timer.
 * @private
 */
tonyscelfo.clock.prototype.startInterval_ = function() {
  var interval = new goog.Timer(1000);
  goog.events.listen(interval, goog.Timer.TICK,
      goog.bind(this.draw_, this));
  interval.start();
  this.interval_ = interval;
};

/**
 * Render to the screen.
 * @private
 */
tonyscelfo.clock.prototype.draw_ = function() {
  var count = this.count_;
  if (count == 0) {
    this.interval_.stop();
  }
  if (count > 0) {
    count--;
  }
  this.count_ = count;

  // Remove the previous element.
  var previousElement = this.previousElement_;
  previousElement && goog.dom.removeNode(previousElement);

  // Move the current element to the previous element.
  previousElement = this.currentElement_;

  // Make a new current element.
  var currentElement = this.renderTime_();
  document.body.appendChild(currentElement);

  // Prune current clock elements that aren't 9 or :
  this.removeDivsThatShouldNotAnimate_(currentElement, previousElement);

  // Animate the previous clock;
  this.animateClock_(previousElement);

  this.currentElement_ = currentElement;
  this.previousElement_ = previousElement;
};


/**
 * Updates the style of the previous clock element.
 * @param {Element} currentElement The current time element.
 * @param {Element} previousElement The previous time element.
 * @private
 */
tonyscelfo.clock.prototype.removeDivsThatShouldNotAnimate_ = function(
    currentElement, previousElement) {
  if (!currentElement || !previousElement) {
    return;
  }
  var currentChildren = goog.array.clone(currentElement.children);
  var previousChildren = goog.array.clone(previousElement.children);
  for (var i = 0, l = currentChildren.length; i < l; i++) {
    if (currentChildren[i].innerHTML == previousChildren[i].innerHTML) {
      goog.dom.removeNode(previousChildren[i]);
    }
  }
};


/**
 * Updates the style of a clock element to animate.
 * @type {Element} element
 * @private
 */
tonyscelfo.clock.prototype.animateClock_ = function(element) {
  if (!element) {
    return;
  }
  element.className = 'clock flip';
};


/**
 * Create a dom element of the whole time.
 * @return {Element}
 * @private
 */
tonyscelfo.clock.prototype.renderTime_ = function() {
  var timeString = this.getTimeString_().substring(this.offset_, this.offset_ + this.length_);

  var numbers = [];
  var characters = timeString.split("");
  for (var i = 0, l = characters.length; i < l; i++) {
    var div = goog.dom.createElement('div');
    var offset = 0;
    for (var j = 0; j < i; j++) {
      if (characters[j] == ':' || characters[j] == " ") {
        offset += 0.278;
      } else {
        offset += 0.555;
      }
    }
    div.style.left = offset + 'em';
    div.className = 'number';
    div.innerHTML = timeString.substring(i, i + 1);
    numbers.push(div);
  }
  return this.renderDiv_(numbers);
};

/**
 * Render contents into a div.
 * @param {Array.Element} contents Elements to put into the div.
 * @return Element
 * @private
 */
tonyscelfo.clock.prototype.renderDiv_ = function(contents) {
  var div = goog.dom.createElement('div');
  div.className = 'clock';
  div.style.fontSize = this.size_ + 'px';
  for (var i = 0, l = contents.length; i < l; i++) {
    goog.dom.appendChild(div, contents[i]);
  }
  return div;
}

/**
 * Get the time string.
 * @return {string}
 */
tonyscelfo.clock.prototype.getTimeString_ = function() {
  var date = new Date();
  var odd = date.getSeconds() % 2 == 0;
  return [
    tonyscelfo.clock.pad_(date.getHours(), 2),
    odd ? ':' : ' ',
    tonyscelfo.clock.pad_(date.getMinutes(), 2),
    odd ? ':' : ' ',
    tonyscelfo.clock.pad_(date.getSeconds(), 2)
  ].join('');
}


goog.exportSymbol('tonyscelfo.clock', tonyscelfo.clock);
goog.exportProperty(tonyscelfo.clock.prototype, 'init',
    tonyscelfo.clock.prototype.init);
