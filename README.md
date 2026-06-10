# Modular Canvas Tetris

A classic Tetris clone built entirely with Vanilla JavaScript and HTML5 Canvas, without the use of any external libraries or frameworks.

> **Note:** This project is a fork and an architectural expansion of the original codebase created by **Devowski** in the YouTube tutorial: ["Build Tetris in JavaScript"](https://youtu.be/gpx2d2_2EnE). 

While the original project was written as a single procedural script, this fork completely refactors the codebase into a modern, modular, and scalable architecture using ES Modules and Object-Oriented/Class-based patterns.

## 🏗️ Project Architecture

The codebase has been decoupled into distinct domains of responsibility, closely following Game Loop and Model-View patterns:

* **`main.js`**: The Entry Point. Initializes the game and runs the core Game Loop using `requestAnimationFrame`, strictly managing the delta time (`dt`).
* **`engine.js` (`TetrisEngine`)**: The "Brain" (Model). Contains zero visual logic. It manages all the math, matrix transformations, collision detection, score keeping, and gravity.
* **`renderer.js` (`Renderer`)**: The Visual Engine (View). Responsible for drawing the grid, shapes, UI elements, and colors onto the HTML5 Canvas based on the engine's state.
* **`input_handler.js` (`InputHandler`)**: The Controller. Manages keyboard event listeners, debouncing, and custom logic for key charging/repeating (e.g., holding an arrow key).
* **`constants.js`**: Centralized configuration file for grid sizes, colors, piece shapes, and gravity thresholds.

## 🚀 How to Run Locally

Since this project now uses modern ES Modules (`import` and `export`), opening the `index.html` file directly via the `file://` protocol in your browser will cause CORS errors. You need to serve it through a local web server.

**Option 1: Using VS Code (Recommended)**
1. Install the "Live Server" extension.
2. Right-click the `index.html` file and select **"Open with Live Server"**.

**Option 2: Using Python**
If you have Python installed, open your terminal in the project folder and run:
```bash
python -m http.server 8000
```

Then, navigate to http://localhost:8000 in your web browser.
  Option 3: Using Node.js (http-server)

``bash
npx http-server

``
## Controls
* Left / Right Arrow: Move the piece.
* Up Arrow: Rotate the piece clockwise.
* Down Arrow: Accelerate the piece dropping (Soft Drop).
* Spacebar: Hard Drop (instant drop to the bottom).
* R: Restart the game (when it's Game Over).
