document.addEventListener('DOMContentLoaded', function () {
    var workTime = localStorage.getItem("workTime");
    if (null === workTime) {
        defaultSettings();
    }
    var breakTime = localStorage.getItem("breakTimeCurrent");
    workTime = localStorage.getItem("workTime");

    var endDate = localStorage.getItem("endDate");
    console.log(endDate + " " + breakTime)
    if (null !== endDate) {
        timerStarted(endDate, Number(breakTime));
    } else {
        displayDefaultTimer(workTime);
    }

    document.getElementById("startPomodoro").addEventListener("click", startPomodoro);
    document.getElementById("endPomodoro").addEventListener("click", endPomodoro);
    document.getElementById("settingsSave").addEventListener("click", settingsSave);
    document.getElementById("default").addEventListener("click", defaultSettings);
    document.getElementById("work").value = localStorage.getItem("workTime");
    document.getElementById("break").value = localStorage.getItem("breakTime");
    document.getElementById("long").value = localStorage.getItem("longBreak");
});

function startPomodoro() {
    var myObjtext = document.getElementById("obj").value;
    localStorage.setItem("myObjtext", myObjtext);
    var currentPomo = Number(localStorage.getItem("currentPomo"));
    var newPomo = currentPomo + 1;
    localStorage.setItem("currentPomo", newPomo);
    var longerBreak = Number(localStorage.getItem("longBreak"));
    var breakTime = null;
    if (newPomo >= longerBreak) {
        breakTime = 30;
        localStorage.setItem("currentPomo", 0);
        localStorage.setItem("breakTimeCurrent", breakTime);
    } else {
        breakTime = localStorage.getItem("breakTime");
        localStorage.setItem("breakTimeCurrent", breakTime);
    }
    var workTime = localStorage.getItem("workTime");
    var poroTime = Number(workTime) + Number(breakTime);
    console.log(poroTime);
    var cd = new Date().getTime();
    var endDate = cd + 60000 * (Number(poroTime)) + 1000;
    localStorage.setItem("endDate", endDate);
    timerStarted(endDate, Number(breakTime));
}

function endPomodoro() {
    var newBreakTime = localStorage.getItem("breakTime");
    localStorage.setItem("breakTimeCurrent", newBreakTime);
    localStorage.removeItem("myObjtext");
    localStorage.removeItem("endDate");
    localStorage.removeItem("catsOpen");
    clearInterval(window.timer);
    var workTime = localStorage.getItem("workTime");
    if (null === workTime) {
        workTime = 25;
    }
    displayDefaultTimer(workTime);
    document.getElementById("startPomodoro").value = "Start a pomodoro";
    document.getElementById("startPomodoro").disabled = false;
    document.getElementById("obj").value = "";
    document.getElementById("obj").disabled = false;
}

function displayDefaultTimer(workTime) {
    document.getElementById("timer").innerHTML = workTime + "m 0s";
}

function timerStarted(endDate, breakTime) {
    document.getElementById("obj").value = localStorage.getItem("myObjtext");
    document.getElementById("obj").disabled = true;
    document.getElementById("startPomodoro").value = "Ongoing pomodoro";
    document.getElementById("startPomodoro").disabled = true;
    window.timer = setInterval(function () {
        var now = new Date().getTime();
        var distance = endDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("timer").innerHTML = minutes - breakTime + "m " + seconds + "s ";
        if (distance < (1000 * 60 * breakTime) && distance >= 0) {
            document.getElementById("timer").innerHTML = "Break " + minutes + "m " + seconds + "s ";
        }
        if (distance < 0) {
            clearInterval(window.timer);
            endPomodoro();
        }
    }, 1000);
}

function settingsSave() {
    localStorage.setItem("workTime", document.getElementById("work").value);
    localStorage.setItem("breakTime", document.getElementById("break").value);
    localStorage.setItem("breakTimeCurrent", document.getElementById("break").value);
    localStorage.setItem("longBreak", document.getElementById("long").value);
    displayDefaultTimer(document.getElementById("work").value);
}

function defaultSettings() {
    localStorage.setItem("workTime", 25);
    localStorage.setItem("breakTime", 5);
    localStorage.setItem("breakTimeCurrent", 5);
    localStorage.setItem("longBreak", 4);
    document.getElementById("work").value = localStorage.getItem("workTime");
    document.getElementById("break").value = localStorage.getItem("breakTime");
    document.getElementById("long").value = localStorage.getItem("longBreak");
}