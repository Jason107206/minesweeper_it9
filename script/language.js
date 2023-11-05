export { initalizeLanguage, changeLanguage };

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

function changeLanguage(language, pageIndex, lastGameResult) {
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