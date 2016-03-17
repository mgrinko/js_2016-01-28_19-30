'use strict';

class PhoneViewer {
  constructor(options) {
    this._el = options.element;
    this._template = document.getElementById('phone-viewer-template').innerHTML;

  }

  show(phoneDetails) {
    this._el.innerHTML = _.template(this._template)({
      phone: phoneDetails
    });

    this._el.classList.remove('js-hidden');
  }
}