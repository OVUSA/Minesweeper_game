
let allPlayers =[];
let currentUser;
let currentGame;

class User{
       userGames=[]
       constructor(name, password){
              this.name = name;
              this.password=password;
              this.userID=allPlayers.length+1;
       }
       addGame(gameLevel){
              this.userGames.push(gameLevel);
       }
       bio(){
              console.log(`${this.name} has ${this.userID} as ID , played games ${this.userGames.length}` );
       }
}
class Game {
       constructor(level){
              this.gameStatus="pending",
              this.level = level,
              this.duration = 0,
              this.id = 1;
       }
       updateStatus(status){
              this.gameStatus = status;             
       }
       updateDuration(time){
              this.duration = time;
       }
       gameResult(){
              return `${this.id} game, level: ${this.level} , status ${this.status}`;
       }
}
function createUser(){
       let name = document.querySelector('.name').value;
       let password = document.querySelector('.password').value;
       currentUser = new User(name,password);      
       window.location.href = "../html/game.html";
   }
function guestGame() {
       // currentUser = Object.create(User);
       // currentUser.userName = "Guess";
       // 
       // User.prototype.addGame(currentGame);
       // console.log(currentUser.prototype)
       window.location.href = "../html/game.html";

}
function reset() {
       window.location.href = "../html/game.html";
}
function setGameLevel(id) {     
       let section = document.querySelector('.levels');
       section.style.display = "none";

       let game = document.querySelector('.game');
       game.style.display = "block";

       if (id == "1") {
              currentGame = new Game("Beginner");
              createBoard(99, 10, 1);
       } else if (id == "2") {
              currentGame = new Game("Intermediate");
              createBoard(255, 40, 2);
       } else {
              currentGame = new Game("Expert");                     
              createBoard(400, 99, 3);
       }
       currentUser.addGame(currentGame);
       console.log(currentUser.bio());

}


function createBoard(numberCells, numberBombs, level) {
       const grid = document.querySelector('.grid');
       let flagCount = document.querySelector('.flagNumber');
       boardUI(level, grid);

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
function boardUI(level, grid) {
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
function activatePopUp() {
       let popUp = document.querySelector('.popUp');
       popUp.style.visibility = "visible";
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
