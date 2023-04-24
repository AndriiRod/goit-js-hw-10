import './css/styles.css';

import { refs } from './js/refsToItemsHtml';
import { fetchCountries } from './js/fetchCountries';
import { createListMarkup, createCountryCardMarkup } from './js/renderMarkup';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(getInputValue, DEBOUNCE_DELAY));

function getInputValue(e) {
  resetListHtml();
  restInfoBox();
  const inputValue = e.target.value.trim();
  if (inputValue === '') {
    return;
  }
  fetchValue(inputValue);
}

function fetchValue(inputValue) {
  fetchCountries(inputValue)
    .then(data => {
      checkData(data);
    })
    .catch(error => {
      console.log(error);
      Notify.failure('Oops, there is no country with that name');
    });
}

function checkData(data) {
  if (data.length === 1) {
    createCountryCardMarkup(data);
  } else if (data.length >= 2 && data.length <= 10) {
    createListMarkup(data);
  } else {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function resetListHtml() {
  refs.countryList.classList.remove('show-box');
  refs.countryList.innerHTML = '';
}

function restInfoBox() {
  refs.infoBox.classList.remove('show-box');
  refs.infoBox.innerHTML = '';
}
