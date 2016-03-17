'use strict';

class Filter extends Component {
  constructor(options) {
    super(options);

    this._field = this._el.querySelector('input');

    this._field.oninput = this._onValueChange.bind(this);
  }

  _onValueChange() {
    this._trigger('filter', this._field.value)
  }
}