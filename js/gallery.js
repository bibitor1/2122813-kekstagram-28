import { debounce } from './utils.js';
import { setupImageFilterEvents, getFilteredPictures } from './sorting.js';
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

const renderGallery = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const photo = createPhoto(picture);

    fragment.append(photo);
  });

  container.append(fragment);
};

const renderFilteredGallery = (pictures) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  renderGallery(pictures);
};

const updateGallery = debounce((filter) => {
  const filteredPictures = getFilteredPictures(filter, photos);
  renderFilteredGallery(filteredPictures);
}, 500);

getData()
  .then((data) => {
    photos = data;
    renderGallery(photos);
    setupImageFilterEvents(photos, updateGallery);
  })
  .catch((err) => {
    showAlert(err.message);
  });

container.addEventListener('click', onGalleryClick);
