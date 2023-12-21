import { renderGallery } from './gallery.js';
import { getData } from './data.js';
import { showAlert } from './errorDisplay.js';
import './form.js';

const loadPictures = async () => {
  try {
    renderGallery(await getData());
  }
  catch (err){
    showAlert(err.message);
  }
};

loadPictures();
