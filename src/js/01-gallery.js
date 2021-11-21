// Add imports above this line


import { galleryItems } from './gallery';
// Change code below this line

console.log(galleryItems);
const gallery = document.querySelector('.gallery');
const galleryImages = galleryItems
  .map(
    galleryItem => `

<a class="gallery__item" href="${galleryItem.original}">
  <img class="gallery__image" src="${galleryItem.preview}" alt="${galleryItem.description}" />
</a>
`,
  )
  .join('');
gallery.insertAdjacentHTML('beforeend', galleryImages);
const galleryModal = new SimpleLightbox('.gallery__item', {
  captionPosition: 'top',
  captionsData: 'alt',
  captionDelay: 250,
});
