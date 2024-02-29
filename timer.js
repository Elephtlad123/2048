let timer = document.getElementById("timer");
let startTime = null;

var intervalId = window.setInterval(function(){
    if (moves != 0){
        startTime = new Date().getSeconds()
        clearInterval(intervalId);
        
        var timerInterval = window.setInterval(function(){
            timer.innerHTML = String(new Date().getSeconds() - startTime);
            console.log(startTime);
        })
    }
  }, 500);
