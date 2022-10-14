const  computerChoice = document.getElementById('computer-choice');
const userChoice = document.getElementById('user-choice');
const result = document.getElementById('result');
// returns an array of all buttons
const possibleChoices = document.querySelectorAll('button');
let tempUserChoice;
let tempComputerChoice;
let tempResult;

// passing an event
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click',(e)=>{
    tempUserChoice = e.target.id
    userChoice.innerHTML=tempUserChoice;
    computerTurn();
    getResult();

}))

function computerTurn(){
    let num = Math.floor(Math.random() * possibleChoices.length);
    tempComputerChoice= possibleChoices[num].id
    computerChoice.innerHTML= tempComputerChoice;

}

function getResult (){
    if(computerChoice===tempUserChoice){
        tempResult = "Withdraw";
        result.innerHTML = tempResult;
    }
    if(tempComputerChoice ==="Scissors" && tempUserChoice==="Paper"|| (tempComputerChoice ==="Paper"&& tempUserChoice =="Rock")){
        result.innerHTML = "Computer win!Try again."
    }
    if(tempComputerChoice==="Rock"&& tempUserChoice =="Scissors"){
        result.innerHTML = "Computer win! Try again."
    }else{
        result.innerHTML= "You win!Congratulation!"
    }
    
    
}