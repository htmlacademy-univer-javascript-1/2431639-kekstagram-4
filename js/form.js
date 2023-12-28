import { pristine } from './text-validation.js';
import { resetScale } from './picture-scaling.js';
import { resetEffects } from './fx.js';
import { sendData } from './data.js';
import { successMessageShowHandler, errorMessageShowHandler } from './error-display.js';

const previewList = document.querySelectorAll('.effects__preview');
const uploadForm = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const imageEditor = document.querySelector('.img-upload__overlay');
const imageEditorPreview = document.querySelector('.img-upload__preview img');
const editorCloser = document.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const onDocumentKeyDown = (evt) => {
  const errorMessage = document.querySelector('.error');
  if (evt.key === 'Escape' && !errorMessage) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    onModalHide();
  }
};

const onModalHide = () => {
  if (!hashtagInput.matches(':focus') && !descriptionInput.matches(':focus')) {
    imageEditor.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeyDown);
    editorCloser.removeEventListener('click', onModalHide);
    document.body.classList.remove('modal-open');
    uploadForm.reset();
    resetScale();
    pristine.reset();
    resetEffects();
  }
};

fileInput.addEventListener('change', () => {
  imageEditor.classList.remove('hidden');
  imageEditorPreview.src = URL.createObjectURL(fileInput.files[0]);
  imageEditorPreview.style = 'width:100%;height:100%;object-fit:cover';
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  editorCloser.addEventListener('click', onModalHide);
  previewList.forEach((item) => {
    item.style.backgroundImage = `url(${imageEditorPreview.src})`;
  });
});

uploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    submitButton.disabled = true;
    try {
      await sendData(new FormData(evt.target));
      successMessageShowHandler();
      onModalHide();
    } catch (error) {
      errorMessageShowHandler();
    } finally {
      submitButton.disabled = false;
    }
  }
});
