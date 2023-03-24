const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const container = document.querySelector('.pictures');

const createFoto = ({ comments, description, likes, url, id}) => {
  const photo = photoTemplate.cloneNode(true);

  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__img').alt = description;
  photo.querySelector('.picture__likes').textContent = likes;
  photo.querySelector('.picture__comments').textContent = comments.length;
  photo.dataset.photoId = id;

  return photo;
};

export const renderPhoto = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const photo = createFoto(picture);

    fragment.append(photo);
  });

  container.append(fragment);
};