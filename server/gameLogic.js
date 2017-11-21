// return a starting board
//i: none
//o: a startboard
//c: ????
//e: ????

let redSquare = '<div class="square red"></div>';
let redDisk = '<div class="square black"><div class="disk red"></div></div>';
let blackSquare = '<div class="square black"></div>';
let blackDisk = '<div class="square black"><div class="disk black"></div></div>';

const startBoard = () => {
  return {
    board: [
      [redSquare, blackDisk, redSquare, blackDisk, redSquare, blackDisk, redSquare, blackDisk],
      [blackDisk, redSquare, blackDisk, redSquare, blackDisk, redSquare, blackDisk, redSquare],
      [redSquare, blackDisk, redSquare, blackDisk, redSquare, blackDisk, redSquare, blackDisk],
      [blackSquare, redSquare, blackSquare, redSquare, blackSquare, redSquare, blackSquare, redSquare],
      [redSquare, blackSquare, redSquare, blackSquare, redSquare, blackSquare, redSquare, blackSquare],
      [redDisk, redSquare, redDisk, redSquare, redDisk, redSquare, redDisk, redSquare],
      [redSquare, redDisk, redSquare, redDisk, redSquare, redDisk, redSquare, redDisk],
      [redDisk, redSquare, redDisk, redSquare, redDisk, redSquare, redDisk, redSquare],
    ],
    activePlayer: {
      color: 'red',
      type: 'normal',
    }
  }
}
  
//a function to make a move and return a new board
//i: a move({[start], [target]}) and an existing board { board, activePlayer }
//o: an updated board
//c: ?????
//e: an invalid move


const makeMove = (move, currentBoard) => {
  //check if move is valid
  if (!validateMove(move, currentBoard)) {
    return 'invalid move'
  }
  let currentDisk;
  let newBoard = {};
  newBoard.board = currentBoard.board.slice();
  newBoard.activePlayer = { type: 'normal' };
  
  if (currentBoard.activePlayer.color === 'red') {
    newBoard.activePlayer.color = 'black';
    currentDisk = redDisk;
  } else {
    newBoard.activePlayer.color = 'red';
    currentDisk = blackDisk;
  }
  //remove the disk from the start position and add to target position
  newBoard.board[move.start[0]][move.start[1]] = blackSquare;
  newBoard.board[move.target[0]][move.target[1]] = currentDisk;

  //if capturing move, remove captured piece
  if (move.start[0] - move.target[0] === 2)  {
    if (move.start[1] - move.target[1] === 2) {
      newBoard.board[move.target[0] + 1][move.target[1] + 1] = blackSquare;
    }
    if (move.start[1] - move.target[1] === - 2) {
      newBoard.board[move.target[0] + 1][move.target[1] - 1] = blackSquare;
    }
  }
  if (move.start[0] - move.target[0] === -2)  {
    if (move.start[1] - move.target[1] === 2) {
      newBoard.board[move.target[0] - 1][move.target[1] + 1] = blackSquare; 
    }
    if (move.start[1] - move.target[1] === - 2) {
      newBoard.board[move.target[0] - 1][move.target[1] - 1] = blackSquare;
    }
  }
  //return a new board
  return newBoard;
}
//sepparated so it can be removed for kings 
const validateDirection = (move, currentBoard) => {
  if (currentBoard.activePlayer.color === 'red') {
    if (move.start[0] <= move.target[0]) {
      return false;
    }
  }
  if (currentBoard.activePlayer.color === 'black') {
    if (move.start[0] >= move.target[0]) {
      return false;
    }
  } 
  return true;
}

const validateMove = (move, currentBoard) => {
  let otherPlayer;
  if (currentBoard.activePlayer.color === 'red') {
    otherPlayer = blackDisk;
  } else {
    otherPlayer = redDisk;
  }
  if (!validateDirection(move, currentBoard)) {
    return false;
  }
  if (currentBoard.board[move.target[0]][move.target[1]] !== blackSquare) {
    return false;
  }
  if (currentBoard.activePlayer.color === 'red') {
    if (currentBoard.board[move.start[0]][move.start[1]] !== redDisk) {
      return false;
    }
  }
  if (currentBoard.activePlayer.color === 'black') {
    if (currentBoard.board[move.start[0]][move.start[1]] !== blackDisk) {
      return false;
    }
  }
  if (Math.abs(move.start[0] - move.target[0]) !== 1 && Math.abs(move.start[0] - move.target[0]) !== 2) {
    return false;
  }
  if (Math.abs(move.start[1] - move.target[1]) !== 1 && Math.abs(move.start[1] - move.target[1]) !== 2) {
    return false;
  }
  if (move.start[0] - move.target[0] === 2)  {
    if (move.start[1] - move.target[1] === 2) {
      if (currentBoard.board[move.target[0] + 1][move.target[1] + 1] !== otherPlayer) {
        return false
      }
    }
    if (move.start[1] - move.target[1] === - 2) {
      if (currentBoard.board[move.target[0] + 1][move.target[1] - 1] !== otherPlayer) {
        return false
      }
    }
  }
  if (move.start[0] - move.target[0] === -2)  {
    if (move.start[1] - move.target[1] === 2) {
      if (currentBoard.board[move.target[0] - 1][move.target[1] + 1] !== otherPlayer) {
        return false
      }
    }
    if (move.start[1] - move.target[1] === - 2) {
      if (currentBoard.board[move.target[0] - 1][move.target[1] - 1] !== otherPlayer) {
        return false
      }
    }
  }
  return true;
}

module.exports ={
  makeMove,
  validateMove,
  validateDirection,
  redSquare,
  redDisk,
  blackSquare,
  blackDisk,
  startBoard,
}
