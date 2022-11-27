
import './sass/_form.scss'
import {UnsplashApi} from './fetch';
import galleryCard from './templates/template.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm"
import 'simplelightbox/dist/simple-lightbox.min.css';


const btnEl = document.querySelector('.load-more')
const formEl = document.querySelector(`.search-form`);
const galleryEL = document.querySelector('.gallery');

const api = new UnsplashApi();



btnEl.addEventListener('click', onButtonClick)
formEl.addEventListener('submit', OnSubmitClick)



async function OnSubmitClick (event) {
    event.preventDefault();
    api.page = 1;
    api.searchQuery = event.target.searchQuery.value;
  
    try {
const responce = await api.fetchPhoto();

const {data} = responce;

if(api.searchQuery === '') {
    galleryEL.innerHTML = '';
    btnEl.classList.add('is-hidden'); 
    return
}

if (data.totalHits > 0) {
Notify.success(`Hooray! We found ${data.totalHits} images`);
galleryEL.innerHTML = ''
galleryEL.innerHTML = galleryCard(data.hits);
btnEl.classList.remove('is-hidden'); 

var lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});
}

if(data.totalHits === 0) {
    btnEl.classList.add('is-hidden'); 
    Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
}
    if(data.totalHits < 40 ) {
        btnEl.classList.add('is-hidden');
    }  

  } catch(err) {
    console.log(err);
  }
}

async function onButtonClick() {
    
    try { 
        const responce = await api.fetchPhoto()
        api.page +=1;
        const totalPages = Math.ceil(responce.data.totalHits/40)
        
        galleryEL.insertAdjacentHTML('beforeend', galleryCard(responce.data.hits));
   if (totalPages < api.page) {
    
    btnEl.classList.add('is-hidden'); 
    Notify.info(`We're sorry, but you've reached the end of search results.`);
   }

   var lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,})

    if(responce.data.totalHits === 0) {
        btnEl.classList.add('is-hidden'); 
        Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
     } 

    } catch(err) {
        console.log(err);
    }
}