import { refs } from './get_refs';

export const smoothScroll = () => {
  const { height: cardHeight } =
    refs.containerCards.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};
