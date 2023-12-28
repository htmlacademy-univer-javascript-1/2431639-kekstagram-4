import { bigPictureElement, setAllComments, commentCountElement, commentsLoaderElement, renderComments } from './comments.js';
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPictureDetails = ({url, likes, description, comments}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  setAllComments(comments);
};

const onLoadMoreComments = () => {
  renderComments();
};

const onBigPictureShow = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.remove('hidden');
  commentCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);
  renderPictureDetails(data);

  commentsLoaderElement.addEventListener('click', onLoadMoreComments);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { onBigPictureShow };
