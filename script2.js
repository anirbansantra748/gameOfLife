let grid;
let rows;
let cols;
let next;
let resolution = 20;
let reset = document.querySelector("#reset")
reset.addEventListener("click", () => {
    init();
})

function make2DArray(rows, cols) {
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function setup() {
    frameRate(14);
    let myCanvas = createCanvas(700, 400);
    myCanvas.parent('canvas-holder'); // This will append the canvas to the 'canvas-holder' div
    rows = height / resolution;
    cols = width / resolution;
    grid = make2DArray(rows, cols);
    next = make2DArray(rows, cols);

    init();
}


function draw() {
    background(12, 67, 28);
    // Print the grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            stroke(0);
            if (grid[i][j] == 1) {
                fill(255, 195, 0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let currState = grid[i][j];
            let neighbourCount = countNeighbors(i, j);
            if (currState == 0 && neighbourCount == 3) {
                next[i][j] = 1;
            } else if (currState == 1 && (neighbourCount < 2 || neighbourCount > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = currState;
            }
        }
    }
    // Swap grids
    let temp = grid;
    grid = next;
    next = temp;
}

function countNeighbors(x, y) {
    let totalNeighbour = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let c = (i + x + cols) % cols;
            let r = (j + y + rows) % rows;
            totalNeighbour += grid[c][r];
        }
    }
    totalNeighbour -= grid[x][y];
    return totalNeighbour;
}

function mousePressed() {
    init();
}


function init() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(Math.random() * 2);
        }
    }
}



setup();
