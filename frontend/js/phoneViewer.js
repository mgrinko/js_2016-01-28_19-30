'use strict';

let Component = require('./component.js');

let template = require('raw!../templates/phone-viewer-template.html');

class PhoneViewer extends Component {
  constructor(options) {
    super(options);

    this._compiledTemplate = _.template(template);

    this._el.addEventListener('click', this._onBackClick.bind(this));
  }

  show(phoneDetails) {
    this._el.innerHTML = this._compiledTemplate({
      phone: phoneDetails
    });

    super.show();
  }

  _onBackClick(event) {
    let backButton = event.target.closest('[data-selector="backButton"]');

    if (!backButton) {
      return;
    }

    this._trigger('back');
  }
}

module.exports = PhoneViewer;