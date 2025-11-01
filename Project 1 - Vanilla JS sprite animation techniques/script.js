let playerState = "idle";
const dropdown = document.getElementById("animation");
dropdown.addEventListener("change", function (e) {
  playerState = e.target.value;
});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
const spriteWidth = 575; // 6876px Width  - 6876 / 12rows = 573;
const spriteHeight = 523; // 5230px height - 5230 / 10 col = 523;

/* let frameX = 0;
let frameY = 0; */

let gameFrame = 0;
const StaggerFrames = 5;
const spriteAnimation = [];
const animationStates = [
  {
    name: "idle",
    frames: 7, // fixed typo: 'franes' → 'frames'
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    //  fixed typo: 'state.frame' → 'state.frames'
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimation[state.name] = frames;
});

console.log(spriteAnimation);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let position =
    Math.floor(gameFrame / StaggerFrames) %
    spriteAnimation[playerState].loc.length;

  let frameX = spriteWidth * position; //  fixed: correctly use stored x
  let frameY = spriteAnimation[playerState].loc[position].y; //  fixed: use correct y (no extra *spriteHeight)

  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );

  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
