// Declare global variables here

// Initialize global variables here
var x, y, w, h;
function setup() {
    canvas = createCanvas(document.body.clientWidth, window.innerHeight);
    canvas.position(0, 0);
    canvas.class("p5canvas");

    x = width/2;
    y = height/2;
    w = 300;
    h = 300;
}

// Draw scene here
function draw() {
    background(255, 0, 0);
    if (x < width - w ) {
        x = x + 5;
    }
    y -= 1;
    // x ++;
    // x += 1;

    fill(0, 0, 0);
    stroke(255, 255, 0);
    strokeWeight(30);
    ellipse(x, y, w, h);

    // rect(x, y, w, h);
}

function windowResized() {
    resizeCanvas(document.body.clientWidth, window.innerHeight);
}