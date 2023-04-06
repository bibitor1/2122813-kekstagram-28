const FILTERS = {
  none: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};
const DEFAULT_FILTER = FILTERS.none;

let activeFilter = DEFAULT_FILTER;

const imageElement = document.querySelector('.img-upload__preview img');
const filtersElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const filterLevelElement = document.querySelector('.effect-level__value');

const isDefaultFilterChosen = () => activeFilter === DEFAULT_FILTER;

const toggleSliderVisibility = (isVisible) => {
  if (isVisible) {
    sliderContainerElement.classList.remove('hidden');
  } else {
    sliderContainerElement.classList.add('hidden');
  }
};

const updateSlider = (sliderConfig) => {
  sliderElement.noUiSlider.updateOptions(sliderConfig);

  toggleSliderVisibility(!isDefaultFilterChosen());
};

const onFiltersChage = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {

    return;
  }

  const filter = FILTERS[evt.target.value];
  if (filter) {
    activeFilter = filter;
    imageElement.className = `effects__preview--${activeFilter.name}`;

    const sliderConfig = {
      range: {
        min: activeFilter.min,
        max: activeFilter.max,
      },
      step: activeFilter.step,
      start: activeFilter.max,
    };
    updateSlider(sliderConfig);
  }
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();

  imageElement.style.filter = isDefaultFilterChosen()
    ? DEFAULT_FILTER.style
    : `${activeFilter.style}(${sliderValue}${activeFilter.unit})`;
  filterLevelElement.value = sliderValue;
};

export const resetFilters = () => {
  activeFilter = DEFAULT_FILTER;
  updateSlider(activeFilter);
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_FILTER.min,
    max: DEFAULT_FILTER.max,
  },
  start: DEFAULT_FILTER.max,
  step: DEFAULT_FILTER.step,
  connect: 'lower',
});

toggleSliderVisibility(false);

filtersElement.addEventListener('change', onFiltersChage);
sliderElement.noUiSlider.on('update', onSliderUpdate);
