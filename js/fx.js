export const preview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsButton = document.querySelector('.effects__list');

const commonSliderConfig = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
};

const destroySlider = () => {
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
};

const getSpecificSliderConfig = (effectId) => {
  switch (effectId) {
    case 'effect-chrome':
    case 'effect-sepia':
      return { ...commonSliderConfig };
    case 'effect-marvin':
      return {
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
        connect: 'lower',
      };
    case 'effect-phobos':
    case 'effect-heat':
      return {
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
        connect: 'lower',
      };
    default:
      return { ...commonSliderConfig };
  }
};

const createSlider = (config, updateCallback) => {
  noUiSlider.create(slider, config);
  slider.noUiSlider.on('update', () => {
    updateCallback(slider.noUiSlider.get());
  });
};

const resetEffect = () => {
  destroySlider();
  preview.style.filter = '';
  effectLevelValue.value = '';
};

const applyEffect = (effectId, value) => {
  switch (effectId) {
    case 'effect-chrome':
      preview.style.filter = `grayscale(${value})`;
      break;
    case 'effect-sepia':
      preview.style.filter = `sepia(${value})`;
      break;
    case 'effect-marvin':
      preview.style.filter = `invert(${value}%)`;
      break;
    case 'effect-phobos':
      preview.style.filter = `blur(${value}px)`;
      break;
    case 'effect-heat':
      preview.style.filter = `brightness(${value})`;
      break;
    default:
      resetEffect();
  }
  effectLevelValue.value = value;
};

const initEffect = () => {
  effectsButton.addEventListener('click', (evt) => {
    const effectButton = evt.target.closest('.effects__radio');

    if (effectButton) {
      destroySlider();

      const effectId = effectButton.id;
      if (effectId === 'effect-none') {
        resetEffect();
      } else {
        const specificSliderConfig = getSpecificSliderConfig(effectId);
        createSlider(specificSliderConfig, (value) => {
          applyEffect(effectId, value);
        });
      }
    }
  });
};

export { initEffect, resetEffect };
