const main = document.getElementById("main");
let winColor;

const color_name = document.getElementById("winColor");

const life = document.querySelector(".nav_life");
const score = document.querySelector(".nav_score");

let nbScore;
let nbLife;
let BASE_NB_LIFE = 5;
let BASE_NB_BLOC = 6;
const startGame = () => {
  main.style.alignItems = "";
  nbLife = BASE_NB_LIFE;
  nbScore = 0;
  lifeCount();
  score.innerHTML = nbScore;
  nextLevel();
};

const nextLevel = () => {
  generateBloc();
};

const checkRep = (e) => {
  if (nbLife - 1 > 0) {
    if (e.target.style.backgroundColor === winColor) {
      nbScore++;
      score.innerHTML = nbScore;
      nextLevel();
    } else {
      nbLife--;
      lifeCount();
      e.target.classList.add("wrong");
      setTimeout(() => {
        e.target.classList.remove("wrong");
      }, 600);
    }
  } else {
    nbLife--;
    youLoose();
  }
};

const generateBloc = () => {
  main.innerHTML = "";
  let rdmColor = Math.floor(Math.random() * BASE_NB_BLOC);

  for (let i = 0; i < BASE_NB_BLOC; i++) {
    const color = makeColor();
    const bloc_item = document.createElement("button");
    bloc_item.classList.add("bloc");
    bloc_item.style.backgroundColor = color;
    main.appendChild(bloc_item);

    if (i === rdmColor) {
      winColor = color;
      color_name.innerHTML = winColor;
    }
  }

  const bloc = document.querySelectorAll(".bloc");

  bloc.forEach((item) => {
    item.addEventListener("click", (e) => {
      checkRep(e);
    });
  });
};
const youLoose = () => {
  lifeCount();
  main.innerHTML = "<h1>SCORE:\n" + nbScore + "</h1>";
  main.style.display = "flex";
  main.style.alignItems = "center";
};

startGame();

function makeColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function lifeCount() {
  life.innerHTML = "";
  for (let i = 0; i < nbLife; i++) {
    life.innerHTML += '<i class="fa-solid fa-heart"></i>';
  }

  for (let i = 0; i < BASE_NB_LIFE - nbLife; i++) {
    life.innerHTML += '<i class="fa-regular fa-heart"></i>';
  }

  console.log(nbLife);
}
