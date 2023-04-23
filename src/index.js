import './css/styles.css';

import { refs } from './js/refsToItemsHtml';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(getInputValue, DEBOUNCE_DELAY));

function getInputValue(e) {
  resetListHtml();
  const inputValue = e.target.value.trim();
  if (inputValue === '') {
    return;
  }
  fetchValue(inputValue);
}

function fetchValue(inputValue) {
  fetchCountries(inputValue)
    .then(data => {
      console.log(data);
      checkData(data);
    })
    .catch(error => {
      console.log(error);
      Notify.failure('Oops, there is no country with that name');
    });
}

function checkData(data) {
  if (data.length >= 2 && data.length <= 10) {
    createListMarkup(data);
  } else {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function createListMarkup(data) {
  const markup = data.reduce(
    (acc, { flags, name }) =>
      (acc += `<li><img src=${flags.svg} alt="flag ${name.official}" width="25" height="25"> ${name.official}</li>`),
    ''
  );
  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function resetListHtml() {
  refs.countryList.innerHTML = '';
}
