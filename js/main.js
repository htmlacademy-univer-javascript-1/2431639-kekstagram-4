import { renderGallery } from './pictures-gallery.js';
import { getData } from './data.js';
import { alertShowHandler } from './error-display.js';
import { showFilters } from './filter.js';
import './form.js';
import './picture-scaling.js';
import './fx.js';

const loadPictures = async () => {
  try {
    const data = await getData();
    renderGallery(data);
    showFilters(data);
  }
  catch (err){
    alertShowHandler(err.message);
  }
};

loadPictures();
