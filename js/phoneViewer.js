'use strict';

class PhoneViewer extends Component {
  constructor(options) {
    super(options);

    this._template = document.getElementById('phone-viewer-template').innerHTML;
    this._compiledTemplate = _.template(this._template);

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