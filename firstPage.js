const btn = document.getElementsByTagName('button');
btn.addEventListener('click', setGameLevel());


function setGameLevel(id) {
    if(id =="1"){
        console.log("Beginner is pressed")
        createBoard(100,10);
    }else if(id=="2"){
        console.log("Intermediate")
        createBoard(256,40);
    }else{
        console.log("Expert")
        createBoard(400,99);
    }
}

 
