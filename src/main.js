import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js'

const form = document.querySelector('.form')

const lightbox = new SimpleLightbox('.gallery a', {
    
  nav: true,       
  close: true,     
  captions: true,
  captionsData: 'alt', 
  captionDelay: 250  
});

form.addEventListener('submit', onSubmit) 

function onSubmit(event) {
    event.preventDefault();

    const query = event.target['search-text'].value.trim();
    if(query === '') {
        iziToast.error({ title: 'Увага', message: 'Введіть пошукове слово!', position: 'topRight' })
        return
    }

    clearGallery();
    showLoader();

    getImagesByQuery(query)
    .then(res => {
        hideLoader();

        const images = res.data.hits;

        if(images.length === 0) {
            iziToast.error({ message: 'Нічого не знайдено', position: 'topRight' })
            return
        }

        createGallery(images)
        lightbox.refresh();
    })
    .catch(err => {
        hideLoader();
        console.error(err)
    })

}   


