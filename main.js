const canvas = document.querySelector('canvas');
const ctx =  canvas.getContext('2d');


var ele = document.getElementById('timer');
timer_start = false;

function startTimer(){
	milisec = 0;
	sec = 0;
	minute = 0;
	var startTime = new Date();
	var endTime;
	timer = setInterval(()=>{
		endTime = new Date();
		var timeDiff = endTime - startTime;
		sec = Math.floor(timeDiff/1000);
		minute = Math.floor(sec/60);
		sec = Math.floor(sec%60);
		milisec = timeDiff - sec*1000 - minute*60*1000;
		if (sec < 10 && minute < 10){
			ele.innerHTML = '0'+minute + ':0'+sec;
		}
		else if (sec >= 10 && minute < 10){
			ele.innerHTML = '0'+minute + ':'+sec;
		}
		else if (sec < 10 && minute >= 10){
			ele.innerHTML = minute + ':0'+sec;
		}
		else{
			ele.innerHTML = minute +':' + sec;
		}
	},10)
}

function clearTimer() {
	clearTimeout(timer);
	milisec = 0;
	sec = 0;
	minute = 0;
	ele.innerHTML = '00:00';
}

function animate(){
	requestAnimationFrame(animate);
    if (!timer_start){
        ctx.beginPath();
        ctx.rect(0,0,0,0);
        ctx.fillStyle = 'black';
        ctx.fill();
        startTimer();
        timer_start = true;
    }
}

animate();