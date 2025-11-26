// main.js
import { InputHandler } from "./input.js";
import { Player } from "./player.js";
import { Background } from "./background.js";
import { createEnemy } from "./enemies.js";
import { UI } from "./UI.js";
import { Dust } from "./particles.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

function resizeCanvasToDisplaySize() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const targetWidth = Math.min(1200, rect.width) * dpr;
  const targetHeight = 500 * dpr;
  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }
  return { w: canvas.width, h: canvas.height };
}

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.groundMargin = 8;
    this.speed = 0;
    this.maxSpeed = 3;
    this.debug = false;
    this.score = 0;

    this.input = new InputHandler();
    this.player = new Player(this);
    this.background = new Background(this);
    this.ui = new UI(this);

    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1500; // ms

    this.particles = [];
  }

  update(deltaTime) {
    this.background.update(deltaTime);
    this.player.update(this.input.keys, deltaTime);

    // spawn enemies
    this.enemyTimer += deltaTime;
    if (this.enemyTimer > this.enemyInterval) {
      this.enemies.push(createEnemy(this));
      this.enemyTimer = 0;
    }
    this.enemies.forEach((enemy) => enemy.update(deltaTime));
    this.enemies = this.enemies.filter((e) => !e.markedForDeletion);

    // particles
    this.particles.forEach((p) => p.update());
    this.particles = this.particles.filter((p) => !p.markedForDeletion);
  }

  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.particles.forEach((p) => p.draw(context));
    this.ui.draw(context);
  }
}

let lastTime = 0;
let game;

function init() {
  const size = resizeCanvasToDisplaySize();
  game = new Game(size.w, size.h);

  // wire debug toggle from console (optional)
  // example: open console and set game.debug = true;

  // ensure player initial y
  game.player.y = game.height - game.player.height - game.groundMargin;
  requestAnimationFrame(animate);
}

function animate(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  const size = resizeCanvasToDisplaySize();
  if (game && (game.width !== size.w || game.height !== size.h)) {
    game.width = size.w;
    game.height = size.h;
    game.player.y = game.height - game.player.height - game.groundMargin;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(animate);
}

window.addEventListener("load", init);
window.addEventListener("resize", () => {
  if (game) {
    const size = resizeCanvasToDisplaySize();
    game.width = size.w;
    game.height = size.h;
    game.player.y = game.height - game.player.height - game.groundMargin;
  }
});
