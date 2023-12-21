import { createPictures } from './data.js';
import { renderThumbnails } from './thumbnail.js';
import { showBigPicture } from './bigPicture.js';

const container = document.querySelector('.pictures');
const pictures = createPictures();

const renderGallery = () =>{
  container.addEventListener('click', (evt) =>{
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if(!thumbnail){
      throw 'Элемент не существует';
    }
    evt.preventDefault();
    const picture = pictures.find((item) => item.id === +thumbnail.dataset.thumbnailId);
    showBigPicture(picture);
  });
  renderThumbnails(pictures);
};

export { renderGallery };
