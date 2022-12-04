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
           store.put({ id: 1, name: nm, password: psw, gameID: 1, });

           const searchByName = name.get([nm]);
           searchByName.onsuccess = function () {
                  console.log('Added to db : ', searchByName.result)
           };
    }
}
//getting a userName from db and assigne it to currentUser
function getItem() {

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
           store.createIndex('gameLevel', ['level'], { unique: false });
           store.createIndex('gameStatus', ['status'], { unique: false });
           store.createIndex('game_duration', ['duration'], { unique: false });
    }

    request.onsuccess = function () {

           const db = request.result;
           const transaction = db.transaction("users", "readonly");

           const store = transaction.objectStore("users");// db table
           const searchByID = store.get(1);

           searchByID.onsuccess = function () {                 
                  searchByID.result.level = currentGame.level;
                  searchByID.name = searchByID.result.name;
                  searchByID.gameStatus = currentGame.gameStatus;
                  searchByID.password = searchByID.result.password;
                  searchByID.duration = currentGame.duration;
                  console.log("Record: " + searchByID.result.name)
           };

           transaction.oncomplete = function () {
                  db.close();
           }
    }
}
// add second game to db
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
           store.put({ gameID: 2, });
           const gameIndex = store.index("gameId");

           const searchByName = gameIndex.get(2);

           searchByName.onsuccess = function () {
                  const user = searchByName.result;
                  user.gameStatus = gameStatus;
                  user.duration = currentGame.duration;
                  console.log('Final game record : ', user)
           };
           transaction.oncomplete = function () {
                  db.close();
           }
    }
}