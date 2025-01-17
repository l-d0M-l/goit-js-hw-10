// Описаний в документації
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate, dateNow;
const timer = document.querySelector('.timer');
const dateField = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    checkDate();
  },
};
flatpickr('#datetime-picker', options);

function checkDate() {
  dateNow = new Date();
  //   console.log(dateNow);

  if (userSelectedDate - dateNow < 0) {
    iziToast.show({
      title: 'Please choose a date in the future',
      position: 'bottomLeft',
    });

    // alert('Please choose a date in the future');
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
}
const btn = document.querySelector('#start-btn');
btn.disabled = true;

btn.addEventListener('click', startTimer);

function startTimer() {
  btn.disabled = true;
  dateField.disabled = true;
  let interval = setInterval(() => {
    dateNow = new Date();
    let timeMs = userSelectedDate - dateNow;

    if (timeMs <= 0) {
      clearInterval(interval);
      dateField.disabled = false;

      return;
    }
    let timeLeft = convertMs(timeMs);
    timer.querySelector('[data-days]').innerHTML = addLeadingZero(
      timeLeft.days
    );

    timer.querySelector('[data-hours]').innerHTML = addLeadingZero(
      timeLeft.hours
    );
    timer.querySelector('[data-minutes]').innerHTML = addLeadingZero(
      timeLeft.minutes
    );
    timer.querySelector('[data-seconds]').innerHTML = addLeadingZero(
      timeLeft.seconds
    );
    //return { days, hours, minutes, seconds };
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
