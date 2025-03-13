import axios from 'axios';

const API_KEY = 'live_eaASRXuczMMOgneTTRwafRQDJcHo9mP7PCNVoGTCeMnyyPczaSDNwBmTPKtCAkiy';
const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = API_KEY;

/**
 * Отримує список порід котів
 * @returns {Promise<Array>}
 */
export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => response.data)
    .catch(error => {
      console.error('Помилка отримання порід:', error);
      throw error;
    });
}

/**
 * Отримує дані про кота за його породою
 * @param {string} breedId - ID породи
 * @returns {Promise<Array>}
 */
export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Помилка отримання даних кота:', error);
      throw error;
    });
}
