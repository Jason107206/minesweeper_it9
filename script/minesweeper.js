export { initializeGame };
import { initalizeLanguage } from './language.js';
import { hideElement, showElement, fadeElement } from './animation.js';

const initializeGame = async (gameData, language) => {
  let clickMode = 1;
  let isConfirmedExit = 0;

  let healthPoint = 0;
  let countOfMine = gameData.mines;
  let countOfTile = gameData.columns * gameData.rows;
  let countOfFlag = countOfTile - gameData.mines;
  let flaggedTiles = [];
  let unrevealedMines = [];
  let countdownSeconds = gameData.secondsAllowed;

  let stringList = initalizeLanguage(language);
  
  const generateMines = () => {
    let indexOfMine = [];
    while (indexOfMine.length < countOfMine) {
      let randomIndex = Math.floor(Math.random() * gameData.columns * gameData.rows);
      if (!indexOfMine.includes(randomIndex)) {
        indexOfMine.push(randomIndex);
      }
    }
    let coordOfMines = indexOfMine.map(x => `${Math.floor(x / gameData.columns)}_${x % gameData.columns}`);
    return coordOfMines;
  };

  const checkMine = (coordOfMines, currentX, currentY) => {
    let isMine = 0;
    if (coordOfMines.includes(`${currentX}_${currentY}`)) {
      isMine = 1;
    }
    return isMine;
  };

  const getNearbyTiles = (initialX, initialY) => {
    return [
      [initialX - 1, initialY - 1],
      [initialX - 1, initialY],
      [initialX - 1, initialY + 1],
      [initialX, initialY - 1],
      [initialX, initialY + 1],
      [initialX + 1, initialY - 1],
      [initialX + 1, initialY],
      [initialX + 1, initialY + 1],
    ];
  }

  const countNearbyMines = (initialX, initialY) => {
    let nearbyMinesCount = 0;
    getNearbyTiles(initialX, initialY).map(x => {
      if (
        x[0] >= 0 && 
        x[0] < gameData.columns && 
        x[1] >= 0 && 
        x[1] < gameData.rows &&
        coordOfMines.includes(`${x[0]}_${x[1]}`)
      ) {
        nearbyMinesCount++;
      }
    });
  
    return nearbyMinesCount;
  };

  const filterNearbyEmptyTiles = (initialX, initialY) => {
    let emptyTiles = [];
    getNearbyTiles(initialX, initialY).map(x => {
      if (
        x[0] >= 0 && 
        x[0] < gameData.columns && 
        x[1] >= 0 && 
        x[1] < gameData.rows &&
        countNearbyMines(x[0], x[1]) == 0
      ) {
        emptyTiles.push(`${x[0]}_${x[1]}`);
      }
    });
  
    return emptyTiles;
  }

  const revealEmptyTiles = (initialX, initialY) => {
    let initialEmpty = filterNearbyEmptyTiles(initialX, initialY);
    let filteredEmpty = [];
  
    for (let i = 0; i < gameData.columns; i++) {
      initialEmpty.map(x => {
        let [targetX, targetY] = x.split('_');
        targetX = +targetX;
        targetY = +targetY;
        filteredEmpty.push(...filterNearbyEmptyTiles(targetX, targetY));
      });
      initialEmpty = [...new Set(filteredEmpty)];
    }

    initialEmpty.map(x => {
      let [targetX, targetY] = x.split('_');
      targetX = +targetX;
      targetY = +targetY;
      let tile = document.querySelector(`#tile_${targetX}_${targetY}`);
      if (gameData.difficulty == 2) {
        tile.style.backgroundImage = 'url(img/mind.png)';
      } else {
        tile.textContent = '0';
      }
      tile.classList.add('revealed');
      countOfTile--;
    });
  };

  const returnMenu = async (lastGameResult) => {
    if (typeof lastGameResult == 'object') {
      let lastGameStatus = `${stringList.lastGameResult} ${lastGameResult.isWon == 1 ? stringList.win : stringList.lost}`;
      document.querySelector('#lastGame').textContent = lastGameStatus;
    } else {
      document.querySelector('#lastGame').textContent = stringList.noLastGame;
    }

    await hideElement('#gameScreen', 1);
    await showElement('#mainScreen', 0);
    await fadeElement('#drawerOpen', 0, 1);
  }

  const terminateGame = async () => {
    clearInterval(countdown);
    
    let wronglyFlagged = 0;
    flaggedTiles.map(x => {
      if (!(coordOfMines.includes(x))) {
        healthPoint--;
        wronglyFlagged++;
      }
    });
    
    healthPoint -= unrevealedMines.length;
    setTimeout(async () => {
      if (healthPoint > 0) {
        alert(stringList.winMessage);
      } else {
        healthPoint = 0;
        alert(stringList.loseMessage);
      }

      let gameResult = {
        unrevealedMines: unrevealedMines.length,
        wronglyFlagged: wronglyFlagged,
        healthPoint: healthPoint,
        isWon: healthPoint > 0 ? '1' : '0'
      };

      localStorage.setItem('lastGameResult', JSON.stringify(gameResult));

      await returnMenu(gameResult);
    }, 1000);
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
    document.querySelector('#currentDifficulty').textContent = stringList.easy;
  } else if (gameData.difficulty == 1) {
    healthPoint = 2;
    document.querySelector('#currentDifficulty').textContent = stringList.hard;
  } else {
    healthPoint = 1;
    document.querySelector('#currentDifficulty').textContent = stringList.extreme;
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

  document.querySelector('#modeFlag').classList.remove('btn-selected');
  document.querySelector('#modeMine').classList.add('btn-selected');
  ['#modeFlag','#modeMine'].map((x, i, a) => {
    document.querySelector(x).onclick = () => {
      clickMode = i;
      document.querySelector(a[i]).classList.add('btn-selected');
      document.querySelector(a[1 - i]).classList.remove('btn-selected');
    };
  });
  
  let coordOfMines;
  coordOfMines = generateMines(gameData.mines);
  unrevealedMines = coordOfMines;
  
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
            if (coordOfMines.includes(`${currentX}_${currentY}`)) {
              unrevealedMines = unrevealedMines.filter(x => x != `${currentX}_${currentY}`);
            }
            flaggedTiles.push(`${currentX}_${currentY}`);
          } else {
            tile.classList.remove('flag');
            tile.textContent = 'ㅤ';
            countOfFlag++;
            countOfTile++;
            flaggedTiles = flaggedTiles.filter(x => x != `${currentX}_${currentY}`);
            if (`${currentX}_${currentY}` in coordOfMines) {
              unrevealedMines.push(`${currentX}_${currentY}`);
            }
          }
          document.querySelector('#remainingFlags').textContent = countOfFlag;
        } else {
          if (!tile.classList.contains('flag')) {
            tile.classList.add('revealed');
            countOfTile--;

            if (checkMine(coordOfMines, currentX, currentY) == 1) {
              healthPoint--;
              countOfMine--;
              unrevealedMines = unrevealedMines.filter(x => x != `${currentX}_${currentY}`);

              if (gameData.difficulty == 2) {
                tile.style.backgroundImage = 'url(img/boom.png)';
              } else {
                tile.textContent = '💥';
                tile.classList.add('boom');
              }
              
              document.querySelector('#remainingHealth').textContent = '❤️'.repeat(healthPoint);
              document.querySelector('#remainingMines').textContent = countOfMine;
            } else {
              let nearbyMinesCount = countNearbyMines(currentX, currentY);

              if (gameData.difficulty == 2) {
                tile.style.backgroundImage = 'url(img/mind.png)';
              } else {
                tile.textContent = nearbyMinesCount;
              }
              
              if (nearbyMinesCount == 0) {
                revealEmptyTiles(currentX, currentY);
              }
            }
          }
        }
      }

      if (
        healthPoint == 0 || 
        countOfMine == 0 || 
        countOfTile == 0 || 
        countOfFlag == 0
      ) {
        terminateGame();
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