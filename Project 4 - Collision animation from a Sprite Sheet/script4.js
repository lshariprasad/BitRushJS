const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();
//console.log(canvasPosition);

class Explosions {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "boom.png";
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = "ice attack 2.wav";
  }
  update() {
    if (this.frame === 0) this.sound.play();
    this.timer++;
    if (this.timer % 10 === 0) {
      this.frame++;
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

window.addEventListener("click", function (e) {
  /*       let postitionX = e.x - canvasPosition.left - 25;
  let postitionY = e.y - canvasPosition.top - 25;
   console.log(e);
  ctx.fillStyle = "white";
  ctx.fillRect(postitionX, postitionY, 50, 50); 
  explosions.push(new Explosions(postitionX, postitionY));
  console.log(explosions);
  */
  createAimation(e);
});

/* window.addEventListener("mousemove", function (e) {
  createAimation(e);
}); */

// <-- only change: accept event parameter 'e' and refresh canvasPosition
function createAimation(e) {
  canvasPosition = canvas.getBoundingClientRect();
  let postitionX = e.x - canvasPosition.left - 25;
  let postitionY = e.y - canvasPosition.top - 25;
  /*   console.log(e);
  ctx.fillStyle = "white";
  ctx.fillRect(postitionX, postitionY, 50, 50); */
  explosions.push(new Explosions(postitionX, postitionY));
  console.log(explosions);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}
animate();
