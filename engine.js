import {
  SHAPES,
  BLOCK_EMPTY,
  GRAVITY_SPEED,
  GRAVITY_ACCELERATION,
  GRAVITY_THRESHOLD,
  GRID_COLS,
  GRID_ROWS,
} from "./constants.js";

export class TetrisEngine {
  constructor() {
    this.resetGameState();
  }

  getRandomIndex(n) {
    return Math.floor(Math.random() * n);
  }

  getRandomShapeId() {
    return this.getRandomIndex(SHAPES.length);
  }

  makeEmptyGrid() {
    return Array.from({ length: GRID_ROWS }, () =>
      Array(GRID_COLS).fill(BLOCK_EMPTY),
    );
  }

  createCurrentPiece(shapeId) {
    const shape = SHAPES[shapeId];
    return {
      shapeId,
      shape,
      position: {
        x: this.getRandomIndex(GRID_COLS - shape[0].length + 1),
        y: 0,
      },
    };
  }

  resetGameState() {
    this.isGameOver = false;
    this.score = 0;
    this.gravity = {
      progress: 0,
      speed: GRAVITY_SPEED,
    };
    this.nextShapeId = this.getRandomShapeId();
    this.currentPiece = this.createCurrentPiece(this.getRandomShapeId());
    this.grid = this.makeEmptyGrid();
  }

  canGridFitShape(shape, shapeX, shapeY) {
    return shape.every((row, i) => {
      const gridY = shapeY + i;

      return row.every((isSolid, j) => {
        if (!isSolid) return true;
        if (gridY >= this.grid.length) return false;
        const gridX = shapeX + j;
        if (gridX < 0 || gridX >= this.grid[0].length) return false;
        return this.grid[gridY][gridX] === BLOCK_EMPTY;
      });
    });
  }

  moveCurrentPiece(moveX, moveY) {
    const { shape, position } = this.currentPiece;
    const canMove = this.canGridFitShape(
      shape,
      position.x + moveX,
      position.y + moveY,
    );

    if (canMove) {
      position.x += moveX;
      position.y += moveY;
    }
    return canMove;
  }

  moveCurrentPieceDown() {
    this.gravity.progress = 0;
    const didMove = this.moveCurrentPiece(0, 1);

    if (!didMove) {
      this.handleCurrentPieceLanding();
    }
    return didMove;
  }

  attachToGrid() {
    const { shapeId, shape, position } = this.currentPiece;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[0].length; j++) {
        if (shape[i][j]) {
          this.grid[position.y + i][position.x + j] = shapeId;
        }
      }
    }
  }

  clearCompleteLines() {
    let clearedLines = 0;
    for (let i = this.grid.length - 1; i >= 0; i--) {
      if (this.grid[i].every((cell) => cell !== BLOCK_EMPTY)) {
        clearedLines++;
      } else if (clearedLines > 0) {
        this.grid[i + clearedLines] = [...this.grid[i]];
      }
    }

    for (let i = 0; i < clearedLines; i++) {
      this.grid[i].fill(BLOCK_EMPTY);
    }
    return clearedLines;
  }

  handleCurrentPieceLanding() {
    this.attachToGrid();
    const clearedLines = this.clearCompleteLines();
    this.score += clearedLines;

    const newPiece = this.createCurrentPiece(this.nextShapeId);
    if (
      this.canGridFitShape(
        newPiece.shape,
        newPiece.position.x,
        newPiece.position.y,
      )
    ) {
      this.currentPiece = newPiece;
      this.nextShapeId = this.getRandomShapeId();
    } else {
      this.isGameOver = true;
    }
  }

  rotate(shape) {
    return Array.from({ length: shape[0].length }, (_, i) =>
      Array.from(
        { length: shape.length },
        (_, j) => shape[shape.length - 1 - j][i],
      ),
    );
  }

  rotateCurrentPiece() {
    const { shape, position } = this.currentPiece;
    const newShape = this.rotate(shape);

    if (this.canGridFitShape(newShape, position.x, position.y)) {
      this.currentPiece.shape = newShape;
    }
  }

  updateGravity(dt) {
    this.gravity.speed += GRAVITY_ACCELERATION * dt;
    this.gravity.progress += this.gravity.speed * dt;

    if (this.gravity.progress >= GRAVITY_THRESHOLD) {
      this.moveCurrentPieceDown();
    }
  }

  update(inputHandler, dt) {
    if (this.isGameOver) {
      if (inputHandler.get("restart")) {
        this.resetGameState();
      }
      return;
    }

    if (inputHandler.isInputActive("moveLeft", dt))
      this.moveCurrentPiece(-1, 0);
    if (inputHandler.isInputActive("moveRight", dt))
      this.moveCurrentPiece(1, 0);
    if (inputHandler.isInputActive("rotate", dt)) this.rotateCurrentPiece();
    if (inputHandler.isInputActive("moveDown", dt)) this.moveCurrentPieceDown();
    if (inputHandler.isInputActive("hardDrop", dt)) {
      while (this.moveCurrentPieceDown()) {}
    }

    this.updateGravity(dt);
  }
  getState() {
    return {
      grid: this.grid,
      currentPiece: this.currentPiece,
      nextShapeId: this.nextShapeId,
      score: this.score,
      isGameOver: this.isGameOver,
    };
  }
}
