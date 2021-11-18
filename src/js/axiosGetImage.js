import axios from "axios";


const BASE_URL = 'https://pixabay.com/api/';

const parameters = {
    key: "24398479-635f1f2d5b3b2135c0a24be0a",
    q: "cat",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 40
}

export default function getImg (){
    return axios.get(BASE_URL, parameters)          
}  