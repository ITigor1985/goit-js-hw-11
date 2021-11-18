import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import './sass/main.scss';
//https://pixabay.com/api/?key=24398479-635f1f2d5b3b2135c0a24be0a&q=yellow+flowers&image_type=photo

const BASE_URL = 'https://pixabay.com/api/?key=24398479-635f1f2d5b3b2135c0a24be0a'
let q = 'cat';

const getImg = () => {
    return axios.get(`${BASE_URL}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`)
    
    // fetch (`${BASE_URL}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`).then(res => {
    //     if (res.ok){
    //         return res.json();
    //     }
    //     throw Error(res.statusText);
    //})
} 
getImg().then(response => console.log(response.data));