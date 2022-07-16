const canvas = document.querySelector('canvas');
const ctx =  canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const background_color = "black"

var mouse_loc_x = 0

var player_hit = false;
var edge_hit = false;
var block_hit = false;

var ele = document.getElementById('timer');
timer_start = false;

class GameState{
	constructor(){
		this.start = false;
		this.over = false;
		this.win = false;
		this.score = 0;
	}
}

var game = new GameState();

var player = new player_slab(canvas.width/2-25,canvas.height - 40,150,10)
var ball1 = new ball(canvas.width/2,canvas.height/2,7)

num_block_x = 20;
num_block_y = 5;
gap = 6;
inital_y = 50;

block_size = (canvas.width-num_block_x*gap - gap) / num_block_x;

var Blocks = new Array(num_block_x);

for (var x = 0; x < num_block_x;x++){
	Blocks[x] = new Array(num_block_y);
	for(var y = 0; y < num_block_y;y++){
		Blocks[x][y] = new Block(x*(block_size+gap)+gap,y*(block_size+gap)+inital_y,block_size,block_size);
	}
}

function remove_block(){
	var min_dis = 1000;
	x_index = -1;
	y_index = -1;
	for (var x = 0; x < num_block_x;x++){
		for (var y = 0; y < num_block_y;y++){
			if (!Blocks[x][y].hit){
				let disX = Math.abs(Blocks[x][y].centerX - ball1.x);
				let disY = Math.abs(Blocks[x][y].centerY - ball1.y)
				if (disX + disY < min_dis){
					min_dis = disX + disY;
					x_index = x;
					y_index = y;
				}
			}
		}
	}
	if (x_index != -1 && y_index != -1){
		Blocks[x_index][y_index].clear();
		Blocks[x_index][y_index].hit = true;
	}
	else{
		game.win = true;
		game.over = true;
		game.start = false;
	}
}

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
	if (!game.over){
		requestAnimationFrame(animate);
		if (!game.start){
			game.start = true;
			ctx.beginPath();
			ctx.rect(0,0,0,0);
			ctx.fillStyle = background_color;
			ctx.fill();
			startTimer();
			timer_start = true;
			player.draw()
			ball1.draw()
			for (var x = 0; x < num_block_x;x++){
				for(var y = 0; y < num_block_y;y++){
					Blocks[x][y].draw();
				}
			}
		}
		for (var x = 0; x < num_block_x;x++){
			for(var y = 0; y < num_block_y;y++){
				Blocks[x][y].draw();
			}
		}
		player.update()
		ball1.update()
		if (block_hit){
			remove_block();
		}
		player_hit = false;
		edge_hit = false;
		block_hit = false;
	}
}

document.addEventListener('mousemove', (event) => {
	mouse_loc_x = event.clientX - canvas.getBoundingClientRect().left
});

animate();