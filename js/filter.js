import { debounce } from './utils.js';
import { getRandomNumber } from './utils.js';
import { removePictures } from './thumbnail.js';
import { renderGallery } from './pictures-gallery.js';

const filtersSection = document.querySelector('.img-filters');
let photosData;
let activeFilterButton = filtersSection.querySelector('.img-filters__button--active');

const MAX_RANDOM_PHOTOS = 10;

const sortByDefault = () => photosData;

const sortByRandom = () => {
  const photosCopy = [...photosData];
  const randomPhotos = Array.from({ length: MAX_RANDOM_PHOTOS }, () => {
    const randomIndex = getRandomNumber(0, photosCopy.length - 1);
    return photosCopy.splice(randomIndex, 1)[0];
  });
  return randomPhotos;
};

const sortByDiscussion = () =>
  [...photosData].sort((a, b) => b.comments.length - a.comments.length);

const applyFilter = (selectedButton, sortingFunction) => {
  removePictures();
  renderGallery(sortingFunction());
  activeFilterButton.classList.remove('img-filters__button--active');
  selectedButton.classList.add('img-filters__button--active');
  activeFilterButton = selectedButton;
};

const setupEventListeners = (button, sortingFunction) => {
  button.addEventListener('click', debounce(() => applyFilter(button, sortingFunction)));
};

const showFilters = (data) => {
  photosData = data;
  filtersSection.classList.remove('img-filters--inactive');

  const defaultFilterButton = filtersSection.querySelector('#filter-default');
  const randomFilterButton = filtersSection.querySelector('#filter-random');
  const discussedFilterButton = filtersSection.querySelector('#filter-discussed');

  setupEventListeners(defaultFilterButton, sortByDefault);
  setupEventListeners(randomFilterButton, sortByRandom);
  setupEventListeners(discussedFilterButton, sortByDiscussion);
};

export { showFilters };
