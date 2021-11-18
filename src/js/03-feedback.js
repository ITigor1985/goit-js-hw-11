import throttle from 'lodash.throttle';

const LOC_STOR_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

const formData = {};
getSavedFormData();

textarea.addEventListener('input', throttle(changeInput, 500));
input.addEventListener('input', throttle(changeInput, 500));
form.addEventListener('submit', formSubmit);

function changeInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOC_STOR_KEY, JSON.stringify(formData));
}

function getSavedFormData() {
  const savedFormData = JSON.parse(localStorage.getItem(LOC_STOR_KEY));

  if (savedFormData) {
    textarea.value = savedFormData.message;
    formData.message = savedFormData.message;
    input.value = savedFormData.email;
    formData.email = savedFormData.email;
  }
}

function formSubmit(event) {
  event.preventDefault();
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(LOC_STOR_KEY);
}
