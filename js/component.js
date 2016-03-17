'use strict';

class Component {
  constructor(options) {
    this._el = options.element;
  }

  getElement() {
    return this._el;
  }

  show() {
    this._el.classList.remove('js-hidden');
  }

  hide() {
    this._el.classList.add('js-hidden');
  }

  _trigger(eventName, data, options) {
    options = options || {};

    if (data != undefined) {
      options.detail = data;
    }

    let event = new CustomEvent(eventName, options);

    this._el.dispatchEvent(event);
  }

  on(eventName, handler) {
    this._el.addEventListener(eventName, handler);
  }
}