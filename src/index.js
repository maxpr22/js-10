import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './api';
import 'slim-select/dist/slimselect.css';

const refs = {
  select: document.querySelector('.breed-select'),
  catContainer: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
};


function showLoader() {
  refs.loader.classList.remove('is-hidden');
}


function hideLoader() {
  refs.loader.classList.add('is-hidden');
}


function clearCatsContainer() {
  refs.catContainer.innerHTML = '';
}

/**
 * Формує розмітку для списку порід
 * @param {Array} breeds - Масив порід
 * @returns {string}
 */
function createSelection(breeds) {
  return breeds.map(({ name, id }) => `<option value=${id}>${name}</option>`).join('');
}

/**
 * Формує розмітку для картки кота
 * @param {Array} cats - Масив з об'єктом кота
 * @returns {string}
 */
function createCatsMarkup(cats) {
  return cats.map(({ breeds: [{ name, temperament, description }], url }) => 
    `<div class="cat-card">
      <img class="cat-card__image" src="${url}" alt="${name}">
      <div class="cat-card__info">
        <h1 class="cat-card__title">${name}</h1>
        <p class="cat-card__description">${description}</p>
        <p class="cat-card__temperament"><span>Temperament: </span>${temperament}</p>
      </div>
    </div>`
  ).join('');
}


function initBreeds() {
  showLoader();

  fetchBreeds()
    .then(breeds => {
      refs.select.innerHTML = createSelection(breeds);
      hideLoader();
      refs.select.classList.remove('is-hidden');

      new SlimSelect({ select: '#breed-select' });
    })
    .catch(error => {
      hideLoader();
      Notiflix.Notify.failure('Схоже щось пішло не так, спробуйте будь ласка пізніше');
    });
}


function onBreedSelect(evt) {
  const breedId = evt.target.value;
  clearCatsContainer();
  showLoader();

  fetchCatByBreed(breedId)
    .then(catData => {
      refs.catContainer.innerHTML = createCatsMarkup(catData);
      hideLoader();
    })
    .catch(error => {
      hideLoader();
      Notiflix.Notify.failure('Схоже щось пішло не так, спробуйте будь ласка пізніше');
    });
}

// Додаємо слухача подій
refs.select.addEventListener('change', onBreedSelect);

// Викликаємо функцію ініціалізації
initBreeds();
