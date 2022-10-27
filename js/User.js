class User{

    constructor(name, password){
        this.name = name;
        this.password = password;
    }

}
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    var currentUser = new User(
        document.getElementById('name').value,
        document.getElementById('password').value);
        console.log(`Registered user : ${currentUser.name}`);

})