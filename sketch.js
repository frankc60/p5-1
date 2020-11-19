let m = [];
let dr = true;

class Ecl {
  constructor(
    x = random(10, width - 10),
    y = random(10, height - 10),
    r = 20,
    d
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    //this.w = d;
    this.dr = true;
    this.step = 1;
    this.colour = "yellow";
    this.init = () => {
      console.log(this.x, this.y, this.r * 2, this.r * 2);
      Ecl.inst.push(this);
    };
    this.init();
  }

  static inst = [];

  draw() {
    let c = this.colour;
    fill(c);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    //console.log("instances " + Ecl.inst.length);
  }

  move() {
    //check dr(direction), either subtract step from current location or ADD step to current location
    this.dr ? (this.x = this.x - this.step) : (this.x = this.x + this.step);
  }

  edges() {
    //if current location less than the radius (left edge) OR greater than right edge then
    if (this.x < this.r / 2 || this.x > width - this.r / 2) {
      //reverse direction
      this.dr = !this.dr;
    }
  }

  checkcollision() {
    let a;
    //look array of each instance of object class
    for (let w = 0; w < Ecl.inst.length; w++) {
      //check it is not itself!
      if (this != Ecl.inst[w]) {
        //calc distance betwEen this instance center and the array instance center
        a = int(dist(this.x, this.y, Ecl.inst[w].x, Ecl.inst[w].y));
        //if distance < the radius of 2 circles then ctash detected!
        if (a < this.r * 2) {
          //console.log("crash! red " + a + ",r2=" + this.r * 2);
          //change colour
          this.colour = "red";
          Ecl.inst[w].colour = "red";
          this.draw();
          delete this;
        } else {
          this.colour = "yellow";
          Ecl.inst[w].colour = "yellow";
        }
      }
    }
  }
}

function setup() {
  createCanvas(400, 500);

  const howManyCircles = 10;

  for (let z = 0; z < howManyCircles; z++) {
    //define parameters for a new circle
    x = random(10, width - 10);
    y = random(10, height - 10);
    r = 20;

    c = false;
    //loop through all existing circles (already in m array[])
    for (let w = 0; w < m.length; w++) {
      //calc the distance betwwen the newly defined circle and the existing instance (dist between centre of circles)
      d = dist(x, y, m[w].x, m[w].y);

      //if they overlap
      if (d < r * 2) {
        console.log("crash!" + d);
        c = true;
      } else {
      }
    }
    //if no collision detected
    if (!c) {
      //push new object class to array.
      m.push(new Ecl(x, y, r));
    }
  }
}

function draw() {
  background(220);

  //dr == true ? (m = m - 1) : (m = m + 1);
  m.forEach((s, ndx) => {
    s.draw();
    s.edges();
    s.move();
    s.checkcollision();
  });
}
