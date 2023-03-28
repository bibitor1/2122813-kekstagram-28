const COMMENT_AMOUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const shownCommentsAmount = document.querySelector('.social__comment-count');
const visibleCommentsAmount = document.querySelector('.social__comments');
const commentsLoaderButton = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

let visibleComments = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderingComments = () => {
  const fragment = document.createDocumentFragment();

  for (let i = visibleComments; i < Math.min(comments.length, visibleComments + COMMENT_AMOUNT); i++) {
    const commentElement = createComment(comments[i]);

    fragment.append(commentElement);
  }

  visibleComments += COMMENT_AMOUNT;

  visibleCommentsAmount.append(fragment);

  shownCommentsAmount.innerHTML = `${visibleComments} из <span class="comments-count">${comments.length}</span> комментариев`;

  if (visibleComments >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
    shownCommentsAmount.innerHTML = `${comments.length} из <span class="comments-count">${comments.length}</span> комментариев`;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

  visibleComments = 0;

  commentsLoaderButton.removeEventListener('click', onCommentsLoaderClick);
  cancelButton.removeEventListener('click', onCancselBottonClick);

  visibleCommentsAmount.innerHTML = '';
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCancselBottonClick () {
  hideBigPicture();
}

function onCommentsLoaderClick () {
  renderingComments();
}

export const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoaderButton.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);

  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.big-picture__img img').alt = data.description;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.social__caption').textContent = data.description;

  comments = data.comments;

  renderingComments();

  commentsLoaderButton.addEventListener('click', onCommentsLoaderClick);
  cancelButton.addEventListener('click', onCancselBottonClick);
};
