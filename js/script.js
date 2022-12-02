
var allGames = [];
let currentGame;
var currentUser;
var newGame = false;
var openCells = [];

let gamePlay = true; // used to stop clock and recod the result

class User {
       name = "";
       password = "";
       games = []
       addGame(cG) {
              this.games.push(cG);
       }
}
class Game {
       constructor(level) {
              this.gameStatus = "pending",
                     this.level = level,
                     this.duration = 0,
                     this.id = 1;
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
       storage(nm, psw);
       window.location.href = "../html/index.html";
}
function guestGame() {
       storage("Guest", "null");
       window.location.href = "../html/index.html";
}
//------------INDEXEDDB functions--------------------------------
//saving the object in IndexedDB
function storage(nm, psw) {
       const request = indexedDB.open("players", 1);

       request.onerror = function (event) {
              console.error("An error occured with IndexDB");
              console.error(event);

       };
       request.onupgradeneeded = function () {
              const db = request.result;
              // defines the scheme of the db
              const store = db.createObjectStore("users", { keyPath: "id" });
              store.createIndex("user_name", ["name"], { unique: false })
              store.createIndex("user_psw", ["password"], { unique: false })
              store.createIndex('gameId', ['gameID'], { keyPath: "gameId" });
              store.createIndex('gameLevel', ['Level'], { unique: false });
              store.createIndex('gameStatus', ['status'], { unique: false });
              store.createIndex('game_duration', ['duration'], { unique: false });
       }

       request.onsuccess = function () {

              const db = request.result;
              const transaction = db.transaction("users", "readwrite");

              const store = transaction.objectStore("users");// db table
              const name = store.index("user_name");
              store.put({ id: 1, name: nm, password: psw, gameID: 1, gameStatus: "pending" });

              const searchByName = name.get([nm]);

              searchByName.onsuccess = function () {
                     console.log('Added to db : ', searchByName.result)
              };
       }
}
//getting a userName from db and assigne it to currentUser
function getItem(level) {

       currentUser = new User();
       const request = indexedDB.open("players", 1);

       request.onerror = function (event) {
              console.error("An error occured with IndexDB");
              console.error(event);

       };
       request.onupgradeneeded = function () {
              const db = request.result;
              // defines the scheme of the db
              const store = db.createObjectStore("users", { keyPath: "id" });
              store.createIndex("user_name", ["name"], { unique: false })
              store.createIndex("user_psw", ["password"], { unique: false })
              store.createIndex('gameId', ['gameID'], { keyPath: "gameId" });
              store.createIndex('gameLevel', ['Level'], { unique: false });
              store.createIndex('gameStatus', ['status'], { unique: false });
              store.createIndex('game_duration', ['duration'], { unique: false });
       }

       request.onsuccess = function () {

              const db = request.result;
              const transaction = db.transaction("users", "readonly");            

              const store = transaction.objectStore("users");// db table
              const name = store.index("user_name");
              const name2 = store.index("id");

              const searchByName = name.get(["Marta"]);


             searchByName.onsuccess= function(){
              console.log("Record: "+searchByName.result)
        // TODO     search.result.level = "Beginner";
                     searchByName.name = searchByName.result.name;
                     searchByName.password = searchByName.result.password;
              console.log('Added to db : ', searchByName.result)
              
             };
              transaction.oncomplete = function () {
                     db.close();
              }
       }
}
function updateGame() {

       const request = indexedDB.open("players", 1);

       request.onerror = function (event) {
              console.error("An error occured with IndexDB");
              console.error(event);
       };
       request.onsuccess = function () {

              const db = request.result;
              const transaction = db.transaction("users", "readwrite");

              const store = transaction.objectStore("users");// db table
              const nameIndex = store.index("user_name");
              const searchByName = nameIndex.get(["Mary"]);
              searchByName.onsuccess = function () {
                     const user = searchByName.result;
                     user.gameStatus = gameStatus;
                     user.duration = currentGame.duration;
                     console.log('Final record : ', user)
              };
              transaction.oncomplete = function () {
                     db.close();
              }
       }
}

//creating new game here
function reset() {
       newGame = true;
       window.location.href = "../html/index.html";
}

function setGameLevel(id) {
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
       allGames.push(currentGame) // for debugging
       getItem(level);
       currentUser.addGame(currentGame);


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

       for (let i = 0; i < numberCells; i++) {
              const square = document.createElement('div')
              square.setAttribute('id', i)
              square.classList.add(shuffleArrays[i]);

              grid.appendChild(square)
              squares.push(square)
              square.addEventListener('mouseup', (e) => {
                     changeVisibility();
                     mouseClick(square, e, flagCount, numberCells, numberBombs);
              });
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
       gamePlay = false;
       let popUp = document.querySelector('.popUp');
       popUp.style.visibility = "visible";
       let popText  = document.querySelector('.popUpText');

       popText.innerHTML = "You " + gameStatus;

       currentGame.gameStatus = gameStatus;
       updateGame();


       // disactivate the board
       const grid = document.querySelector('.grid');
       grid.style.pointerEvents = 'none';
       console.log(currentUser)
}

function exposeAllMines() {
       gamePlay = false;
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
       for (let i = 0; i < adCells.length-1; i++) {
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

function checkCellsHelper(currentCell){
       if(currentGame.level =="Beginner"){

              let adCells=  [currentCell.id - 11, currentCell.id - 12, currentCell.id - 10, parseInt(currentCell.id) + 1, parseInt(currentCell.id) - 1, parseInt(currentCell.id) + 10,
                     parseInt(currentCell.id) + 11, parseInt(currentCell.id) + 12, 99];
                     return adCells;

       }else if (currentGame.level == "Intermediate"){
              let adCells=  [currentCell.id - 17, currentCell.id - 18, currentCell.id - 16, parseInt(currentCell.id) + 1, parseInt(currentCell.id) - 1, parseInt(currentCell.id) + 17,
                     parseInt(currentCell.id) + 18, parseInt(currentCell.id) + 16,255];
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

