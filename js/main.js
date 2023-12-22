import { renderGallery } from './picturesGallery.js';
import { getData } from './data.js';
import { showAlert } from './errorDisplay.js';
import { showFilters } from './filter.js';
import './form.js';
import './pictureScaling.js';
import './fx.js';

const loadPictures = async () => {
  try {
    const data = await getData();
    renderGallery(data);
    showFilters(data);
  }
  catch (err){
    showAlert(err.message);
  }
};

loadPictures();
