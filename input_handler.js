import {
  KEY_TO_INPUT_TYPE,
  INPUT_STATE_INITIAL,
  INPUT_STATE_CHARGING,
  INPUT_STATE_REPEATING,
  INPUT_REPEAT_THRESHOLD,
  INPUT_REPEAT_INTERVAL,
} from "./constants.js";

export class InputHandler {
  constructor() {
    this.inputs = {};
  }

  start() {
    const handleKeyEvent = (event, inputValue) => {
      if (event.repeat) {
        return;
      }

      const inputType = KEY_TO_INPUT_TYPE[event.key];
      if (inputType) {
        this.inputs[inputType] = inputValue;
      }
    };

    window.addEventListener("keydown", (e) =>
      handleKeyEvent(e, { state: INPUT_STATE_INITIAL, timer: 0 }),
    );
    window.addEventListener("keyup", (e) => handleKeyEvent(e, undefined));
  }

  // Verifica se uma ação deve ser executada neste exato frame
  isInputActive(inputType, dt) {
    const input = this.inputs[inputType];
    if (!input) {
      return false;
    }

    input.timer += dt;

    switch (input.state) {
      case INPUT_STATE_INITIAL:
        input.state = INPUT_STATE_CHARGING;
        return true;

      case INPUT_STATE_CHARGING:
        const isCharged = input.timer >= INPUT_REPEAT_THRESHOLD;
        if (isCharged) {
          input.state = INPUT_STATE_REPEATING;
          input.timer = 0;
        }
        return isCharged;

      case INPUT_STATE_REPEATING:
        const shouldRepeat = input.timer >= INPUT_REPEAT_INTERVAL;
        if (shouldRepeat) {
          input.timer = 0;
        }
        return shouldRepeat;
    }

    return false;
  }

  // Retorna o objeto puro do input (útil para checar comandos de 1 toque, como 'restart')
  get(inputType) {
    return this.inputs[inputType];
  }
}
