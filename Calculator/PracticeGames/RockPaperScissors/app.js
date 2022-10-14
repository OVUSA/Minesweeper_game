const  computerChoice = document.getElementById('computer-choice');
const userChoice = document.getElementById('user-choice');
const result = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let tempUserChoice;

// passing an event
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click',(e)=>{
    tempUserChoice = e.target.id
    userChoice.innerHTML=tempUserChoice;
}))