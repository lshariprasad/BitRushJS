/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);
const numberOfEnemies = 200;
const enemiesArray = [];
/* const enemy1 = {
  x: 10,
  y: 50,
  width: 100,
  height: 100,
}; */

/* const enemyImage = new Image();
enemyImage.src = "enemy1.png"; */

let gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy3.png";

    this.y = Math.random() * canvas.height;

    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.5 + 1.5;
    this.curve = Math.random() * 200 + 50;
  }
  update() {
    // Smooth circular / wavy movement
    this.x =
      (canvas.width / 2) * Math.sin((this.angle * Math.PI) / 90) +
      (canvas.width / 2 - this.width / 2);
    this.y =
      (canvas.height / 2) * Math.cos((this.angle * Math.PI) / 90) +
      (canvas.height / 2 - this.height / 2);
    this.angle += this.angleSpeed;

    // Animate sprite frames slowly
    if (gameFrame % this.flapSpeed === 0) {
      this.frame = (this.frame + 1) % 5;
    }
  }

  draw() {
    //ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
const enemy1 = new Enemy();
/* const enemy2 = new Enemy();
const enemy3 = new Enemy();

// Const enemy1 = new Enemy(); */
for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}
console.log(enemiesArray);
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  /*   //enemy1.update();

    enemy1.y++;
  enemy2.x += 0.5;
  enemy2.y += 0.5;
  enemy3.x += 2;
  enemy3.y += 2; 
  //enemy1.draw();

    ctx.fillRect(enemy2.x, enemy2.y, enemy2.width, enemy2.height);
  ctx.fillRect(enemy3.x, enemy3.y, enemy3.width, enemy3.height); */

  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
