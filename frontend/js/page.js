'use strict';

let PhoneCatalogue = require('./phoneCatalogue.js');
let PhoneViewer = require('./phoneViewer.js');
let Filter = require('./filter.js');
let Sorter = require('./sorter.js');

class Page {
  constructor(options) {
    this._el = options.element;

    this._query = '';

    //this._phones = phones;

    this._phoneCatalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]'),

      //phones: this._phones
    });

    this._syncPhones();

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

    this._showPhoneDetails(phoneId);
  }


  _showPhoneDetails(phoneId) {
    this._ajax(`/data/phones/${phoneId}.json`, {
      success: this._onPhoneDetailLoaded.bind(this),
      error: this._onPhoneDetailsError.bind(this)
    });
  }

  _onPhoneDetailLoaded(phoneDetails) {
    this._phoneViewer.show(phoneDetails);
    this._phoneCatalogue.hide();
  }

  _onPhoneDetailsError(error) {
    console.error(error);
  }

  _onPhoneViewerBack() {
    this._phoneCatalogue.show();
    this._phoneViewer.hide();
  }

  _onFilter(event) {
    var query = event.detail.trim();

    this._query = query;

    this._syncPhones(query);
  }

  _onPhonesSyncSuccess(phones) {
    var filteredPhones = this._filterPhonesOnClient(phones);

    this._phoneCatalogue.show(filteredPhones);
  }

  _onPhonesSyncError(error) {
    console.error(error);
  }

  _filterPhonesOnClient(phones) {
    let normalizedQuery = this._query.toLowerCase();

    return phones.filter(function(phone) {
      return phone.name.toLowerCase().indexOf(normalizedQuery) > -1;
    });
  }

  _syncPhones(query) {
    this._ajax('/data/phones.json?query=' + encodeURIComponent(query), {
      success: this._onPhonesSyncSuccess.bind(this),
      error: this._onPhonesSyncError.bind(this)
    });
  }

  _ajax(url, options) {
    var xhr = new XMLHttpRequest();

    var method = options.method || 'GET';

    xhr.open(method, url, true);

    xhr.onload = function() {
      options.success(JSON.parse(xhr.responseText));
    };

    xhr.onerror = function() {
      options.error(new Error(xhr.responseText))
    };

    xhr.send();
  }
}

module.exports = Page;