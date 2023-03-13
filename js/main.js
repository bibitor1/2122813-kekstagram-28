import { getPhotos } from './photo-data.js';
import { renderPhoto } from './photos.js';

renderPhoto(getPhotos(25));
