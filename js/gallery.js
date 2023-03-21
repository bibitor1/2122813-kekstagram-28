import { renderPhoto } from './photos.js';
import { showBigPicture } from './big-photo.js';

const container = document.querySelector('.pictures');

export const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const photo = evt.target.closest('[data-photo-id]');

    if (!photo) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +photo.dataset.photoId
    );
    showBigPicture(picture);
  });

  renderPhoto(pictures, container);
};
