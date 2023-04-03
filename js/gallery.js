import { createFoto } from './photos.js';
import { showBigPicture } from './big-photo.js';

const container = document.querySelector('.pictures');

const onGalleryClick = (evt, pictures) => {
  const photo = evt.target.closest('[data-photo-id]');

  if (!photo) {
    return;
  }

  const picture = pictures.find(
    (item) => item.id === +photo.dataset.photoId
  );

  showBigPicture(picture);
};

export const renderGallery = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const photo = createFoto(picture);

    fragment.append(photo);
  });

  container.append(fragment);

  container.addEventListener('click', (evt) => onGalleryClick(evt, pictures));
};
