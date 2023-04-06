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

const onScaleButtonClick = (event) => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue;

  if (event.target === zoomOutButton) {
    newValue = currentValue - SCALE_STEP;
    if (newValue < MIN_SCALE) {
      newValue = MIN_SCALE;
    }
  } else {
    newValue = currentValue + SCALE_STEP;
    if (newValue > MAX_SCALE) {
      newValue = MAX_SCALE;
    }
  }

  scaleImage(newValue);
};

export const resetScale = () => scaleImage(DEFAULT_SCALE);

zoomOutButton.addEventListener('click', onScaleButtonClick);
zoomInButton.addEventListener('click', onScaleButtonClick);
