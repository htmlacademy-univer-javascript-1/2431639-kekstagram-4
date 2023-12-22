const SERVER_URL = 'https://29.javascript.pages.academy/kekstagram';

const ROUTE = {
  GET_DATA:'/data',
  SEND_DATA:'/'
};

const METHOD = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const loadData = (route, errorText, method = METHOD.GET, body = null) =>
  fetch(`${SERVER_URL}${route}`, {method, body})
    .then((response) => {
      if (response.ok){
        return response.json();
      }
      throw new Error();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => loadData(ROUTE.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => loadData(ROUTE.SEND_DATA, ErrorText.SEND_DATA, METHOD.POST, body);

export { getData, sendData} ;
