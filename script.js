// add DOM even listener to the file
// in this case html file will be loaded before JS code

document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid');
    let width = 10;
    let squares = [];

    //create Board

    function createBoard(){
        for( let i = 0; i < 100; i++){
            const square = document.createElement('div')
            square.setAttribute('id',i)
            grid.appendChild(square)
            squares.push(square)

        }
    }
    createBoard();

})