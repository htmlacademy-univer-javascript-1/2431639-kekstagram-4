const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  const messageCloseButton = document.querySelector('.success__button') || document.querySelector('.error__button');
  document.removeEventListener('keydown', closeMessageByEscape);
  document.body.removeEventListener('click', onOutMessageModalClick);
  messageCloseButton.removeEventListener('click', hideMessage);
  message.remove();
};

function closeMessageByEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

function onOutMessageModalClick (evt) {
  if (!(evt.target.closest('.error__inner') || evt.target.closest('.success__inner'))) {
    hideMessage();
  }
}

const showMessage = (message, messageButton) => {
  document.body.append(message);
  document.addEventListener('keydown', closeMessageByEscape);
  document.body.addEventListener('click', onOutMessageModalClick);
  document.body.querySelector(messageButton).addEventListener('click', hideMessage);
};

const showErrorMessage = () => showMessage(errorMessage, '.error__button');

const showSuccessMessage = () => showMessage(successMessage, '.success__button');


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

export {showSuccessMessage, showErrorMessage, showAlert};
