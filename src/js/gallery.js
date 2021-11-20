import getImg from './axiosGetImage';
const refs = {
  form: document.querySelector('.search-form'),
  inpute: document.querySelector('.search-form input'),
  body: document.querySelector('body'),
  gallery: document.querySelector('.gallery'),
};

const formData = {};

refs.inpute.addEventListener('input', changeInput);
refs.form.addEventListener('submit', formSubmit);

function changeInput(event) {
  formData[event.target.name] = event.target.value;
}

function formSubmit(event) {
  event.preventDefault();
  console.log(formData);
  if (document.querySelector('.photo-card')) {
    refs.gallery.innerHTML = '';
  }
  getImg(formData.searchQuery).then(elements => renderGaleryList(elements));
  formData.searchQuery = '';
  event.currentTarget.reset();
}
function renderGaleryList(...elements) {
  const markup = elements.map(element => {
    console.log(element.data.hits);
    element.data.hits.forEach(el => {
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        `<div class="photo-card">
            <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
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
}
