// global variables
const time_el = document.querySelector('.container .time');
const start_btn = document.getElementById('start');
const pause_btn = document.getElementById('pause');
const reset_btn = document.getElementById('reset');

let targetTime = 1 * 60 * 1000;
let currentTime = 0;
let interval = null;

// event listeners
start_btn.addEventListener('click', start);
pause_btn.addEventListener('click', stop);
reset_btn.addEventListener('click', reset);


// update timer
function timer () {

    // format out time
    let mins = Math.floor(targetTime / (1000 * 60));
    let secs = Math.abs(targetTime % (1000 * 60));

    time_el.innerText = `${mins/1000 < 10 ? '0' : ''}${mins/1000}:${secs/1000 < 10 ? '0' : ''}${secs/1000}`;
}

function start () {
    if (targetTime > 0) {
        clearInterval(interval);
        interval = setInterval(() => {
            targetTime -= 1000;
            timer();
            if (targetTime  <= 0)  {
                clearInterval(interval);
                time_el.textContent = 'Time\'s up!';
                alert("Time for a break! :)");
            }
        }, 1000)
    }
}

function stop ()  {
    clearInterval(interval);
}

// reset function doesnt actually reset the timer
function reset () {
    stop();
    clearInterval(interval);
    interval = null;
}