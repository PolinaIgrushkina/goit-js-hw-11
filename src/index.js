import './css/styles.css';
import Notiflix from 'notiflix';
import { BASE_URL, getPhoto, itemPerPage  } from './api/webApi';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

//Переменные
const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const btnMore = document.querySelector('.load-more')
btnMore.classList.add('visually-hidden')

let page = 1;

//Вешаем событие на форму
formEl.addEventListener('submit', onSubmitForm);

//При сабмите формы получаем значение инпута передается агрументов в вызов функции amountData(search)
function onSubmitForm(event) {
  event.preventDefault();

  clearMarkup(galleryEl);

  const { searchQuery } = event.currentTarget.elements;
  const searchQueryVal = searchQuery.value;

  amountData(searchQueryVal);

};

//Функция по кнопке больше
async function loadMoreCards(searchQueryVal) {
  page += 1;
  const data = await getPhoto(searchQueryVal, page);
  createGalleryMarkup(data.hits);
  
  const totalPages = Math.ceil(data.totalHits / itemPerPage);
  if (page === totalPages) {
    btnMore.classList.add('visually-hidden');
    Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
  };
};


//Функция, которая Promise преобразует в данные - data (объект, в свойстве hits которого находится массив объектов, где 1 объект - это одно фото)
async function amountData(searchQueryVal) {
  try {
    const data = await getPhoto(searchQueryVal);
    // data = response.data
    btnMore.classList.remove('visually-hidden');
    
    btnMore.addEventListener('click', () => {
      loadMoreCards(searchQueryVal)
    });

    if (data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } 
    createGalleryMarkup(data.hits);
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
  catch(error) {
    Notiflix.Notify.failure(error.message);
  }
};

//Функция создающая разметку
function createGalleryMarkup(cardsArr) {
  const markup = cardsArr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<a class="gallery__item" href="${largeImageURL}">
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
</div></a>`)
    .join('');
  
  galleryEl.insertAdjacentHTML('beforeend', markup);
  
};

//Функция очищающая разметку
function clearMarkup(element) {
  element.innerHTML = '';
};

//Открытие модального окна с опциями через библиотеку SimpleLightbox
const lightbox = new SimpleLightbox(".gallery a");