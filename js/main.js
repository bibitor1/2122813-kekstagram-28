import { getPhotos } from './photo-data.js';
import { renderGallery } from './gallery.js';

renderGallery(getPhotos(25));
