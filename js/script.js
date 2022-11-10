// User functions
class User {

       userId = () => { id = 0; return id++; }
       userGames = [];
       userName = null;
       password = null;

       constructor(username, password) {
              this.userName = username;
              this.password = password;
       }

       addGame(game) {
              this.userGames[this.userGames.length] = game;
       }
}
class Game {

       id = () => { id = 0; return id++; }
       gameStatus = "pending"
       level = "NaN";
       duration = 0;

}
let currentUser;
let currentGame;

function createUser() {

       currentUser = new User(document.getElementById('name').value, document.getElementById('password').value);
       console.log(`username = ${currentUser.username}`);
       currentGame = new Game();
       currentUser.addGame(currentGame);
       window.location.href = "../html/game.html";
}

function guestGame() {
       currentUser = new User("Guess", null);
       currentGame = new Game();
       currentUser.addGame(currentGame);
       window.location.href = "../html/game.html";
}
//TODO : add +1 game to current user
function reset(){
       window.location.href = "../html/game.html";
}



function setGameLevel(id) {
       let section = document.querySelector('.levels');
       section.style.display = "none";

       let game = document.querySelector('.game');
       game.style.display = "block";

       if (id == "1") {
              createBoard(99, 10, 1);
       } else if (id == "2") {
              createBoard(255, 40, 2);
       } else {
              createBoard(400, 99, 3);
       }
}


function createBoard(numberCells, numberBombs, level) {
       const grid = document.querySelector('.grid');
       let flagCount = document.querySelector('.flagNumber');
       boardUI(level,grid);

       let flags = 10;
       let squares = [];
       //flagCount.innerHTML=numberBombs;
       console.log("Creating game....");
       const emptyCells = Array(numberCells - numberBombs).fill("valid");
       const bombs = Array(numberBombs).fill('bomb')
       const gameArray = emptyCells.concat(bombs);
       const shuffleArrays = gameArray.sort(() => Math.random() - 0.5)
       console.log(shuffleArrays);

       for (let i = 0; i < numberCells; i++) {
              const square = document.createElement('div')
              square.setAttribute('id', i)
              square.classList.add(shuffleArrays[i]);
              grid.appendChild(square)
              squares.push(square)
              square.addEventListener('mouseup', (e) => {
                     changeVisibility();
                     mouseClick(square, e);
              });
       }
}
function boardUI(level,grid){
       if (level == 1) {
              grid.style.gridTemplateColumns = "repeat(11, 26px)";
              grid.style.gridTemplateRows = "repeat(9, 26px)";

       } else if (level == 2) {
              grid.style.gridTemplateColumns = "repeat(17, 24px)";
              grid.style.gridTemplateRows = "repeat(15, 24px)";

       } else {
              grid.style.gridTemplateColumns = "repeat(25, 21px)";
              grid.style.gridTemplateRows = "repeat(16, 21px)";
       }
}

function mouseClick(square, e) {
       switch (e.button) {
              case 0:
                     //left
                     if (checkTheCell(square.className)) {
                            square.style.backgroundColor = "red";
                            exposeAllMines();
                            // square.setAttribute("src","bomb.png");
                     } else {
                            square.style.backgroundColor = "#D9D9D9";
                            square.style.border = "white";
                     }
                     break;
              case 2:
                     //right
                     square.innerHTML = "&#128681"
                     flags--;
                     flagCount.innerHTML = flags;
                     break;
              default:
                     console.log(`Unknown button code: ${e.button}`);
       }

}

function checkTheCell(squareClass) {
       if (squareClass == 'bomb') {
              return true;
              //selectedSquare.innerHTML=<img src = "bomb.png"></img>
       } else {
              return false;
       }
}
function activatePopUp(){
       let popUp = document.querySelector('.popUp');
       popUp.style.visibility="visible";
       popUp.innerHTML = "You lost";
}

function exposeAllMines() {
       var sq = document.querySelectorAll('.bomb')
       sq.forEach(element => {
              element.style.backgroundColor = "red";
              // element.confetti();
              // confetti({
              //     particleCount: 100,
              //     spread: 70,
              //     origin: { y: 0.6 }
              //   });
       });
       activatePopUp();
}



// change visibility of reset button when user starts the game
function changeVisibility() {
       let resetButton = document.querySelector('.reset')
       if (resetButton.style.visibility == 'hidden') {
              resetButton.style.visibility = 'visible';
       }
}
