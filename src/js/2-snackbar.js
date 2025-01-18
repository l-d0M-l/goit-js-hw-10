// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const delayField = document.querySelector('.delay-input');
let delayValue;
const form = document.querySelector('.form');

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

form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  const selectedRadio = document.querySelector('input[type="radio"]:checked');

  delayValue = delayField.value;
  if (delayValue < 0) {
    delayValue = 0;
  }

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
