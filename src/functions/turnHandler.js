export function turnHandler(lineIndex, lineItemIndex, timer, gameProps, setGameProps) {
  // Lets Reset Timer
  timer.reset();

  const x = lineItemIndex;
  const y = lineIndex;

  // Variables for score update
  let newScore1 = gameProps.score1;
  let newScore2 = gameProps.score2;

  // 1) Exit if clicked on already occupied item

  if (gameProps.playingArea[y][x] !== "e") {
    return;
  }

  // 2) Lets determine the lowest possible position in the column

  let yPossible = 0;

  if (y === gameProps.playingArea.length - 1) {
    yPossible = y;
  } else {
    for (let i = gameProps.playingArea.length - 1; i > -1; i--) {
      if (gameProps.playingArea[i][x] === "e") {
        yPossible = i;
        break;
      }
    }
  }

  // 3) lets make a turn via updating playingArea

  //! we need to clear ANIMATION mark first

  let newPlayingArea = gameProps.playingArea;

  if (gameProps.playerOneTurn) {
    newPlayingArea[yPossible][x] = "ra";
  } else {
    newPlayingArea[yPossible][x] = "ya";
  }

  // 4) Updating Player turn

  const newPlayerTurn = !gameProps.playerOneTurn;

  // lets check for a win

  // win 4 in the row

  winCheckRow();

  function winCheckRow() {
    console.log("ENTERED WIN ROW CHECK !!!!!!!!!!!!!");
    newPlayingArea.forEach((line, lineIndex) => {
      //
      let result = [];

      function checkRow(index) {
        if (result.length === 4) {
          return;
        }

        if (
          line[index] !== "e" &&
          !line[index].includes("w") &&
          line[index] === line[index + 1] &&
          !result.includes(index)
        ) {
          result.push(index);

          checkRow(index + 1);
        } else if (
          line[index] !== "e" &&
          !line[index].includes("w") &&
          line[index] === line[index - 1] &&
          !result.includes(index)
        ) {
          result.push(index);
        } else {
          result = [];
          return;
        }
      }
      //

      line.forEach((element, index) => {
        console.log("FOREACH", index);
        checkRow(index);
      });

      // Lets add "W" on matched 4 points
      if (result.length === 4) {
        result.forEach((position) => {
          newPlayingArea[lineIndex][position] += "w";
        });

        // Add score point to the current player
        if (gameProps.playerOneTurn) {
          newScore1 += 4;
        } else {
          newScore2 += 4;
        }
      }
    });
  }

  // win 4 in the column

  winCheckColumn();

  function winCheckColumn() {
    let result = [];
    newPlayingArea[0].forEach((x, index) => {
      console.log("Зашли в цикл, index===", index);
      let y = 0;

      while (y < newPlayingArea.length) {
        if (result.length === 4) {
          return;
        }

        // Если дошли до предела Y
        if (y === newPlayingArea.length - 1) {
          if (
            result.length === 3 &&
            newPlayingArea[y][index] !== "e" &&
            !newPlayingArea[y][index].includes("w") &&
            newPlayingArea[y][index] === newPlayingArea[y - 1][index]
          ) {
            result.push({ y: y, x: index });
            break;
          } else {
            result = [];
            break;
          }
        }

        // Основная сверка условий
        if (
          newPlayingArea[y][index] !== "e" &&
          !newPlayingArea[y][index].includes("w") &&
          newPlayingArea[y][index] === newPlayingArea[y + 1][index]
        ) {
          result.push({ y: y, x: index });
          console.log("result", result);
        } else if (
          result.length === 3 &&
          newPlayingArea[y][index] !== "e" &&
          newPlayingArea[y][index] === newPlayingArea[y - 1][index]
        ) {
          result.push({ y: y, x: index });
        } else {
          result = [];
        }

        y++;
      }
    });

    // Lets add "W" on matched 4 points
    if (result.length === 4) {
      result.forEach((item) => {
        newPlayingArea[item.y][item.x] += "w";
      });

      // Add score point to the current player
      if (gameProps.playerOneTurn) {
        newScore1 += 4;
      } else {
        newScore2 += 4;
      }
    }
  }

  // win 4 in the diagonal --- LEFT to RIGHT
  winCheckDiagonal_L();

  function winCheckDiagonal_L() {
    let result = [];
    //
    // Outer cycle
    newPlayingArea.forEach((itemY, y) => {
      const tempY = y;
      //
      // Inner cycle
      itemY.forEach((itemX, x) => {
        y = tempY;
        //
        // Inner WHILE

        while (y < newPlayingArea.length && x < newPlayingArea[0].length) {
          console.log("Зашли в WHILE", "y=", y, "x=", x);
          //
          // If we already found 4 in diagonal === exit

          if (result.length === 4) {
            return;
          }
          //
          // Если дошли до предела Y
          if (y === newPlayingArea.length - 1) {
            //
            // Y ENDED -- No one condition passed
            if (
              result.length === 3 &&
              newPlayingArea[y][x] !== "e" &&
              !newPlayingArea[y][x].includes("w") &&
              newPlayingArea[y][x] === newPlayingArea[y - 1][x - 1]
            ) {
              result.push({ y, x });
              break;
              //
              // Y ENDED -- No one condition passed
            } else {
              result = [];
              y = tempY;
              break;
            }
          }
          //
          // First check
          if (
            newPlayingArea[y][x] !== "e" &&
            !newPlayingArea[y][x].includes("w") &&
            newPlayingArea[y][x] === newPlayingArea[y + 1][x + 1]
          ) {
            console.log("Зашли в WHILE, ПЕРВОЕ условие", "y=", y, "x=", x);
            //
            result.push({ y, x });

            //
            // Second check
          } else if (
            result.length === 3 &&
            newPlayingArea[y][x] !== "e" &&
            !newPlayingArea[y][x].includes("w") &&
            newPlayingArea[y][x] === newPlayingArea[y - 1][x - 1]
          ) {
            console.log("Зашли в WHILE, ВТОРОЕ условие", "y=", y, "x=", x);
            result.push({ y, x });

            //
            // No one condition passed
          } else {
            console.log("Зашли в WHILE, ТРЕТЬЕ условие", "y=", y, "x=", x);
            //
            result = [];
          }

          y++;
          x++;
        }
      });
    });

    // Lets add "W" on matched 4 points
    if (result.length === 4) {
      result.forEach((item) => {
        newPlayingArea[item.y][item.x] += "w";
      });

      // Add score point to the current player
      if (gameProps.playerOneTurn) {
        newScore1 += 4;
      } else {
        newScore2 += 4;
      }
    }
  }

  // !!!!! win 4 in the diagonal --- RIGHT to LEFT -- ну тут я конечно наколхозил люто...но подругому этот алгоритм не взять :))

  // Делаем не привязанную копию массива
  let copyOfnewPlayingArea = JSON.parse(JSON.stringify(newPlayingArea));

  // Реверсируем массив, что б можно было применить функцию winCheckDiagonal_L -- которая сверяет слева направо
  copyOfnewPlayingArea.forEach((array) => {
    array.reverse();
  });

  winCheckDiagonal_R();

  function winCheckDiagonal_R() {
    let result = [];
    //
    // Outer cycle
    copyOfnewPlayingArea.forEach((itemY, y) => {
      console.log("Зашли в первый цикл", "y=", y);
      const tempY = y;
      //
      // Inner cycle
      itemY.forEach((itemX, x) => {
        console.log("Зашли во второй цикл", "x=", x);
        y = tempY;
        //
        // Inner WHILE

        while (y < copyOfnewPlayingArea.length && x < copyOfnewPlayingArea[0].length) {
          console.log("Зашли в WHILE", "y=", y, "x=", x);
          //
          // If we already found 4 in diagonal === exit

          if (result.length === 4) {
            return;
          }
          //
          // Если дошли до предела Y
          if (y === copyOfnewPlayingArea.length - 1) {
            //
            // Y ENDED -- No one condition passed
            if (
              result.length === 3 &&
              copyOfnewPlayingArea[y][x] !== "e" &&
              !copyOfnewPlayingArea[y][x].includes("w") &&
              copyOfnewPlayingArea[y][x] === copyOfnewPlayingArea[y - 1][x - 1]
            ) {
              result.push({ y, x });
              break;
              //
              // Y ENDED -- No one condition passed
            } else {
              //
              result = [];
              y = tempY;
              break;
            }
          }
          //
          // First check
          if (
            copyOfnewPlayingArea[y][x] !== "e" &&
            !copyOfnewPlayingArea[y][x].includes("w") &&
            copyOfnewPlayingArea[y][x] === copyOfnewPlayingArea[y + 1][x + 1]
          ) {
            //
            result.push({ y, x });
            console.log("RESULT", result);
            //
            // Second check
          } else if (
            result.length === 3 &&
            copyOfnewPlayingArea[y][x] !== "e" &&
            !copyOfnewPlayingArea[y][x].includes("w") &&
            copyOfnewPlayingArea[y][x] === copyOfnewPlayingArea[y - 1][x - 1]
          ) {
            result.push({ y, x });
            console.log("RESULT", result);
            //
            // No one condition passed
          } else {
            //
            result = [];
          }

          y++;
          x++;
        }
      });
    });

    // Lets add "W" on matched 4 points

    if (result.length === 4) {
      // Функция которая поменяет координаты Х т к мы реверсировали исходный массив

      function changeCoordinatesX(coordX) {
        const newMap = new Map([
          [6, 0],
          [5, 1],
          [4, 2],
          [3, 3],
          [2, 4],
          [1, 5],
          [0, 6],
        ]);

        return newMap.get(coordX);
      }

      // Обойдем обьект и поменяем координату X
      result.forEach((object) => {
        for (const key in object) {
          if (key === "x") {
            object.x = changeCoordinatesX(object.x);
          }
        }
      });

      result.forEach((item) => {
        newPlayingArea[item.y][item.x] += "w";
      });

      // Add score point to the current player
      if (gameProps.playerOneTurn) {
        newScore1 += 4;
      } else {
        newScore2 += 4;
      }
    }
  }

  // Lets check gameOver condition === no empty ("e") slots left

  const gameOverNew = newPlayingArea.flat(2).every((item) => item !== "e");

  // Updating State

  setGameProps({
    ...gameProps,
    playingArea: newPlayingArea,
    playerOneTurn: newPlayerTurn,
    score1: newScore1,
    score2: newScore2,
    gameOver: gameOverNew,
  });
}
