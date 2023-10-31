export { initializeGame };
import { hideElement, showElement } from './animation.js';

const initializeGame = (gameData) => {
  let clickMode = 0;
  
  const generateMines = () => {
    let indexListOfMine = [];
    while (indexListOfMine.length < countOfMine) {
      let index = Math.floor(Math.random() * 16);
      if (!indexListOfMine.includes(index)) {
        indexListOfMine.push(index);
      }
    }
    let coordinateListOfMines = indexListOfMine.map(x => [Math.floor(x / 4), x % 4]);
    return coordinateListOfMines;
  };

  const checkMine = (coordinateListOfMines, currentX, currentY) => {
    let isMine = 0;
    coordinateListOfMines.map(x => {
      if (x[0] == currentX && x[1] == currentY) {
        isMine = 1;
      }
    });
    return isMine;
  };

  const countSurroundingMines = (currentX, currentY) => {
    let surroundingMines = 0;
    for (let dx = -1; dx < 2; dx++) {
      for (let dy = -1; dy < 2; dy++) {
        let x = currentX + dx;
        let y = currentY + dy;
        coordinateListOfMines.map(i => {
          if (i[0] == x && i[1] == y) {
            surroundingMines++;
          }
        });
      }
    }
    return surroundingMines;
  };

  const searchForSurroundingEmptyMines = (selectedX, selectedY) => {
    for (let currentX = -1; currentX < 2; currentX++) {
      for (let currentY = -1; currentY < 2; currentY++) {
        let targetX = selectedX + currentX;
        let targetY = selectedY + currentY;
        let conditions = [
          targetX >= 0,
          targetX < gameData.columns,
          targetY >= 0,
          targetY < gameData.rows
        ];

        if (conditions.every(x => x == 1)) {
          console.log(targetX, targetY);
          let surroundingMines = countSurroundingMines(targetX, targetY);
  
          if (surroundingMines == 0) {
            let tile = document.querySelector(`#tile_${targetX}_${targetY}`);
            tile.textContent = surroundingMines;
            searchForSurroundingEmptyMines(currentX, currentY);
          }
        }
      }
    }
  }

  const terminateGame = async () => {
    await hideElement('#gameScreen', 1);
    await showElement('#mainScreen', 0);
  };
  
  document.querySelector('#gameBoard').innerHTML = '';
  let healthPoint, countOfMine = gameData.mines, countOfFlag = gameData.columns * gameData.rows - gameData.mines;
  
  if (gameData.difficulty == 0) {
    healthPoint = 4;
    document.querySelector('#difficulty').textContent = '簡單';
    
  } else if (difficulty == 1) {
    healthPoint = 2;
    document.querySelector('#difficulty').textContent = '困難';
    
  } else {
    healthPoint = 1;
    document.querySelector('#difficulty').textContent = '餓「死」';
  }
  document.querySelector('#remainingHealth').textContent = '❤️'.repeat(healthPoint);
  document.querySelector('#remainingMines').textContent = countOfMine;
  document.querySelector('#remainingFlags').textContent = countOfFlag;
  
  ['#mode_flag','#mode_mine'].map((x, i, a) => {
    if (i == clickMode) {
      document.querySelector(x).classList.add('selected');
    } else {
      document.querySelector(x).classList.remove('selected');
    }
    
    document.querySelector(x).onclick = () => {
      clickMode = i;
      document.querySelector(a[i]).classList.add('selected');
      document.querySelector(a[1 - i]).classList.remove('selected');
    };
  });
  
  let coordinateListOfMines = generateMines(countOfMine);
  console.log(coordinateListOfMines);
  for (let currentX = 0; currentX < gameData.rows; currentX++) {
    for (let currentY = 0; currentY < gameData.columns; currentY++) {
      let tile = document.createElement('span');
      tile.id = `tile_${currentX}_${currentY}`;
      tile.textContent = 'ㅤ';
      document.querySelector('#gameBoard').append(tile);

      tile.onclick = () => {
        if (!tile.classList.contains('boom')) {
          if (clickMode == 0) {
            if (!tile.classList.contains('flag')) {
              if (countOfFlag > 0) {
                tile.classList.add('flag');
                countOfFlag--;
              }
            } else {
              tile.classList.remove('flag');
              countOfFlag++;
            }
            document.querySelector('#remainingFlags').textContent = countOfFlag;
          } else {
            let isMine = checkMine(coordinateListOfMines, currentX, currentY);
            
            if (isMine && (healthPoint == 0 || countOfMine == 0)) {
              terminateGame();
            } else if (isMine) {
              healthPoint--;
              countOfMine--;
              
              document.querySelector('#remainingHealth').textContent = '❤️'.repeat(healthPoint);
              document.querySelector('#remainingMines').textContent = countOfMine;
              
              tile.classList.add('boom');
            } else {
              let surroundingMines = countSurroundingMines(currentX, currentY);
              tile.textContent = surroundingMines;

              if (surroundingMines == 0) {
                //searchForSurroundingEmptyMines(currentX, currentY);
              }
            }
          }
        }
      }
    }
  }
}