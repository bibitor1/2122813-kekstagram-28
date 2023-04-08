import { createPhoto } from './photos.js';
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

  if (!picture) {
    return;
  }

  showBigPicture(picture);
};

export const renderGallery = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((picture) => {
    const photo = createPhoto(picture);

    fragment.append(photo);
  });

  container.append(fragment);

  container.addEventListener('click', (evt) => onGalleryClick(evt, data));
};
