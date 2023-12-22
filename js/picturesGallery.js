import { showBigPicture } from './bigPicture.js';
import { renderThumbnails } from './thumbnail.js';

const container = document.querySelector('.pictures');

const renderGallery = (photos) =>{
  container.addEventListener('click', (evt) =>{
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if(!thumbnail){
      return;
    }
    evt.preventDefault();
    const picture = photos.find((item) => item.id === +thumbnail.dataset.thumbnailId);
    showBigPicture(picture);
  });
  renderThumbnails(photos);
};

export{ renderGallery };
