import axios from 'axios';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    // this.per_page = 20;
  }

  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = 'key=34857293-d887ff6e825f27144b92f86d1';

  async fetchArticles() {
    //   const URL = {
    //     url: this.#BASE_URL,
    //     key: this.#API_KEY,
    //     q: this.searchQuery,
    //     image_type: 'photo',
    //     orientation: 'horizontal',
    //     safesearch: true,
    //     page: this.page,
    //   };

    // const { data } = await axios.get({
    //   url: this.#BASE_URL,
    //   key: this.#API_KEY,
    //   q: this.searchQuery,
    //   image_type: 'photo',
    //   orientation: 'horizontal',
    //   safesearch: true,
    //   page: this.page,
    // });

    const { data } = await axios(
      `${this.#BASE_URL}?${this.#API_KEY}&q=${
        this.searchQuery
      }&image_type=photo&per_page=45&page=${
        this.page
      }&orientation=horizontal&safesearch=true`
    );
    this.incrementPage();
    console.log(data);

    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
