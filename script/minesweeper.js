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

  const terminateGame = async () => {
    await hideElement('#gameScreen', 1);
    await showElement('#mainScreen', 0);
  };
  
  document.querySelector('#gameBoard').innerHTML = '';
  let healthPoint, countOfMine = gameData.mines;
  
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
  document.querySelector('#remainingMine').textContent = countOfMine;
  
  ['#mode_flag','#mode_mine'].map((x, i, a) => {
    if (i === clickMode) {
      document.querySelector(x).classList.add('selected');
    }
    
    document.querySelector(x).onclick = () => {
      clickMode = i;
      document.querySelector(a[i]).classList.add('selected');
      document.querySelector(a[1 - i]).classList.remove('selected');
    };
  });
  
  let coordinateListOfMines = generateMines(countOfMine);
  for (let i = 0; i < gameData.columns * gameData.rows; i++) {
    let tile = document.createElement('span');
    tile.textContent = 'ㅤ';
    document.querySelector('#gameBoard').append(tile);
    
    let currentX = Math.floor(i / 4);
    let currentY = i % 4;
    
    tile.onclick = () => {
      if (clickMode == 0) {
        if (!tile.classList.contains('flag')) {
          tile.classList.add('flag');
          let isMine = checkMine(coordinateListOfMines, currentX, currentY);
          if (isMine) {
            countOfMine--;
          }
        } else {
          tile.classList.remove('flag');
          let isMine = checkMine(coordinateListOfMines, currentX, currentY);
          if (isMine) {
            countOfMine++;
          }
        }
      } else {
        let isMine = checkMine(coordinateListOfMines, currentX, currentY);

        if (isMine && healthPoint == 0 && countOfMine == 0) {
          terminateGame();
        } else if (isMine) {
          healthPoint--;
          countOfMine--;
          
          document.querySelector('#remainingHealth').textContent = '❤️'.repeat(healthPoint);
          document.querySelector('#remainingMine').textContent = countOfMine;
          
          tile.classList.add('boom');
        } else {
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
          tile.textContent = surroundingMines;
        }
      }
    };
  }
}