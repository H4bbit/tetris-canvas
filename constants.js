// constants.js

export const SHAPES = [
  // I
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  // J
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  // L
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  // O
  [
    [1, 1],
    [1, 1],
  ],
  // S
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  // T
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  // Z
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
];

export const SHAPE_COLORS = [
  '#00BCD4',
  '#485FE5',
  '#FF9800',
  '#FFEB3B',
  '#4CAF50',
  '#A629BC',
  '#F44336',
];

export const COLOR_SIDEBAR_BORDER = '#DDD';
export const COLOR_EMPTY_BLOCK = '#343434';
export const COLOR_GAME_OVER_OVERLAY = '#000000bb';
export const COLOR_FONT = '#FFF';

export const BLOCK_SIZE = 46;
export const BLOCK_BACKGROUND = '#292929';

export const GRAVITY_SPEED = 1;
export const GRAVITY_ACCELERATION = 0.00001;
export const GRAVITY_THRESHOLD = 1000;

export const GRID_COLS = 10;
export const GRID_ROWS = 20;

export const SIDEBAR_BORDER = 20;
export const SIDEBAR_WIDTH_BLOCKS = 6;

export const INPUT_REPEAT_THRESHOLD = 400;
export const INPUT_REPEAT_INTERVAL = 5;

export const MAX_DT = 100;

export const KEY_TO_INPUT_TYPE = {
  ArrowLeft: 'moveLeft',
  ArrowRight: 'moveRight',
  ArrowDown: 'moveDown',
  ArrowUp: 'rotate',
  ' ': 'hardDrop',
  r: 'restart',
};

// Computed constants
export const GRID_WIDTH = GRID_COLS * BLOCK_SIZE;
export const GRID_HEIGHT = GRID_ROWS * BLOCK_SIZE;

export const SIDEBAR_WIDTH = SIDEBAR_WIDTH_BLOCKS * BLOCK_SIZE;
export const SIDEBAR_CONTENT_X = GRID_WIDTH + SIDEBAR_BORDER + BLOCK_SIZE;
export const SIDEBAR_CONTENT_Y = BLOCK_SIZE;

export const CANVAS_WIDTH = GRID_WIDTH + SIDEBAR_BORDER + SIDEBAR_WIDTH;
export const CANVAS_HEIGHT = GRID_HEIGHT;

export const INPUT_STATE_INITIAL = 0;
export const INPUT_STATE_CHARGING = 1;
export const INPUT_STATE_REPEATING = 2;

export const BLOCK_EMPTY = -1;

