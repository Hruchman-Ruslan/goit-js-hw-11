import { refs } from './js/get_refs';
import NewApiService from './js/api_service';
import LoadMoreBtn from './js/load_more_btn';
import { createGalleryMarkup } from './js/create_gallery_markup';

const putMarkup = images => {
  refs.containerCards.insertAdjacentHTML(
    'beforeend',
    createGalleryMarkup(images)
  );
};

const clearGalleryMarkup = () => {
  refs.containerCards.innerHTML = '';
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const newApiService = new NewApiService();

console.log(loadMoreBtn);

const onSearchImages = e => {
  e.preventDefault();

  clearGalleryMarkup();
  newApiService.searchQuery = e.currentTarget.elements.searchQuery.value;

  if (newApiService.searchQuery === '') {
    return alert('no-no');
  }

  loadMoreBtn.show();
  newApiService.resetPage();
  clearGalleryMarkup();
  fetchArticles();
};

const fetchArticles = () => {
  loadMoreBtn.disable();
  newApiService.fetchArticles().then(hits => {
    putMarkup(hits);
    loadMoreBtn.enable();
  });
};

refs.form.addEventListener('submit', onSearchImages);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);
