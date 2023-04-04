const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


export const createPhoto = ({ comments, description, likes, url, id}) => {
  const photo = photoTemplate.cloneNode(true);

  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__img').alt = description;
  photo.querySelector('.picture__likes').textContent = likes;
  photo.querySelector('.picture__comments').textContent = comments.length;
  photo.dataset.photoId = id;

  return photo;
};
