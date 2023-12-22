const EFFECTS = [
  { name: 'none', style: 'none', min: 0, max: 100, step: 1, unit: '' },
  { name: 'sepia', style: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'chrome', style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'marvin', style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  { name: 'phobos', style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  { name: 'heat', style: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
];

const imageEditorPreview = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.img-upload__effects');
const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');

const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

noUiSlider.create(slider, {
  range: { min: 0, max: 1 },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value) ? value : value.toFixed(1)),
    from: (value) => parseFloat(value),
  },
});

const isDefault = () => currentEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: { min: currentEffect.min, max: currentEffect.max },
    start: currentEffect.max,
    step: currentEffect.step,
  });

  sliderContainer.classList.toggle('hidden', isDefault());
};

slider.noUiSlider.on('update', () => {
  const sliderValue = slider.noUiSlider.get();
  imageEditorPreview.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  effectLevel.value = sliderValue;
});

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imageEditorPreview.className = `effects__preview--${currentEffect.name}`;
  updateSlider();
};

export const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

sliderContainer.classList.add('hidden');
effects.addEventListener('change', onEffectsChange);
