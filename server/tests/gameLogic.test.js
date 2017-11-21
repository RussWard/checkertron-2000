
const { 
  makeMove,
  startBoard,
  redDisk,
  redSquare, 
  blackDisk, 
  blackSquare, 
  validateMove, 
  validateDirection 
} = require('../gameLogic');

let testBoard = startBoard();

beforeEach(() => {
  testBoard = startBoard();
});

describe('game logic', () => {
  describe('startBoard', () => {
    it('returns a valid starting board', () => {
      let board = {
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

      expect(testBoard.board).toEqual(expect.arrayContaining(board.board));
      expect(testBoard.activePlayer.color).toBe('red');
    });
  });
   describe('makeMove', () => {

  });
  describe('validateMove', () => {
    describe('validateDirection', () => {
      it('checks that a move is in the allowed direction for that player', () => {
        let board = testBoard;
        let invalidMove = { start: [6, 0], target: [7, 1]};
        let validMove = { start: [6, 0], target: [5, 1]};
        
        expect(validateDirection(invalidMove, board)).toBe(false);
        expect(validateDirection(validMove, board)).toBe(true);
      });
    });
    it('checks that a move is valid', () => {
      let board = testBoard;
      let invalidMove = { start: [5, 0], target: [4, 2]};
      let validMove = { start: [5, 0], target: [4, 1]};

      expect(validateMove(validMove, board)).toBe(true);
    });
  });
  describe('makeMove', () => {
    it('returns a board updated with the given move', () => {
      let currentBoard = testBoard;
      let validMove = { start: [5, 0], target: [4, 1]};
      let newBoard = makeMove(validMove, currentBoard);

      expect(newBoard.board[validMove.target[0]][validMove.target[1]]).toEqual(redDisk);
    });
    it('updates the activePlayer', () => {
      let currentBoard = testBoard;
      let validMove = { start: [5, 0], target: [4, 1] };
      let newBoard = makeMove(validMove, currentBoard);

      expect(currentBoard.activePlayer.color).toBe('red');
      expect(newBoard.activePlayer.color).toBe('black');
    });
  });
});