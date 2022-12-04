
let currentGame;
var currentUser;
var openCells = [];
let gamePlay = true; // used to stop clock and recod the result

class User {
       constructor(name,password){
              this.name = name;
              this.password = password;
              this.games = [];
       }
       // name ;
       // password;
       // games = [];
       addGame(cG) {
              this.games.push(cG);
       }
}
class Game {
       constructor(level) {
              this.gameStatus = "pending",
                     this.level = level,
                     this.duration = 0,
                     this.id = currentUser.games.length+1;
       }
       updateStatus(status) {
              this.gameStatus = status;
       }
       updateDuration(time) {
              this.duration = time;
       }
       gameResult() {
              return `${this.id} game, level: ${this.level} , status ${this.status}`;
       }
}
// receive input from ui and send it to db
function createUser() {
       let nm = document.querySelector('.name').value;
       let psw = document.querySelector('.password').value;

       addUser(nm, psw);
       levelsPage();
       
}
function guestGame() {

       addUser("Guest", "null");
       levelsPage();
}
//creating new game here
function levelsPage() {
       window.location.href = "../html/index.html";
}

function setGameLevel(id) {
       setUpUser();
       var level;
       let section = document.querySelector('.levels');
       section.style.display = "none";

       let game = document.querySelector('.game');
       game.style.display = "block";

       if (id == "1") {
              level = "Beginner"
              createBoard(99, 10, 1);
       } else if (id == "2") {
              level = "Intermediate"
              createBoard(255, 40, 2);
       } else {
              level = "Expert"
              createBoard(400, 99, 3);
       }

       currentGame = new Game(level);
       currentUser.addGame(currentGame);
       updateGame();
}
let initialFlags;
function createBoard(numberCells, numberBombs, level) {

       grid = document.querySelector('.grid');
       flagCount = document.querySelector('.flagNumber');
       boardUI(level, grid);// set a size of the grid
       initialFlags = numberBombs;

       let squares = [];//an array for the board
       flagCount.innerHTML = initialFlags;
       initialFlags--;

       const emptyCells = Array(numberCells - numberBombs).fill("valid");
       const bombs = Array(numberBombs).fill('bomb')
       const gameArray = emptyCells.concat(bombs);
       const shuffleArrays = gameArray.sort(() => Math.random() - 0.5)
       console.log(shuffleArrays);

       let cell = 0;
       for (let i = 0; i < 9; i++) {// rows
              for ( let j = 0; j< 11;j++){ //columns
                     const square = document.createElement('div')
                     square.setAttribute('id', cell)
                     square.classList.add(shuffleArrays[cell]);
       
                     grid.appendChild(square)
                     squares.push(square)
                     square.addEventListener('mouseup', (e) => {
                            changeVisibility();
                            mouseClick(square, e, flagCount, numberCells, numberBombs);
                     });
               cell++;      
              }

       }
       showTime();
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

function mouseClick(square, e, flagCount, numberCells, numberBombs) {
       switch (e.button) {
              case 0://left click
                     if (square.className == 'bomb') {// if the cell has a bomb
                            square.style.backgroundColor = "#ff3300";// red color
                            gameStatus = "Lost"
                            exposeAllMines();
                     } else {
                            checkAdjacentCells(square);
                            if (openCells.length >= (numberCells - numberBombs) - 1) {
                                   gameStatus = "Win!"
                                   activatePopUp();
                            }
                     }
                     break;
              case 2: //right click
                     square.innerHTML = "&#128681";
                     flagCount.innerHTML = initialFlags--;
                     break;
              default:
                     console.log(`Unknown button code: ${e.button}`);
       }
}

function activatePopUp() {

       // disactivate the board
       const grid = document.querySelector('.grid');
       grid.style.pointerEvents = 'none';

       gamePlay = false;
       let popUp = document.querySelector('.popUp');
       popUp.style.visibility = "visible";

       popUp.innerHTML = "You " + gameStatus;

       currentGame.gameStatus = gameStatus;
       updateGame();

       console.log(currentUser)
}

function exposeAllMines() {
       var sq = document.querySelectorAll('.bomb')
       sq.forEach(element => {
              element.style.backgroundColor = "#ff3300";
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
function showTime() {
       let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
       let timerRef = document.querySelector('.clock');
       let int = null;

       int = setInterval(displayTimer, 10);

       function displayTimer() {
              if (gamePlay == true) {
                     milliseconds += 10;
              } else {
                     timerRef.innerHTML = `0:00`;
                     [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
              }
              if (milliseconds == 1000) {
                     milliseconds = 0;
                     seconds++;
                     if (seconds == 60) {
                            seconds = 0;
                            minutes++;
                            if (minutes == 60) {
                                   minutes = 0;
                                   hours++;
                            }
                     }
              }
              let h = hours < 10 ? "0" + hours : hours;
              let m = minutes < 10 ? minutes : minutes;
              let s = seconds < 10 ? "0" + seconds : seconds;

              timerRef.innerHTML = `${m}:${s}`;
              if (gamePlay) { currentGame.updateDuration(`${m}:${s}`) };
       }
}

function checkAdjacentCells(currentCell) {
       let foundBombs = 0;

       let adCells = checkCellsHelper(currentCell);
       changeCellColor(currentCell);
       console.log(adCells)
       for (let i = 0; i < adCells.length - 1; i++) {
              if (adCells[i] > 0 & adCells[i] < adCells[8]) {
                     let adj = document.getElementById(adCells[i]);
                     console.log(adCells[i])
                     if (adj.className != 'bomb') {
                            changeCellColor(adj);
                     } else {
                            foundBombs++;
                            currentCell.innerHTML = foundBombs;
                     }
              }// TODO change 99 to board size

       }
}

function checkCellsHelper(currentCell) {
       if (currentGame.level == "Beginner") {

              let adCells = [currentCell.id - 11, currentCell.id - 12, currentCell.id - 10, parseInt(currentCell.id) + 1, parseInt(currentCell.id) - 1, parseInt(currentCell.id) + 10,
              parseInt(currentCell.id) + 11, parseInt(currentCell.id) + 12, 99];
              return adCells;

       } else if (currentGame.level == "Intermediate") {
              let adCells = [currentCell.id - 17, currentCell.id - 18, currentCell.id - 16, parseInt(currentCell.id) + 1, parseInt(currentCell.id) - 1, parseInt(currentCell.id) + 17,
              parseInt(currentCell.id) + 18, parseInt(currentCell.id) + 16, 255];
              return adCells;

       }
}
function changeCellColor(adj) {
       if (!openCells.includes(adj)) { openCells.push(adj) };
       if (adj.id % 2 == 0) {
              adj.style.backgroundColor = "#bfbfbf";
       } else {
              adj.style.backgroundColor = "#e6e6e6";
       }
}

// local storage 
function addUser(name,password) {
// add user on sign up page
       currentUser = new User(name,password)
       var user = JSON.stringify(currentUser)

       localStorage.setItem("1", user)
}
function setUpUser() {
       // retrive current player name
       const st = localStorage.getItem("1");
       let user = JSON.parse(st);
       currentUser = new User(user.name,user.password);
       currentUser.games = user.games
       console.log("Current user: "+currentUser);
}

function updateGame() {
       localStorage.removeItem("1");
       var gameRecord = JSON.stringify(currentUser)
       //update the user record
       localStorage.setItem("1", gameRecord);
}
