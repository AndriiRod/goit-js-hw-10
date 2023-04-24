import { refs } from './refsToItemsHtml';

function createCountryCardMarkup(data) {
  refs.infoBox.classList.add('show-box');
  const { name, capital, population, flags, languages } = data[0];

  const markUp = `<div class="info-wrap"><img width="30" height="30" src="${
    flags.svg
  }" alt="${name.official}"><h2 class = "info-head" >${name.official}</h2></div>
  <ul class="info-list">
    <li class="info-item">
    <b>Capital:</b>
    <p>${capital}</p>
  </li>
  <li class="info-item">
    <b>Population:</b>
    <p>${population}</p>
  </li>
  <li class="info-item">
    <b>Languages:</b>
    <p>${Object.values(languages).join(', ')}</p>
  </li>
</ul>`;
  refs.infoBox.insertAdjacentHTML('beforeend', markUp);
}

function createListMarkup(data) {
  refs.countryList.classList.add('show-box');

  const markup = data.reduce(
    (acc, { flags, name }) =>
      (acc += `<li class="country-item"><img src=${flags.svg} alt="flag ${name.official}" width="25" height="25"> ${name.official}</li>`),
    ''
  );

  refs.countryList.insertAdjacentHTML('beforeend', markup);
  setTimeout(() => {
    for (const li of refs.countryList.children) {
      li.classList.add('show-li');
    }
  }, 10);
}

export { createListMarkup, createCountryCardMarkup };
