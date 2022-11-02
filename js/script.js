// User functions
class User {

       userId = () => { id = 0; return id++; }
       userGame = new Game();
       username=null;

       constructor(username, password) {
              this.username = username;
              this.password = password;
              
       }
       setGame(level){
              this.userGame=level;
       }
}


let currentUser;

function selectLevel() {
       window.location.href = "../html/levels.html";
}

function createUser() {

      // const getUsernameBtn = document.getElementById("btn");
       
      // getUsernameBtn.addEventListener('click', () => {
              currentUser = new User(document.getElementById('name').value,document.getElementById('password').value);
              //currentUser.password = document.getElementById('password').value;
              console.log(`username = ${currentUser.username}`);
      // })
}





   // Game functionality
