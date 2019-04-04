"use strict";

chrome.runtime.onInstalled.addListener(function () {
    localStorage.clear();
    startLoop();
});

chrome.runtime.onStartup.addListener(function () {
    startLoop();
});


function startLoop() {
    setInterval(function () {
        var endDate = localStorage.getItem("endDate");
        console.log("siia")
        if (null !== endDate && localStorage.getItem("alreadyStarted") === null) {
            console.log("saime siia")
            var breakTime = localStorage.getItem("breakTimeCurrent");
            console.log(endDate + " " + breakTime)
            timerStartedB(Number(endDate), Number(breakTime));
        }
    }, 1000);
}

function timerStartedB(endDate, breakTime) {
    localStorage.setItem("alreadyStarted", 1);
    window.timerB = setInterval(function () {
        console.log("ringtehtud")
        var now = new Date().getTime();
        var distance = endDate - now;
        console.log(distance)
        if (localStorage.getItem("endDate") === null) {
            clearInterval(window.timerB);
            endTimer();
        }
        if (distance < (1000 * 60 * breakTime) && distance >= 0 && localStorage.getItem("endDate") !== null) {
            var catsOpen = localStorage.getItem("catsOpen");
            if (catsOpen === null) {
                localStorage.setItem("catsOpen", 1);
                chrome.tabs.create({url: "catBreak.html"});
            }
        }
        if (distance < 0) {
            clearInterval(window.timerB);
            endTimer();
            chrome.tabs.create({url: "breakOver.html"});
        }
    }, 1000);
}

function endTimer() {
    localStorage.removeItem("alreadyStarted");
    localStorage.removeItem("endDate");
    localStorage.removeItem("catsOpen");
    var breakTime = localStorage.getItem("breakTime");
    localStorage.setItem("breakTimeCurrent", breakTime);
}