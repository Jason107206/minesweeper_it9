import { initalizeLanguage, changeLanguage } from './script/language.js';
import { hideElement, showElement, fadeElement } from './script/animation.js';
import { initializeGame } from './script/minesweeper.js';

var language = 0;
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

var stringList = initalizeLanguage(language);

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

  if (lastGameResult != []) {
    let lastGameStatus = `${stringList.lastGameResult} ${lastGameResult.isWon == 1 ? stringList.won : stringList.lost}`;
    document.querySelector('#lastGame').textContent = lastGameStatus;
  } else {
    document.querySelector('#lastGame').textContent = stringList.noLastGame;
  }
};