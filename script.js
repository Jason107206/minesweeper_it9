var language = 0;
var stringList;
var initialData = {
  rows: 4,
  columns: 4,
  difficulty: 0,
  healthPoint: 4,
  mines: 4,
  secondsAllowed: 420
};

if (localStorage.getItem('difficulty') !== null) {
  initialData.difficulty = localStorage.getItem('difficulty');
  initialData.mines = difficulty == 2 ? 2 : 4;
  initialData.healthPoint = difficulty == 0 ? 4 : difficulty == 1 ? 2 : 1;
}

var lastGameResult = [];
if (localStorage.getItem('lastGameResult') !== null) {
  lastGameResult = JSON.parse(localStorage.getItem('lastGameResult'));
}

const hideElement = async (e, d, t = 800, w = 0) => {
  document.querySelector(e).animate(d === 0 ? {
    opacity: [1, 0],
    transform: ['translateX(0%)', 'translateX(-100%)'],
    easing: ['ease-in', 'ease-out']
  }
  : {
    opacity: [1, 0],
    transform: ['translateX(0%)', 'translateX(100%)'],
    easing: ['ease-in', 'ease-out']
  }, 
  {
    duration: t,
    iterations: 1,
  });
  await new Promise(r => setTimeout(r, t));
  document.querySelector(e).style.opacity = 0;
  await new Promise(r => setTimeout(r, w));
  document.querySelector(e).hidden = 1;
  document.querySelector(e).style.opacity = 1;
};

const showElement = async (e, d, t = 800) => {
  document.querySelector(e).hidden = 0;
  document.querySelector(e).animate(d === 0 ? {
    opacity: [0, 1],
    transform: ['translateX(100%)', 'translateX(0%)'],
    easing: ['ease-out', 'ease-in']
  }
  : {
    opacity: [0, 1],
    transform: ['translateX(-100%)', 'translateX(0%)'],
    easing: ['ease-out', 'ease-in']
  }, 
  {
    duration: t,
    iterations: 1,
  });
  await new Promise(r => setTimeout(r, t));
};

const fadeElement = async (e, fs, fe, t = 800, w = 0) => {
  if (fs === 0) {
    document.querySelector(e).hidden = 0;
  }
  document.querySelector(e).animate({
    opacity: [fs, fe],
    easing: ['ease-out', 'ease-in']
  }, 
  {
    duration: t,
    iterations: 1,
  });
  await new Promise(r => setTimeout(r, t));
  if (fe === 0) {
    document.querySelector(e).style.opacity = 0;
    await new Promise(r => setTimeout(r, w));
    document.querySelector(e).hidden = 1;
    document.querySelector(e).style.opacity = fs;
  }
};

const stringList_tc = {
  appName: '踩地雷',
  gameplay: '遊戲',
  settings: '設定',
  aboutUs: '關於',

  leave: '退出',
  sure: '確定？',

  lastGameResult: '上次遊戲：',
  win: '勝利',
  lost: '落敗',
  noLastGame: '請開始遊戲',

  difficulty: '遊戲難度',
  easy: '簡單',
  hard: '困難',
  extreme: '餓「死」',

  howToPlay: '玩法',
  howToPlayContent: [
    '遊戲開局時，棋盤中散佈著一些隱藏的地雷，你需要在不踏上地雷之下翻開格子。',
    '在某格標記旗幟 ＝ 在這格認為地雷之下',
    '點開小方塊後會顯示一個數字（代表著以它為中心的九宮格內藏著幾顆地雷）/【餓死版本】圖則為注意附近有雷',
    '只要點到地雷就會扣減一顆紅心',
    '沒有地雷剩下、沒有生命值剩下、沒有旗子剩下、沒有空格剩下的話，遊戲即告完結。'
  ],

  developer: '開發人員資訊',
  developerRoles: [
    '隊長',
    '介面設計',
    '演算法設計'
  ],
  developerNames: [
    '馬天禮',
    '曹雪',
    '陳文軒'
  ],
  developerSchools: [
    '東華三院盧幹庭紀念中學',
    '青年會書院',
    '五旬節聖潔會永光書院'
  ],
  
  copyright: '版權資訊',
  copyrightContent: [
    '餓死難度爲偶像夢幻祭的同人遊戲，僅供玩樂。若有侵犯版權請與我們聯絡。',
    '遊戲中圖片取自 偶像夢幻祭官方 Line 貼圖組。',
    '遊戲音效取自以下 Bilibili 影片。'
  ],

  startGame: '開新遊戲',
  resumeGame: '繼續遊戲',

  timeLeft: '時間尚餘:',
  exit: '退出',
  
  previous: '前一個',
  next: '下一個',
  modeFlag: '🚩 插旗',
  modeMine: '💣 踩彈',

  loseMessage: '抱歉，你輸了。',
  winMessage: '恭喜，你贏了。'
};

const stringList_en = {
  appName: 'Minesweeper',
  gameplay: 'Gameplay',
  settings: 'Settings',
  aboutUs: 'About Us',

  leave: 'Leave',
  sure: 'Sure?',

  lastGameResult: 'Last Game:',
  win: 'Won',
  lost: 'Lost',
  noLastGame: 'Please start a game',

  difficulty: 'Difficulty',
  easy: 'Easy',
  hard: 'Hard',
  extreme: 'Ensemble Stars!',
  
  howToPlay: 'How To Play',
  howToPlayContent: [
    'When the game start, scattered mines are hidden under tiles on the board. You need to reveal all the tiles without stepping on the mines.',
    'Marking flag on tile = Considering a mine is under the tile',
    'If the tile contains no mine, a number representing numbers of mines of nearby 8 tiles appear after revealing it. In "Ensemble Stars!" mode, only a figure will be shown.',
    '1 health point will be deducted while stepping on a mine.',
    'The game ends while there are no mines, no health points, no flags nor empty tiles left.'
  ],

  developer: 'Developers',
  developerRoles: [
    'Leader',
    'UI designer',
    'Algorithm designer'
  ],
  developerNames: [
    'Ma Tin Lai, Jason',
    'Cho Suet, Yuki',
    'Chan Man Hin, Lucas'
  ],
  developerSchools: [
    'Tung Wah Group of Hospitals Lo Kon Ting Memorial College',
    'Chinese YMCA College',
    'P.H.C. Wing Kwong College'
  ],
  
  copyright: 'Copyright Information',
  copyrightContent: [
    'The extreme mode is a fan art of "Ensemble Stars!" game and is for entertainment purpose only. Please do not hesitate to contact us if the game content infringes copyright.',
    'In-game images are from the official Line sticker sets of Ensemble Stars!.',
    'In-game sound effects are from the Bilibili video below.'
  ],

  startGame: 'Start a new game',
  resumeGame: 'Resume game',

  timeLeft: 'Time Left:',
  modeFlag: '🚩 Flag',
  modeMine: '💣 Mine',

  loseMessage: 'Sorry, you lose the game.',
  winMessage: 'Congrats, you win the game.'
};

const initalizeLanguage = (languageCode) => {
  let stringList;

  if (languageCode == 0) {
    stringList = stringList_tc;
  } else {
    stringList = stringList_en;
  }
  
  return stringList;
};

const changeLanguage =  (language, pageIndex, lastGameResult) => {
  let stringList;

  if (language == 0) {
    stringList = stringList_tc;
    document.querySelector('#langTC').hidden = 1;
    document.querySelector('#langEN').hidden = 0;
  } else {
    stringList = stringList_en;
    document.querySelector('#langTC').hidden = 0;
    document.querySelector('#langEN').hidden = 1;
  }
  
  document.querySelector('#optionGame > span').textContent = stringList.gameplay;
  document.querySelector('#optionSettings > span').textContent = stringList.settings;
  document.querySelector('#optionAbout > span').textContent = stringList.aboutUs;

  if (pageIndex == 0) {
    document.querySelector('#pageTitle').textContent = stringList.appName;
  } else if (pageIndex == 1) {
    document.querySelector('#pageTitle').textContent = stringList.settings;
  } else if (pageIndex == 2) {
    document.querySelector('#pageTitle').textContent = stringList.aboutUs;
  }

  document.querySelector('#difficulty').textContent = stringList.difficulty;
  document.querySelector('#difficultyEasy > span:nth-of-type(1)').textContent = stringList.easy;
  document.querySelector('#difficultyHard > span:nth-of-type(1)').textContent = stringList.hard;
  document.querySelector('#difficultyExtreme > span:nth-of-type(1)').textContent = stringList.extreme;

  document.querySelector('#aboutScreen > section:nth-of-type(1) h2').textContent = stringList.howToPlay;
  for (let i = 1; i <= 5; i++) {
    document.querySelector(`#aboutScreen > section:nth-of-type(1) p:nth-of-type(${i})`).textContent = stringList.howToPlayContent[i - 1];
  }

  document.querySelector('#aboutScreen > section:nth-of-type(2) h2').textContent = stringList.developer;
  for (let i = 1; i <= 3; i++) {
    document.querySelector(`#developer > div:nth-of-type(${i}) h4:nth-of-type(1)`).textContent = stringList.developerRoles[i - 1];
    document.querySelector(`#developer > div:nth-of-type(${i}) p:nth-of-type(1)`).textContent = stringList.developerNames[i - 1];
    document.querySelector(`#developer > div:nth-of-type(${i}) p:nth-of-type(2)`).textContent = stringList.developerSchools[i - 1];
  }

  document.querySelector('#aboutScreen > section:nth-of-type(3) h2').textContent = stringList.developer;
  for (let i = 1; i <= 3; i++) {
    document.querySelector(`#copyright > div > p:nth-of-type(${i})`).textContent = stringList.copyrightContent[i - 1];
  }

  if (typeof lastGameResult == 'object') {
    let lastGameStatus = `${stringList.lastGameResult} ${lastGameResult.isWon == 1 ? stringList.win : stringList.lost}`;
    document.querySelector('#lastGame').textContent = lastGameStatus;
  } else {
    document.querySelector('#lastGame').textContent = stringList.noLastGame;
  }

  document.querySelector('#startGame > span').textContent = stringList.startGame;
  
  document.querySelector('#timeContainer > span:first-of-type').textContent = stringList.timeLeft;
  document.querySelector('#exit').textContent = stringList.leave;
  document.querySelector('#modeFlag').textContent = stringList.modeFlag;
  document.querySelector('#modeMine').textContent = stringList.modeMine;
};

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
    let coordOfMines = []
    for (let i = 0; i < countOfMine; i++) {
      let randomIndex = Math.floor(Math.random() * gameData.columns * gameData.rows);
      let randomCoord = `${Math.floor(randomIndex / gameData.columns)}_${randomIndex % gameData.columns}`
      if (!coordOfMines.includes(randomCoord)) {
        coordOfMines.push(randomCoord);
      }
    };
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

  const toggleFlag = (tile, currentX, currentY, state) => {
    if (state) {
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
  };
  
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
          if (!tile.classList.contains('flag')) {
            toggleFlag(tile, currentX, currentY, true)
          } else {
            toggleFlag(tile, currentX, currentY, false)
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

const initializeSettings = () => {
  ['#difficultyEasy', '#difficultyHard', '#difficultyExtreme'].map((x, i, a) => {
    if (i == initialData.difficulty) {
      document.querySelector(x).classList.add('btn-selected');
    }
    
    document.querySelector(x).onclick = () => {
      localStorage.setItem('difficulty', i);
      initialData.difficulty = i;
      initialData.mines = i == 2 ? 2 : 4;
      initialData.healthPoint = i == 0 ? 4 : i == 1 ? 2 : 1;
      document.querySelector(x).classList.add('btn-selected');
      document.querySelector(a[i == 0 ? 1 : 0]).classList.remove('btn-selected');
      document.querySelector(a[i == 0 ? 2 : 3 - i]).classList.remove('btn-selected');
    };
  });
}

window.onload = async () => {
  let pageIndex = 0;
  let isDrawerOpened = 0;
  stringList = initalizeLanguage(language);
  
  ['#optionGame', '#optionSettings', '#optionAbout'].map((x, i, a) => {
    document.querySelector(x).onclick = async () => {
      if (!(pageIndex == i)) {
        document.querySelector(x).classList.add('drawerSelected');
        document.querySelector(a[i == 0 ? 1 : 0]).classList.remove('drawerSelected');
        document.querySelector(a[i == 0 ? 2 : 3 - i]).classList.remove('drawerSelected');
        
        let pageCurrent = pageIndex == 0 ? "#mainScreen" : pageIndex == 1 ? "#settingsScreen" : "#aboutScreen";
        let pageTo = i == 0 ? "#mainScreen" : i == 1 ? "#settingsScreen" : "#aboutScreen";
        pageIndex = i;

        if (pageIndex == 0) {
          document.querySelector('#pageTitle').textContent = stringList.appName;
        } else if (pageIndex == 1) {
          document.querySelector('#pageTitle').textContent = stringList.settings;
          initializeSettings();
        } else if (pageIndex == 2) {
          document.querySelector('#pageTitle').textContent = stringList.aboutUs;
        }
        
        await hideElement(pageCurrent, 1);
        showElement(pageTo, 0);
        
        if ((Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) < 768)) {
          await hideElement('#drawer > div', 0);
          hideElement('#drawer', 0, 0);
          document.querySelector('#drawerOpen > img').src = 'img/icon/menu.svg';
          isDrawerOpened = +!isDrawerOpened;
        }
      }
    };
  });

  document.querySelector('#drawerOpen').onclick = async () => {
    if (isDrawerOpened == 1) {
      await hideElement('#drawer > div', 0);
      hideElement('#drawer', 0, 0);
      document.querySelector('#drawerOpen > img').src = 'img/icon/menu.svg';
    } else {
      showElement('#drawer', 1, 0);
      showElement('#drawer > div', 1);
      document.querySelector('#drawerOpen > img').src = 'img/icon/menu_open_white.svg';
    }
    isDrawerOpened = +!isDrawerOpened;
  };
  
  document.querySelectorAll('.drawerClose').forEach(x => {
    x.onclick = async () => {
      document.querySelector('#drawerOpen > img').src = 'img/icon/menu.svg';
      await hideElement('#drawer > div', 0);
      hideElement('#drawer', 0, 0);
      isDrawerOpened = 0;
    };
  });
  
  document.querySelector('#startGame').onclick = async () => {
    initializeGame(initialData, language);
    if (isDrawerOpened) {
      hideElement('#drawer', 0);
      isDrawerOpened = 0;
    }
    
    await hideElement('#mainScreen', 1);
    await showElement('#gameScreen', 0);
  }
  
  document.querySelector('#langTC').onclick = async () => {
    language = 0;
    stringList = initalizeLanguage(language);
    changeLanguage(language, pageIndex, lastGameResult);
  }
  
  document.querySelector('#langEN').onclick = async () => {
    language = 1;
    stringList = initalizeLanguage(language);
    changeLanguage(language, pageIndex, lastGameResult);
  }

  if (typeof lastGameResult == 'object') {
    let lastGameStatus = `${stringList.lastGameResult} ${lastGameResult.isWon == 1 ? stringList.win : stringList.lost}`;
    document.querySelector('#lastGame').textContent = lastGameStatus;
  } else {
    document.querySelector('#lastGame').textContent = stringList.noLastGame;
  }
}