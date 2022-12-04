const startPauseButton = document.getElementById("start-pause");
const resetLapButton = document.getElementById("reset-lap");
const lapsSection = document.getElementById("stopwatch-laps");
const lapsBodyContainer = document.getElementById("lap-info-body");

let isStopwatchWorking = false;

let numberOfLaps = 0;
let lastLapTime = 0;

let stopwatchInterval = null;

let stopwatch = {
    milliseconds:0,
    seconds:0,
    minutes:0,
    hours:0
};

function initStopwatch(){
    stopwatch.milliseconds++;

    if(stopwatch.milliseconds >= 100){
        stopwatch.milliseconds = 0;
        stopwatch.seconds++;

        if(stopwatch.seconds >= 60){
            stopwatch.seconds = 0;
            stopwatch.minutes++;

            if(stopwatch.minutes >= 60){
                stopwatch.minutes = 0;
                stopwatch.hours++;
            };
        };
    };

    attStopwatchDisplay();
};

function resetStopwatch(){

    Object.keys(stopwatch).forEach(item => stopwatch[item] = 0);
    clearInterval(stopwatchInterval);
    isStopwatchWorking = false;
    numberOfLaps = 0;
    lastLapTime = 0;

    lapsSection.classList.remove("stopwatch-laps-active");
    lapsBodyContainer.innerHTML = "";

    attStopwatchDisplay();
};

function lapStopwatch(){
    
    let lapMainTime = `${formatNumber(stopwatch.hours)}:${formatNumber(stopwatch.minutes)}:${formatNumber(stopwatch.seconds)}.${formatNumber(stopwatch.milliseconds)}`;
    let lapTime = calcDifferenceBetweenTwoLaps();
    numberOfLaps++;

    attLapsDisplay(lapTime,lapMainTime);

};

function calcDifferenceBetweenTwoLaps(){

    let currentLapTime = (stopwatch.milliseconds * 10) + (stopwatch.seconds * 1000) + (stopwatch.minutes * 60000) + (stopwatch.hours * 3600000);
    let difference = currentLapTime - lastLapTime;

    function convertMilliseconds(){

        let hours = parseInt(difference / 3600000);
        difference = difference - (hours * 3600000);
        let minutes = parseInt(difference / 60000)
        difference = difference - (minutes * 60000);
        let seconds = parseInt(difference / 1000);
        difference = difference - (seconds * 1000);
        let milliseconds = parseInt(difference / 10);

        return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}.${formatNumber(milliseconds)}`;
    };

    lastLapTime = currentLapTime;

    return convertMilliseconds();
};

function attLapsDisplay(lapTime,lapMainTime){

    lapsSection.classList.add("stopwatch-laps-active");
    
    const cell_lapNumber = document.createElement("td");
    const cell_lapTime = document.createElement("td");
    const cell_mainTime = document.createElement("td");
    const newRow = document.createElement("tr");

    cell_lapNumber.innerHTML = numberOfLaps;
    cell_lapTime.innerHTML = lapTime;
    cell_mainTime.innerHTML = lapMainTime;

    newRow.appendChild(cell_lapNumber);
    newRow.appendChild(cell_lapTime);
    newRow.appendChild(cell_mainTime);

    lapsBodyContainer.insertAdjacentElement("afterbegin",newRow);
    lapsSection.scrollTop = 0;
};

function attStopwatchDisplay(){

    const millisecondsDisplay = document.getElementById("milliseconds");
    const secondsDisplay = document.getElementById("seconds");
    const minutesDisplay = document.getElementById("minutes");
    const hoursDisplay = document.getElementById("hours");

    millisecondsDisplay.innerHTML = formatNumber(stopwatch.milliseconds);
    secondsDisplay.innerHTML = formatNumber(stopwatch.seconds);
    minutesDisplay.innerHTML = formatNumber(stopwatch.minutes);
    hoursDisplay.innerHTML = formatNumber(stopwatch.hours);
};

function formatNumber(item){
    return item < 10 ? "0" + item : item;
};

function verifyResetOrLap(){
    if(!isStopwatchWorking)
        resetStopwatch();
    else
        lapStopwatch();
};

function verifyStartOrPause(){
    if(!isStopwatchWorking){
        stopwatchInterval = setInterval(initStopwatch, 10);
        isStopwatchWorking = true;
    }else{
        clearInterval(stopwatchInterval);
        isStopwatchWorking = false;
    };

    changeButtonsValues();
};

function changeButtonsValues(){
    if(!isStopwatchWorking){
        startPauseButton.setAttribute("value", "iniciar");
        resetLapButton.setAttribute("value", "resetar");
    }else{
        startPauseButton.setAttribute("value", "pausar");
        resetLapButton.setAttribute("value", "volta");
    };
};

startPauseButton.addEventListener("click", verifyStartOrPause);
resetLapButton.addEventListener("click", verifyResetOrLap);