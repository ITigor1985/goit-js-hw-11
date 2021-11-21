import getImg from './axiosGetImage';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix';
const refs = {
  form: document.querySelector('.search-form'),
  inpute: document.querySelector('.search-form input'),
  body: document.querySelector('body'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more')
};

const formData = {};
let page = 1;

refs.inpute.addEventListener('input', changeInput);
refs.form.addEventListener('submit', formSubmit);

refs.btnLoadMore.addEventListener('click', () => {

  getImg(formData.searchQuery, page).then(elements => {
    
    renderGaleryList(elements)
    if(elements.data.totalHits <= page * 40){
      Notify.info("We're sorry, but you've reached the end of search results.");
      refs.btnLoadMore.classList.add("visually-hidden");
    }
  });
  page++;
})

function changeInput(event) {
  formData[event.target.name] = event.target.value.trim();
}

function formSubmit(event) {
  event.preventDefault();  
  
  if (document.querySelector('.photo-card')) {
    refs.gallery.innerHTML = '';
  }

  page=1;

  getImg(formData.searchQuery, page)
  .then(elements =>{
    Notify.info(`Found: ${elements.data.total} images`);
    if(elements.data.totalHits === 0){
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    }
    renderGaleryList(elements)
    if(elements.data.totalHits <= page * 40){
      Notify.info("We're sorry, but you've reached the end of search results.");
      refs.btnLoadMore.classList.add("visually-hidden");
      return
    }
    refs.btnLoadMore.classList.remove('visually-hidden');
    page++;
  });  
}



function renderGaleryList(...elements) {
  const markup = elements.map(element => {
    
    
    element.data.hits.forEach(el => {
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        `<div class="photo-card">
            <a href="${el.largeImageURL}" class="gallery__link">
            <div class="wrapper">
            <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy"  />
            </div>
            </a>
            <div class="info">
              <p class="info-item">
                <b>${el.likes}</b>
              </p>
              <p class="info-item">
                <b>${el.views}</b>
              </p>
              <p class="info-item">
                <b>${el.comments}</b>
              </p>
              <p class="info-item">
                <b>${el.downloads}</b>
              </p>
            </div>
          </div`,
      );
    });
  });
  createLightBox();
  const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
}

function createLightBox() {  
  const  lightBox = new SimpleLightbox('.gallery__link'); 
  lightBox.refresh();
}