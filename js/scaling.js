const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imageScalePreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageScalePreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onScaleButtonClick = (evt) => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue;

  if (evt.target === zoomOutButton) {
    newValue = Math.max(MIN_SCALE, currentValue - SCALE_STEP);
  } else {
    newValue = Math.min(MAX_SCALE, currentValue + SCALE_STEP);
  }

  scaleImage(newValue);
};

export const resetScale = () => scaleImage(DEFAULT_SCALE);

zoomOutButton.addEventListener('click', onScaleButtonClick);
zoomInButton.addEventListener('click', onScaleButtonClick);
