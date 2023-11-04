export { initalizeLanguage };

const stringList_tc = {
  appName: '踩地雷',
  gameplay: '遊戲',
  settings: '設定',
  aboutUs: '關於',

  leave: '退出',
  sure: '確定？',

  back_to_home: '返回主頁',
  start_game: '開始遊戲',
  language: '語言',
  difficulty: '遊戲難度',
  difficulty_easy: '簡單',
  difficulty_hard: '困難',
  difficulty_extreme: '餓「死」',
  
  developer: '開發者',
  dev_1: '馬天禮',
  dev_1_info: '東華三院盧幹庭紀念中學',
  dev_2: '曹雪',
  dev_2_info: '青年會書院',
  dev_3: '陳文軒',
  dev_3_info: '五旬節聖潔會永光書院',
  
  gameplay: '玩法',
  gameplay_1: '遊戲開局中有個棋盤上散佈一些隱藏的地雷，需要在不踏上地雷之下翻開棋盤。',
  gameplay_2: '標記旗幟符號＝認為地雷在這格之上',
  gameplay_3: '點開小方塊後會顯示一個數字（代表著以它為中心的九宮格內藏著幾顆地雷）/【餓死版本】圖則為注意附近有雷',
  gameplay_4: '只要點到地雷就會扣減一顆紅心',
  
  copyright: '版權聲明',
  copyright_info: '本遊戲爲 偶像夢幻祭 的同人遊戲，僅供玩樂。遊戲內容若有侵犯版權，定必修改。',
  image_src: '遊戲中圖片取自 偶像夢幻祭官方 Line 貼圖組。',
  audio_src: '音效來源',
  sound_src: '遊戲音效取自以下 Bilibili 影片。',
  
  previous: '前一個',
  next: '下一個',
  time_left: '時間尚餘: ',
  exit: '退出',
  flag: '🚩 旗插',
  boom: '💣 Oh Yeah!!!!',
};

const stringList_en = {
  appName: 'Minesweeper',
  gameplay: 'Gameplay',
  settings: 'Settings',
  aboutUs: 'About Us',

  leave: 'Leave',
  sure: 'Sure?',

  back_to_home: 'Back To Home',
  start_game: 'Start Games',
  settings: 'Game Settings',
  language: 'Language',
  difficulty: 'Difficulty',
  difficulty_easy: 'Easy',
  difficulty_hard: 'Hard',
  difficulty_extreme: 'Extreme',
  time_left: 'time left',
  extreme: 'Ensemble Stars!',

  about_us: 'Developer',
  dev_1: 'Ma Tin Lai,Jason',
  dev_1_info: 'Tung Wah Group of Hospitals Lo Kon Ting Memorial College',
  dev_2: 'Cho Suet,Yuki',
  dev_2_info: 'Chinese YMCA College',
  dev_3: 'Chan Man Hin,Lucas',
  dev_3_info: 'P.H.C Wing Kwong College',
  
  gameplay_1: 'At the beginning of the game, there are some hidden mines scattered on the board. You need to open the board without stepping on the mines.',
  gameplay_2: 'Mark Flag Symbol = The mine is considered to be on this square',
  gameplay_3: '點開小方塊後會顯示一個數字（代表著以它為中心的九宮格內藏著幾顆地雷）/【Ensemble Stars!】圖則為注意附近有雷',
  gameplay_4: '只要點到地雷就會扣減一顆紅心',
  
  copyright: 'Copyright',
  copyright_info: 'This game is a fan game of Ensemble Stars! and is for fun only. If the game content infringes copyright, it will be modified.',
  image_src: 'The pictures in the game are taken from the official Line sticker sets of Ensemble Stars!.',
  audio_src: 'Sound Source:',
  sound_src: 'The game sound effects are taken from the Bilibili video below.',
 
  previous: 'Previous',
  next: 'Next',
  time_left: 'Time Left: ',
  exit: 'Exit',
  flag: '🚩 Flag',
  boom: '💣 Bomb'
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

function languageOptions() {
  if (language == 0) {
    stringList = stringList_tc;
  } else {
    stringList = stringList_en;
  }
  
  document.querySelector('#go_back_menu').textContent = stringList.back_to_home;
  document.quertSelector('#option_settings').textContent = stringList.settings;
  document.querySelector('#settings > h3:nth-child(2)').textContent = stringList.language;
  document.querySelector('#option_game').textContent = stringList.start_game;
  document.querySelector('#option_difficulty').textContent = stringList.difficulty;
  document.querySelector('#mode_easy').textContent = stringList.difficulty_easy;
  document.querySelector('#mode_hard').textContent = stringList.difficulty_hard;
  document.querySelector('#mode_extreme').textContent = stringList.difficulty_extreme;
  //(no id)document.querySelector('#option_time_left').textContent = stringList.time_left;
  document.querySelector('#option_about').textContent = stringList.about_us;
  document.querySelector('#developer > h3').textContent = stringList.developer;
  document.querySelector('#setting > h3:nth-child(2)').textContent = stringList.dev_1;
  document.querySelector('').textContent = stringList.dev_2;
  document.querySelector('').textContent = stringList.dev_3;
  document.querySelector('').textContent = stringList.dev_1_info;
  document.querySelector('').textContent = stringList.dev_2_info;
  document.querySelector('').textContent = stringList.dev_3_info;
  document.querySelector('#how_to_play > h3').textContent = stringList.gameplay;
  document.querySelector('#how_to_play > p:nth-child(1)').textContent = stringList.gameplay_1;
  document.querySelector('#how_to_play > p:nth-child(2)').textContent = stringList.gameplay_2;
  document.querySelector('#how_to_play > p:nth-child(3)').textContent = stringList.gameplay_3;
  document.querySelector('#how_to_play > p:nth-child(4)').textContent = stringList.gameplay_4;
  document.querySelector('#copyright > h3').textContent = stringList.copyright;
  document.querySelector('#copyright > p:nth-child(1)').textContent = stringList.copyright_info;
  document.querySelector('#copyright > p:nth-child(2)').textContent = stringList.image_src;
  document.querySelector('#audio_source > h3').textContent = stringList.audio_src;
  document.querySelector('#audio_source > p').textContent = stringList.sound_src;
  document.querySelector('#about_previous').textContent = stringList.previous;
  document.querySelector('#about_next').textContent = stringList.next;
  document.querySelector('#timecount').textContent = stringList.time_left;
  document.querySelector('#exit').textContent = stringList.exit;
  document.querySelector('#mode_flag').textContent = stringList.flag;
  documnet.quertSelector('#mode_mine').textContent = stringList.boom;
};