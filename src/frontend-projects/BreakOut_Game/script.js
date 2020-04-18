var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

/*
ctx.beginPath();
 ctx.rect(20, 40, 50, 50);
 ctx.fillStyle = "#FF0000";
 ctx.fill();
ctx.closePath();

ctx.beginPath();
 ctx.arc(240, 160, 20, 0, Math.PI*2, false);
 ctx.fillStyle = "#00FF00";
 ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
ctx.stroke();
ctx.closePath();
*/

// Movement
var x = canvas.width/2;
var y = canvas.height -30;

var dx = 2;
var dy = -2;

// Ball size
var ballRadius = 10;

// Paddle
var paddleHeight = 10;
var paddleWidth = 75;

// Position
var paddleX = (canvas.width - paddleWidth)/2;

// Paddle movement
var rightPressed = false;
var leftPressed = false;

// Brick wall
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;
var lives = 3;

var bricks = [];
for (c=0; c<brickColumnCount; c++){
	bricks[c] = [];
	for (r=0; r<brickRowCount; r++) {
		bricks[c][r] = {x: 0, y:0, status: 1}
	}
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

document.addEventListener("mousemove", mouseMoveHandler);

function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {

			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			
			    bricks[c][r].x = brickX;
			    bricks[c][r].y = brickY;

			    ctx.beginPath();
			    ctx.rect(brickX, brickY, brickWidth, brickHeight);
			    ctx.fillStyle = "#000000";
			    ctx.fill();
			    ctx.closePath();
			}			
		}
	}
}

// Key pressed 
function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

// Key released
function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

// Mouse movement
function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 + paddleWidth/2 && relativeX + paddleWidth/2 < canvas.width) {
		paddleX = relativeX - paddleWidth/2;
	}
}

function drawBall() {
	ctx.beginPath();
	 ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	 ctx.fillStyle = "#0095DD";
	 ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	 ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	 ctx.fillStyle = "#FF1122";
	 ctx.fill();
	ctx.closePath();
}

function collisionDection() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];

			if(b.status == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;

					if(score == brickRowCount * brickColumnCount) {
						alert("You Win!!!");
						document.location.reload();
					}
			    }			
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0000FF";
	ctx.fillText("Score: " +score, 8, 20);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0000FF";
	ctx.fillText("Lives: " +lives, canvas.width-65, 20);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDection();

    // Check top and bottom canvas's borders
    //if(y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    //	dy = -dy;
    //}
    
    // Check top canvas' border
    if(y + dy < ballRadius) {
    	dy = -dy;
    }
    // Check paddle's colision
    else if(y + dy > canvas.height - ballRadius) {
    	
    	if(x > paddleX && x < paddleX + paddleWidth) {
    		dy = - dy;
    	}
    	else {
    		lives--;

    		if(!lives) {
    			alert("GAME OVER!");

    		    x = canvas.width/2;
                y = canvas.height -30;

    	        document.location.reload();
    		}
    		else {
    			x = canvas.width/2;
    			y = canvas.height-30;
    			dx = 2;
    			dy = -2;
    			paddleX = (canvas.width-paddleWidth)/2;
    		}    		
    	}    	
    }

    // check left and right canvas's borders
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    	dx = -dx;
    }
    
    // Paddle movement and canvas's borders
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
    	paddleX += 7;
    }
    else if(leftPressed && paddleX > 0){
    	paddleX -= 7;
    }

    // Ball position
	x += dx;
	y += dy;

	requestAnimationFrame(draw);
}

// setInterval(function, milliseconds)
//setInterval(draw, 10);

// This function helps browser to render images betters
draw();

