class User {

	constructor(username, password) {
		this.username = username;
		this.password = password;
	}
}
User.prototype.saveInfo= function(){
    console.log(User);
}
const currentUser = new User();

const getUsernameBtn = document.getElementById("btn");

getUsernameBtn.addEventListener('click', () => {
    currentUser.name = document.getElementById('name').value;
    //currentUser.password = document.getElementById('password').value;
    console.log(`username = ${currentUser.username}`);
})

