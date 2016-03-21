'use strict';

let Component = require('./component.js');

let compiledTemplate = require('../templates/phone-catalogue-template.jade');

class PhoneCatalogue extends Component {
  constructor(options) {
    super(options);

    this._phones = options.phones;

    this._el.innerHTML = compiledTemplate({
      phones: this._phones
    });

    this._el.onclick = this._onPhoneClick.bind(this);
  }

  _onPhoneClick(event) {
    let link = event.target.closest('[data-selector="openTrigger"]');

    if (!link) {
      return;
    }

    let phoneId = link.closest('[data-selector="phoneItemContainer"]').dataset.id;

    this._trigger('phoneSelected', phoneId);
  }
}

module.exports = PhoneCatalogue;




