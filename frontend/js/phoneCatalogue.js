'use strict';

let Component = require('./component.js');

let compiledTemplate = require('../templates/phone-catalogue-template.jade');

class PhoneCatalogue extends Component {
  constructor(options) {
    super(options);

    this._phones = [];

    this._el.onclick = this._onPhoneClick.bind(this);
  }

  _onPhoneClick(event) {
    let link = event.target.closest('[data-selector="openTrigger"]');

    if (!link) {
      return;
    }

    let element = link.closest('[data-selector="phoneItemContainer"]');
    let phoneId = element.dataset.id;

    this._trigger('phoneSelected', {
      phoneId: phoneId,
      phoneElement: element
    });
  }

  show(phones) {
    if (phones) {
      this._phones = phones;
    }

    this._el.innerHTML = compiledTemplate({
      phones: this._phones
    });

    super.show();
  }
}

module.exports = PhoneCatalogue;




