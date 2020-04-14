/* PART 1: Define Canvas and Scale every pieces */

// 1- Draw the game on the DOM element

const canvas = document.querySelector("#tetris");
const ctx = canvas.getContext("2d");

// 2- Scale everything (every pieces) 20 times bigger for width and height
ctx.scale(20, 20);

/* ctx.strokeRect(); */
/* ************************************************************************* */

/* PART 4: function createMatrix(w, h) */

function createMatrix(w, h) {
  // w: widht, h: height property

  const matrix = []; // define matrix as an empty array

  while (h--) {
    // while h is not equal zero so make decrease h = h-1 and create a loop

    matrix.push(new Array(w).fill(0)); // push new Array of leght width and fill it zero
    // create arrays with "0"
  }

  return matrix; // return the array
}

/* ************************************************************************* */

/* PART 5: function createPiece(type) : Create all type of pieces */

function createPiece(type) {
  // Create 7 pieces in a Matrix  (I,L,J,O,Z,S,T)
  if (type === "I") {
    // define "I" in a matrix. Piece size is related with Matrix size to make it longer or smaller
    return [
      // matrix is 4 x 4 = because it is easy to rotate 4 x 4
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ];
  } else if (type === "L") {
    return [
      [2, 0, 0],
      [2, 0, 0],
      [2, 2, 0]
    ];
  } else if (type === "J") {
    return [
      [0, 3, 0],
      [0, 3, 0],
      [3, 3, 0]
    ];
  } else if (type === "O") {
    return [
      [4, 4],
      [4, 4]
    ];
  } else if (type === "Z") {
    return [
      [0, 0, 0],
      [5, 5, 0],
      [0, 5, 5]
    ];
  } else if (type === "S") {
    return [
      [0, 0, 0],
      [0, 6, 6],
      [6, 6, 0]
    ];
  } else if (type === "T") {
    return [
      [0, 0, 0],
      [7, 7, 7],
      [0, 7, 0]
    ];
  }
  /*  switch (type) {
    case "I":
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ];
      break;
    case "L":
      [
        [2, 0, 0],
        [2, 0, 0],
        [2, 2, 0]
      ];
      break;
    case "J":
     
      break;
    case "O":
      
      break;
    case "Z":
     
      break;
    case "S":
      
      break;
    case "T":
      
      break; 
  } */
}

/* ************************************************************************* */

/* PART 2: function arenaSweep(): collect the row when whole line (row) is full */

function arenaSweep() {
  // collect the row when whole line (row) is full

  let rowCount = 1; // set initial rowCount for score

  // set a label named : outer
  outer: for (let y = arena.length - 1; y > 0; --y) {
    // iterate from bottom to up
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) {
        // it is not fully populated (filled)
        continue outer; // if it is not fully populated, iterate next one by using outer label
      }
    }

    // otherwise, remove that line from arena as below

    const row = arena.splice(y, 1)[0].fill(0); // index y, lenght 1, then immediately filled the zero. It means we will have empty row here!

    arena.unshift(row); // we will put it at the top of arena

    ++y; // since we removed the index y from the arena, we have to offset the y

    player.score += rowCount * 10; // Score will be 10 times bigger then rowCount
    rowCount *= 2; // for every row, we want to double the score we get
  }
}

/* ************************************************************************* */

/* PART 3: function collide(arena, player): Collision detection function */

function collide(arena, player) {
  // We want to have collision detection function

  const m = player.matrix; // player matrix
  const o = player.pos; // player position

  // const [m,o]=[player.matrix,player.pos];

  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      // we are iterating over the player here
      if (
        m[y][x] !== 0 && // y: row, x: column - if the player matrix index is not 0
        (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0 // if arena row (y) is exist
      ) {
        // then we can acces it's child : [x + o.x] column

        return true; // if both of the conditions are true, return true
      }
    }
  }
  return false; // otherwise, return false
}

/* ************************************************************************* */

/* PART 6: function drawMatrix(matrix, offset): Create Matrix for pieces */

function drawMatrix(matrix, offset) {
  // offset : This method returns the offset coordinates of the FIRST matched element. It returns an object with 2 properties; the top and left positions in pixels.
  //    https://www.w3schools.com/jquery/css_offset.asp

  /* 
    Example : To draw "T" piece

    const matrix =[]
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    */
  matrix.forEach((row, y) => {
    // To create the Tetris pieceses, select each y index in the row
    row.forEach((value, x) => {
      // iterate in the row; get out the value and x index
      if (value !== 0) {
        // in the game, "0" value will be nothing! if the value is not "0", then draw
        ctx.fillStyle = colors[value]; // set the color for item
        // use offset for top and left
        // colors array and index number : colors[value];

        ctx.fillRect(
          x + offset.x, // add new offset position to the previous one
          y + offset.y,
          1,
          1
        );

        // ofset: x index for left, y for the top and set the position for x and y
      }
    });
  });
}

/* ************************************************************************* */

/* PART 8: function merge(arena, player) : copy the values of the player into arena at correct position */

function merge(arena, player) {
  // This function merges arena and player variables
  // copy the values of the player into arena at correct position

  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        // if it is not zero
        arena[y + player.pos.y][x + player.pos.x] = value; // copy the values of the player into arena at correct position

        /* Example:
                  To see the position of piece in the game board as a matrix form, write below codes in console and see:
  
                  merge(arena,player);
                  console.log(arena);
                  */
      }
    });
  });
}

/* ************************************************************************* */

/* PART 9: function rotate(matrix, dir): Rotating Matrix */

function rotate(matrix, dir) {
  // rotate = matrix transpose + reverse
  // Matrix transpose : https://en.wikipedia.org/wiki/Transpose

  /*Example :
      Transpose : Convert all rows into columns
      Reverse : Change column 1 as a column 3, same for column 3 => 1
  
                      1 2 3                1 4 7                7 4 1 
     Normal Matrix:   4 5 6 = Transpose => 2 5 8  = Reverse =>  8 5 2 
                      7 8 9                3 6 9                9 6 3 
      
      */
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      /* Example:
              [a,b] = [b,a] 
              */

      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }

  if (dir > 0) {
    // if dir is positive
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
}

/* ************************************************************************* */

/* PART 12: function playerReset() : to make the game randomize, to get all pieces as a randomly */

function playerReset() {
  // to make the game randomize, to get all pieces as a randomly, we need this function
  const pieces = "TJLOSZI"; // define the pieces letters as string into a variable
  // player matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.matrix = createPiece(pieces[(pieces.length * Math.random()) | 0]);

  player.pos.y = 0; // put the player at the top

  // game area matrix : arena

  player.pos.x = (arena[0].length / 2 - player.matrix[0].length / 2) | 0;

  if (collide(arena, player)) {
    // if the game area is full with pieces and there is no space for new one, collide arena and player

    arena.forEach(row => row.fill(0)); // clear the arena
    // remove everything from the arena

    player.score = 0; // set the player score zero
    updateScore();

    /* 
          Hint: Missing function call. Find the correct function and call here!
          */
  }
}

/* ************************************************************************* */

/* PART 10: function playerDrop() : drop pieces down function */

function playerDrop() {
  // drop pieces function

  player.pos.y++; // drop piece down manually

  if (collide(arena, player)) {
    // collide means we are touching the ground or piece

    player.pos.y--; // if there is collision, we need to back up previous position
    merge(arena, player); // merge arena and player
    playerReset();

    arenaSweep();

    updateScore();

    /* Example:
          player.pos.y = 0;// reset the player position to the top
          */

    /* 
          Hint: Call some functions here! Find them and call!!!
          */
  }

  dropCounter = 0; // we do not want any other piece while there is already a piece in game board
}

/* ************************************************************************* */

/* PART 11: function playerMove(offset) : Set the pieces move inside the game board */

function playerMove(offset) {
  player.pos.x += offset; // + means : piece (item) can not be out of the game area (board) on the left side
  if (collide(arena, player)) {
    player.pos.x -= offset; // - means : piece (item) can not be out of the game area (board) on the right side
  }
}

/* ************************************************************************* */

/* PART 13: function playerRotate(dir) : when you rotate the piece, it will be inside of the game board */

function playerRotate(dir) {
  // when you rotate the piece, it will be inside of the game board

  const pos = player.pos.x; // to reset the player position, we need to define variable. Then , use it below

  let offset = 1; // initialize the ofset value to make it appear

  rotate(player.matrix, dir); // to make the piece rotate (change direction), we need this

  while (collide(arena, player)) {
    // we need to check the collision in a loop. Because we don't want the piece out of the board while we are rotating

    player.pos.x += offset; // if we collide, we gonna move the player by ofset. This part is to move to the right. So we still collide. Therefore, we need below.
    offset = -(offset + (offset > 0 ? 1 : -1)); // To move to the left, set offset

    if (offset > player.matrix[0].length) {
      // we should stop the loop, if the ofset > player.matrix first row length

      rotate(player.matrix, -dir);

      player.pos.x = pos; // Reset the position
      return;
    }
  }
}

/* ************************************************************************* */

/* PART 7: function draw() : Define game background and area */

function draw() {
  // draw function will be used in update function because we want to draw the game continously

  // Paint the context
  ctx.fillStyle = "#000"; // Black
  ctx.fillRect(0, 0, canvas.width, canvas.height); // All width and height of the canvas background will be black
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
  // updateScore();
  drawMatrix(arena, { x: 0, y: 0 }); // if there is collision, reset the position to the top for new piece
  drawMatrix(player.matrix, player.pos); // draw the player and set the position

  /* 
    In the console, try different positions for player like:
    player.pos.x = 10; // See the new position on the page
    */
}

/* ************************************************************************* */

/* PART 15:function updateScore() : when we sweep the row, we want to change the score */

function updateScore() {
  // when we sweep the row, we want to change the score
  /* 
      Hint: Missing part! Write the correct codes here! 
      */
  document.querySelector("#score").innerText = player.score;
}

/* ************************************************************************* */

/* PART 17: const colors : define colors for each pieces */

const colors = [
  // define colors for each pieces
  null, // no color
  "#FF0D72", // color for piece index 1
  "#0DC2FF", // color for piece index 2
  "#0DFF72", // color for piece index 3
  "#F538FF", // color for piece index 4
  "#FF8E0D", // color for piece index 5
  "#FFE138", // color for piece index 6
  "#3877FF" // color for piece index 7
];

/* ************************************************************************* */

/* PART 14: function update(time = 0) : Update time */

let dropCounter = 0; // set initial dropCounter value

let dropInterval = 1000; // every 1 second a piece will drop down

let lastTime = 0; // to calculate the time differences, we need to define lastTime variable and initial as a "0"

function update(time = 0) {
  // set a time

  //console.log(time); // You can see the time in miliseconds in the console and incremental upload time

  const deltaTime = time - lastTime; // time difference between present and previous time. This is much better to track the time

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    /* Example:
        player.pos.y ++;
        dropCounter = 0; // now piece will drop every second
        */

    playerDrop();
  }

  lastTime = time; // update the lastTime as a time
  //console.log(deltaTime);

  draw(); // call the draw function to create the game continiously

  /* 
    Hint: Missing method! ??? method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. 

    Find the method and write the scrip here!
    */
  requestAnimationFrame(update);
}

/* ************************************************************************* */

/* PART 16: addEventListener('keydown', event) : These codes triggered everytime when we push the keyboard */

document.addEventListener("keydown", event => {
  // These codes triggered everytime when we push the keyboard

  //console.log(event); // event keyCode is important for us

  if (event.keyCode === 37) {
    // 37: ArrowLeft

    /* Example:
        player.pos.x --; // set the piece position to the left
         */

    /* 
        Press any key to see the keyCode
        http://pomle.github.io/keycode/     // copy the values of the player into arena at correct position
        */

    playerMove(-1); // -1 means : piece (item) can not be out of the game area (board)
  } else if (event.keyCode === 39) {
    /* Example:
        player.pos.x ++; // set the piec    // copy the values of the player into arena at correct positionosition to the right
         */

    playerMove(1); // -1 means : piece (item) can not be out of the game area (board)
  } else if (event.keyCode === 40) {
    /* Example:
        player.pos.y ++; // set the piece manual drop down
        dropCounter = 0; // we do not want any other piece while there is already a piece in game board
         */

    playerDrop();
  } else if (event.keyCode === 81) {
    // keyCode : q // this key and function will rotate the piece

    playerRotate(-1); // -1 means : piece (item) can not be out of the game area (board)
  } else if (event.keyCode === 87) {
    playerRotate(1); // -1 means : piece (item) can not be out of the game area (board)
  }
});

/* ************************************************************************* */

/* PART 18: const arena : Create a matrix with 12 numbers width and 20 numbers height */

const arena = createMatrix(12, 20); // Create a matrix with 12 numbers width and 20 numbers height
// Create the game board as a matrix

/* Example:
to see the matrix print below codes in console:

console.log(arena);
console.table(arena); // it will print as a table
*/

/* ************************************************************************* */

/* PART 19: const player : set default initial values for player */

const player = {
  // set default initial values for player
  pos: { x: 0, y: 0 }, // position for top and let
  matrix: null, // matrix for each pieces
  score: 0
};

/* ************************************************************************* */

/* PART 20: Call the functions */

/* 
Hint: Find the correct functions and call them here!
*/
playerReset();
updateScore();
update();
