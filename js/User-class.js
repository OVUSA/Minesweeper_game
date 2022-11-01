class User {

    userId=this.setID;
    game =new Game();
	constructor(username, password){
		this.username = username;
		this.password = password;       
	}

    setID(){
        id = 0;
        return id++;
    }
    
}
User.prototype.saveInfo= function(){
    console.log(User);
}


const getUsernameBtn = document.getElementById("btn");

getUsernameBtn.addEventListener('click', () => {
    currentUser.name = document.getElementById('name').value;
    //currentUser.password = document.getElementById('password').value;
    console.log(`username = ${currentUser.username}`);
})

