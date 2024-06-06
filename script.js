var language = 0;
var stringList;
var data = {
  row: 4,
  column: 4,
  difficulty: 0,
  health_pt: 4,
  mine: 4,
  total_secs: 420
};

if (localStorage.getItem('difficulty') !== null) {
  data.difficulty = localStorage.getItem('difficulty');
  data.mine = data.difficulty == 2 ? 2 : 4;
  data.health_pt = data.difficulty == 0 ? 4 : data.difficulty == 1 ? 2 : 1;
}

var last_game = [];
if (localStorage.getItem('last_game') !== null) {
  last_game = JSON.parse(localStorage.getItem('last_game'));
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

  last_game: '上次遊戲：',
  win: '勝利',
  lost: '落敗',
  last_game_null: '請開始遊戲',

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

  last_game: 'Last Game:',
  win: 'Won',
  lost: 'Lost',
  last_game_null: 'Please start a game',

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

const changeLanguage =  (language, pageIndex, last_game) => {
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

  if (typeof last_game == 'object') {
    let last_game_status = `${stringList.last_game} ${last_game.isWon == 1 ? stringList.win : stringList.lost}`;
    document.querySelector('#lastGame').textContent = last_game_status;
  } else {
    document.querySelector('#lastGame').textContent = stringList.last_game_null;
  }

  document.querySelector('#startGame > span').textContent = stringList.startGame;
  
  document.querySelector('#timeContainer > span:first-of-type').textContent = stringList.timeLeft;
  document.querySelector('#exit').textContent = stringList.leave;
  document.querySelector('#modeFlag').textContent = stringList.modeFlag;
  document.querySelector('#modeMine').textContent = stringList.modeMine;
};

const initializeGame = async (data, language) => {
  let is_game_in_progress = true;
  let is_revealing = true;
  let is_exit_confirmed = false;

  let secs_left = data.total_secs;
  let stringList = initalizeLanguage(language);

  let health_pt = 0;
  let mine_left = data.mine;
  let mine_unrevealed = data.mine;
  let cell_count = data.column * data.row;
  let cell_unrevealed = cell_count;
  let flag_count = cell_count - data.mine;

  let board = [];

  const init_board = () => {
    for (let row = 0; row < data.row; row++) {
      board[row] = [];

      for (let column = 0; column < data.column; column++) {
        board[row][column] = {
          is_mine: false,
          revealed: false,
          flagged: false,
          near_mine: 0
        };

        let cell = document.createElement('span');
        cell.id = `cell_${row}_${column}`;
        cell.textContent = 'ㅤ';
        document.querySelector('#gameBoard').append(cell);

        cell.onclick = (() => {
          if (!board[row][column].revealed) {
            if (is_revealing) {
              reveal_cell(row, column, cell);
            } else {
              toggle_cell_flag(row, column, cell);
            }
            render_counter();
          }
        });
      }
    }

    let placed_mine = 0;
    while (placed_mine < data.mine) {
      let random_x = Math.floor(Math.random() * data.column);
      let random_y = Math.floor(Math.random() * data.row);
      let random_cell = board[random_x][random_y];

      if(!random_cell.is_mine) {
        random_cell.is_mine = true;
        placed_mine++;

        for (let near_x = random_x - 1; near_x <= random_x + 1; near_x++) {
          for (let near_y = random_y - 1; near_y <= random_y + 1; near_y++) {
            if (near_x >= 0 && near_x < data.column && near_y >= 0 && near_y < data.row) {
              board[near_x][near_y].near_mine++;
            }
          }
        }
      }
    }
    console.log(board);
  }

  const reveal_cell = (row, column, cell) => {
    if (!board[row][column].revealed) {
      board[row][column].revealed = true;

      if (board[row][column].is_mine) {
        if (is_game_in_progress) {
          if (data.difficulty == 2) {
            cell.style.backgroundImage = 'url(img/boom.png)';
          } else {
            cell.textContent = '💥';
            cell.classList.add('boom');
          }
        } else {
          cell.textContent = '💣';
        }
      } else {
        if (data.difficulty == 2) {
          cell.style.backgroundImage = 'url(img/mind.png)';
        } else {
          cell.textContent = board[row][column].near_mine;
        }
      }

      if (is_game_in_progress) {
        cell_unrevealed--;

        if (board[row][column].is_mine) {
          if (health_pt == 1) {
            terminate_game();
          } else {
            mine_unrevealed--;
            mine_left--;
            health_pt--;
          }
        } else {
          if (board[row][column].near_mine == 0) {
            for (let near_x = row - 1; near_x <= row + 1; near_x++) {
              for (let near_y = column - 1; near_y <= column + 1; near_y++) {
                if (near_x >= 0 && near_x < data.column && near_y >= 0 && near_y < data.row) {
                  reveal_cell(near_x, near_y, document.querySelector(`#cell_${near_x}_${near_y}`));
                }
              }
            }
          }
        }

        if (mine_left == 0) {
          terminate_game();
        }
      }
    }
  }

  const toggle_cell_flag = (row, column, cell) => {
    if (!board[row][column].revealed) {
      if (board[row][column].flagged) {
        cell.classList.remove('flag');
        cell.textContent = 'ㅤ';
        flag_count++;

        if (board[row][column].is_mine) {
          mine_left++;
        }
        board[row][column].flagged = false;
      } else if (flag_count > 0) {
        cell.classList.add('flag');
        cell.textContent = '🚩';
        flag_count--;

        if (board[row][column].is_mine) {
          mine_left--;
        }
        board[row][column].flagged = true;
      }

      if (mine_left == 0) {
        terminate_game();
      }
    }
  }

  const render_counter = () => {
    document.querySelector('#remainingHealth').textContent = '❤️'.repeat(health_pt);
    document.querySelector('#remainingMines').textContent = mine_unrevealed;
    document.querySelector('#remainingFlags').textContent = flag_count;
  }

  const return_to_menu = async (last_game) => {
    if (typeof last_game == 'object') {
      let last_game_status = `${stringList.last_game} ${last_game.isWon == 1 ? stringList.win : stringList.lost}`;
      document.querySelector('#lastGame').textContent = last_game_status;
    } else {
      document.querySelector('#lastGame').textContent = stringList.last_game_null;
    }

    await hideElement('#gameScreen', 1);
    await showElement('#mainScreen', 0);
    await fadeElement('#drawerOpen', 0, 1);
  }

  const terminate_game = async () => {
    clearInterval(countdown);
    is_game_in_progress = false;

    for (let column = 0; column < data.column; column++) {
      for (let row = 0; row < data.row; row++) {
        if (board[row][column].flagged && !board[row][column].is_mine) {
          health_pt--;
        }

        if (!board[row][column].flagged && !board[row][column].revealed && board[row][column].is_mine) {
          health_pt--;
        }
        
        if (!board[row][column].is_mine || !board[row][column].revealed) {
          reveal_cell(row, column, document.querySelector(`#cell_${row}_${column}`));
        }
      }
    }

    setTimeout(async () => {
      if (health_pt > 0) {
        alert(stringList.winMessage);
      } else {
        alert(stringList.loseMessage);
        health_pt = 0;
      }

      let game_result = {
        health_pt: health_pt > 0 ? health_pt : 0,
        isWon: health_pt > 0 ? '1' : '0'
      };

      localStorage.setItem('last_game', JSON.stringify(game_result));
      await return_to_menu(game_result);
    }, 1000);

  }

  document.querySelector('#gameBoard').innerHTML = '';
  document.querySelector('#gameBoard').style.gridTemplateColumns = `repeat(${data.column}, auto)`;
  fadeElement('#drawerOpen', 1, 0);

  if (data.difficulty == 2) {
    document.querySelector('#background').style.backgroundImage = 'url("img/es_bg.jpeg")';
    document.querySelector('#currentDifficulty').textContent = stringList.extreme;
    health_pt = 1;
  } else {
    document.querySelector('#background').style.backgroundImage = 'url("img/bg.png")';
    if (data.difficulty == 1) {
      document.querySelector('#currentDifficulty').textContent = stringList.hard;
      health_pt = 2;
    } else {
      document.querySelector('#currentDifficulty').textContent = stringList.easy;
      health_pt = 4;
    }
  };

  render_counter();

  document.querySelector('#exit').onclick = async () => {
    if (is_exit_confirmed) {
      clearInterval(countdown);
      await return_to_menu();
      document.querySelector('#exit').textContent = stringList.leave;
    } else {
      is_exit_confirmed = true;
      document.querySelector('#exit').textContent = stringList.sure;
      document.querySelector('#exit').style.backgroundColor = 'rgb(253 230 138)';
      setTimeout(async () => {
        is_exit_confirmed = false;
        document.querySelector('#exit').textContent = stringList.leave;
        document.querySelector('#exit').style.backgroundColor = '';
      }, 3000);
    }
  };

  document.querySelector('#modeFlag').classList.remove('btn-selected');
  document.querySelector('#modeMine').classList.add('btn-selected');
  ['#modeFlag','#modeMine'].map((x, i, a) => {
    document.querySelector(x).onclick = () => {
      is_revealing = i;
      document.querySelector(a[i]).classList.add('btn-selected');
      document.querySelector(a[1 - i]).classList.remove('btn-selected');
    };
  });

  init_board();

  let countdown = setInterval(() => {
    secs_left -= 1;
    document.querySelector('#timeRemaining').textContent = `${parseInt(secs_left / 60, 10)}: ${parseInt(secs_left % 60, 10)}`

    if (secs_left == 0) {
      clearInterval(countdown);
      terminate_game();
      return game_result;
    }
  }, 1000);
}

const initializeSettings = () => {
  ['#difficultyEasy', '#difficultyHard', '#difficultyExtreme'].map((x, i, a) => {
    if (i == data.difficulty) {
      document.querySelector(x).classList.add('btn-selected');
    }
    
    document.querySelector(x).onclick = () => {
      localStorage.setItem('difficulty', i);
      data.difficulty = i;
      data.mine = i == 2 ? 2 : 4;
      data.health_pt = i == 0 ? 4 : i == 1 ? 2 : 1;
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
    initializeGame(data, language);
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
    changeLanguage(language, pageIndex, last_game);
  }
  
  document.querySelector('#langEN').onclick = async () => {
    language = 1;
    stringList = initalizeLanguage(language);
    changeLanguage(language, pageIndex, last_game);
  }

  if (typeof last_game == 'object') {
    let last_game_status = `${stringList.last_game} ${last_game.isWon == 1 ? stringList.win : stringList.lost}`;
    document.querySelector('#lastGame').textContent = last_game_status;
  } else {
    document.querySelector('#lastGame').textContent = stringList.last_game_null;
  }
}