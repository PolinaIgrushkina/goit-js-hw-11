import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '30130433-e8b1bb853ff880f9de2d30603';

const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo', 
  orientation: 'horizontal',
  safesearch: 'true',
});

export const BASE_URL = `https://pixabay.com/api/?${searchParams}`;

export async function getPhoto(search) {
  try {
    if (!search.trim()) {
      return;
    }
    const responce = await axios.get(`${BASE_URL}&q=${search}`);
    return responce.data;
  }
  catch(error) {
    Notiflix.Notify.failure(error.message);
  }
};


