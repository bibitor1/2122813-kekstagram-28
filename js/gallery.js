import { container, renderingPhoto } from './photos.js';
import { showBigPicture } from './big-photo.js';

const onPhotoClick = (evt, pictures) => {
  const photo = evt.target.closest('[data-photo-id]');

  if (!photo) {
    return;
  }

  const picture = pictures.find(
    (item) => item.id === +photo.dataset.photoId
  );

  showBigPicture(picture);
};

export const renderingGallery = (pictures) => {
  container.addEventListener('click', (evt) => onPhotoClick(evt, pictures));

  renderingPhoto(pictures, container);
};
