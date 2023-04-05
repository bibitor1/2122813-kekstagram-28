const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const smallerZoomButton = document.querySelector('.scale__control--smaller');
const biggerZoomButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const ImageScalePreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  ImageScalePreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerButtonClik = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue - SCALE_STEP;

  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + SCALE_STEP;

  if (newValue < MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

export const resetScale = () => scaleImage(DEFAULT_SCALE);

smallerZoomButton.addEventListener('click', onSmallerButtonClik);
biggerZoomButton.addEventListener('click', onBiggerButtonClick);
