import { axios } from 'axios';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = 'key=34857293-d887ff6e825f27144b92f86d1';

  async fetchArticles() {
    const URL = `${this.#BASE_URL}?${this.#API_KEY}&q=${
      this.searchQuery
    }&image_type=photo&per_page=5&page=${
      this.page
    }&orientation=horizontal&safesearch=true`;

    const response = await fetch(URL);
    const { hits } = await response.json();
    this.incrementPage();
    console.log(hits);

    return hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

// get query() {
//   return this.searchQuery;
// }

// set query(newQuery) {
//   this.searchQuery = newQuery;
// }
