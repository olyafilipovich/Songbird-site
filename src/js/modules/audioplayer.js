import birdsData from '../modules/birds.js';
import * as add from '../modules/functions.js';

var music= new Audio ();


const playButton = document.querySelector('.play1');
const barColor = document.querySelector('.bar-color1');
const progressBar = document.querySelector('.bar1');
const songDuration = document.querySelector('.length1');
const songCurrentTime = document.querySelector('.current1');


function getTimeCodeFromNum (num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds/60);
    seconds -= minutes*60;
    return `${minutes}:${String(seconds % 60).padStart(2, 0)}`
}
function addPlayerMain(path){
    let isPlay = false;
    music.src = path;
    
    playButton.addEventListener('click', (e)=>{
        if(!isPlay && !e.isTrusted){
            return;
          }
          isPlay = startPlayAudio (music, isPlay, playButton);
    });
    music.addEventListener('timeupdate', progressBarUpdate);
    music.addEventListener('loadeddata', () => {
        songDuration.textContent = getTimeCodeFromNum(music.duration);
        music.volume = .75;
    });
};

function startPlayAudio (audio, isPlay, playerBtn) {
    if(!isPlay){
        isPlay = true;
        audio.play();
        playerBtn.classList.add('pause');
    }else{
        isPlay = false;
        audio.pause();
        playerBtn.classList.remove('pause');
    }
    return isPlay

  };
/*function playAudio (link) {
    if (!isPlay) {
        audio.src = link;
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
        playButton.classList.add("pause");     
    } else { 
        audio.pause();
        isPlay = false;
        playButton.classList.remove("pause");   
    };

};*/


// прогресс бар заставить двигаться
function progressBarUpdate (e) {
    const {duration, currentTime} = e.srcElement; // получили данные о треке (продолжительность, и сколько уже играет)
    const progressPercent  = (currentTime/duration)*100; // определяем сколько должно быть закрашено на прогресс-баре
    barColor.style.width = `${progressPercent}%`;
    songCurrentTime.textContent = getTimeCodeFromNum(music.currentTime);
};

// подгрузить список для выбора песен 
const playListContainer = document.querySelector('.game-page__list-of-birds');

function createBlockBirds (step) {
for (const data of birdsData[step]) {
    const li = document.createElement('li');
    li.classList.add('game-page__list-item');
    li.textContent = data.name;
    li.id = String(data.id);
    playListContainer.append(li);
};
};

function removeInfo () {
    while(playListContainer.firstChild) {
        playListContainer.firstChild.remove()
    }

}

// рандомный выбор песни-вопроса




const playerMain = document.querySelector(".player-main");
function chooseSongQuestion(step, x) {
    addPlayerMain(birdsData[step][x].audio);
    playerMain.setAttribute('id', `${x}`);
    music.currentTime = 0;
      
 };


const imageBird = document.querySelector(".exact-bird");
const rusName = document.querySelector(".rus-name");
const latinName = document.querySelector(".latin-name");
const description = document.querySelector(".game-page__description-bird");
const songDurationSmall = document.querySelector('.length-add');
const songCurrentTimeSmall = document.querySelector('.current-add');
const barColorSmall = document.querySelector('.bar-color-add');


var song = new Audio ();

function descriptionBird(idName, step) {
    let i = idName-1;
    imageBird.src = `${birdsData[step][i].image}`;
    rusName.textContent = `${birdsData[step][i].name}`;
    latinName.textContent = `${birdsData[step][i].species}`;
    description.textContent = `${birdsData[step][i].description}`;
    addPlayer(birdsData[step][i].audio); 
};


function addPlayer(link){
    let isPlay2 = false;
    song.src = link;
    const playBirdSongButton = document.querySelector(".play-add");
    
    playBirdSongButton.addEventListener('click', (e)=>{
        if(!isPlay2 && !e.isTrusted){
            return;
          }
          isPlay2 = startPlayAudio2(song, isPlay2, playBirdSongButton);
    });
    song.addEventListener('timeupdate', progressBarUpdate2);
    song.addEventListener('loadeddata', () => {
        songDurationSmall.textContent = getTimeCodeFromNum(song.duration);
        song.volume = .75;
    });
};

function startPlayAudio2 (audio, isPlay2, playerBtn) {
    if(!isPlay2){
        isPlay2 = true;
        audio.play();
        playerBtn.classList.add('pause');
    }else{
        isPlay2 = false;
        audio.pause();
        playerBtn.classList.remove('pause');
    }
    return isPlay2

  };
  

function progressBarUpdate2 (e) {
    const {duration, currentTime} = e.srcElement; 
    const progressPercent  = (currentTime/duration)*100; 
    barColorSmall.style.width = `${progressPercent}%`;
    songCurrentTimeSmall.textContent = getTimeCodeFromNum(song.currentTime);
};



export {createBlockBirds, chooseSongQuestion, descriptionBird, playerMain, rusName, imageBird, removeInfo};