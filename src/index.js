import './css/styles.css';
import Notiflix from 'notiflix';
import { BASE_URL, getPhoto } from './api/webApi';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

//Переменные
const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
  
//Вешаем событие на форму
formEl.addEventListener('submit', onSubmitForm);

//При сабмите формы получаем значение инпута передается агрументов в вызов функции amountData(search)
function onSubmitForm(event) {
  event.preventDefault();

  const { searchQuery } = event.currentTarget.elements;
  const searchQueryVal = searchQuery.value;

  amountData(searchQueryVal);

};

//Функция, которая Promise преобразует в данные - data (объект, в свойстве hits которого находится массив объектов, где 1 объект - это одно фото)
async function amountData(searchQueryVal) {
  try {
    const data = await getPhoto(searchQueryVal);
    console.log(data); //коты
    if (data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } 
    
    data.hits.forEach(photo => createCardMarkup(photo));
  }
  catch(error) {
    Notiflix.Notify.failure(error.message);
  }
};

//Функция создающая карточку 
function createCardMarkup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  galleryEl.insertAdjacentHTML('beforeend', 
  `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b><span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`)
};