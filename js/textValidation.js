const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const MAX_HASHTAGS = 5;
const hashtagTemplate = /#[a-zа-яё0-9]{0,19}$/i;
let hashtagErrorMessage;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const isHashtagsValid = () =>{
  const hashtagCounter = hashtagInput.value.split(' ').map((hashtag) => hashtag.toLowerCase());
  if(new Set(hashtagCounter).size !== hashtagCounter.length){
    hashtagErrorMessage = 'Хэш-теги должны быть уникальными';
    return false;
  }
  for(let hashtag of hashtagCounter){
    hashtag = hashtag.toLowerCase();
    if(hashtag.split('#').length > 2 || (!hashtagTemplate.test(hashtag) && hashtag !== '')){
      hashtagErrorMessage = 'Невалидный хэш-тег';
      return false;
    } else if (hashtagCounter.length > MAX_HASHTAGS){
      hashtagErrorMessage = `Хэш-тегов может быть не более ${MAX_HASHTAGS}`;
      return false;
    }
  }
  return true;
};

const createErrorMessage = () => hashtagErrorMessage;
pristine.addValidator(hashtagInput,isHashtagsValid,createErrorMessage,1 , false);

export {pristine};
