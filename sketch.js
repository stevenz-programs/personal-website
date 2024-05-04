let scl = 30;
let cols;
let rows;
let inc = 0.04; // increment value for perlin noise
let fr; // frame rate for display
let zoff = 0;
let particles = [];
let flowfield;
let numParticles;
let drawMode = "Coloured Web";
let startTime;


function setup() {
  // createCanvas(600, 400);
  document.querySelector('.text').classList.add('fade-in');
  createCanvas(windowWidth, windowHeight);

  ff = createGraphics(windowWidth, windowHeight); // for displaying flow field

  cols = floor(width / scl);
  rows = floor(height / scl);
  numParticles = cols * rows*25;
  seedParticles(numParticles);
  flowfield = new Array(cols * rows);
  background(0);
  startTime = millis();
}

function seedParticles(num) {
  particles = [];
  for (let i = 0; i < num; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
    if (millis() - startTime < 5500){
        //console.log(millis() - startTime);
        let yoff = 0;
        for (let y = 0; y < rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
                let index = x + y * cols;
                let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
                let v = p5.Vector.fromAngle(angle);
                v.setMag(2.75);
                flowfield[index] = v;
                xoff += inc;
                
            }
            yoff += inc;
        }
        // zoff += 0.001;

        for (let i = 0; i < particles.length; i++) {
            particles[i].follow(flowfield);
            particles[i].update();
            particles[i].edges();
            //console.log(particles[i].type);
         
            particles[i].show();
        }

    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    cols = floor(width / scl);
    rows = floor(height / scl);
    ff = createGraphics(windowWidth, windowHeight);
    flowfield = new Array(cols * rows);
    startTime = millis();
    particles = [];
    //console.log(cols * rows);
    numParticles = cols * rows*25;
    seedParticles(numParticles);
  }