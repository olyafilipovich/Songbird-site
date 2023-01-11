import '../style.css';
import '../../assets/audio/error.mp3';
import '../../assets/audio/success.mp3';
import '../../assets/favicon.ico';
import '../../assets/image/birds.jpg';
import '../../assets/image/logoBird.jpg';
import '../../assets/image/question.jpg';

import * as add from '../js/modules/functions.js';
import * as a from '../js/modules/audioplayer.js';



// события с главной страницы 
const buttonToGame = document.querySelector(".main-page__btn");
const firstPageBlock = document.querySelector(".main-page");
const secondPageBlock = document.querySelector(".game-page");
const linkToMenu = document.querySelector(".menu-link");
const linkToGame = document.querySelector(".game-link");
const nextLevel = document.querySelector(".game-page__btn");
const noName = document.querySelector(".game-page__title-question");
const noImg = document.querySelector(".game-page__img");
const main = document.querySelector(".main");

buttonToGame.addEventListener('click', () => {
    firstPageBlock.style.display = "none";
    secondPageBlock.style.display = "block";
    let step1=0;
    createGame(step1)
    game(step1);
})

let randomNum;
function createGame(step) {
    randomNum = getRandomNum(0,5);
    a.createBlockBirds(step);
    nextLevel.setAttribute('disabled', true);
    a.chooseSongQuestion(step, randomNum);
    randomNum ='';
}

function getRandomNum (min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};



linkToGame.addEventListener('click', () => {
    firstPageBlock.style.display = "none";
    secondPageBlock.style.display = "block";
})

linkToMenu.addEventListener('click', () => {
    firstPageBlock.style.display = "block";
    secondPageBlock.style.display = "none";
})


// события с страницы с игрой
function game (step1) {
    listOfBirds.onclick = function(event) {
        let target = event.target;
        if (target.tagName != 'LI') return;
        let num = `${event.target.id -1}`;
        defaultText.style.display="none";
        emptyBlock.style.display="flex";
        a.descriptionBird(event.target.id, step1);
        if (num === a.playerMain.id) {
            add.beepYes();
            target.classList.add("greenStyle");
            nextLevel.removeAttribute('disabled');
            noName.textContent= `${a.rusName.textContent}`;
            noImg.src= `${a.imageBird.src}`;
            step1++;
            if(step1 !== 6) {
            nextLevel.addEventListener('click', () => {
                add.moveNextTab(step1);
                noName.textContent= '*****';
                noImg.src= './assets/question.jpg';
                defaultText.style.display="flex";
                emptyBlock.style.display="none";
                a.removeInfo();
                createGame(step1);
                game(step1);
            });
            } else if (step1 === 6) {
                nextLevel.removeAttribute('disabled');
                nextLevel.addEventListener('click', () => {
                    secondPageBlock.style.display = "none";
                    const popUp = document.createElement('div');
                    popUp.className  = 'popUp';
                    popUp.textContent= 'You Win!\n Your score: ';
                    main.insertAdjacentElement("beforeEnd", popUp);
                });
            }
        } else {   
             add.beepNo();
             target.classList.add("redStyle");
   
    };
}
};




const listOfBirds = document.querySelector(".game-page__list-of-birds");
const defaultText = document.querySelector(".game-page__default-text");
const emptyBlock = document.querySelector(".game-page__empty-block");




