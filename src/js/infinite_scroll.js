import { refs } from './get_refs';

let elem = document.querySelector('.gallery');
let infScroll = new InfiniteScroll(elem, {
  // options
  path: '.pagination__next',
  append: '.post',
  history: false,
});
