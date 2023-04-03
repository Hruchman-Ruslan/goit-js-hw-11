import { refs } from './js/get_refs';
import { lightbox } from './js/simple_light_box';
import NewApiService from './js/api_service';
import LoadMoreBtn from './js/load_more_btn';
import { createGalleryMarkup } from './js/create_gallery_markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { smoothScroll } from './js/smooth_page_scroll';

const renderMarkup = image => {
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
    renderMarkup(hits);
    loadMoreBtn.enable();

    if (!hits.length) {
      loadMoreBtn.hide();
      clearGalleryMarkup();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (refs.containerCards.children.length >= totalHits) {
      loadMoreBtn.hide();
      Notify.info(`We're sorry, but you've reached the end of search results.`);
    } else {
      setTimeout(() => {
        Notify.success(`Hooray! We found ${totalHits} images.`);
      }, 800);
    }

    lightbox.refresh();
    smoothScroll();
  } catch (error) {
    console.log(error);
  }
};

refs.form.addEventListener('submit', onSearchImages);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);
