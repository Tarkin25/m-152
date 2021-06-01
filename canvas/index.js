const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

const X_MIN = 0;
const X_MAX = canvas.width;
const Y_MIN = 0;
const Y_MAX = canvas.height;
const SPEED_MAX = 3;
const RADIUS_MIN = 5;
const RADIUS_MAX = 50;

context.fillStyle = "black";
context.fillRect(X_MIN, Y_MIN, X_MAX, Y_MIN);

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

class Color {
  static random() {
    return new Color({
      r: randomInRange(0, 255),
      g: randomInRange(0, 255),
      b: randomInRange(0, 255),
      a: Math.random(),
    });
  }

  constructor({ r, g, b, a }) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}

class Bubble {
  static TWO_PI = 2 * Math.PI;

  static random() {
    const radius = randomInRange(RADIUS_MIN, RADIUS_MAX);

    return new Bubble({
      radius,
      x: randomInRange(X_MIN + radius, X_MAX - radius),
      y: randomInRange(Y_MIN + radius, Y_MAX - radius),
      speedX: randomInRange(-SPEED_MAX, SPEED_MAX),
      speedY: randomInRange(-SPEED_MAX, SPEED_MAX),
      color: Color.random(),
    });
  }

  constructor({ radius, x, y, speedX, speedY, color }) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  draw() {
    context.fillStyle = this.color.toString();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Bubble.TWO_PI);
    context.fill();
  }

  tick() {
    if (this.x >= X_MAX - this.radius) {
      this.speedX = randomInRange(-SPEED_MAX, 0);
    } else if (this.x <= X_MIN + this.radius) {
      this.speedX = randomInRange(0, SPEED_MAX);
    }

    if (this.y >= Y_MAX - this.radius) {
      this.speedY = randomInRange(-SPEED_MAX, 0);
    } else if (this.y <= Y_MIN + this.radius) {
      this.speedY = randomInRange(0, SPEED_MAX);
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }
}

const bubbles = Array(20).fill(undefined).map(Bubble.random);

function draw() {
    context.clearRect(X_MIN, Y_MIN, X_MAX, Y_MAX);
  context.fillStyle = "#191d29";
  context.fillRect(X_MIN, Y_MIN, X_MAX, Y_MAX);
  bubbles.forEach((bubble) => bubble.draw());
}

function tick() {
  bubbles.forEach((bubble) => bubble.tick());
}

function loop() {
  tick();
  draw();

  requestAnimationFrame(loop);
}

draw();

loop();