'use strict';

class Tree {
  constructor(options) {
    this._el = options.element;
    this._el.appendChild(this._createTreeText(options.data));

    //this._el.onclick = this._onClick.bind(this);
    //this._el.onclick({ event properties });
  }

  _onClick(event) {
    alert(this._el.textContent);
  }

  _onLiClick(qwe) {
    if (qwe.target !== qwe.currentTarget) {
    	return;
    }

    alert(event.target.firstChild.data);
  }

  _createTreeText(obj) { // отдельная рекурсивная функция
    if (Object.keys(obj).length === 0) {
    	return document.createTextNode('');
    }

    let ul = document.createElement('ul');

    for (let key in obj) {
      let li = document.createElement('li');
      let text = document.createTextNode(key);

      li.appendChild(text);
      li.appendChild(this._createTreeText(obj[key]));

      li.onclick = this._onLiClick;

      ul.appendChild(li);
    }

    return ul;
  }
}