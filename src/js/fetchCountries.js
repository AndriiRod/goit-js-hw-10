const BASE_URL = 'https://restcountries.com/v3.1/';
const filter = 'name,capital,population,flags,languages';

function fetchCountries(nameCountry) {
  return fetch(`${BASE_URL}name/${nameCountry}?fields=${filter}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

export { fetchCountries };
