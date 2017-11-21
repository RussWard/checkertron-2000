class Game {
  constructor() {
    this.activePlayer = '';
    this.board = '';
    this.renderBoard = this.renderBoard.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }
  startGame() {
    fetch('/game/new', {
      method: 'GET',
      mode: 'cors',
      headers: this.headers
    })
    .then(response => { return response.json() })
    .then(data => {
      this.activePlayer = data.activePlayer;
      this.board = data.board;
      this.renderBoard();
    })
  }

  handleMove(start, target) {
    let move = {
      start: [parseInt(start.split(',')[0]), parseInt(start.split(',')[1])],
      target: [parseInt(target.split(',')[0]), parseInt(target.split(',')[1])]
    }
    let board = {
      board: this.board,
      activePlayer: this.activePlayer
    }
    let body = { move, board };
    fetch('/game/move', {
      method: 'POST', 
      body: JSON.stringify(body),
      mode: 'cors',
      headers: this.headers
    })
    .then(response => { return response.json() })
    .then(data => {
      console.log(data)
      if (data === 'invalid move') {
        alert(data);
      } else {
        this.activePlayer = data.activePlayer;
        this.board = data.board;
        this.renderBoard();
      }
    })
  }

  renderBoard() {
    document.getElementById('row1').innerHTML = this.board[0];
    document.getElementById('row2').innerHTML = this.board[1];
    document.getElementById('row3').innerHTML = this.board[2];
    document.getElementById('row4').innerHTML = this.board[3];
    document.getElementById('row5').innerHTML = this.board[4];
    document.getElementById('row6').innerHTML = this.board[5];
    document.getElementById('row7').innerHTML = this.board[6];
    document.getElementById('row8').innerHTML = this.board[7];
  }

}

let game = new Game();
game.startGame();
