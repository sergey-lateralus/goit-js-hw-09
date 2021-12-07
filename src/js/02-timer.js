import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputDate = document.getElementById('datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let timerId = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let deltaTime = selectedDates[0].getTime() - options.defaultDate;

    if (deltaTime > 0) {
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    };

    const countdownTimer = {
      start() {
        btnStart.addEventListener('click', onBtnStartClick);

        function onBtnStartClick() {
          timerId = setInterval(() => {
            deltaTime -= 1000;
            const time = convertMs(deltaTime);
            updateTimer(time);
            btnStart.disabled = true;
            btnStart.removeEventListener('click', onBtnStartClick);

            if (deltaTime <= 0) {
              clearInterval(timerId);
              clearTimer();
              return;
            }
          }, 1000);
        }
      },
    };
    countdownTimer.start();
  },
};

flatpickr(inputDate, options);

function updateTimer(e) {
  days.textContent = e.days;
  hours.textContent = e.hours;
  minutes.textContent = e.minutes;
  seconds.textContent = e.seconds;
};

function clearTimer() {
  days.textContent = '00';
  hours.textContent = '00';
  minutes.textContent = '00';
  seconds.textContent = '00';
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24; 

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour)); 

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute)); 

  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return {
    days,
    hours,
    minutes,
    seconds,
  };
};