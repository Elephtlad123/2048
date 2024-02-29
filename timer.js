let timer = document.getElementById("timer");
let startTime = null;

var intervalId = window.setInterval(function(){
    if (moves != 0){
        startTime = new Date().getTime()
        clearInterval(intervalId);
        
        var timerInterval = window.setInterval(function(){
            let time = Math.floor((new Date().getTime() - startTime)/1000);
            timer.innerHTML = String(time);
        }, 250);
    }
  }, 500);
