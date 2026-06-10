import {
  BLOCK_SIZE,
  BLOCK_BACKGROUND,
  SHAPE_COLORS,
  BLOCK_EMPTY,
  COLOR_EMPTY_BLOCK,
  SHAPES,
  SIDEBAR_CONTENT_X,
  SIDEBAR_CONTENT_Y,
  COLOR_SIDEBAR_BORDER,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  COLOR_FONT,
  COLOR_GAME_OVER_OVERLAY,
  GRID_WIDTH,
  SIDEBAR_BORDER,
} from "./constants.js";

export class Renderer {
  constructor(canvasId) {
    const canvas = document.getElementById(canvasId);
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    canvas.style.visibility = "visible";
    this.ctx = canvas.getContext("2d");
  }

  drawBlock(color, x, y) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x + 1, y + 1, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
  }

  drawShape(shape, colorId, x, y) {
    const color = SHAPE_COLORS[colorId];

    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[0].length; j++) {
        if (shape[i][j]) {
          this.drawBlock(color, x + j * BLOCK_SIZE, y + i * BLOCK_SIZE);
        }
      }
    }
  }

  render(state) {
    const { grid, currentPiece, nextShapeId } = state;

    // Limpa a tela com o fundo padrão
    this.ctx.fillStyle = BLOCK_BACKGROUND;
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Desenha o Grid (Tabuleiro)
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        const shapeId = grid[i][j];
        const color =
          shapeId === BLOCK_EMPTY ? COLOR_EMPTY_BLOCK : SHAPE_COLORS[shapeId];
        this.drawBlock(color, j * BLOCK_SIZE, i * BLOCK_SIZE);
      }
    }

    // Desenha a peça atual caindo
    this.drawShape(
      currentPiece.shape,
      currentPiece.shapeId,
      currentPiece.position.x * BLOCK_SIZE,
      currentPiece.position.y * BLOCK_SIZE,
    );

    // Desenha a próxima peça no painel lateral
    this.drawShape(
      SHAPES[nextShapeId],
      nextShapeId,
      SIDEBAR_CONTENT_X,
      BLOCK_SIZE,
    );

    // Desenha a borda do painel lateral
    this.ctx.fillStyle = COLOR_SIDEBAR_BORDER;
    this.ctx.fillRect(GRID_WIDTH, 0, SIDEBAR_BORDER, CANVAS_HEIGHT);

    // Configuração do texto do Score
    this.ctx.font = "bold 32px monospace";
    this.ctx.fillStyle = COLOR_FONT;
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";

    const score = `${state.score}`.padStart(7, "0");
    this.ctx.fillText(
      "Score:",
      SIDEBAR_CONTENT_X,
      SIDEBAR_CONTENT_Y + BLOCK_SIZE * 5,
    );
    this.ctx.fillText(
      score,
      SIDEBAR_CONTENT_X,
      SIDEBAR_CONTENT_Y + BLOCK_SIZE * 6,
    );

    // Tela de Game Over
    if (state.isGameOver) {
      this.ctx.fillStyle = COLOR_GAME_OVER_OVERLAY;
      this.ctx.fillRect(0, 0, GRID_WIDTH, CANVAS_HEIGHT);

      this.ctx.fillStyle = COLOR_FONT;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText("Game over!", GRID_WIDTH / 2, CANVAS_HEIGHT / 2);
    }
  }
}
