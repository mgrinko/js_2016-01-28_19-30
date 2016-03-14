'use strict';

var PhoneCatalogue = (function() {
  let template = document.getElementById('phone-catalogue-template').innerHTML;

  class PhoneCatalogue {
    constructor(options) {
      this._el = options.element;
      this._phones = options.phones;

      this._el.innerHTML = _.template(template)({
        phones: this._phones
      });
    }
  };

  return PhoneCatalogue;
})();



