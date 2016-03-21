'use strict';

let phones  = require('json!../../data/phones.json');

let PhoneCatalogue = require('./phoneCatalogue.js');
let PhoneViewer = require('./phoneViewer.js');
let Filter = require('./filter.js');
let Sorter = require('./sorter.js');

class Page {
  constructor(options) {
    this._el = options.element;;

    this._phones = phones;

    this._phoneCatalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]'),
      phones: this._phones
    });

    this._phoneViewer = new PhoneViewer({
      element: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._filter = new Filter({
      element: this._el.querySelector('[data-component="filter"]')
    });

    this._sorter = new Sorter({
      element: this._el.querySelector('[data-component="sorter"]')
    });

    this._phoneCatalogue.on('phoneSelected', this._onPhoneSelected.bind(this));
    this._phoneViewer.on('back', this._onPhoneViewerBack.bind(this));
    this._filter.on('filter', this._onFilter.bind(this));
  }

  _onPhoneSelected(event) {
    let phoneId = event.detail;
    let phoneDetails = this._getPhoneDetails(phoneId);

    this._phoneViewer.show(phoneDetails);
    this._phoneCatalogue.hide();
  }

  _onPhoneViewerBack() {
    this._phoneCatalogue.show();
    this._phoneViewer.hide();
  }

  _onFilter(event) {

  }

  _getPhoneDetails(phoneId) {
    return phones.filter(function(phone) {
      return phone.id === phoneId;
    })[0];
  }
}

module.exports = Page;