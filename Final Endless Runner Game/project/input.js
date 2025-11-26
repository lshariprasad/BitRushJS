// input.js
export class InputHandler {
  constructor() {
    this.keys = [];

    window.addEventListener("keydown", (e) => {
      const allowed = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", " "];
      if (allowed.includes(e.key) && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      }
    });

    window.addEventListener("keyup", (e) => {
      const idx = this.keys.indexOf(e.key);
      if (idx !== -1) this.keys.splice(idx, 1);
    });
  }
}
