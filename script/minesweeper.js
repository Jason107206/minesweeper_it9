export { initializeGame };
import { initalizeLanguage } from './language.js';
import { hideElement, showElement, fadeElement } from './animation.js';

var stringList = initalizeLanguage(0);

const initializeGame = async (gameData, demo = 0) => {
  let clickMode = 1;
  let healthPoint = 0;
  let countOfMine = gameData.mines;
  let countOfTile = gameData.columns * gameData.rows;
  let countOfFlag = countOfTile - gameData.mines;
  let flaggedTiles = [];
  let unrevealedMines = [];
  let isConfirmedExit = 0;
  let countdownSeconds = 420;
  let gameResult = [];
  
  const generateMines = () => {
    let indexListOfMine = [];
    while (indexListOfMine.length < countOfMine) {
      let index = Math.floor(Math.random() * gameData.columns * gameData.rows);
      if (!indexListOfMine.includes(index)) {
        indexListOfMine.push(index);
      }
    }
    let coordinateListOfMines = indexListOfMine.map(x => `${Math.floor(x / gameData.columns)}_${x % gameData.columns}`);
    return coordinateListOfMines;
  };

  const checkMine = (coordinateListOfMines, currentX, currentY) => {
    let isMine = 0;
    if (coordinateListOfMines.includes(`${currentX}_${currentY}`)) {
      isMine = 1;
    }
    return isMine;
  };

  const countSurroundingMines = (initialX, initialY) => {
    let surroundingMines = 0;
    [
      [initialX - 1, initialY - 1],
      [initialX - 1, initialY],
      [initialX - 1, initialY + 1],
      [initialX, initialY - 1],
      [initialX, initialY + 1],
      [initialX + 1, initialY - 1],
      [initialX + 1, initialY],
      [initialX + 1, initialY + 1],
    ].map(x => {
      if (x[0] >= 0 && x[0] < gameData.columns && x[1] >= 0 && x[1] < gameData.rows) {
        if (coordinateListOfMines.includes(`${x[0]}_${x[1]}`)) {
          surroundingMines++;
        }
      }
    });
  
    return surroundingMines;
  };

  const filterSurroundingEmptyTiles = (initialX, initialY) => {
    let emptyTiles = [];
    [
      [initialX - 1, initialY - 1],
      [initialX - 1, initialY],
      [initialX - 1, initialY + 1],
      [initialX, initialY - 1],
      [initialX, initialY + 1],
      [initialX + 1, initialY - 1],
      [initialX + 1, initialY],
      [initialX + 1, initialY + 1],
    ].map(x => {
      if (x[0] >= 0 && x[0] < gameData.columns && x[1] >= 0 && x[1] < gameData.rows) {
        let surroundingMinesCount = countSurroundingMines(x[0], x[1]);
  
        if (surroundingMinesCount == 0) {
          let tile = document.querySelector(`#tile_${x[0]}_${x[1]}`);
          if (gameData.difficulty == 2) {
            tile.style.backgroundImage = 'url(img/mind.png)';
          } else {
            tile.textContent = surroundingMinesCount;
          }
          tile.classList.add('revealed');
          emptyTiles.push(`${x[0]}_${x[1]}`);
        }
      }
    });
  
    return emptyTiles;
  }

  const revealEmptyTiles = (initialX, initialY) => {
    let initialEmpty = filterSurroundingEmptyTiles(initialX, initialY);
    let filteredEmpty = [];
  
    for (let i = 0; i < gameData.columns; i++) {
      initialEmpty.map(x => {
        let [targetX, targetY] = x.split('_');
        targetX = +targetX;
        targetY = +targetY;
        filteredEmpty.push(...filterSurroundingEmptyTiles(targetX, targetY));
      });
      initialEmpty = [...new Set(filteredEmpty)];
    }
    if (initialEmpty.length > 0) {
      countOfTile -= initialEmpty.length - 1;
    }
  };

  const returnMenu = async () => {
    await hideElement('#gameScreen', 1);
    await showElement('#mainScreen', 0);
    await fadeElement('#drawerOpen', 0, 1);
  }

  const terminateGame = async () => {
    clearInterval(countdown);
    let isWon;
    
    let wronglyFlagged = 0;
    flaggedTiles.map(x => {
      if (!(coordinateListOfMines.includes(x))) {
        healthPoint--;
        wronglyFlagged++;
      }
    });
    healthPoint -= unrevealedMines.length;
    if (healthPoint > 0) {
      isWon = 0;
      alert('You won the game.');
    } else {
      isWon = 1;
      alert('You lose the game.');
    }

    gameResult = {
      unrevealedMines: unrevealedMines.length,
      wronglyFlagged: wronglyFlagged,
      healthPoint: healthPoint,
      isWon: isWon
    };
    
    await returnMenu();
  };

  document.querySelector('#gameBoard').innerHTML = '';
  document.querySelector('#gameBoard').style.gridTemplateColumns = `repeat(${gameData.columns}, auto)`;

  if (gameData.difficulty == 2) {
    document.querySelector('#background').style.backgroundImage = 'url("img/es_bg.jpeg")';
  } else {
    document.querySelector('#background').style.backgroundImage = 'url("img/bg.png")';
  }
  
  if (gameData.difficulty == 0) {
    healthPoint = 4;
    document.querySelector('#difficulty').textContent = '簡單';
  } else if (gameData.difficulty == 1) {
    healthPoint = 2;
    document.querySelector('#difficulty').textContent = '困難';
  } else {
    healthPoint = 1;
    document.querySelector('#difficulty').textContent = '餓「死」';
  }
  
  document.querySelector('#remainingHealth').textContent = '❤️'.repeat(healthPoint);
  document.querySelector('#remainingMines').textContent = countOfMine;
  document.querySelector('#remainingFlags').textContent = countOfFlag;

  fadeElement('#drawerOpen', 1, 0);
  document.querySelector('#exit').onclick = async () => {
    if (isConfirmedExit == 1) {
      clearInterval(countdown);
      await returnMenu();
      document.querySelector('#exit').textContent = stringList.leave;
    } else if (isConfirmedExit == 0) {
      isConfirmedExit = 1;
      document.querySelector('#exit').textContent = stringList.sure;
      document.querySelector('#exit').style.backgroundColor = 'rgb(253 230 138)';
      setTimeout(async () => {
        isConfirmedExit = 0;
        document.querySelector('#exit').textContent = stringList.leave;
        document.querySelector('#exit').style.backgroundColor = '';
      }, 3000);
    }
  };

  document.querySelector('#mode_flag').classList.remove('btn-selected');
  document.querySelector('#mode_mine').classList.add('btn-selected');
  ['#mode_flag','#mode_mine'].map((x, i, a) => {
    document.querySelector(x).onclick = () => {
      clickMode = i;
      document.querySelector(a[i]).classList.add('btn-selected');
      document.querySelector(a[1 - i]).classList.remove('btn-selected');
    };
  });
  
  let coordinateListOfMines;
  if (demo == 0) {
    coordinateListOfMines = generateMines(countOfMine);
  } else {
    coordinateListOfMines = ['0_0', '0_1'];
  }
  unrevealedMines = coordinateListOfMines;
  
  for (let currentIndex = 0; currentIndex < gameData.columns * gameData.rows; currentIndex++) {
    let currentX = (currentIndex / gameData.columns >> 0);
    let currentY = currentIndex % gameData.columns;
    let tile = document.createElement('span');
    tile.id = `tile_${currentX}_${currentY}`;
    tile.textContent = 'ㅤ';
    document.querySelector('#gameBoard').append(tile);
    tile.onclick = () => {
      if (!tile.classList.contains('revealed')) {
        if (clickMode == 0) {
          if (!(tile.classList.contains('flag'))) {
            tile.classList.add('flag');
            tile.textContent = '🚩';
            countOfFlag--;
            countOfTile--;
            if (coordinateListOfMines.includes(`${currentX}_${currentY}`)) {
              unrevealedMines = unrevealedMines.filter(x => x != `${currentX}_${currentY}`);
            }
            flaggedTiles.push(`${currentX}_${currentY}`);
            if (healthPoint == 0 || countOfMine == 0 || countOfTile == 0 || countOfFlag == 0) {
              let gameResult = terminateGame();
              return gameResult;
            }
          } else {
            tile.classList.remove('flag');
            tile.textContent = 'ㅤ';
            countOfFlag++;
            countOfTile++;
            flaggedTiles = flaggedTiles.filter(x => x != `${currentX}_${currentY}`);
            if (`${currentX}_${currentY}` in coordinateListOfMines) {
              unrevealedMines.push(`${currentX}_${currentY}`);
            }
          }
          document.querySelector('#remainingFlags').textContent = countOfFlag;
        } else {
          if (!tile.classList.contains('flag')) {
            tile.classList.add('revealed');
            let isMine = checkMine(coordinateListOfMines, currentX, currentY);
            countOfTile--;
            
            if (isMine) {
              healthPoint--;
              countOfMine--;
              if (gameData.difficulty == 2) {
                tile.style.backgroundImage = 'url(img/boom.png)';
              } else {
                tile.textContent = '💥';
                tile.classList.add('boom');
              }

              document.querySelector('#remainingHealth').textContent = '❤️'.repeat(healthPoint);
              document.querySelector('#remainingMines').textContent = countOfMine;
              
              if (healthPoint == 0 || countOfMine == 0 || countOfTile == 0 || countOfFlag == 0) {
                let gameResult = terminateGame();
                return gameResult;
              }
            } else {
              let surroundingMines = countSurroundingMines(currentX, currentY);
              if (gameData.difficulty == 2) {
                tile.style.backgroundImage = 'url(img/mind.png)';
              } else {
                tile.textContent = surroundingMines;
              }

              if (healthPoint == 0 || countOfMine == 0 || countOfTile == 0 || countOfFlag == 0) {
                let gameResult = terminateGame();
                return gameResult;
              }
              
              if (surroundingMines == 0) {
                revealEmptyTiles(currentX, currentY);
              }
            }
          }
        }
      }
    };
  }

  let countdown = setInterval(() => {
    countdownSeconds -= 1;
    document.querySelector('#timeRemaining').textContent = `${parseInt(countdownSeconds / 60, 10)}: ${parseInt(countdownSeconds % 60, 10)}`

    if (countdownSeconds == 0) {
      clearInterval(countdown);
      terminateGame();
      return gameResult;
    }
  }, 1000);
}