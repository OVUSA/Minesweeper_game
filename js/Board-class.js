class Board{
    constructor(boardSize,numberMines){
        this.boardSize=boardSize;
        this.numberMines = numberMines;
        createBoard(boardSize,numberMines);
    }

 
createBoard(numberCells, numberBombs){
        
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
            this.mouseClick(e);

          });
    }
}

    mouseClick(e){
        switch (e.button) {
            case 0:
              //left
              if(checkTheCell(square.className)){
                  square.style.backgroundColor = "red";
                  exposeAllMines();
                 // square.setAttribute("src","bomb.png");
              } else{
                  square.style.backgroundColor = "#D9D9D9";
                  square.style.border="red";
              }
              break;
            case 2:
              //right
              square.innerHTML = "&#128681"
              flags--;
              flagCount.innerHTML = flags;
              console.log(`Remains number of flags ${flags}`);
              break;
            default:
              console.log(`Unknown button code: ${e.button}`);
          }
    }

    changeVisibility(){
    let resetButton = document.querySelector('.reset')
        if(resetButton.style.visibility =='hidden'){
            resetButton.style.visibility='visible';
        }
    }
 

}