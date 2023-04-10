import { getData } from './api.js';
import { showAlert } from './dialogs.js';
import { createPhoto } from './photos.js';
import { showBigPicture } from './big-photo.js';

const container = document.querySelector('.pictures');
let photos = [];

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

getData()
  .then((data) => {
    photos = data;
    renderGallery(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

container.addEventListener('click', onGalleryClick);
