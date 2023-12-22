const COMMENTS_TO_LOAD = 5;

export const bigPictureElement = document.querySelector('.big-picture');
export const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
export const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');

let allComments = [];
let commentsIndex = 0;

const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = () => {
  commentListElement.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < COMMENTS_TO_LOAD && commentsIndex < allComments.length; i++) {
    fragment.append(createComment(allComments[commentsIndex++]));
  }

  commentListElement.append(fragment);
  commentsLoaderElement.classList.toggle('hidden', commentsIndex >= allComments.length);
};

const setAllComments = (comments) => {
  allComments = comments;
  commentsIndex = 0;
  renderComments();
};

export { setAllComments, renderComments };
