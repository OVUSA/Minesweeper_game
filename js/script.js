
let allPlayers = [];
let allGame = [];
let currentGame;
let grid;
let flagCount;


class User  {
       name="";
       password = "";
       games = []      
       addGame(cG){
              this.games.push(cG);
       }
       bio = `${this.name} played ${this.games.length}`
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
//initiate a global player
var currentUser ;
function createUser() {

       let nm = document.querySelector('.name').value;
       let psw = document.querySelector('.password').value;
       storage(nm, psw);
       window.location.href = "../html/index.html";
}
function guestGame() {
       storage("Guest", null);
       window.location.href = "../html/index.html";
}


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
              store.createIndex('gameId',['gameID'],{keyPath:"gameId"});
              store.createIndex('gameLevel',['Level'],{unique: false});
              store.createIndex('gameStatus',['status'],{unique: false});
       }

       request.onsuccess = function () {

              const db = request.result;
              const transaction = db.transaction("users", "readwrite");

              const store = transaction.objectStore("users");// db table

              store.put({ id: 1, name: nm, password: psw });

              const query = store.get(1);
              
              query.onsuccess = function () {
                     console.log('query', query.result)
              };
             
              transaction.oncomplete = function () {
                     db.close();
              }
       }
}
//getting a userName from db and assigne it to currentUser
function getItem (){  
       currentUser =  new User();   
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
              store.createIndex('gameId',['gameID'],{keyPath:"gameId"});
              store.createIndex('gameLevel',['Level'],{unique: false});
              store.createIndex('gameStatus',['status'],{unique: false});
       }

       request.onsuccess = function () {
              
              const db = request.result;
              const transaction = db.transaction("users", "readwrite");

              const store = transaction.objectStore("users");
              const nameIndex = store.index("user_name");// look up the item 

              const query = store.get(1);           

              query.onsuccess = function () {
                     console.log('query', query.result)
                     currentUser.name = query.result.name
                     currentUser.password = query.result.password
                     console.log("Current user  "+currentUser.name);
              };
              transaction.oncomplete = function () {
                     db.close();
              }
       }
}
var newGame = false;
//creating new game here
function reset() {
       newGame=true;
       window.location.href = "../html/index.html";
}

function setGameLevel(id) {
       var status;

       let section = document.querySelector('.levels');
       section.style.display = "none";

       let game = document.querySelector('.game');
       game.style.display = "block";

       if (id == "1") {
              status = "Beginner"
              currentGame = new Game("Beginner");
              createBoard(99, 10, 1);
       } else if (id == "2") {
              status = "Inter"
              currentGame = new Game("Intermediate");
              createBoard(255, 40, 2);
       } else {
              currentGame = new Game("Expert");
              createBoard(400, 99, 3);
       }
       
       //check for reset, otherwise retrive data from db
       if(!newGame){
              getItem(); currentUser.addGame(currentGame);     
       }else{
              currentUser.addGame(new Game(status)); 
       }  
           
}

function createBoard(numberCells, numberBombs, level) {
       grid = document.querySelector('.grid');
       flagCount = document.querySelector('.flagNumber');
       boardUI(level, grid);
       const initialFlags = numberBombs;

       let squares = [];//an array for the board
       flagCount.innerHTML = initialFlags;

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
                     mouseClick(square, e, initialFlags);
                    
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

function mouseClick(square, e, flagCount) {
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
                     flagCount.innerHTML = flagCount--;

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
       currentGame.gameStatus = "Lost";
       allGame.push(currentGame);
       console.log(allGame);
}

function JsonTheGame() {

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
       console.log(currentUser);
}
function disactivateBoard() {
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
