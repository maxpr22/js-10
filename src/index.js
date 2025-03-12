import axios from "axios";

const API_KEY = 'live_eaASRXuczMMOgneTTRwafRQDJcHo9mP7PCNVoGTCeMnyyPczaSDNwBmTPKtCAkiy';
const BASE_URL = 'https://api.thecatapi.com/v1';

const refs ={
    select : document.querySelector('.breed-select'),
    catContainer : document.querySelector(".cat-info")
}

axios.defaults.headers.common["x-api-key"] = API_KEY;

function fetchBreeds() {
    return axios.get(`${BASE_URL}/breeds`)
        .then(response => refs.select.innerHTML = createSelection(response.data))  // axios вже автоматично парсить JSON
        .catch(error => {
            console.error("Axios error:", error);
            throw error;
        });
}

fetchBreeds()

function createSelection(arr){
    return arr.map(({name, id}) => `<option value=${id}>${name}</option>`).join('')
}

function createCatsMarkup(arr){
return arr.map(({breeds: [{name, temperament, description}], url}) =>`<img src="${url}" width = '400px' alt="${name}">
<h1>${name}</h1>
<p>${description}</p>
<p><span>Temperament </span>${temperament}</p>`)
}


function fetchCatByBreed(breedId){
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {console.log(response.data)
        return refs.catContainer.innerHTML = createCatsMarkup(response.data)})  // axios вже автоматично парсить JSON
    .catch(error => {
        console.error("Axios error:", error);
        throw error;
    });
}

refs.select.addEventListener('change', onBreedSelect)

function onBreedSelect(evt){
    console.log(evt.target.value)
    fetchCatByBreed(evt.target.value)
}