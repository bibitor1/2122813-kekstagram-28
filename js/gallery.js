import { createPhoto } from './photos.js';
import { showBigPicture } from './big-photo.js';
import { createPhotosList } from './photo-data.js';

const container = document.querySelector('.pictures');
const photos = createPhotosList(25);

const onGalleryClick = (evt) => {
  const photo = evt.target.closest('[data-photo-id]');

  if (!photo) {
    return;
  }

  const picture = photos.find(
    (item) => item.id === +photo.dataset.photoId
  );

  if (!picture) {
    return;
  }

  showBigPicture(picture);
};

export const renderGallery = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const photo = createPhoto(picture);

    fragment.append(photo);
  });

  container.append(fragment);
};

container.addEventListener('click', onGalleryClick);

renderGallery(photos);
