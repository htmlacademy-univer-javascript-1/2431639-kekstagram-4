import { bigPictureElement, renderComments, commentCountElement, commentsLoaderElement } from './comments.js';
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown(evt){
  if(evt.key === 'Escape'){
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPictureDetails = ({url, likes, description}) =>{
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  commentCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);

  renderPictureDetails(data);
  renderComments(data.comments);

};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export{showBigPicture};
