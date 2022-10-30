/*
* JS Classes
* - basic usage example
*/

class Form {

	constructor(username, password) {
		this.username = username;
		this.password = password;
	}
}

const formData = new Form();

const getUsernameBtn = document.getElementById('get-username');

getUsernameBtn.addEventListener('click', () => {
	formData.username = document.getElementById('username').value;
	console.log(`username = ${formData.username}`);
});
