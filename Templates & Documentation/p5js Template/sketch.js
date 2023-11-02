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
        this.vel = -20;
    }
}

class Pipe {
    constructor(x, yGap, gapSize) {
        this.x = x;
        this.yGap = yGap;
        this.gapSize = gapSize;
    }

    display() {
        fill(0,255,0);
        rect(this.x, height-this.yGap, 100, this.yGap);
        rect(this.x, 0, 100, this.yGap-this.gapSize);
    }
}

var bird;   
var pipes = [];
// Initialize global variables here
function setup() {
    canvas = createCanvas(document.body.clientWidth, window.innerHeight);
    canvas.position(0, 0);
    canvas.class("p5canvas");

    bird = new Bird(width/2, height/2, 50);
    pipes.push(new Pipe(3*width/4, height/2, 500));
    
}

// Draw scene here  
function draw() {
    background(0, 255, 255);
    bird.update();
    bird.display();

    for (var i = 0; i < pipes.length; i++) {
        pipes[i].display();
    }
}

function mousePressed() {
    bird.flap();
}

function keyPressed() {
    if (keyCode === 32) {
        bird.flap();
    }
}

function windowResized() {
    resizeCanvas(document.body.clientWidth, window.innerHeight);
}