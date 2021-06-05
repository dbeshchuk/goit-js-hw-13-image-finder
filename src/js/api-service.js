const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21932135-4f5d77beca28a3dee23c5711e';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  };

  fetchImages() {
    return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
      .then(response => response.json())
  }

  nextPage() {
    this.page += 1;
  }

  firstPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}