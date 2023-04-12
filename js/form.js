import { resetScale } from './scaling.js';
import { resetFilters } from './filters.js';
import { sendData } from './api.js';
import { showDialog } from './dialogs.js';
import { isEscapeKey } from './utils.js';

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

const showOverlay = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetScale();
  resetFilters();
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideOverlay = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFiledFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const getMessageType = () => document.querySelector('.error, .success');

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFiledFocused()) {
    evt.preventDefault();

    const messageType = getMessageType();

    if (!messageType) {
      hideOverlay();
    }
  }
}

const onCancelButtonClick = () => {
  hideOverlay();
};

const onFileInputChange = () => {
  showOverlay();
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
    return true;
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

const toggleSubmitButton = (disabled) => {
  submitButton.disabled = disabled;
};

const onFormSubmit = () => {
  const isValid = pristine.validate();

  if (isValid) {
    toggleSubmitButton(true);

    const data = new FormData(form);

    sendData(data)
      .then(() => {
        toggleSubmitButton(false);
        hideOverlay();
        showDialog(successMessage);
      })
      .catch(() => {
        toggleSubmitButton(false);
        showDialog(errorMessage);
      });
  }
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  onFormSubmit();
});

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
