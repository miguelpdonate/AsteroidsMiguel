let ship;
let asteroids = [];
let lasers = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();
    for (let index = 0; index < 5; index++) {
    asteroids.push(new Asteroid());
    }
}

function draw() {
    background(0);

    for (let index = 0; index < asteroids.length; index++) {
       if (ship.hits(asteroids[index])) {
        console.log("oops!");
       }
        
        asteroids[index].render();
        asteroids[index].update();
        asteroids[index].edges();
    }

    for (let index = lasers.length - 1; index >= 0; index--) {
        lasers[index].render();
        lasers[index].update();
        if (lasers[index].offscreen()) {
            lasers.splice(index, 1);
        } else {

            for (let indexAsteroids = asteroids.length-1; indexAsteroids >= 0; indexAsteroids--) {
                if (lasers[index].hits(asteroids[indexAsteroids])){
                    if(asteroids[indexAsteroids].r > 10) {
                        let newAsteroids = asteroids[indexAsteroids].breakup();
                        asteroids = asteroids.concat(newAsteroids);
                    }
                    asteroids.splice(indexAsteroids, 1);
                    lasers.splice(index, 1);
                    break;
                }
            }
        }
        console.log(lasers.length);
    }
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();

}


function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false);
}

function keyPressed() {
    if (key == " "){
        lasers.push(new Laser(ship.pos, ship.heading));
    } else if (keyCode == RIGHT_ARROW){
        ship.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW){
        ship.setRotation(-0.1);
    } else if (keyCode == UP_ARROW) {
        ship.boosting(true);
    }
}

