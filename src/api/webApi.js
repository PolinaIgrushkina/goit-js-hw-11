import axios from 'axios';
import Notiflix from 'notiflix';

export const itemPerPage = 40;

const API_KEY = '30130433-e8b1bb853ff880f9de2d30603';

const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo', 
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: itemPerPage,
});

export const BASE_URL = `https://pixabay.com/api/?${searchParams}`;

export async function getPhoto(search, page) {
  try {
    const responce = await axios.get(`${BASE_URL}&q=${search}&page=${page}`);
    return responce.data;
  }
  catch(error) {
    throw new Error(error);
  }
};

//responce - это объект в котором есть объект data. В responce.data есть массив hits с объектами фото(котиков)

