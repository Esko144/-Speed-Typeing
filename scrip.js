const wordEl = document.getElementById("word");
const textEl = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

const btnLevelEl = document.getElementById("level-btn");
const settingsEl = document.getElementById("settings");
const levelFormEl = document.getElementById("level-form");
const levelEl = document.getElementById("level");
const gameoverEl = document.getElementById("gameover-container");

const words = ["แมว", "หมา", "หมู"];

let randoWord;
let score = 0;
let time = 10; //easy =>15 ,medium =>10,hard =>5
const saveMode =localStorage.getItem('mode') !== null ? localStorage.getItem('mode') : 'medium';
let level = 'medium';

const timeInterval = setInterval(Updatetime, 1000);

function getrandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function displayWordToUI() {
  randomText = getrandomWord();
  wordEl.innerHTML = randomText;
  timeEl.innerHTML = time;
}

textEl.addEventListener("input", (e) => {
  const inputText = e.target.value;
  
  if (inputText === randomText) {
    if(saveMode == 'easy'){
      time+=5;
    }else if (saveMode == 'medium') {
      time+=3;
    }else{
      time+=2;
    }
    
    displayWordToUI();
    UpdateScore();
    e.target.value = '';
  }
});

function UpdateScore() {
  score += 10;
  scoreEl.innerHTML = score;
}
textEl.addEventListener("focus", () => {
  textEl.style.cursor = "text";
});

function Updatetime() {
  if (textEl.style.cursor ==="text") {
    time--;
    timeEl.innerHTML = time;
        if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
  }
}

function gameOver() {
  gameoverEl.innerHTML = `<h1>GAME OVER</h1>
  <p>คะแนนของคุณ = ${score} แต้ม <p>
    <button onclick="location.reload()">เล่นอีกครั้ง</button>  
  `;
  gameoverEl.style.display = 'flex';
   // Clear the localStorage value for the selected mode
}

btnLevelEl.addEventListener('click', () => {
  settingsEl.classList.toggle('hide');
});

levelEl.addEventListener('change', (e) => {
  level = e.target.value;
  localStorage.setItem("mode", level);
  
});

function starGame() {
  levelEl.value = saveMode;

  if(saveMode == 'easy'){
    time=15;
  }else if (saveMode == 'medium') {
    time=10;
  }else{
    time=5;
  }
  displayWordToUI();
}



starGame();
