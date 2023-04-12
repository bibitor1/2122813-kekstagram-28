const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const PERCENT_TO_DECIMAL_FACTOR = 100;

const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imageScalePreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageScalePreview.style.transform = `scale(${value / PERCENT_TO_DECIMAL_FACTOR})`;
  scaleInput.value = `${value}%`;
};

const onZoomOutButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = Math.max(MIN_SCALE, currentValue - SCALE_STEP);
  scaleImage(newValue);
};

const onZoomInButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = Math.min(MAX_SCALE, currentValue + SCALE_STEP);
  scaleImage(newValue);
};

export const resetScale = () => scaleImage(DEFAULT_SCALE);

zoomOutButton.addEventListener('click', onZoomOutButtonClick);
zoomInButton.addEventListener('click', onZoomInButtonClick);
