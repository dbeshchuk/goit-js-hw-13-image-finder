import './sass/main.scss';
import imagesListTpl from '/templates/images-list.hbs';
import ApiService from '/js/api-service.js';

const searchBlock = document.querySelector('.search-form');
const searchInput = document.querySelector('[name="query"]')
const imagesList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-button');

const newApiService = new ApiService();

loadMoreBtn.classList.add("hidden");

searchBlock.addEventListener('submit', evt => {
  evt.preventDefault();

  imagesList.innerHTML = '';
  newApiService.query = searchInput.value;
  newApiService.firstPage();

  if (!searchInput.value) {
    loadMoreBtn.classList.add("hidden");
    return;
  }

  
  newApiService.fetchImages()
    .then(images => {
      if (images.hits.length == 0) {
        loadMoreBtn.classList.add("hidden");
        return imagesList.innerHTML = '<li class="match-error">No match found.</li>'
      }

      imagesList.insertAdjacentHTML('beforeend', imagesListTpl(images));
      
      if (images.hits.length > 11) {
        loadMoreBtn.classList.remove("hidden");
      }
    });
})

loadMoreBtn.addEventListener('click', () => {
  newApiService.nextPage();
  
  newApiService.fetchImages()
    .then(images => {
      imagesList.insertAdjacentHTML('beforeend', imagesListTpl(images));
    })
    .then(() => {
    const pageList = imagesList.querySelectorAll('li');

    pageList.item(pageList.length - 11).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
})