import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  #API_KEY = '34857293-d887ff6e825f27144b92f86d1';

  async fetchArticles() {
    const searchParams = new URLSearchParams({
      key: this.#API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 12,
      page: this.page,
    });

    const { data } = await axios(`?${searchParams}`);
    this.incrementPage();
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
