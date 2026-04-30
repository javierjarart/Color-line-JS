const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 900;

ctx.lineWidth = 10;
const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient1.addColorStop(0.2, "pink");
gradient1.addColorStop(0.3, "red");
gradient1.addColorStop(0.4, "orange");
gradient1.addColorStop(0.5, "yellow");
gradient1.addColorStop(0.6, "green");
gradient1.addColorStop(0.7, "turquoise");
gradient1.addColorStop(0.8, "violet");

const gradient2 = ctx.createRadialGradient(canvas.width * 0.5,
     canvas.height * 0.5, 100, canvas.width * 0.5, 
     canvas.height * 0.5, 400);
gradient2.addColorStop(0.2, "cyan");
gradient2.addColorStop(0.3, "blue");

//canvas pattern

const patternImage = document.getElementById("imagenpatrones");
const pattern1 = ctx.createPattern(patternImage, "no-repeat");


ctx.strokeStyle = pattern1;

class Line {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.history = [{ x: this.x, y: this.y }];
    this.lineWidth = Math.floor(Math.random() * 15 + 1);
    this.hue = Math.floor(Math.random() * 360);
    this.maxLength = Math.floor(Math.random() * 150 + 10);
    this.speedx = Math.random() * 10 - 5;
    this.speedy = 15;
    this.lifespan = this.maxLength * 10;
    this.timer = 0; 
  }
  draw(context) {
    //context.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 0; i < this.history.length; i++) {
      context.lineTo(this.history[i].x, this.history[i].y);
    }
    context.stroke();
  }
  update() {
    this.timer++;
    if (this.timer < this.lifespan) {
      // La línea se mueve mientras el timer sea menor al lifespan
      this.x += this.speedx + Math.random() * 10 - 5;
      this.y += this.speedy + Math.random() * 10 - 5;
      this.history.push({ x: this.x, y: this.y });
      
      // Controlamos el largo de la estela con la propiedad correcta
      if (this.history.length > this.maxLength) {
        this.history.shift();
      }
    } else {
      // Una vez agotado el tiempo, reseteamos
      this.reset();
    }
  }
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.history = [{ x: this.x, y: this.y }];
    this.timer = 0;
  };
}

const linesArray = [];
const numberOfLines = 200;

for (let i = 0; i < numberOfLines; i++) {
  linesArray.push(new Line(canvas));
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  linesArray.forEach((line) => {
    line.draw(ctx);
    line.update();
  });

  requestAnimationFrame(animate);
}
animate();

console.log(linesArray);
