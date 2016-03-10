'use strict';

class Gallery {
  constructor(options) {
    this._el = options.element;

    this._largeImage = this._el.querySelector('.js-gallery_large-img');
    this._thumbs = this._el.querySelector('.js-gallery_thumbs');

    this._renderImages(options.images);
    this._preloadImages(options.images);

    this._thumbs.addEventListener('click', this._onThumbClick.bind(this));
  }

  showImage(imgUrl, title) {
    this._largeImage.src = imgUrl;
    this._largeImage.alt = title;
  }

  _onThumbClick(event) {
    let link = event.target.closest('a');

    if (!link) {
      return false;
    }

    event.preventDefault();

    this.showImage(link.href, link.title);
  }

  _renderImages(images) {
    images.forEach(imageData => {
      let thumbHtml = `
        <li>
          <a href="${ imageData.url }" title="${ imageData.title }">
            <img src="${ imageData.thumbUrl }">
          </a>
        </li>
      `;

      this._thumbs.insertAdjacentHTML('beforeEnd', thumbHtml);
    });
  }

  _preloadImages(images) {
    images.forEach(imageData => {
      let img = new Image();
      img.src = imageData.url;
    });
  }
}
