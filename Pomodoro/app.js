// global variables
const time_el = document.querySelector('.container .time');
const start_btn = document.getElementById('start');
const pause_btn = document.getElementById('pause');
const reset_btn = document.getElementById('reset');

let minutes = 24;
let seconds = 0;
let interval = null;

// event listeners
start_btn.addEventListener('click', start);
pause_btn.addEventListener('click', stop);
reset_btn.addEventListener('click', reset);


// update timer
function timer () {

    // format out time
    let mins = minutes + Math.floor(seconds / (60));
    let secs = Math.abs(seconds % 60);

    if (mins < 10) mins = '0' + mins;
    if (secs < 10) secs = '0' + secs;

    time_el.innerText = `${mins}:${secs}`;
}

function start () {
    clearInterval(interval);
    interval = setInterval(() => {
        if (minutes > 0) {
            seconds--;
            timer();
        } else {
            clearInterval(interval);
            time_el.textContent = 'Time\'s up!'
        }
    }, 1000)

    interval = setInterval(timer, 1000);
}

function stop ()  {
    clearInterval(interval);
}

function reset () {
    stop();
    clearInterval(interval);
    time_el.innerHTML =  '25:00';
}