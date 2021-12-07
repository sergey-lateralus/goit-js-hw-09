const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

btnStart.addEventListener('click', onStartClick);
btnStop.addEventListener('click', onStopClick);

function onStartClick() {
    if (onStartClick) {
        btnStart.disabled = true;
        btnStop.disabled = false;
    }
    
    timerId = setInterval(changeBackgroundColor, 1000);
};

function onStopClick() {
    if (onStopClick) {
        btnStart.disabled = false;
        btnStop.disabled = true;
    }
    
    clearInterval(timerId);
};

function changeBackgroundColor() {
  body.style.backgroundColor = getRandomHexColor();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};