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
    let phoneId = event.detail.phoneId;

    let phoneDetailsPromise = this._ajax(`/data/phones/${phoneId}.json`)
      .then(this._onPhoneDetailLoaded.bind(this), this._onPhoneDetailsError.bind(this));

    this._currentPhoneElement = event.detail.phoneElement;

    this._currentPhoneElement.addEventListener('mouseleave', () => {
      phoneDetailsPromise.then(() => this._showPhone(this._currentPhoneDetails));
    });
  }

  _onPhoneDetailLoaded(phoneDetails) {
    this._currentPhoneDetails = phoneDetails;
  }

  _showPhone(phoneDetails) {
    this._phoneViewer.show(phoneDetails);
    this._phoneCatalogue.hide();
  }

  _onPhoneDetailsError(error) {
    console.error(error);
  }

  _onPhoneViewerBack() {
    this._currentPhoneDetails = null;

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
    this._ajax('/data/phones.json?query=' + encodeURIComponent(query))
      .then(this._onPhonesSyncSuccess.bind(this), this._onPhonesSyncError.bind(this));
  }

  _ajax(url, options) {
    options = options || {};

    let promise = new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      var method = options.method || 'GET';

      xhr.open(method, url, true);

      xhr.onload = function() {
        resolve(JSON.parse(xhr.responseText));
      };

      xhr.onerror = function() {
        reject(new Error(xhr.responseText));
      };

      xhr.send();
    });

    return promise;
  }
}

module.exports = Page;