import './sass/main.scss';
import debounce from 'lodash.debounce';
import imagesListTpl from '/templates/images-list.hbs';
import ApiService from '/js/api-service.js';

const searchBlock = document.querySelector('[name="query"]');
const imagesList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-button');

const newApiService = new ApiService();

loadMoreBtn.disabled = 'true';

searchBlock.addEventListener('input', debounce(() => {
  imagesList.innerHTML = '';
  newApiService.firstPage();

  if (!searchBlock.value) {
    loadMoreBtn.disabled = 'true';
    return;
  }

  newApiService.query = searchBlock.value;
  newApiService.fetchImages()
    .then(images => {
      if (images.hits.length == 0) {
        loadMoreBtn.disabled = 'true';
        return imagesList.innerHTML = '<li class="match-error">No match found.</li>'
      }

      return imagesList.insertAdjacentHTML('beforeend', imagesListTpl(images));
    });

  loadMoreBtn.removeAttribute('disabled')
}, 500))

loadMoreBtn.addEventListener('click', () => {
  newApiService.nextPage();
  
  newApiService.fetchImages()
    .then(images => {
      return imagesList.insertAdjacentHTML('beforeend', imagesListTpl(images));
    })
    .then(() => {
    const pageList = imagesList.querySelectorAll('.page');

    pageList.item(pageList.length - 1).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
})