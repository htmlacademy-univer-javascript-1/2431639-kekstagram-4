const picturesWrapper = document.querySelector('.pictures');
const thumbnailPattern = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = function(pictures){
  const thumbnailsListFragment = document.createDocumentFragment();

  pictures.forEach(({url, description, likes, comments, id}) => {
    const thumbnail = thumbnailPattern.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.dataset.thumbnailId = id;
    thumbnailsListFragment.appendChild(thumbnail);
  });

  picturesWrapper.appendChild(thumbnailsListFragment);
};

export { renderThumbnails };
