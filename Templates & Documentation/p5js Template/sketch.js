// Declare global variables here
class Bird {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.vel = 0;
        this.acc = 1;

    }

    display() {
        fill(255, 255, 0);
        ellipse(this.x, this.y, this.size, this.size);
    }

    update() {
        this.vel += this.acc;
        this.y += this.vel;

        if (this.y >= height - this.size / 2) {
            this.y = height - this.size / 2;
            this.vel = 0;
        }
    }

    flap() {
        this.vel = -15;
    }
}

class Pipe {
    constructor(x, yGap, gapSize) {
        this.x = x;
        this.yGap = yGap;
        this.gapSize = gapSize;
    }

    update() {
        this.x -= 5;
    }

    collide(player) {
        let radius = player.size/2;
        if (player.x+radius >= this.x && player.x-radius <= this.x+100 && 
            (player.y+radius >= height-this.yGap+this.gapSize/2 || player.y-radius <= height-this.yGap-this.gapSize/2)) {
            return true;
        }
        return false;
    }

    display() {
        fill(0,255,0);
        // rect(this.x, height-(this.yGap-this.gapSize/2), 100, this.yGap);
        // rect(this.x, 0, 100, this.yGap-this.gapSize/2);
        rect (this.x, height-this.yGap+this.gapSize/2, 100, this.yGap);
        rect (this.x, 0, 100, height-this.yGap-this.gapSize/2);
    }
}

var bird;   
var pipes = [];
var collided;
var timer;
// Initialize global variables here
function setup() {
    canvas = createCanvas(document.body.clientWidth, window.innerHeight);
    canvas.position(0, 0);
    canvas.class("p5canvas");

    bird = new Bird(width/2, height/2, 50);
    pipes.push(new Pipe(width, random(height/4, 3*height/4), 200));
    collided = false;
    timer = 0;
}

// Draw scene here  
function draw() {
    background(0, 255, 255);

    // for (var i = 0; i < pipes.length; i++) {
    for (let i = pipes.length-1; i >= 0; i--) {
        if (!collided) {
            pipes[i].update();
            if(pipes[i].collide(bird)) {
                collided = true;
            }
        }  
        pipes[i].display();
        if (pipes[i].x < -100) {
            pipes.splice(i, 1);
        }
    }
    
    timer ++;
    if (timer % 100 === 0) {
        pipes.push(new Pipe(width, random(height/4, 3*height/4), 200));
    }

    bird.update();
    bird.display();
}

function reset() {
    bird = new Bird(width/2, height/2, 50);
    pipes = [new Pipe(width, random(height/4, 3*height/4), 200)];
    collided = false;
    timer = 0;
}

function mousePressed() {
    if (!collided) {
        bird.flap();
    } else {
        reset();
    }
}

function keyPressed() {
    if (keyCode === 32 && !collided) {
        bird.flap();
    }
    if (collided) {
        reset();
    }
}

function windowResized() {
    resizeCanvas(document.body.clientWidth, window.innerHeight);
}