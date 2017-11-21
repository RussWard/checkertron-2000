const game = require('./gameLogic.js');

const newGame = (req, res) => {
  res.send(200, game.startBoard());
}

const makeMove =(req, res) => {
  console.log('BOARD ====> ', req.body.board)
  console.log('MOVE =====> ', req.body.move)
  let move = req.body.move;
  let board = req.body.board;
  let data = JSON.stringify(game.makeMove(req.body.move, req.body.board))
  res.status(200);
  res.send(data);
}

module.exports = {
  makeMove,
  newGame,
}