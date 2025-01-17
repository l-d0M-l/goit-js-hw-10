// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const delayField = document.querySelector('.delay-input');
let delayValue;
const btn = document.querySelector('.sumbit-btn');

function makePromise(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve === 'fulfilled') {
        resolve(`Fullfield promise in ${delay} ms`);
      } else {
        reject(`Rejected promise in ${delay} ms`);
      }
    }, delay);
  });
}

btn.addEventListener('click', createPromise);

function createPromise(event) {
  event.preventDefault();
  const selectedRadio = document.querySelector('input[type="radio"]:checked');

  delayValue = delayField.value;
  if (delayValue < 0) {
    delayValue = 0;
  }

  console.log(selectedRadio.value);
  makePromise(delayValue, selectedRadio.value)
    .then(value => {
      iziToast.show({
        message: value,
        backgroundColor: 'green',
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.show({
        message: error,
        backgroundColor: 'red',
        position: 'topRight',
      });
    });

  delayField.innerHTML = '';
  delayField.value = '';
  selectedRadio.checked = false;
}
