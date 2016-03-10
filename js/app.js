'use strict';


let images = [
  {
    thumbUrl: 'https://js.cx/gallery/img1-thumb.jpg',
    url: 'https://js.cx/gallery/img1-lg.jpg',
    title: 'Image 1'
  },
  {
    thumbUrl: 'https://js.cx/gallery/img2-thumb.jpg',
    url: 'https://js.cx/gallery/img2-lg.jpg',
    title: 'Image 2'
  },
  {
    thumbUrl: 'https://js.cx/gallery/img3-thumb.jpg',
    url: 'https://js.cx/gallery/img3-lg.jpg',
    title: 'Image 3'
  },
  {
    thumbUrl: 'https://js.cx/gallery/img4-thumb.jpg',
    url: 'https://js.cx/gallery/img4-lg.jpg',
    title: 'Image 4'
  },
  {
    thumbUrl: 'https://js.cx/gallery/img5-thumb.jpg',
    url: 'https://js.cx/gallery/img5-lg.jpg',
    title: 'Image 5'
  },
  {
    thumbUrl: 'https://js.cx/gallery/img6-thumb.jpg',
    url: 'https://js.cx/gallery/img6-lg.jpg',
    title: 'Image 6'
  }
  
];

[].forEach.call(document.querySelectorAll('[data-component="gallery"]'), function(galleryEl) {
  let gallery = new Gallery({
    element: galleryEl,
    images: images
  });

  gallery.showImage(images[0].url, images[0].title);
});


