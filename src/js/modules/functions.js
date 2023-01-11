import sound2 from '../../../assets/audio/error.mp3';
import sound1 from '../../../assets/audio/success.mp3';

const tabs = document.querySelectorAll(".game-page__tab");



function moveNextTab (i) {
      tabs[i].classList.add("tab-active");
      tabs[i-1].classList.remove("tab-active");
  
};

let signalYes = new Audio (sound1);
let signalError = new Audio (sound2);

function beepYes() {
   signalYes.play();
}
 
function beepNo() {
   signalError.play();
}

export {moveNextTab, beepNo, beepYes, tabs};