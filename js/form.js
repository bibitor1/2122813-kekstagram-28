import { resetScale } from './scaling.js';
import { resetFilters } from './filters.js';
import { sendData } from './api.js';
import { showDialog } from './dialogs.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const successMessage = document.querySelector('#success');
const errorMessage = document.querySelector('#error');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const showModalWindow = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetScale();
  resetFilters();
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModalWindow = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFiledFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFiledFocused()) {
    evt.preventDefault();
    hideModalWindow();
  }
}

const onCancelButtonClick = () => {
  hideModalWindow();
};

const onFileInputChange = () => {
  showModalWindow();
};

const isTagValid = (tag) => VALID_SYMBOLS.test(tag);

const isTagCountValid = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const isTagsUnique = (tags) => {
  const loowerCaseTags = tags.map((tag) => tag.toLowerCase());

  return loowerCaseTags.length === new Set(loowerCaseTags).size;
};

const validateTags = (value) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return false;
  }

  const tags = trimmedValue
    .split(/\s+/);

  return isTagCountValid(tags) && isTagsUnique(tags) && tags.every(isTagValid);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  TAG_ERROR_TEXT
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();

      cb(new FormData(form))
        .then(() => {
          unblockSubmitButton();
          showDialog(successMessage);
        })
        .catch(() => {
          unblockSubmitButton();
          showDialog(errorMessage);
        });
    }
  });
};

const sendFormToServer = () => {
  setOnFormSubmit((data) => {
    sendData(data)
      .then(() => {
        hideModalWindow();
        showDialog(successMessage);
      })
      .catch(() => {
        showDialog(errorMessage);
      });
  });
};

sendFormToServer();

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
