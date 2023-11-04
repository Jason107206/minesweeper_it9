export { initializeGame };
import { hideElement, showElement } from './animation.js';

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
        tile.textContent = surroundingMinesCount;
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
}

const initializeTiles = (gameData) => {
  for (let currentIndex = 0; currentIndex < gameData.columns * gameData.rows; currentIndex++) {
    let currentX = (currentIndex / gameData.columns >> 0);
    let currentY = currentIndex % gameData.columns;

    let tile = document.createElement('span');
    tile.id = `tile_${currentX}_${currentY}`;
    tile.textContent = 'ㅤ';
    document.querySelector('#gameBoard').append(tile);
  }
}

const terminateGame = async () => {
  await hideElement('#gameScreen', 1);
  await showElement('#mainScreen', 0);
};

const initializeGame = (gameData) => {
  let clickMode = 1;
  let healthPoint = 0;
  let countOfMine = gameData.mines;
  let countOfFlag = gameData.columns * gameData.rows - gameData.mines;

  document.querySelector('#gameBoard').innerHTML = '';
  document.querySelector('#gameBoard').style.gridTemplateColumns = `repeat(${gameData.columns}, auto)`;
  
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

  document.querySelector('#exit').onclick = async () => {
    terminateGame();
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
  
  //let coordinateListOfMines = generateMines(countOfMine);
  let coordinateListOfMines = ['0_0', '0_1'];
  initializeTiles(gameData);

  for (let currentIndex = 0; currentIndex < gameData.columns * gameData.rows; currentIndex++) {
    let currentX = (currentIndex / gameData.columns >> 0);
    let currentY = currentIndex % gameData.columns;
    document.createElement(`tile_${currentX}_${currentY}`).onclick = () => {
      if (!tile.classList.contains('revealed')) {
        if (clickMode == 0) {
          if (!tile.classList.contains('flag')) {
            tile.classList.add('flag');
            countOfFlag--;
            
            if (countOfFlag == 0) {
              terminateGame();
            }
          } else {
            tile.classList.remove('flag');
            countOfFlag++;
          }
          document.querySelector('#remainingFlags').textContent = countOfFlag;
        } else {
          tile.classList.add('revealed');
          let isMine = checkMine(coordinateListOfMines, currentX, currentY);
          
          if (isMine) {
            healthPoint--;
            countOfMine--;

            document.querySelector('#remainingHealth').textContent = '❤️'.repeat(healthPoint);
            document.querySelector('#remainingMines').textContent = countOfMine;
            tile.classList.add('boom');
            
            if (healthPoint == 0 || countOfMine == 0) {
              terminateGame();
            }
          } else {
            let surroundingMines = countSurroundingMines(currentX, currentY);
            tile.textContent = surroundingMines;
  
            if (surroundingMines == 0) {
              revealEmptyTiles(currentX, currentY);
            }
          }
        }
      }
    };
  }
}