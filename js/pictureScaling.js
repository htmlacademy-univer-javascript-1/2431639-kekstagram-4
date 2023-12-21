import { preview } from './fx.js';

const SCALE = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
};

const upload = document.querySelector('.img-upload');
const scaleInput = upload.querySelector('.scale__control--value');
const upscaleButton = upload.querySelector('.scale__control--bigger');
const downscaleButton = upload.querySelector('.scale__control--smaller');

const scalePicture = (value) => {
  preview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const adjustScale = (step) => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = Math.max(Math.min(currentValue + step, SCALE.MAX), SCALE.MIN);
  scalePicture(newValue);
};

const decreasePhoto = () => {
  adjustScale(-SCALE.STEP);
};

const increasePhoto = () => {
  adjustScale(SCALE.STEP);
};

downscaleButton.addEventListener('click', decreasePhoto);
upscaleButton.addEventListener('click', increasePhoto);

const resetScale = () => scalePicture(SCALE.DEFAULT);
export { resetScale };
