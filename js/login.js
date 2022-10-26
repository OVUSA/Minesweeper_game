
 function addPlayer() {
    
    var currentUser = new User(
        document.getElementById('name').value,
        document.getElementById('password').value);  

    console.log(currentUser);
}

 

 function selectLevel(){
    window.location.href="../html/levels.html";
 }