// add DOM even listener to the file
// in this case html file will be loaded before JS code

document.addEventListener('DOMContentLoaded',()=>{

    const grid = document.querySelector('.grid');
    let flagCount = document.querySelector('.flagNumber').innerHTML = 10;
    let flags = 10;
    let squares = [];
    var numberCells = 100;
    let numberBombs = 20;   

    function createBoard(numberCells, numberBombs){
        
        const emptyCells = Array(numberCells - numberBombs).fill("valid");
        const bombs = Array(numberBombs).fill('bomb')
        const gameArray = emptyCells.concat(bombs);
        const shuffleArrays = gameArray.sort(()=>Math.random() -0.5)
        console.log(shuffleArrays);     

        for( let i = 0; i < numberCells; i++){
            const square = document.createElement('div')
            square.setAttribute('id',i)         
            square.classList.add(shuffleArrays[i]);
            grid.appendChild(square)
            squares.push(square)
            square.addEventListener('mouseup', (e) => {
                changeVisibility();
                switch (e.button) {
                  case 0:
                    //left
                    if(checkTheCell(square.className)){
                        square.style.backgroundColor = "red";
                        square.setAttribute("src","bomb.png");
                    } else{
                        square.style.backgroundColor = "#D9D9D9";
                    }
                    break;
                  case 2:
                    //right
                    square.innerHTML = "&#128681"
                    flags--;
                    console.log(`Remains number of flags${flags}`);
                    flagCount.innerHTML = flags;
                    break;
                  default:
                    console.log(`Unknown button code: ${e.button}`);
                }
              });
        }
    }

    createBoard(numberCells,numberBombs);

    function checkTheCell(squareClass){
        if(squareClass =='bomb'){
            return true;
            //selectedSquare.innerHTML=<img src = "bomb.png"></img>
        }else{            
            return false;
        }
    }

    function exposeAllMines(){

    }

})

// change visibility of reset button when user starts the game
function changeVisibility(){
    let resetButton = document.querySelector('.reset')
    if(resetButton.style.visibility =='hidden'){
        resetButton.style.visibility='visible';
    }
}


 