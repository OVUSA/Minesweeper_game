
let allPlayers =[];
let allGame = [];
var currentUser;
let currentGame;
let grid;
let flagCount;


function User(name,password){   
       this.name=name;
       this.password=password;
       User.prototype.userID = allPlayers.length+1;
       this.games = []
       this.bio = `${this.name} played ${this.games.length}`   

       // Object.defineProperty(User,"name",{
       //        get:function getUserName(){
       //               return this.name;
       //        }
       // })
      
       // Object.defineProperty(User, "games", {
       //        get: function gamesGet() {
       //            return games.ToString();
       //        },
       //        set : function gamesSet(gameLevel){
       //               games.push(gameLevel)
       //        }
       //    });
}
function createUser(){
       // let name = document.querySelector('.name').value;
       // let password = document.querySelector('.password').value;
       // currentUser = new User(name,password); 

       // localStorage.setItem('player', JSON.stringify(currentUser));

       // // let storedUser = JSON.stringify(currentUser);
       // // localStorage.setItem('player',storedUser);  
       
       // reset();// redirect to game with levels
   }


   //saving the object in localStorage
   function localStorage(currentUser){
       let storedUser = JSON.stringify(currentUser);
       localStorage.setItem('player',storedUser); 
   }


function guestGame() {
       // currentUser = new User("Guess",null);  
       // localStorage(currentUser);
       // window.location.href = "../html/game.html";
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
       var loadedTodos = JSON.parse(localStorage.getItem('player'));

       console.log('retrievedObject: ', JSON.parse(loadedTodos));
       //currentUser.gamesSet(currentGame);    
      // console.log(currentUser.getUserName);  
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
 
function createBoard(numberCells, numberBombs, level) {
       grid = document.querySelector('.grid');
       flagCount = document.querySelector('.flagNumber');
       boardUI(level, grid);
       const initialFlags = numberBombs;

       let squares = [];//an array for the board
       flagCount.innerHTML=initialFlags;

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
                   initialFlags=  mouseClick(square, e,initialFlags);
                  flagCount.innerHTML=initialFlags;
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

function mouseClick(square, e,flagCount) {
       switch (e.button) {
              case 0:
                     //left
                     if (checkTheCell(square.className)) {
                            square.style.backgroundColor = "red";
                            exposeAllMines();
                            // square.setAttribute("src","bomb.png");
                     } else {
                            square.style.backgroundColor = "#D9D9D9";
                            square.style.border = "1px solid blue";
                     }
                     break;
              case 2:
                     //right
                     square.innerHTML = "&#128681"
                     flagCount.innerHTML= flagCount--;
                     
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
       currentGame.gameStatus="Lost";
       allGame.push(currentGame);
       console.log(allGame);  
}

function JsonTheGame(){

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
       disactivateBoard();
}
function disactivateBoard(){
       const grid = document.querySelector('.grid');
grid.style.pointerEvents = 'none';
}



// change visibility of reset button when user starts the game
function changeVisibility() {
       let resetButton = document.querySelector('.reset')
       if (resetButton.style.visibility == 'hidden') {
              resetButton.style.visibility = 'visible';
       }
}
