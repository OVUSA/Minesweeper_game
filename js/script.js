// User functions
class User {

       userId = () => { id = 0; return id++; }
       userGames = [];
       userGame = new Game();
       userName = null;
       userPassword = null;

       constructor(username, password) {
              this.username = username;
              this.password = password;
              
       }
       setGame(level){
              this.userGame=level;
       }
}


let currentUser;

function createUser() {

       currentUser = new User(document.getElementById('name').value,document.getElementById('password').value);
       console.log(`username = ${currentUser.username}`);
       window.location.href = "../html/game.html";

}

function guestGame() {
       currentUser= new User("Guess",null);
       userGame.user = currentUser;
       window.location.href = "../html/game.html";
}