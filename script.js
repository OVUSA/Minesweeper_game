// add DOM even listener to the file
// in this case html file will be loaded before JS code

document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid');
    const game = document.querySelector('gameStatus');


    
    const easy = 9;
    const mid = 16;
    const hard = 30;
    let width = 10;
    let squares = [];
    let bombAmount = 20;

   

    function createBoard(){
        
        const emptyCells = Array(100 - bombAmount).fill("valid");
        const bombs = Array(bombAmount).fill('bomb')
        const gameArray = emptyCells.concat(bombs);
        const shuffleArrays = gameArray.sort(()=>Math.random() -0.5)
        console.log(shuffleArrays);


        for( let i = 0; i < 100; i++){
            const square = document.createElement('div')
            square.setAttribute('id',i)
            // each square has a class with a value of the cell that were assigned to it in shuffleArrays
            square.classList.add(shuffleArrays[i]);
            grid.appendChild(square)
            squares.push(square)

        }
    }
    createBoard();
})