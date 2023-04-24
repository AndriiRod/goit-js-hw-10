import './css/styles.css';

import { refs } from './js/refsToItemsHtml';
import { fetchCountries } from './js/fetchCountries';
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
      console.log(data);
      console.log(data[0].languages);
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
function createCountryCardMarkup(data) {
  const { name, capital, population, flags, languages } = data[0];

  const markUp = `<div class="info-wrap"><img src="${flags.svg}" alt="${
    name.official
  }"><h2>${name.official}</h2></div>
  <ul class="info-list">
    <li class="info-item">
    <p class="info-prop">Capital:</p>
    <p class="info-text">${capital}</p>
  </li>
  <li class="info-item">
    <p class="info-prop">Population:</p>
    <p class="info-text">${population}</p>
  </li>
  <li class="info-item">
    <p class="info-prop">Languages:</p>
    <p class="info-text">${Object.values(languages).join(', ')}</p>
  </li>
</ul>`;
  refs.infoBox.insertAdjacentHTML('beforeend', markUp);
}

function createListMarkup(data) {
  const markup = data.reduce(
    (acc, { flags, name }) =>
      (acc += `<li class="country-item"><img src=${flags.svg} alt="flag ${name.official}" width="25" height="25"> ${name.official}</li>`),
    ''
  );
  refs.countryList.classList.add('show-country-list');
  refs.countryList.insertAdjacentHTML('beforeend', markup);
  setTimeout(() => {
    for (const li of refs.countryList.children) {
      li.classList.add('show-li');
    }
  }, 10);
}

function resetListHtml() {
  refs.countryList.classList.remove('show-country-list');
  refs.countryList.innerHTML = '';
}

function restInfoBox() {
  refs.infoBox.innerHTML = '';
}
