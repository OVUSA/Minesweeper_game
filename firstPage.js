const btn = document.getElementsByTagName('button');
btn.addEventListener('click', setGameLevel());

function setGameLevel(id) {
    if(id =="1"){
        console.log("Beginner")
        //createBoard(100,10); 
        window.location.href="game.html";
         
    }else if(id=="2"){
        console.log("Intermediate")        
        //createBoard(256,40);
    }else{
        console.log("Expert")
        //window.location.href = "game.html"; 
       // createBoard(400,99);
    } 
}


 
