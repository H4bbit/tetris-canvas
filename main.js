// main.js
import { Renderer } from "./renderer.js";
import { InputHandler } from "./input_handler.js";
import { TetrisEngine } from "./engine.js";
import { MAX_DT } from "./constants.js";

function main() {
  const renderer = new Renderer("game");
  const inputHandler = new InputHandler();
  const engine = new TetrisEngine();

  inputHandler.start();

  let previousTime = performance.now();

  function loop(currentTime) {
    const dt = Math.min(currentTime - previousTime, MAX_DT);
    previousTime = currentTime;

    engine.update(inputHandler, dt);
    renderer.render(engine.getState());

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

main();
