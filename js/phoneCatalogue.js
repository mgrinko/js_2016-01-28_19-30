'use strict';

var PhoneCatalogue = (function() {
  let template = document.getElementById('phone-catalogue-template').innerHTML;

  class PhoneCatalogue extends Component {
    constructor(options) {
      super(options);

      this._phones = options.phones;

      this._el.innerHTML = _.template(template)({
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

      this._triggerPhoneSelectedEvent(phoneId);
    }

    _triggerPhoneSelectedEvent(phoneId) {
      let event = new CustomEvent('phoneSelected', {
        detail: phoneId
      });

      this._el.dispatchEvent(event);
    }
  }

  return PhoneCatalogue;
})();



