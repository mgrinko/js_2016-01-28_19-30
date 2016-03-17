'use strict';

class PhoneViewer extends Component {
  constructor(options) {
    super(options);

    this._template = document.getElementById('phone-viewer-template').innerHTML;

    this._el.addEventListener('click', this._onBackClick.bind(this));
  }

  show(phoneDetails) {
    this._el.innerHTML = _.template(this._template)({
      phone: phoneDetails
    });

    super.show();
  }

  _onBackClick(event) {
    let backButton = event.target.closest('[data-selector="backButton"]');

    if (!backButton) {
      return;
    }

    this._triggerBackEvent();
  }

  _triggerBackEvent() {
    let event = new CustomEvent('back');

    this._el.dispatchEvent(event);
  }
}