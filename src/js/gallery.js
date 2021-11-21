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
  getImg(formData.searchQuery, page).then(elements => renderGaleryList(elements));
  page++;
})

function changeInput(event) {
  formData[event.target.name] = event.target.value.trim();
}

function formSubmit(event) {
  event.preventDefault();
  if(!formData.searchQuery){
    
  }
  console.log(formData);
  if (document.querySelector('.photo-card')) {
    refs.gallery.innerHTML = '';
  }
  page=1;
  getImg(formData.searchQuery, page)
  .then(elements =>{
    if(elements.data.totalHits === 0){
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    }
    renderGaleryList(elements)
    refs.btnLoadMore.classList.remove('visually-hidden');
    page++;
  }
    
    );  
}



function renderGaleryList(...elements) {
  const markup = elements.map(element => {
    console.log(element.data.hits);
    element.data.hits.forEach(el => {
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        `<div class="photo-card">
        <a href="${el.largeImageURL}" class="gallery__link">
            <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy"  />
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
}

function createLightBox() {
  
  const  lightBox = new SimpleLightbox('.gallery__link'); 

  lightBox.refresh();
}