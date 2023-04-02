import { refs } from './js/get_refs';
import { lightbox } from './js/simple_light_box';
import NewApiService from './js/api_service';
import LoadMoreBtn from './js/load_more_btn';
import { createGalleryMarkup } from './js/create_gallery_markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const putMarkup = image => {
  refs.containerCards.insertAdjacentHTML(
    'beforeend',
    createGalleryMarkup(image)
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

const onSearchImages = e => {
  e.preventDefault();

  clearGalleryMarkup();
  newApiService.searchQuery = e.currentTarget.elements.searchQuery.value;

  if (newApiService.searchQuery === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  loadMoreBtn.show();
  newApiService.resetPage();
  clearGalleryMarkup();
  fetchArticles();
};

const fetchArticles = async () => {
  try {
    loadMoreBtn.disable();
    const { hits, totalHits } = await newApiService.fetchArticles();
    putMarkup(hits);
    loadMoreBtn.enable();

    if (refs.containerCards.children.length >= totalHits) {
      loadMoreBtn.hide();
      Notify.info(`We're sorry, but you've reached the end of search results.`);
    } else {
      Notify.info(`Hooray! We found ${totalHits} images.`);
    }

    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
};

refs.form.addEventListener('submit', onSearchImages);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);
