//import { changeLanguage } from './script/language.js';
import { hideElement, showElement, fadeElement } from './script/animation.js';
import { initializeGame } from './script/minesweeper.js';

var initialData = {
  rows: 4,
  columns: 4,
  difficulty: 0,
  healthPoint: 4,
  mines: 4
};

window.onload = async () => {
  let sectionIndex = 0;
  
  document.querySelector('#returnMenu').onclick = async () => {
    fadeElement('#navigation', 1, 600, 200);
    await hideElement(sectionIndex == 0 ? '#settings' : '#about', 1);
    showElement('#menu', 0);
  };
  
  document.querySelector('#optionStartGame').onclick = async () => {
    initializeGame(initialData);
    
    await hideElement('#mainScreen', 1);
    await showElement('#gameScreen', 0);
    
    document.querySelector('#exit').onclick = async () => {
      await hideElement('#gameScreen', 1);
      await showElement('#mainScreen', 0);
    };
  };
  
  document.querySelector('#optionSettings').onclick =  async () => {
    sectionIndex = 0;
    document.querySelector('#currentSection').textContent = '設定';
    
    ['#difficultyEasy', '#difficultyHard', '#difficultyExtreme'].map((x, i, a) => {
      if (i == initialData.difficulty) {
        document.querySelector(x).classList.add('selected');
      }
      
      document.querySelector(x).onclick = () => {
        initialData.difficulty = i;
        document.querySelector(x).classList.add('selected');
        document.querySelector(a[i == 0 ? 1 : 0]).classList.remove('selected');
        document.querySelector(a[i == 0 ? 2 : 3 - i]).classList.remove('selected');
      };
    });
    
    await hideElement('#menu', 1);
    fadeElement('#navigation', 0, 600);
    showElement('#settings', 0);
  };

  document.querySelector('#optionAbout').onclick = async () => {
    sectionIndex = 1;
    document.querySelector('#currentSection').textContent = '關於';
        
    await hideElement('#menu', 1);
    fadeElement('#navigation', 0, 600);
    showElement('#about', 0);
  };
  
  showElement('#banner', 0, 600);
  showElement('#menu', 0);
};