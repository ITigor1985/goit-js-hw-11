import axios from 'axios';
import { Notify } from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/?key=24398479-635f1f2d5b3b2135c0a24be0a';

// const parameters = {
//   key: '24398479-635f1f2d5b3b2135c0a24be0a',
//   q: 'cat',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: 'true',
//   per_page: 40,
// };

export default function getImg(q, page) {
  return axios.get(
    `${BASE_URL}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  )
  
  
}
