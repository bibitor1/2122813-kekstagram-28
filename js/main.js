import { getPhotos } from './photo-data.js';
import { renderingGallery } from './gallery.js';

renderingGallery(getPhotos(25));
