class player_slab{
	constructor(x,y,size_x,size_y){
		this.x = x;
		this.y = y;

		this.size_x = size_x;
		this.size_y = size_y;
	}

	update(color="white"){
		this.clear();
		this.x = mouse_loc_x-this.size_x/2;
		if(this.x < 0){
			this.x = 0;
		}
		else if(this.x > canvas.width - this.size_x){
			this.x = canvas.width - this.size_x
		}
		for (var x = this.x;x <= this.size_x+this.x;x++){
			if(ctx.getImageData(x, this.y-5,1,1).data[2] != 0){
				// console.log(ctx.getImageData(x, this.y-5,1,1).data[2]);
				// console.log((x-this.x-this.size_x/2)/10);
				ball1.velocity_x = (x-this.x-this.size_x/2)/10;
                player_hit = true;
				// if (ball1.velocity_y < 0){
				// 	ball1.velocity_y = -5 + Math.sqrt(Math.abs(ball1.velocity_x));
				// }
				// else{
				// 	ball1.velocity_y = 5 - Math.sqrt(Math.abs(ball1.velocity_x));
				// }
			}
		}
		this.draw(color)
	}

	draw(color="white"){
		ctx.beginPath();
		ctx.rect(this.x,this.y,this.size_x,this.size_y);
		ctx.strokeRect(this.x, this.y, this.size_x, this.size_y);
		ctx.fillStyle = color;
		ctx.fill();
	}
	clear(){
		ctx.beginPath();
		ctx.rect(0,this.y,canvas.width,this.size_y);
		ctx.strokeRect(0, this.y,canvas.width, this.size_y);
		ctx.fillStyle = background_color;
		ctx.fill();
	}
}

class ball{
	constructor(x,y,radius){
		this.x = x;
		this.y = y;

		this.velocity_x = 0
		this.velocity_y = 5

		this.radius = radius
	}

	update(color="white"){
		
		this.clear();
		var oldx = this.x;
		var oldy = this.y;
		this.x = this.x + this.velocity_x;
		this.y = this.y + this.velocity_y;
		if (this.x-this.radius  < 0 || this.x+this.radius > canvas.width){
			this.velocity_x = this.velocity_x * -1;
			this.x = oldx;
            edge_hit = true;
		}
		else if (this.y-this.radius/2  < 0){
			this.velocity_y = this.velocity_y * -1;
			this.y = oldy;
            edge_hit = true;
		}
        else if (this.y+this.radius/2 > canvas.height){
            game.over = true;
        }
		else if (ctx.getImageData(this.x+this.radius, this.y+this.radius+1,1,1).data[2] != 0 || ctx.getImageData(this.x-this.radius, this.y-this.radius-1,1,1).data[2] != 0){
			this.velocity_y = this.velocity_y * -1;
			this.y = oldy;
            if(!player_hit){
                block_hit = true;
            }
		}
        else if (ctx.getImageData(this.x+this.radius, this.y-this.radius+1,1,1).data[2] != 0 || ctx.getImageData(this.x-this.radius, this.y+this.radius-1,1,1).data[2] != 0){
			this.velocity_y = this.velocity_y * -1;
			this.y = oldy;
            if(!player_hit){
                block_hit = true;
            }
		}
		else if (ctx.getImageData(this.x+this.radius+1, this.y+this.radius,1,1).data[2] != 0 || ctx.getImageData(this.x-this.radius-1, this.y-this.radius,1,1).data[2] != 0){
			this.velocity_x = this.velocity_x * -1;
			this.x = oldx;
            if(!player_hit){
                block_hit = true;
            }
		}
        else if (ctx.getImageData(this.x+this.radius+1, this.y-this.radius,1,1).data[2] != 0 || ctx.getImageData(this.x-this.radius-1, this.y+this.radius,1,1).data[2] != 0){
			this.velocity_x = this.velocity_x * -1;
			this.x = oldx;
            if(!player_hit){
                block_hit = true;
            }
		}
		this.draw(color)
	}

	draw(color = "white"){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fillStyle = color;
		ctx.fill();
	}

	clear(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius+1, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fillStyle = background_color;
		ctx.fill();
	}
}

class Block{
    constructor(x,y,sizeX,sizeY){
        this.x = x;
        this.y = y;

        this.centerX = x+sizeX/2;
        this.centerY = y+sizeY/2;

        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.hit = false;
    }
    draw(color="white"){
        if(!this.hit){
            ctx.beginPath();
            ctx.rect(this.x,this.y,this.sizeX,this.sizeY);
            ctx.strokeRect(this.x, this.y, this.sizeX, this.sizeY);
            ctx.fillStyle = color;
            ctx.fill();
        }
	}
	clear(){
		ctx.beginPath();
		ctx.rect(this.x-1,this.y-1,this.sizeX+2,this.sizeY+2);
		ctx.strokeRect(this.x-1, this.y-1, this.sizeX+2, this.sizeY+2);
		ctx.fillStyle = background_color;
		ctx.fill();
	}
}