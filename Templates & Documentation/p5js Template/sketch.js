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

    update() {
        this.x -= 5;
    }

    collide(player) {
        let radius = player.size/2;
        if (player.x+radius >= this.x && player.x-radius <= this.x+100 && 
            (player.y+radius >= height-(this.yGap-this.gapSize/2) || player.y-radius <= this.yGap-this.gapSize/2)) {
            print(true);
        }
    }

    display() {
        fill(0,255,0);
        rect(this.x, height-(this.yGap-this.gapSize/2), 100, this.yGap);
        rect(this.x, 0, 100, this.yGap-this.gapSize/2);
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
    pipes.push(new Pipe(3*width/4, height/2, 200));
    
}

// Draw scene here  
function draw() {
    background(0, 255, 255);
    bird.update();
    bird.display();

    for (var i = 0; i < pipes.length; i++) {
        pipes[i].update();  
        pipes[i].display();
        pipes[i].collide(bird);
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