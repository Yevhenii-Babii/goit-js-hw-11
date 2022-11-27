
'use strict';

import axios from 'axios';

export class UnsplashApi{
    #BASE_URL = 'https://pixabay.com'
    #API_KEY = '31524014-10d0b39f5b957f1cdac0cb3f9'
    constructor() {
        this.page = 1;
        this.searchQuery = null;
    }

    fetchPhoto() {
 {

    const searchParams = {
        params: {
            q: this.searchQuery,
        page: this.page,
        per_page:'40',
        orientation: 'horizontal',
        key: this.#API_KEY,
        image_type: 'photo',
        safesearch: 'true'
        }
    }

    return axios.get(`${this.#BASE_URL}/api/`,searchParams)
//     return fetch(`${this.#BASE_URL}/api/?${searchParams}`)
//    .then(response=>{
//        if(!response.ok){
//            throw new Error(response.status)
//        }
//        return response.json()
//    })
   }
    }
}








