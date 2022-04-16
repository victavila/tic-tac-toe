let reset = 0;

const player = (mark, num) => {
  const marker = mark;
  const order = num;
  let positions = [];
  return { marker, order, positions };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const checkMark = (id) => {
    if (board[id] === "") {
      return true;
    }
  };
  const updateBoard = (id, mark) => {
    if (checkMark(id, mark)) {
      board[id] = mark;
    }
  };
  const checkWin = (playerPositions) => {
    const winningComb = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["0", "4", "8"],
      ["2", "4", "6"],
    ];
    let result;
    for (let i = 0; i < winningComb.length; i++) {
      result = winningComb[i].filter((item) => {
        return playerPositions.indexOf(item) > -1;
      });
      if (result.length === winningComb[i].length) {
        result = true;
        break;
      }
    }
    return result;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return {
    board,
    updateBoard,
    checkMark,
    checkWin,
    resetBoard,
  };
})();

const displayController = (() => {
  const boxes = document.querySelectorAll(".box");
  const result = document.querySelector(".result");
  const boardBoxes = Array.from(boxes);

  const updateDisplay = () => {
    for (let i = 0; i < boardBoxes.length; i++) {
      boardBoxes[i].textContent = gameBoard.board[i];
    }
  };

  const updateResult = (order, player1, player2) => {
    if (order === 1 && gameBoard.checkWin(player2.positions) === true) {
      result.textContent = "Player O wins";
      reset = 1;
    } else if (order === 2 && gameBoard.checkWin(player1.positions) === true) {
      result.textContent = "Player X wins";
      reset = 1;
    } else if (order === 1) {
      result.textContent = "Player X's turn";
    } else if (order === 2) {
      result.textContent = "Player O's turn";
    }
  };

  const resetResult = () => {
    result.textContent = "Player X's turn";
  };

  return { boxes, updateDisplay, updateResult, resetResult };
})();

const ticTacToe = (() => {
  const player1 = player("X", 1);
  const player2 = player("O", 2);

  const restartButton = document.querySelector(".restart");

  let order = 1;

  const playGame = () => {
    displayController.boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        if (reset === 0) {
          const id = e.target.dataset.id;
          gameBoard.updateBoard(id, playRound(id));
          displayController.updateDisplay();
          displayController.updateResult(order, player1, player2);
          console.log(player1.positions);
          console.log(player2.positions);
        }
      });
    });
  };

  const playRound = (id) => {
    if (order == 1 && gameBoard.checkMark(id)) {
      order = player2.order;
      player1.positions.push(id);
      return player1.marker;
    } else if (order == 2 && gameBoard.checkMark(id)) {
      order = player1.order;
      player2.positions.push(id);
      return player2.marker;
    }
  };

  const resetGame = () => {
    restartButton.addEventListener("click", () => {
      reset = 0;
      order = 1;
      gameBoard.resetBoard();
      displayController.resetResult();
      displayController.updateDisplay();
      player1.positions = [];
      player2.positions = [];
    });
  };

  return { playGame, resetGame };
})();

ticTacToe.playGame();
ticTacToe.resetGame();
